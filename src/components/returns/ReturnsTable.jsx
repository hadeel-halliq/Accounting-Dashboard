import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STATUS_OPTIONS = [
  { value: "PENDING", label: "قيد الانتظار", color: "bg-yellow-500" },
  { value: "COMPLETED", label: "مكتمل", color: "bg-green-500" },
  { value: "REJECTED", label: "مرفوض", color: "bg-red-500" },
];

const getStatusInfo = (status) => {
  return (
    STATUS_OPTIONS.find((s) => s.value === status) || {
      label: status,
      color: "bg-gray-500",
    }
  );
};

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  } catch {
    return "—";
  }
};

const formatCurrency = (amount) => {
  if (amount == null) return "—";
  return `$${Number(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export default function ReturnsTable({
  data = [],
  loading,
  onDelete,
  onStatusChange,
}) {
  if (loading) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        جاري التحميل...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        لا توجد مرتجعات
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full text-sm" dir="rtl">
          <thead className="border-b border-border bg-muted/40">
            <tr>
              <th className="text-right p-3">#</th>
              <th className="text-right p-3">فاتورة المصدر</th>
              <th className="text-right p-3">السبب</th>
              <th className="text-right p-3">الحالة</th>
              <th className="text-right p-3">الإجمالي</th>
              <th className="text-right p-3">التاريخ</th>
              <th className="text-center p-3 w-[240px]">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {data.map((ret) => {
              const statusInfo = getStatusInfo(ret.status);
              const totalRefund =
                ret.totalrefund ?? ret.total ?? ret.refundamount ?? "—";
              return (
                <tr
                  key={ret.returnid ?? ret.id}
                  className="border-b border-border hover:bg-muted/40"
                >
                  <td className="p-3">{ret.returnid ?? ret.id}</td>
                  <td className="p-3 font-medium">
                    {ret.originalinvoiceid ?? ret.invoiceid ?? "—"}
                  </td>
                  <td className="p-3 max-w-[200px] truncate" title={ret.reason}>
                    {ret.reason || "—"}
                  </td>
                  <td className="p-3">
                    <Badge className={`${statusInfo.color} text-white`}>
                      {statusInfo.label}
                    </Badge>
                  </td>
                  <td className="p-3 font-semibold text-green-600">
                    {typeof totalRefund === "number"
                      ? formatCurrency(totalRefund)
                      : totalRefund}
                  </td>
                  <td className="p-3">
                    {formatDate(ret.returndate ?? ret.created_at ?? ret.date)}
                  </td>
                  <td className="p-3">
                    <div className="flex justify-center items-center gap-2">
                      <Select
                        value={ret.status ?? "PENDING"}
                        onValueChange={(value) =>
                          onStatusChange(ret, value)
                        }
                      >
                        <SelectTrigger className="w-[140px] h-8 border border-input">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUS_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onDelete(ret)}
                        className="gap-1"
                      >
                        <Trash2 size={14} />
                        حذف
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
