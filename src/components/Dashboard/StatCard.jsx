import { Card, CardContent } from "@/components/ui/card";
import { cn, toEnglishNumber } from "@/lib/utils";

export default function StatCard({ label, value, icon: Icon, error, loading, iconClassName }) {
  const displayValue =
    error ? "—" : typeof value === "number" ? toEnglishNumber(value) : (value ?? "—");

  if (loading) {
    return (
      <div className="rounded-xl border bg-card overflow-hidden">
        <CardContent className="flex flex-row items-center justify-between gap-4 p-5">
          <div className="flex-1 space-y-2">
            <div className="h-4 w-20 animate-pulse rounded bg-muted" />
            <div className="h-8 w-16 animate-pulse rounded bg-muted" />
          </div>
          <div className="h-10 w-10 animate-pulse rounded-lg bg-muted" />
        </CardContent>
      </div>
    );
  }

  return (
    <Card className="overflow-hidden rounded-xl border bg-card">
      <CardContent className="flex flex-row items-center justify-between gap-4 p-5">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-foreground">{displayValue}</p>
          {error && (
            <p className="mt-1 text-xs text-destructive">تعذر تحميل البيانات</p>
          )}
        </div>
        {Icon && (
          <div
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
              iconClassName ?? "bg-muted/60"
            )}
          >
            <Icon
              className={cn("h-6 w-6", iconClassName ? "text-inherit" : "text-foreground")}
              strokeWidth={1.8}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
