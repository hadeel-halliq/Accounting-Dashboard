import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function UsersTable({
  data = [],
  branchesMap = {},
  showBranchColumn = false,
  onEdit,
  onToggle,
}) {
  const navigate = useNavigate();

  const getBranchName = (branchid) => {
    if (!branchid) return "—";
    return branchesMap[branchid] ?? "—";
  };

  return (
    <div className="rounded-xl border bg-card overflow-x-auto shadow-sm">
      <table className="w-full text-sm" dir="rtl">
        <thead className="border-b bg-muted/40">
          <tr>
            <th className="p-3 text-right">الاسم</th>
            {showBranchColumn && (
              <th className="p-3 text-right">الفرع</th>
            )}
            <th className="p-3 text-right">البريد</th>
            <th className="p-3 text-right">الحالة</th>
            <th className="p-3 text-center">الإجراءات</th>
          </tr>
        </thead>

        <tbody>
          {data.map((u) => (
            <tr key={u.userid} className="border-b hover:bg-muted/40 transition-colors">
              <td className="p-3 font-medium">{u.fullname}</td>
              {showBranchColumn && (
                <td className="p-3 text-muted-foreground">
                  {getBranchName(u.branchid)}
                </td>
              )}
              <td className="p-3 text-muted-foreground">{u.email}</td>
              <td className="p-3">
                <span className={`px-2 py-1 rounded-full text-[10px] ${u.isactive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {u.isactive ? "مفعل" : "غير مفعل"}
                </span>
              </td>

              <td className="p-3">
                <div className="flex justify-center gap-2 flex-wrap">
                  <Button size="sm" variant="secondary" onClick={() => navigate(`/users/${u.userid}`)}>
                    عرض
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => onToggle(u)}>
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
