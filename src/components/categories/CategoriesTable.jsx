import { Button } from "@/components/ui/button";

export default function CategoriesTable({ data, onEdit, onViewProducts }) {
  return (
    <div className="border rounded-xl overflow-x-auto">
      <table className="w-full text-sm" dir="rtl">
        <thead className="bg-muted">
          <tr>
            <th className="p-3 text-right">الاسم</th>
            <th className="p-3">الدولة</th>
            <th className="p-3">الحالة</th>
            <th className="p-3 text-center">الإجراءات</th>
          </tr>
        </thead>

        <tbody>
          {data.map((c) => (
            <tr key={c.categoryid} className="border-t">
              <td className="p-3">{c.categoryname}</td>
              <td className="p-3">{c.origincountry}</td>
              <td className="p-3">{c.isactive ? "مفعل" : "معطل"}</td>

              <td className="p-3">
                <div className="flex gap-2 justify-center">
                  <Button size="sm" onClick={() => onViewProducts(c)}>
                    المنتجات
                  </Button>

                  <Button size="sm" onClick={() => onEdit(c)}>
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
