import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

/* ========================================= */

const TABLES = [
  "users",
  "products",
  "categories",
  "customers",
  "invoices",
  "payments",
  "returns",
];

/* ========================================= */

export default function PermissionFormDialog({
  open,
  onClose,
  onSubmit,
  initial,
}) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    targettable: "",
    canadd: false,
    canedit: false,
    candelete: false,
    canprint: false,
  });

  /* ================= load initial ================= */

  useEffect(() => {
    if (initial) {
      setForm({
        targettable: initial.targettable,
        canadd: initial.canadd,
        canedit: initial.canedit,
        candelete: initial.candelete,
        canprint: initial.canprint,
      });
    } else {
      setForm({
        targettable: "",
        canadd: false,
        canedit: false,
        candelete: false,
        canprint: false,
      });
    }
  }, [initial, open]);

  /* ================= handlers ================= */

  const handleCheck = (key, value) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!form.targettable) {
      alert("يرجى اختيار الجدول");
      return;
    }

    try {
      setLoading(true);
      await onSubmit(form);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent dir="rtl" className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{initial ? "تعديل صلاحية" : "إضافة صلاحية"}</DialogTitle>
        </DialogHeader>

        {/* ================= form ================= */}

        <div className="space-y-5">
          {/* table select */}
          <div className="space-y-2">
            <Label>الجدول</Label>

            <Select
              value={form.targettable}
              onValueChange={(v) => handleCheck("targettable", v)}
              disabled={!!initial}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر الجدول" />
              </SelectTrigger>

              <SelectContent>
                {TABLES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* permissions grid */}
          <div className="grid grid-cols-2 gap-4">
            <Check
              label="إضافة"
              value={form.canadd}
              onChange={(v) => handleCheck("canadd", v)}
            />

            <Check
              label="تعديل"
              value={form.canedit}
              onChange={(v) => handleCheck("canedit", v)}
            />

            <Check
              label="حذف"
              value={form.candelete}
              onChange={(v) => handleCheck("candelete", v)}
            />

            <Check
              label="عرض"
              value={form.canprint}
              onChange={(v) => handleCheck("canprint", v)}
            />
          </div>
        </div>

        {/* ================= footer ================= */}

        <DialogFooter className="mt-6 flex gap-2">
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>

          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "جارٍ الحفظ..." : "حفظ"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ========================================= */
/* reusable checkbox row */
/* ========================================= */

function Check({ label, value, onChange }) {
  return (
    <div className="flex items-center gap-3 border rounded-lg p-3">
      <Checkbox checked={value} onCheckedChange={onChange} />
      <span>{label}</span>
    </div>
  );
}
