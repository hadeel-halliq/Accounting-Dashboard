// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";

// export default function BranchesTable({ data = [], onEdit, onDelete }) {
//   const navigate = useNavigate();

//   return (
//     <div className="rounded-xl border bg-card overflow-x-auto">

//       <table className="w-full text-sm" dir="rtl">

//         {/* Header */}
//         <thead className="border-b bg-muted/40">
//           <tr>
//             <th className="text-right p-3">اسم الفرع</th>
//             <th className="text-right p-3">العنوان</th>
//             <th className="text-right p-3">الهاتف</th>
//             <th className="text-right p-3">الحالة</th>
//             <th className="text-center p-3 w-[220px] ">الإجراءات</th>
//           </tr>
//         </thead>

//         {/* Body */}
//         <tbody>
//           {data.map((b) => (
//             <tr key={b.branchid} className="border-b hover:bg-muted/40">

//               <td className="p-3">{b.branchname}</td>
//               <td className="p-3">{b.address}</td>
//               <td className="p-3">{b.phone}</td>

//               <td className="p-3">
//                 {b.isactive ? "مفعل" : "غير مفعل"}
//               </td>

//               <td className="p-3">
//                 <div className="flex justify-end gap-2">

//                   <Button
//                     size="sm"
//                     variant="secondary"
//                     onClick={() => navigate(`/branches/${b.branchid}`)}
//                   >
//                     عرض
//                   </Button>

//                   <Button
//                     size="sm"
//                     variant="outline"
//                     onClick={() => onEdit(b)}
//                   >
//                     تعديل
//                   </Button>

//                   <Button
//                     size="sm"
//                     variant="destructive"
//                     onClick={() => onDelete(b)}
//                   >
//                     حذف
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

export default function BranchesTable({ data = [], onEdit, onDelete }) {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return data.slice(start, start + PAGE_SIZE);
  }, [data, page]);

  return (
    <div className="rounded-xl border bg-card p-2">

      <div className="overflow-x-auto">
        <table className="w-full text-sm" dir="rtl">

          <thead className="border-b bg-muted/40">
            <tr>
              <th className="text-right p-3">اسم الفرع</th>
              <th className="text-right p-3">العنوان</th>
              <th className="text-right p-3">الهاتف</th>
              <th className="text-right p-3">الحالة</th>
              <th className="text-center p-3 w-[220px]">الإجراءات</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((b) => (
              <tr key={b.branchid} className="border-b hover:bg-muted/40">

                <td className="p-3">{b.branchname}</td>
                <td className="p-3">{b.address}</td>
                <td className="p-3">{b.phone}</td>
                <td className="p-3">{b.isactive ? "مفعل" : "غير مفعل"}</td>

                <td className="p-3">
                  <div className="flex justify-end gap-2 flex-wrap">

                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => navigate(`/branches/${b.branchid}`)}
                    >
                      عرض
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(b)}
                    >
                      تعديل
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onDelete(b)}
                    >
                      حذف
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
