import { Link } from "react-router-dom";
import { UserPlus, Building2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ACTIONS = [
  { to: "/branches", label: "إضافة فرع", icon: Building2 },
  { to: "/users", label: "إضافة مستخدم", icon: UserPlus },
  { to: "/logs", label: "سجلات الأمان", icon: ShieldCheck },
];

export default function DashboardHeader({ className }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between flex-wrap gap-3",
        className
      )}
    >
      <div>
        <h1 className="text-2xl font-bold text-foreground">لوحة التحكم</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          مراقبة النظام — الفروع، المستخدمون، والسجلات
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        {ACTIONS.map((action) => (
          <Link key={action.to} to={action.to}>
            <Button variant="outline" size="sm" className="gap-2">
              <action.icon className="h-4 w-4" strokeWidth={1.8} />
              {action.label}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
