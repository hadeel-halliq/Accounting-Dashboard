import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import PaymentsService from "@/services/payments.service";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Payment method options
const PAYMENT_METHODS = [
  { value: "CASH", label: "نقدي" },
  { value: "CREDIT_CARD", label: "بطاقة ائتمان" },
  { value: "BANK_TRANSFER", label: "تحويل بنكي" },
  { value: "SHAM_CASH", label: "Sham Cash" },
  { value: "SYRIATEL_CASH", label: "Syriatel Cash" },
  { value: "AL_HARAM", label: "Al Haram" },
];

export default function PaymentForm({
  isOpen,
  onClose,
  initialData = null,
  onSuccess,
}) {
  const [formData, setFormData] = useState({
    invoiceid: "",
    amount: "",
    paymentmethod: "CASH",
  });
  const [submitting, setSubmitting] = useState(false);

  const isEditMode = Boolean(initialData);

  // Populate form when initialData changes (Edit mode)
  useEffect(() => {
    if (initialData) {
      setFormData({
        invoiceid: initialData.invoiceid || "",
        amount: initialData.amount || "",
        paymentmethod: initialData.paymentmethod || "CASH",
      });
    } else {
      // Reset form for Create mode
      setFormData({
        invoiceid: "",
        amount: "",
        paymentmethod: "CASH",
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!isEditMode && !formData.invoiceid) {
      toast.error("رقم الفاتورة مطلوب");
      return;
    }
    if (!formData.amount || Number(formData.amount) <= 0) {
      toast.error("المبلغ يجب أن يكون أكبر من صفر");
      return;
    }

    try {
      setSubmitting(true);
      if (isEditMode) {
        // Update: only send amount and paymentmethod
        await PaymentsService.update(initialData.paymentid, {
          amount: Number(formData.amount),
          paymentmethod: formData.paymentmethod,
        });
        toast.success("تم تحديث الدفعة بنجاح");
      } else {
        // Create: send invoiceid, amount, paymentmethod
        await PaymentsService.create({
          invoiceid: Number(formData.invoiceid),
          amount: Number(formData.amount),
          paymentmethod: formData.paymentmethod,
        });
        toast.success("تم إضافة الدفعة بنجاح");
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to save payment:", error);
      toast.error(error?.response?.data?.message || "فشل في حفظ الدفعة");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent dir="rtl" className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-right">
            {isEditMode ? "تعديل دفعة" : "إضافة دفعة جديدة"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Invoice ID - Only in Create Mode */}
          {!isEditMode && (
            <div className="space-y-2">
              <Label htmlFor="invoiceid">
                رقم الفاتورة <span className="text-red-500">*</span>
              </Label>
              <Input
                id="invoiceid"
                type="number"
                placeholder="أدخل رقم الفاتورة"
                value={formData.invoiceid}
                onChange={(e) =>
                  setFormData({ ...formData, invoiceid: e.target.value })
                }
                required
                min="1"
              />
            </div>
          )}

          {/* Invoice ID - Read-only in Edit Mode */}
          {isEditMode && (
            <div className="space-y-2">
              <Label>رقم الفاتورة</Label>
              <Input value={formData.invoiceid} disabled className="bg-muted" />
            </div>
          )}

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">
              المبلغ <span className="text-red-500">*</span>
            </Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="أدخل المبلغ"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              required
              min="0.01"
            />
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <Label htmlFor="paymentmethod">
              طريقة الدفع <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.paymentmethod}
              onValueChange={(value) =>
                setFormData({ ...formData, paymentmethod: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAYMENT_METHODS.map((method) => (
                  <SelectItem key={method.value} value={method.value}>
                    {method.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex gap-2 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={submitting}
            >
              إلغاء
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting
                ? "جاري الحفظ..."
                : isEditMode
                  ? "حفظ التعديلات"
                  : "إضافة"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
