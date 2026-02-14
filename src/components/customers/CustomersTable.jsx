import { Button } from "@/components/ui/button";

export default function CustomersTable({ data, onEdit, onDelete }) {

  /* ===== تحويل النوع ===== */
  const getTypeLabel = (type) => {
    if (type === "CUSTOMER") return "عميل";
    if (type === "SUPPLIER") return "مورد";
    if (type === "IMPORTER") return "مستورد";
    return type;
  };

  const getTypeStyle = (type) => {
    if (type === "CUSTOMER")
      return "bg-blue-100 text-blue-700";
    if (type === "SUPPLIER")
      return "bg-orange-100 text-orange-700";
    if (type === "IMPORTER")
      return "bg-purple-100 text-purple-700";

    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="w-full overflow-x-auto">
      <table
        dir="rtl"
        className="w-full border rounded-lg overflow-hidden text-right"
      >
        <thead className="bg-muted">
          <tr>
            <th className="p-3 font-semibold">الاسم</th>
            <th className="p-3 font-semibold">الهاتف</th>
            <th className="p-3 font-semibold">الشركة</th>
            <th className="p-3 font-semibold">النوع</th>
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
              <td className="p-3 font-medium">
                {c.firstname} {c.lastname}
              </td>

              <td className="p-3">{c.phone}</td>

              <td className="p-3">
                {c.companyname || "-"}
              </td>

              {/* ✅ النوع */}
              <td className="p-3">
                <span
                  className={`
                    px-3 py-1 rounded-full text-xs font-semibold
                    ${getTypeStyle(c.type)}
                  `}
                >
                  {getTypeLabel(c.type)}
                </span>
              </td>

              <td className="p-3">
                <div className="flex justify-center gap-2">
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
