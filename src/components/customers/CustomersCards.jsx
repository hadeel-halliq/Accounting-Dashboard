import { Button } from "@/components/ui/button";

export default function CustomersCards({ data, onEdit, onDelete }) {

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
    <div dir="rtl" className="space-y-4">
      {data.map((c) => (
        <div
          key={c.customerid}
          className="
            border rounded-xl p-4
            shadow-sm
            space-y-3
            text-right
            bg-background
          "
        >
          {/* الاسم + النوع */}
          <div className="flex justify-between items-center">
            <div className="font-bold text-base">
              {c.firstname} {c.lastname}
            </div>

            <span
              className={`
                px-3 py-1 rounded-full text-xs font-semibold
                ${getTypeStyle(c.type)}
              `}
            >
              {getTypeLabel(c.type)}
            </span>
          </div>

          {/* الهاتف */}
          <div className="text-sm text-muted-foreground">
            الهاتف: {c.phone}
          </div>

          {/* الشركة */}
          <div className="text-sm text-muted-foreground">
            الشركة: {c.companyname || "-"}
          </div>

          {/* الأزرار */}
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              className="flex-1"
              onClick={() => onEdit(c)}
            >
              تعديل
            </Button>

            <Button
              size="sm"
              variant="destructive"
              className="flex-1"
              onClick={() => onDelete(c)}
            >
              حذف
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
