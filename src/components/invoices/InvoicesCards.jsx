import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { INVOICE_STATUS_OPTIONS } from "./InvoiceForm";

const STATUS_MAP = {
  DRAFT: { label: "مسودة", variant: "secondary" },
  SHIPPED: { label: "تم الشحن", variant: "default" },
  PROCESSING: { label: "قيد المعالجة", variant: "secondary" },
  CONFIRMED: { label: "مؤكد", variant: "default" },
  PENDING: { label: "قيد الانتظار", variant: "secondary" },
  PAID: { label: "مدفوعة", variant: "default" },
  CANCELLED: { label: "ملغاة", variant: "destructive" },
};

export default function InvoicesCards({
  data = [],
  onEdit,
  onDelete,
  onStatusChange,
  customerNames = {},
}) {
  if (!data.length) {
    return (
      <p className="text-center py-10 text-muted-foreground">
        لا توجد فواتير
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {data.map((inv) => {
        const statusInfo = STATUS_MAP[inv.status] || STATUS_MAP.DRAFT;
        const dateStr = inv.date
          ? format(new Date(inv.date), "yyyy-MM-dd", { locale: ar })
          : "—";

        const grandTotal =
          inv.total ?? inv.grandtotal ?? inv.nettotal ?? "—";

        return (
          <div
            key={inv.invoiceid}
            className="border rounded-xl p-4 bg-card space-y-3"
          >
            <div className="flex justify-between items-center">
              <span className="font-bold">
                فاتورة #{inv.invoiceid}
              </span>

              {onStatusChange ? (
                <Select
                  value={inv.status ?? "DRAFT"}
                  onValueChange={(value) =>
                    onStatusChange(inv, value)
                  }
                >
                  <SelectTrigger className="w-[120px] h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {INVOICE_STATUS_OPTIONS.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Badge variant={statusInfo.variant}>
                  {statusInfo.label}
                </Badge>
              )}
            </div>

            <div className="text-sm text-muted-foreground">
              العميل:{" "}
              {customerNames[inv.customerid] ??
                inv.customerid ??
                "—"}
            </div>

            <div className="text-sm text-muted-foreground">
              التاريخ: {dateStr}
            </div>

            <div className="text-sm text-muted-foreground">
              الإجمالي: {grandTotal}
            </div>

            <div className="flex gap-2 pt-2">
              {onEdit && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(inv)}
                >
                  تعديل
                </Button>
              )}

              {onDelete && (
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(inv)}
                >
                  حذف
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
