import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/* ================================= */

export default function ProductFormDialog({

  open,
  onClose,
  onSubmit,
  initial,
  categoryId,
  categories, // list of categories لو ما في categoryId
}) {
  const [loading, setLoading] = useState(false);
 ;

  const [form, setForm] = useState({
    productname: "",
    barcode: "",
    costprice: "",
    sellprice: "",
    stockquantity: "",
    containerno: "",
    minunit: "PIECE",
    isactive: true,
    categoryid: categoryId || "",
  });

  useEffect(() => {
    if (initial) {
      setForm(initial);
    } else {
      setForm({ name: "", price: "", quantity: "" });
    }
  }, [initial, open]);

  const handleChange = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const handleSave = async () => {
    try {
      setLoading(true);

      const formatted = {
        ...form,
        costprice: Number(form.costprice),
        sellprice: Number(form.sellprice),
        stockquantity: Number(form.stockquantity),
      };

      await onSubmit(formatted);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent dir="rtl">
        <DialogHeader>
          <DialogTitle>{initial ? "تعديل منتج" : "إضافة منتج"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {!categoryId && (
            <div>
              <Label>الصنف</Label>
              <select
                className="w-full border rounded-md p-2"
                value={form.categoryid}
                onChange={(e) => handleChange("categoryid", e.target.value)}
              >
                <option value="">اختر الصنف</option>
                {categories?.map((c) => (
                  <option key={c.categoryid} value={c.categoryid}>
                    {c.categoryname}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <Label>اسم المنتج</Label>
            <Input
              value={form.productname}
              onChange={(e) => handleChange("productname", e.target.value)}
            />
          </div>

          <div>
            <Label>الباركود</Label>
            <Input
              value={form.barcode}
              onChange={(e) => handleChange("barcode", e.target.value)}
            />
          </div>

          <div>
            <Label>سعر التكلفة</Label>
            <Input
              type="number"
              value={form.costprice}
              onChange={(e) => handleChange("costprice", e.target.value)}
            />
          </div>

          <div>
            <Label>سعر البيع</Label>
            <Input
              type="number"
              value={form.sellprice}
              onChange={(e) => handleChange("sellprice", e.target.value)}
            />
          </div>

          <div>
            <Label>الكمية</Label>
            <Input
              type="number"
              value={form.stockquantity}
              onChange={(e) => handleChange("stockquantity", e.target.value)}
            />
          </div>

          <div>
            <Label>رقم الحاوية</Label>
            <Input
              value={form.containerno}
              onChange={(e) => handleChange("containerno", e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>

          <Button onClick={handleSave} disabled={loading}>
            {loading ? "جارٍ الحفظ..." : "حفظ"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
