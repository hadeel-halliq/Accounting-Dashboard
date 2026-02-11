import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function CategoryFormDialog({
  open,
  onClose,
  onSubmit,
  initial,
}) {
  const [form, setForm] = useState({
    categoryname: "",
    origincountry: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initial) setForm(initial);
    else setForm({ categoryname: "", origincountry: "" });
  }, [initial, open]);

  const handleSave = async () => {
    try {
      setLoading(true);
      await onSubmit(form);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent dir="rtl">

        <DialogHeader>
          <DialogTitle>
            {initial ? "تعديل تصنيف" : "إضافة تصنيف"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <div>
            <Label>اسم التصنيف</Label>
            <Input
              value={form.categoryname}
              onChange={(e) =>
                setForm({ ...form, categoryname: e.target.value })
              }
            />
          </div>

          <div>
            <Label>بلد المنشأ</Label>
            <Input
              value={form.origincountry}
              onChange={(e) =>
                setForm({ ...form, origincountry: e.target.value })
              }
            />
          </div>

        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>

          <Button onClick={handleSave} disabled={loading}>
            حفظ
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}
