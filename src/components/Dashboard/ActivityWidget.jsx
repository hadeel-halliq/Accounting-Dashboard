import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

const BADGE_STYLES = {
  CREATE: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",
  UPDATE: "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300",
  DELETE: "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300",
  PRINT: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

function getBadgeStyle(type) {
  return BADGE_STYLES[type] ?? BADGE_STYLES.PRINT;
}

function getInitials(fullname) {
  if (!fullname || typeof fullname !== "string") return "?";
  const parts = fullname.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return fullname.slice(0, 2).toUpperCase();
}

function RowSkeleton() {
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="h-8 w-8 shrink-0 animate-pulse rounded-full bg-muted" />
      <div className="flex-1 space-y-1">
        <div className="h-4 w-28 animate-pulse rounded bg-muted" />
        <div className="h-3 w-20 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}

export default function ActivityWidget({ logs = [], loading, error }) {
  const list = Array.isArray(logs) ? logs.slice(0, 5) : [];

  return (
    <Card className="rounded-xl border bg-card overflow-hidden dark:bg-slate-900 dark:border-slate-800">
      <CardHeader className="border-b border-border bg-muted/40 dark:bg-slate-800/50">
        <CardTitle className="text-base font-semibold text-foreground">
          أحدث إجراءات النظام
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {loading && (
          <div className="px-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <RowSkeleton key={i} />
            ))}
          </div>
        )}

        {!loading && error && (
          <p className="py-8 text-center text-sm text-muted-foreground px-4">
            تعذر تحميل الإجراءات
          </p>
        )}

        {!loading && !error && list.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground px-4">
            لا يوجد إجراءات حديثة
          </p>
        )}

        {!loading && !error && list.length > 0 && (
          <ul className="list-none p-0 m-0">
            {list.map((log, i) => {
              const isLast = i === list.length - 1;
              const opType = log.operationtype ?? "—";
              const fullname = log.users?.fullname ?? "—";
              const timeStr = log.operationtime
                ? formatDistanceToNow(new Date(log.operationtime), {
                    addSuffix: true,
                    locale: ar,
                  })
                : "—";
              return (
                <li
                  key={log.logid ?? i}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 hover:bg-muted/40 dark:hover:bg-slate-800/50",
                    !isLast && "border-b border-border dark:border-slate-800"
                  )}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted dark:bg-slate-700 text-foreground text-xs font-semibold">
                    {fullname !== "—" ? (
                      getInitials(fullname)
                    ) : (
                      <User className="h-4 w-4 text-muted-foreground" strokeWidth={1.8} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-foreground truncate">
                        {fullname}
                      </span>
                      <span
                        className={cn(
                          "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
                          getBadgeStyle(opType)
                        )}
                      >
                        {opType}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground font-normal tabular-nums" dir="ltr">
                      {timeStr}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
