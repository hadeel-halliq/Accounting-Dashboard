import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

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
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    categoryname: "",
    origincountry: "",
  });

  useEffect(() => {
    if (initial) {
      setForm(initial);
    } else {
      setForm({
        categoryname: "",
        origincountry: "",
      });
    }
  }, [initial, open]);

  const handleSubmit = async () => {
    if (!form.categoryname) {
      alert("يرجى إدخال الاسم");
      return;
    }

    try {
      setLoading(true);

      await onSubmit({
        categoryname: form.categoryname,
        origincountry: form.origincountry,
        branchid: user.branchid, // ✅ ديناميكي
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent dir="rtl">

        <DialogHeader>
          <DialogTitle>
            {initial ? "تعديل" : "إضافة صنف"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <div>
            <Label>الاسم</Label>
            <Input
              value={form.categoryname}
              onChange={(e) =>
                setForm((p) => ({ ...p, categoryname: e.target.value }))
              }
            />
          </div>

          <div>
            <Label>الدولة</Label>
            <Input
              value={form.origincountry}
              onChange={(e) =>
                setForm((p) => ({ ...p, origincountry: e.target.value }))
              }
            />
          </div>

        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>

          <Button onClick={handleSubmit} disabled={loading}>
            حفظ
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}
