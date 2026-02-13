import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useDarkMode } from "./useDarkMode";
import { toEnglishNumber } from "@/lib/utils";

const AREA_COLOR = "#f59e0b";
const GRID_LIGHT = "#f0f0f0";
const GRID_DARK = "#334155";
const AXIS_LIGHT = "#6b7280";
const AXIS_DARK = "#94a3b8";

/** Format time tick for X-axis (ensure English digits; "14:00" already is) */
function formatTimeTick(timeStr) {
  if (!timeStr || timeStr === "—") return "—";
  return timeStr;
}

function ChartSkeleton({ className }) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="h-5 w-32 animate-pulse rounded bg-muted" />
      <div className="h-[260px] w-full animate-pulse rounded-lg bg-muted/60" />
    </div>
  );
}

export default function SystemActivityChart({ data = [], loading }) {
  const isDark = useDarkMode();
  const tooltipStyle = isDark
    ? {
        backgroundColor: "#0f172a",
        border: "1px solid #334155",
        borderRadius: 8,
        color: "#f1f5f9",
      }
    : {
        backgroundColor: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: 8,
        color: "var(--foreground)",
      };
  const labelStyle = { color: "var(--foreground)" };
  const gridStroke = isDark ? GRID_DARK : GRID_LIGHT;
  const axisStroke = isDark ? AXIS_DARK : AXIS_LIGHT;

  const chartData =
    data.length > 0 ? data : Array.from({ length: 24 }, (_, i) => ({ time: `${String(i).padStart(2, "0")}:00`, count: 0 }));

  const formatTickY = (value) => toEnglishNumber(Number(value));
  const formatTooltipValue = (value) => toEnglishNumber(Number(value));
  const formatTooltipLabel = (label) => (label === "—" ? "—" : label);

  if (loading) {
    return (
      <Card className="rounded-xl border bg-card overflow-hidden dark:bg-slate-900 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-foreground">
            مراقبة نشاط النظام
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartSkeleton />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-xl border bg-card overflow-hidden dark:bg-slate-900 dark:border-slate-800">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-foreground">
          مراقبة نشاط النظام
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 8, right: 8, left: 0, bottom: 4 }}
            >
              <defs>
                <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={AREA_COLOR} stopOpacity={0.45} />
                  <stop offset="100%" stopColor={AREA_COLOR} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 11, fill: axisStroke }}
                stroke={axisStroke}
                tickFormatter={formatTimeTick}
                interval="preserveStartEnd"
                angle={0}
              />
              <YAxis
                tick={{ fontSize: 11, fill: axisStroke }}
                stroke={axisStroke}
                tickFormatter={formatTickY}
                width={28}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value) => [formatTooltipValue(value), "عدد العمليات"]}
                labelStyle={labelStyle}
                labelFormatter={formatTooltipLabel}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke={AREA_COLOR}
                strokeWidth={2}
                fill="url(#activityGradient)"
                name="عدد العمليات"
                isAnimationActive={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
