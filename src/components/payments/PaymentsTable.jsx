import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Payment method options with colors
const PAYMENT_METHODS = [
  { value: "CASH", label: "نقدي", color: "bg-green-500" },
  { value: "CREDIT_CARD", label: "بطاقة ائتمان", color: "bg-blue-500" },
  { value: "BANK_TRANSFER", label: "تحويل بنكي", color: "bg-purple-500" },
  { value: "SHAM_CASH", label: "Sham Cash", color: "bg-orange-500" },
  { value: "SYRIATEL_CASH", label: "Syriatel Cash", color: "bg-red-500" },
  { value: "AL_HARAM", label: "Al Haram", color: "bg-yellow-600" },
];

const getPaymentMethodInfo = (method) => {
  return (
    PAYMENT_METHODS.find((m) => m.value === method) || {
      label: method,
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

export default function PaymentsTable({ data = [], loading, onEdit, onDelete }) {
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
        لا توجد دفعات
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
              <th className="text-right p-3">رقم الفاتورة</th>
              <th className="text-right p-3">المبلغ</th>
              <th className="text-right p-3">طريقة الدفع</th>
              <th className="text-right p-3">التاريخ</th>
              <th className="text-center p-3 w-[200px]">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {data.map((payment) => {
              const methodInfo = getPaymentMethodInfo(payment.paymentmethod);
              return (
                <tr
                  key={payment.paymentid}
                  className="border-b border-border hover:bg-muted/40"
                >
                  <td className="p-3">{payment.paymentid}</td>
                  <td className="p-3 font-medium">{payment.invoiceid || "—"}</td>
                  <td className="p-3 font-semibold text-green-600">
                    {formatCurrency(payment.amount)}
                  </td>
                  <td className="p-3">
                    <Badge className={`${methodInfo.color} text-white`}>
                      {methodInfo.label}
                    </Badge>
                  </td>
                  <td className="p-3">
                    {formatDate(payment.paymentdate || payment.created_at)}
                  </td>
                  <td className="p-3">
                    <div className="flex justify-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(payment)}
                        className="gap-1"
                      >
                        <Edit size={14} />
                        تعديل
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onDelete(payment)}
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
