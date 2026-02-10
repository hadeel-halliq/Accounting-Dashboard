import { useState } from "react";

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

export default function UserCreateDialog({
  open,
  onClose,
  onSubmit,
}) {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!form.fullname || !form.email || !form.password) {
      alert("يرجى تعبئة جميع الحقول");
      return;
    }

    try {
      setLoading(true);
      await onSubmit(form);

      setForm({
        fullname: "",
        email: "",
        password: "",
      });

      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent dir="rtl" className="sm:max-w-md">

        <DialogHeader>
          <DialogTitle>إضافة مستخدم (Admin)</DialogTitle>
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

          <div>
            <Label>كلمة المرور</Label>
            <Input
              type="password"
              value={form.password}
              onChange={(e) =>
                handleChange("password", e.target.value)
              }
            />
          </div>

        </div>

        <DialogFooter className="mt-6 flex justify-end gap-2">

          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>

          <Button disabled={loading} onClick={handleSubmit}>
            {loading ? "جارٍ الإنشاء..." : "إنشاء"}
          </Button>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
