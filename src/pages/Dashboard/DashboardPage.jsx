import { useEffect } from "react";
import {
  StatCard,
  SystemActivityChart,
  ActivityWidget,
  DashboardHeader,
  useAdminStats,
} from "@/components/Dashboard";
import { Building2, Users, Activity, ShieldCheck } from "lucide-react";

const statsData = [
  {
    key: "branches",
    label: "إجمالي الفروع",
    icon: Building2,
    iconClassName: "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300",
  },
  {
    key: "users",
    label: "إجمالي المستخدمين",
    icon: Users,
    iconClassName: "bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300",
  },
  {
    key: "logs",
    label: "إجمالي السجلات",
    icon: Activity,
    iconClassName: "bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300",
  },
  {
    key: "systemStatus",
    label: "حالة النظام",
    icon: ShieldCheck,
    iconClassName: "bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300",
  },
];

export default function DashboardPage() {
  const {
    stats,
    statsError,
    statsLoading,
    recentLogs,
    logsForChart,
    recentLogsLoading,
    recentLogsError,
  } = useAdminStats();

  useEffect(() => {
    document.title = "لوحة التحكم - السلام للمحاسبة";
  }, []);

  return (
    <div dir="rtl" className="p-6 space-y-6 min-h-screen bg-background dark:bg-slate-950">
      <DashboardHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat) => (
          <StatCard
            key={stat.key}
            label={stat.label}
            value={stats[stat.key]}
            icon={stat.icon}
            error={statsError[stat.key]}
            loading={statsLoading}
            iconClassName={stat.iconClassName}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SystemActivityChart data={logsForChart} loading={recentLogsLoading} />
        </div>
        <div className="lg:col-span-1">
          <ActivityWidget
            logs={recentLogs}
            loading={recentLogsLoading}
            error={recentLogsError}
          />
        </div>
      </div>
    </div>
  );
}