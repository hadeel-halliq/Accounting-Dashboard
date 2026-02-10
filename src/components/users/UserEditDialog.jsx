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

export default function UserEditDialog({
  open,
  onClose,
  user,
  onSubmit,
}) {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  /* ================= Fill data when open ================= */

  useEffect(() => {
    if (user) {
      setForm({
        fullname: user.fullname || "",
        email: user.email || "",
      });
    }
  }, [user]);

  /* ================= Handlers ================= */

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!form.fullname || !form.email) {
      alert("يرجى تعبئة جميع الحقول");
      return;
    }

    try {
      setLoading(true);
      await onSubmit(form);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent dir="rtl" className="sm:max-w-md">

        <DialogHeader>
          <DialogTitle>تعديل المستخدم</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <div>
            <Label>الاسم الكامل</Label>
            <Input
              value={form.fullname}
              onChange={(e) =>
                handleChange("fullname", e.target.value)
              }
            />
          </div>

          <div>
            <Label>البريد الإلكتروني</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) =>
                handleChange("email", e.target.value)
              }
            />
          </div>

        </div>

        <DialogFooter className="mt-6 flex justify-end gap-2">

          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>

          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "جارٍ الحفظ..." : "حفظ التعديلات"}
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}
