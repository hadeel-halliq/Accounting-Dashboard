// import { Button } from "@/components/ui/button";

// export default function CategoriesCards({
//   data = [],
//   onEdit,
//   onDelete,
//   onViewProducts,
// }) {
//   return (
//     <div className="space-y-4">
//       {data.map((c) => (
//         <div
//           key={c.categoryid}
//           className="rounded-xl border p-4 space-y-3 bg-card"
//         >
//           <div className="font-bold">{c.categoryname}</div>

//           <div className="text-sm text-muted-foreground">
//             {c.origincountry}
//           </div>

//           <div>{c.isactive ? "نشط" : "متوقف"}</div>

//           <div className="flex gap-2">
//             <Button size="sm" onClick={() => onViewProducts(c)}>
//               المنتجات
//             </Button>

//             <Button size="sm" onClick={() => onEdit(c)}>
//               تعديل
//             </Button>

//             <Button size="sm" variant="destructive" onClick={() => onDelete(c)}>
//               حذف
//             </Button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


import { Button } from "@/components/ui/button";

export default function CategoriesCards({
  data,
  onEdit,
  onDelete,
  onProducts,
}) {
  return (
    <div className="grid gap-4">

      {data.map((c) => (
        <div key={c.categoryid} className="border rounded-xl p-4 space-y-3">

          <div>
            <p className="font-semibold">{c.categoryname}</p>
            <p className="text-sm">{c.origincountry}</p>
            <p className="text-xs">
              {c.isactive ? "مفعل" : "معطل"}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">

            <Button size="sm" onClick={() => onProducts(c)}>
              المنتجات
            </Button>

            <Button size="sm" onClick={() => onEdit(c)}>
              تعديل
            </Button>

            <Button size="sm" variant="destructive" onClick={() => onDelete(c)}>
              حذف
            </Button>

          </div>

        </div>
      ))}
    </div>
  );
}
