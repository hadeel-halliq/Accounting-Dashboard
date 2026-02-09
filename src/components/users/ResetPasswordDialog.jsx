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

export default function ResetPasswordDialog({
  open,
  onClose,
  onSubmit,
}) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!password) {
      alert("يرجى إدخال كلمة مرور جديدة");
      return;
    }

    try {
      setLoading(true);
      await onSubmit(password);
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent dir="rtl" className="sm:max-w-sm">

        <DialogHeader>
          <DialogTitle>
            إعادة تعيين كلمة المرور
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">

          <Label>كلمة المرور الجديدة</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />

        </div>

        <DialogFooter className="mt-6 flex justify-end gap-2">

          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>

          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "جارٍ التحديث..." : "تحديث"}
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}
