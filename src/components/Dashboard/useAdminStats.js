import { useEffect, useState, useCallback } from "react";
import UsersService from "@/services/users.service";
import BranchesService from "@/services/branches.service";
import LogsService from "@/services/logs.service";

const LIMIT_ONE = 1;
const LIMIT_RECENT = 5;
const LIMIT_CHART = 30;

function getTotalFromResponse(res, limit = 1) {
  if (res?.total != null && typeof res.total === "number") return res.total;
  const pages = res?.totalPages ?? 1;
  return Math.max(pages * limit, 1);
}

/** Get start of today in local date (YYYY-MM-DD) */
function getTodayLocal() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * Aggregate logs to "Activity Volume per Hour" for the current day only.
 * Returns array of { time: "00:00" | "01:00" | ... | "23:00", count } with all 24 hours filled (count: 0 where no activity).
 */
function aggregateLogsByHourToday(logs) {
  const today = getTodayLocal();
  const byHour = {};
  for (let h = 0; h < 24; h++) {
    const key = String(h).padStart(2, "0") + ":00";
    byHour[key] = 0;
  }
  (logs || []).forEach((log) => {
    if (!log.operationtime) return;
    const d = new Date(log.operationtime);
    const dateStr =
      d.getFullYear() +
      "-" +
      String(d.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(d.getDate()).padStart(2, "0");
    if (dateStr !== today) return;
    const hour = d.getHours();
    const key = String(hour).padStart(2, "0") + ":00";
    byHour[key] = (byHour[key] || 0) + 1;
  });
  return Object.entries(byHour)
    .map(([time, count]) => ({ time, count }))
    .sort((a, b) => a.time.localeCompare(b.time));
}

export function useAdminStats() {
  const [stats, setStats] = useState({
    branches: null,
    users: null,
    logs: null,
    systemStatus: null,
  });
  const [statsError, setStatsError] = useState({});
  const [statsLoading, setStatsLoading] = useState(true);

  const [recentLogs, setRecentLogs] = useState([]);
  const [logsForChart, setLogsForChart] = useState([]);
  const [recentLogsLoading, setRecentLogsLoading] = useState(true);
  const [recentLogsError, setRecentLogsError] = useState(false);

  const fetchStats = useCallback(async () => {
    setStatsLoading(true);
    setStatsError({});
    const next = { branches: null, users: null, logs: null, systemStatus: "Operational" };

    try {
      const [usersRes, branchesRes, logsRes] = await Promise.allSettled([
        UsersService.list({ page: 1, limit: LIMIT_ONE }),
        BranchesService.list({ page: 1, limit: LIMIT_ONE }),
        LogsService.list({ page: 1, limit: LIMIT_ONE }),
      ]);

      if (usersRes.status === "fulfilled" && usersRes.value) {
        next.users = getTotalFromResponse(usersRes.value, LIMIT_ONE);
      } else {
        next.users = 0;
        setStatsError((e) => ({ ...e, users: true }));
      }
      if (branchesRes.status === "fulfilled" && branchesRes.value) {
        next.branches = getTotalFromResponse(branchesRes.value, LIMIT_ONE);
      } else {
        next.branches = 0;
        setStatsError((e) => ({ ...e, branches: true }));
      }
      if (logsRes.status === "fulfilled" && logsRes.value) {
        next.logs = getTotalFromResponse(logsRes.value, LIMIT_ONE);
      } else {
        next.logs = 0;
        setStatsError((e) => ({ ...e, logs: true }));
      }
      setStats(next);
    } catch (_) {
      setStatsError({ users: true, branches: true, logs: true });
    } finally {
      setStatsLoading(false);
    }
  }, []);

  const fetchLogs = useCallback(async () => {
    setRecentLogsLoading(true);
    setRecentLogsError(false);
    try {
      const res = await LogsService.list({ page: 1, limit: LIMIT_CHART });
      const list = res?.logs ?? [];
      setRecentLogs(list.slice(0, LIMIT_RECENT));
      setLogsForChart(aggregateLogsByHourToday(list));
    } catch {
      setRecentLogsError(true);
      setRecentLogs([]);
      setLogsForChart([]);
    } finally {
      setRecentLogsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return {
    stats,
    statsError,
    statsLoading,
    recentLogs,
    logsForChart,
    recentLogsLoading,
    recentLogsError,
  };
}
