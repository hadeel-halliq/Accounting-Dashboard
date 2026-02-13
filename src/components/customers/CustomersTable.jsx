import { Button } from "@/components/ui/button";

export default function CustomersTable({ data, onEdit, onDelete }) {
  return (
    <div className="w-full overflow-x-auto">
      <table
        dir="rtl"
        className="w-full border rounded-lg overflow-hidden text-right"
      >
        <thead className="bg-muted">
          <tr>
            {/* RTL → أول عمود يظهر يمين */}
            <th className="p-3 font-semibold">الاسم</th>
            <th className="p-3 font-semibold">الهاتف</th>
            <th className="p-3 font-semibold">الشركة</th>
            <th className="p-3 font-semibold text-center">
              الإجراءات
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((c) => (
            <tr
              key={c.customerid}
              className="border-t hover:bg-muted/40 transition"
            >
              {/* الاسم */}
              <td className="p-3 font-medium">
                {c.firstname} {c.lastname}
              </td>

              {/* الهاتف */}
              <td className="p-3">{c.phone}</td>

              {/* الشركة */}
              <td className="p-3">
                {c.companyname || "-"}
              </td>

              {/* الإجراءات */}
              <td className="p-3">
                <div className="flex justify-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => onEdit(c)}
                  >
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
