import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function UserEditDialog({ open, onClose, user, onSubmit }) {
  const [form, setForm] = useState({ fullname: "", email: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({ fullname: user.fullname || "", email: user.email || "" });
    }
  }, [user]);

  const handleSubmit = async () => {
    if (!form.fullname || !form.email) return alert("تأكد من تعبئة البيانات");
    try {
      setLoading(true);
      await onSubmit(form);
      onClose();
    } finally { setLoading(false); }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent dir="rtl">
        <DialogHeader><DialogTitle>تعديل بيانات المستخدم</DialogTitle></DialogHeader>
        <div className="space-y-4 py-4">
          <div><Label>الاسم الكامل</Label>
          <Input value={form.fullname} onChange={(e) => setForm({...form, fullname: e.target.value})} /></div>
          <div><Label>البريد الإلكتروني</Label>
          <Input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} /></div>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>إلغاء</Button>
          <Button onClick={handleSubmit} disabled={loading}>{loading ? "جارٍ الحفظ..." : "حفظ التعديلات"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}