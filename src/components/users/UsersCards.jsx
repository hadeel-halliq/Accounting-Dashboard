// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";

// export default function UsersCards({ data = [], onEdit, onToggle }) {
//   const navigate = useNavigate();
  
//   return (
//     <div className="grid gap-4">
//       {data.map((u) => (
//         <div key={u.userid} className="rounded-xl border bg-card p-4 space-y-3 shadow-sm relative overflow-hidden">
//           {/* Tag رقم الفرع للموبايل */}
//           <div className="absolute top-0 left-0 bg-blue-50 text-blue-600 px-3 py-1 text-[10px] font-mono font-bold rounded-br-lg border-b border-r">
//              Branch: {u.branchid || "N/A"}
//           </div>

//           <div className="pt-2">
//             <p className="font-bold text-lg">{u.fullname}</p>
//             <p className="text-sm text-muted-foreground">{u.email}</p>
//             <p className="text-xs text-blue-500 font-medium uppercase">{u.role}</p>
//           </div>

//           <div className="flex flex-wrap gap-2 pt-2 border-t">
//             <Button size="sm" className="flex-1" onClick={() => onEdit(u)}>تعديل</Button>
//             <Button size="sm" variant="outline" className="flex-1" onClick={() => onToggle(u)}>
//               {u.isactive ? "تعطيل" : "تفعيل"}
//             </Button>
//             <Button size="sm" variant="secondary" onClick={() => navigate(`/users/${u.userid}`)}>عرض</Button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";
import { roles } from "@/constan/roles";

export default function UsersCards({
  data = [],
  branchesMap = {},
  onEdit,
  onToggle,
}) {
  /* ================= helper ================= */

  // ⭐ إظهار اسم الدور بالعربي
  const getRoleLabel = (role) => {
    switch (role) {
      case roles.SUPER_ADMIN:
        return "سوبر أدمن";
      case roles.ADMIN:
        return "مدير فرع";
      case roles.USER:
        return "موظف";
      default:
        return role;
    }
  };

  // ⭐ جلب اسم الفرع من الماب
  const getBranchName = (branchid) => {
    if (!branchid) return "-";
    return branchesMap[branchid] || `فرع رقم ${branchid}`;
  };

  /* ================= render ================= */

  if (!data.length) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        لا يوجد مستخدمين
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {data.map((user) => (
        <Card key={user.userid} className="shadow-sm">
          <CardContent className="p-4 space-y-3">

            {/* الاسم */}
            <div className="font-bold text-lg">
              {user.fullname}
            </div>

            {/* البريد */}
            <div className="text-sm text-muted-foreground break-all">
              {user.email}
            </div>

            {/* الدور */}
            <div className="flex justify-between items-center">
              <span className="text-sm">الدور:</span>
              <Badge variant="secondary">
                {getRoleLabel(user.role)}
              </Badge>
            </div>

            {/* ⭐ الفرع (اسم + رقم) */}
            <div className="flex justify-between items-center">
              <span className="text-sm">الفرع:</span>

              <div className="text-sm font-medium text-right">
                {getBranchName(user.branchid)}
                <div className="text-xs text-muted-foreground">
                  #{user.branchid || "-"}
                </div>
              </div>
            </div>

            {/* الحالة */}
            <div className="flex justify-between items-center">
              <span className="text-sm">الحالة:</span>

              <Switch
                checked={user.isactive}
                onCheckedChange={() => onToggle(user)}
              />
            </div>

            {/* الأزرار */}
            <div className="flex justify-end pt-2">
              <Button
                size="sm"
                variant="outline"
                className="gap-2"
                onClick={() => onEdit(user)}
              >
                <Edit size={14} />
                تعديل
              </Button>
            </div>

          </CardContent>
        </Card>
      ))}
    </div>
  );
}
