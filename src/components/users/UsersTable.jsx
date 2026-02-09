// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";

// export default function UsersTable({ data = [], onEdit, onToggle, onReset }) {
//   const navigate = useNavigate();
//   return (
//     <div className="rounded-xl border bg-card overflow-x-auto">
//       <table className="w-full text-sm" dir="rtl">
//         <thead className="border-b bg-muted/40">
//           <tr>
//             <th className="p-3 text-right">الاسم</th>
//             <th className="p-3 text-right">البريد</th>
//             <th className="p-3 text-right">الدور</th>
//             <th className="p-3 text-right">الحالة</th>
//             <th className="p-3 text-center">الإجراءات</th>
//           </tr>
//         </thead>

//         <tbody>
//           {data.map((u) => (
//             <tr key={u.userid} className="border-b hover:bg-muted/40">
//               <td className="p-3">{u.fullname}</td>
//               <td className="p-3">{u.email}</td>
//               <td className="p-3">{u.role}</td>
//               <td className="p-3">{u.isactive ? "مفعل" : "غير مفعل"}</td>

//               <td className="p-3">
//                 <div className="flex justify-end gap-2">
//                   <Button size="sm" onClick={() => onEdit(u)}>
//                     تعديل
//                   </Button>

//                   <Button
//                     size="sm"
//                     variant="outline"
//                     onClick={() => onToggle(u)}
//                   >
//                     {u.isactive ? "تعطيل" : "تفعيل"}
//                   </Button>

//                   <Button
//                     size="sm"
//                     variant="secondary"
//                     onClick={() => onReset(u)}
//                   >
//                     إعادة كلمة المرور
//                   </Button>
//                   <Button
//                     size="sm"
//                     onClick={() => navigate(`/users/${u.userid}`)}
//                   >
//                     عرض
//                   </Button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/common/Pagination";

const PAGE_SIZE = 10;

export default function UsersTable({ data = [], onEdit, onToggle, onReset }) {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  /* ================= pagination logic ================= */

  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return data.slice(start, start + PAGE_SIZE);
  }, [data, page]);

  /* ================= UI ================= */

  return (
    <div className="rounded-xl border bg-card p-2">

      <div className="overflow-x-auto">
        <table className="w-full text-sm" dir="rtl">

          <thead className="border-b bg-muted/40">
            <tr>
              <th className="p-3 text-right">الاسم</th>
              <th className="p-3 text-right">البريد</th>
              <th className="p-3 text-right">الحالة</th>
              <th className="p-3 text-right ">الإجراءات</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((u) => (
              <tr key={u.userid} className="border-b hover:bg-muted/40">

                <td className="p-3">{u.fullname}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.role}</td>
                <td className="p-3">{u.isactive ? "مفعل" : "غير مفعل"}</td>

                <td className="p-3">
                  <div className="flex justify-end gap-2 flex-wrap">

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

                    <Button
                      size="sm"
                      onClick={() => navigate(`/users/${u.userid}`)}
                    >
                      عرض
                    </Button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  );
}
