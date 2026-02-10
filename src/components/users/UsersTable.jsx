import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function UsersTable({ data = [], onEdit, onToggle, onReset }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border bg-card overflow-x-auto">
      <table className="w-full text-sm" dir="rtl">
        <thead className="border-b bg-muted/40">
          <tr>
            <th className="p-3 text-right">الاسم</th>
            <th className="p-3 text-right">البريد</th>
            <th className="p-3 text-right">الحالة</th>
            <th className="p-3 text-center">الإجراءات</th>
          </tr>
        </thead>

        <tbody>
          {data.map((u) => (
            <tr key={u.userid} className="border-b hover:bg-muted/40">
              <td className="p-3">{u.fullname}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3">{u.isactive ? "مفعل" : "غير مفعل"}</td>

              <td className="p-3">
                <div className="flex justify-end gap-2 flex-wrap">
                  <Button
                    size="sm"
                    onClick={() => navigate(`/users/${u.userid}`)}
                  >
                    عرض
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onToggle(u)}
                  >
                    {u.isactive ? "تعطيل" : "تفعيل"}
                  </Button>

                  <Button size="sm" onClick={() => onEdit(u)}>
                    تعديل
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
