import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Pagination from "@/components/common/Pagination";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { INVOICE_STATUS_OPTIONS } from "./InvoiceForm";

const PAGE_SIZE = 10;

const PAYMENT_TYPE_LABELS = {
  CASH: "مباشر",
  DEFERRED: "آجل",
};

const STATUS_MAP = {
  DRAFT: { label: "مسودة", variant: "secondary" },
  SHIPPED: { label: "تم الشحن", variant: "default" },
  PROCESSING: { label: "قيد المعالجة", variant: "secondary" },
  CONFIRMED: { label: "مؤكد", variant: "default" },
  PENDING: { label: "قيد الانتظار", variant: "secondary" },
  PAID: { label: "مدفوعة", variant: "default" },
  CANCELLED: { label: "ملغاة", variant: "destructive" },
};

export default function InvoicesTable({
  data = [],
  onEdit,
  onDelete,
  onStatusChange,
  customerNames = {},
}) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(data.length / PAGE_SIZE));

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return data.slice(start, start + PAGE_SIZE);
  }, [data, page]);

  if (!data.length) {
    return (
      <p className="text-center py-10 text-muted-foreground">
        لا توجد فواتير
      </p>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-2">
      <div className="overflow-x-auto">
        <table className="w-full text-sm" dir="rtl">
          <thead className="border-b border-border bg-muted/40">
            <tr>
              <th className="text-right p-3">#</th>
              <th className="text-right p-3">العميل</th>
              <th className="text-right p-3">التاريخ</th>
              <th className="text-right p-3">نوع الدفع</th>
              <th className="text-right p-3">الحالة</th>
              <th className="text-right p-3">الإجمالي</th>
              <th className="text-center p-3 w-[280px]">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((inv) => {
              const statusInfo = STATUS_MAP[inv.status] || STATUS_MAP.DRAFT;
              const dateStr = inv.date
                ? format(new Date(inv.date), "yyyy-MM-dd", { locale: ar })
                : "—";
              const grandTotal = inv.total ?? inv.grandtotal ?? inv.nettotal ?? "—";
              const paymentTypeLabel =
                PAYMENT_TYPE_LABELS[inv.paymenttype] ?? inv.paymenttype ?? "—";
              return (
                <tr
                  key={inv.invoiceid}
                  className="border-b border-border hover:bg-muted/40"
                >
                  <td className="p-3">{inv.invoiceid}</td>
                  <td className="p-3">
                    {customerNames[inv.customerid] ?? inv.customerid ?? "—"}
                  </td>
                  <td className="p-3">{dateStr}</td>
                  <td className="p-3">{paymentTypeLabel}</td>
                  <td className="p-3">
                    {onStatusChange ? (
                      <Select
                        value={inv.status ?? "DRAFT"}
                        onValueChange={(value) => onStatusChange(inv, value)}
                      >
                        <SelectTrigger className="w-[130px] h-8 border border-input">
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
                  </td>
                  <td className="p-3">{grandTotal}</td>
                  <td className="p-3">
                    <div className="flex justify-end gap-2 flex-wrap">
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
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={setPage}
      />
    </div>
  );
}
