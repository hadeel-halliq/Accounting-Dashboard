import { Button } from "@/components/ui/button";

export default function UsersCards({ data = [], onEdit, onToggle, onReset }) {
  return (
    <div className="grid gap-4">

      {data.map((u) => (
        <div key={u.userid} className="rounded-xl border bg-card p-4 space-y-3">

          <div>
            <p className="font-semibold">{u.fullname}</p>
            <p className="text-sm text-muted-foreground">{u.email}</p>
            <p className="text-sm">{u.role}</p>
          </div>

          <div className="flex flex-wrap gap-2">

            <Button size="sm" onClick={() => onEdit(u)}>
              تعديل
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => onToggle(u)}
            >
              {u.isactive ? "تعطيل" : "تفعيل"}
            </Button>

            <Button
              size="sm"
              variant="secondary"
              onClick={() => onReset(u)}
            >
              إعادة كلمة المرور
            </Button>

          </div>

        </div>
      ))}
    </div>
  );
}
