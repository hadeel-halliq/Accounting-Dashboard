import { Button } from "@/components/ui/button";

export default function CategoriesTable({ data, onEdit, onDelete }) {
  return (
    <div className="rounded-xl border bg-card overflow-x-auto">

      <table className="w-full text-sm" dir="rtl">

        <thead className="border-b bg-muted/40">
          <tr>
            <th className="p-3 text-right">الاسم</th>
            <th className="p-3 text-right">بلد المنشأ</th>
            <th className="p-3 text-right">الفرع</th>
            <th className="p-3 text-center">الإجراءات</th>
          </tr>
        </thead>

        <tbody>
          {data.map((c) => (
            <tr key={c.categoryid} className="border-b">

              <td className="p-3">{c.categoryname}</td>
              <td className="p-3">{c.origincountry}</td>
              <td className="p-3">{c.branches?.branchname}</td>

              <td className="p-3">
                <div className="flex gap-2 justify-center">

                  <Button size="sm" onClick={() => onEdit(c)}>
                    تعديل
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDelete(c)}
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
  );
}
