import { useState, useEffect } from "react";

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

import BranchesService from "@/services/branches.service";
import { useAuth } from "@/hooks/useAuth";

/*
==================================================
✅ LOGIC
--------------------------------------------------
ADMIN → ينشئ USER فقط
SUPER ADMIN → ينشئ ADMIN + يختار الفرع
==================================================
*/

export default function UserCreateDialog({
  open,
  onClose,
  onSubmit,
}) {

  const { user, loading: authLoading } = useAuth();

  const [branches, setBranches] = useState([]);

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "USER",
    branchid: "",
  });

  const [loading, setLoading] = useState(false);

  /* ================= LOAD BRANCHES ================= */

  useEffect(() => {

    if (authLoading) return;

    if (user?.role === "SUPER-ADMIN") {
      BranchesService.list({ page: 1, limit: 100 })
        .then((res) => {
          console.log("BRANCHES:", res);
          setBranches(res.branches || []);
        })
        .catch(() => setBranches([]));
    }

  }, [user, authLoading]);

  /* ================= HANDLERS ================= */

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

      await onSubmit({
        fullname: form.fullname,
        email: form.email,
        password: form.password,
        role: user?.role === "SUPER-ADMIN" ? form.role : "USER",
        branchid: form.branchid || undefined,
      });

      setForm({
        fullname: "",
        email: "",
        password: "",
        role: "USER",
        branchid: "",
      });

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
          <DialogTitle>إضافة مستخدم</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <div>
            <Label>الاسم الكامل</Label>
            <Input
              value={form.fullname}
              onChange={(e) => handleChange("fullname", e.target.value)}
            />
          </div>

          <div>
            <Label>البريد الإلكتروني</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div>
            <Label>كلمة المرور</Label>
            <Input
              type="password"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </div>

          {/* ✅ SUPER ADMIN ONLY */}
          {!authLoading && user?.role === "SUPER-ADMIN" && (
            <>
              <div>
                <Label>نوع المستخدم</Label>
                <select
                  className="w-full border rounded-md p-2"
                  value={form.role}
                  onChange={(e) => handleChange("role", e.target.value)}
                >
                  <option value="USER">موظف</option>
                  <option value="ADMIN">أدمن</option>
                </select>
              </div>

              {form.role === "ADMIN" && (
                <div>
                  <Label>الفرع</Label>
                  <select
                    className="w-full border rounded-md p-2"
                    value={form.branchid}
                    onChange={(e) =>
                      handleChange("branchid", e.target.value)
                    }
                  >
                    <option value="">اختر الفرع</option>

                    {branches.map((b) => (
                      <option key={b.branchid} value={b.branchid}>
                        {b.branchname}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </>
          )}

        </div>

        <DialogFooter className="mt-6">
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
