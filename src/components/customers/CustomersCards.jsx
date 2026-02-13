import { Button } from "@/components/ui/button";

export default function CustomersCards({ data, onEdit, onDelete }) {
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
          {/* الاسم */}
          <div className="font-bold text-base">
            {c.firstname} {c.lastname}
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
