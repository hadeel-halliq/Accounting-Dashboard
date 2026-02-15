import { useState } from "react";
import toast from "react-hot-toast";
import { Plus, Trash2 } from "lucide-react";
import ReturnsService from "@/services/returns.service";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const defaultItem = {
  productid: "",
  quantity: 1,
  price: 0,
};

export default function ReturnForm({ isOpen, onClose, onSuccess }) {
  const [originalinvoiceid, setOriginalinvoiceid] = useState("");
  const [reason, setReason] = useState("");
  const [items, setItems] = useState([{ ...defaultItem }]);
  const [submitting, setSubmitting] = useState(false);

  const addItem = () => {
    setItems((prev) => [...prev, { ...defaultItem }]);
  };

  const removeItem = (index) => {
    if (items.length <= 1) return;
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateItem = (index, field, value) => {
    setItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      if (field === "quantity" || field === "price") {
        const qty = Number(next[index].quantity) || 0;
        const price = Number(next[index].price) || 0;
        next[index].total = qty * price;
      }
      return next;
    });
  };

  const getItemTotal = (item) => {
    const qty = Number(item.quantity) || 0;
    const price = Number(item.price) || 0;
    return qty * price;
  };

  const getGrandTotal = () => {
    return items.reduce((sum, item) => sum + getItemTotal(item), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!originalinvoiceid || Number(originalinvoiceid) <= 0) {
      toast.error("رقم فاتورة المصدر مطلوب");
      return;
    }
    if (!reason?.trim()) {
      toast.error("السبب مطلوب");
      return;
    }

    const validItems = items
      .map((item) => ({
        productid: Number(item.productid) || 0,
        quantity: Number(item.quantity) || 0,
        price: Number(item.price) || 0,
      }))
      .filter((item) => item.productid > 0 && item.quantity > 0);

    if (validItems.length === 0) {
      toast.error("يجب إضافة صنف واحد على الأقل (منتج وكمية)");
      return;
    }

    try {
      setSubmitting(true);
      await ReturnsService.create({
        originalinvoiceid: Number(originalinvoiceid),
        status: "PENDING",
        reason: reason.trim(),
        items: validItems,
      });
      toast.success("تم إنشاء طلب المرتجع بنجاح");
      onSuccess();
      onClose();
      setOriginalinvoiceid("");
      setReason("");
      setItems([{ ...defaultItem }]);
    } catch (error) {
      console.error("Failed to create return:", error);
      toast.error(error?.response?.data?.message || "فشل في إنشاء المرتجع");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setOriginalinvoiceid("");
    setReason("");
    setItems([{ ...defaultItem }]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent dir="rtl" className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-right">
            إضافة طلب مرتجع جديد
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="originalinvoiceid">
                فاتورة المصدر <span className="text-red-500">*</span>
              </Label>
              <Input
                id="originalinvoiceid"
                type="number"
                placeholder="رقم الفاتورة الأصلية"
                value={originalinvoiceid}
                onChange={(e) => setOriginalinvoiceid(e.target.value)}
                required
                min="1"
              />
            </div>
            <div className="space-y-2 md:col-span-2 md:col-start-1">
              <Label htmlFor="reason">
                السبب <span className="text-red-500">*</span>
              </Label>
              <Input
                id="reason"
                type="text"
                placeholder="سبب المرتجع"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Items List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>الأصناف المرتجعة</Label>
              <Button type="button" variant="outline" size="sm" onClick={addItem} className="gap-1">
                <Plus size={14} />
                إضافة صنف
              </Button>
            </div>
            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full text-sm" dir="rtl">
                <thead className="bg-muted/40">
                  <tr>
                    <th className="text-right p-2">#</th>
                    <th className="text-right p-2">معرف المنتج</th>
                    <th className="text-right p-2">الكمية</th>
                    <th className="text-right p-2">السعر</th>
                    <th className="text-right p-2">الإجمالي</th>
                    <th className="w-10 p-2" />
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index} className="border-t border-border">
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">
                        <Input
                          type="number"
                          min="1"
                          placeholder="ID"
                          className="h-8 w-24"
                          value={item.productid}
                          onChange={(e) =>
                            updateItem(index, "productid", e.target.value)
                          }
                        />
                      </td>
                      <td className="p-2">
                        <Input
                          type="number"
                          min="0"
                          step="1"
                          className="h-8 w-20"
                          value={item.quantity}
                          onChange={(e) =>
                            updateItem(index, "quantity", e.target.value)
                          }
                        />
                      </td>
                      <td className="p-2">
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          className="h-8 w-24"
                          value={item.price}
                          onChange={(e) =>
                            updateItem(index, "price", e.target.value)
                          }
                        />
                      </td>
                      <td className="p-2 font-medium">
                        {getItemTotal(item).toFixed(2)}
                      </td>
                      <td className="p-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(index)}
                          disabled={items.length <= 1}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground">
              الإجمالي: <strong>${getGrandTotal().toFixed(2)}</strong>
            </p>
          </div>

          <div className="flex gap-2 justify-end pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={submitting}
            >
              إلغاء
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "جاري الحفظ..." : "إنشاء المرتجع"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
