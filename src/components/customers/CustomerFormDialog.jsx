import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CustomerFormDialog({
  open,
  onClose,
  onSubmit,
  initial = null,
}) {
  const isEdit = Boolean(initial);

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    address: "",
    companyname: "",
    type: "CUSTOMER",
    isactive: true,
  });

  /* ================= تحميل بيانات التعديل ================= */

  useEffect(() => {
    if (initial) {
      setForm({
        firstname: initial.firstname || "",
        lastname: initial.lastname || "",
        phone: initial.phone || "",
        address: initial.address || "",
        companyname: initial.companyname || "",
        type: initial.type || "CUSTOMER",
        isactive: initial.isactive ?? true,
      });
    } else {
      setForm({
        firstname: "",
        lastname: "",
        phone: "",
        address: "",
        companyname: "",
        type: "CUSTOMER",
        isactive: true,
      });
    }
  }, [initial, open]);

  /* ================= handle change ================= */

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* ================= submit ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onSubmit({
      firstname: form.firstname,
      lastname: form.lastname,
      phone: form.phone,
      address: form.address || null,
      companyname: form.companyname || null,
      type: form.type,
      isactive: form.isactive,
    });
  };

  /* ================= UI ================= */

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent dir="rtl" className="sm:max-w-xl w-full">
        <DialogHeader>
          <DialogTitle className="text-right font-bold">
            {isEdit ? "تعديل العميل" : "إضافة عميل جديد"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* الاسم الأول */}
            <div>
              <Label>الاسم الأول</Label>
              <Input
                value={form.firstname}
                onChange={(e) =>
                  handleChange("firstname", e.target.value)
                }
                required
              />
            </div>

            {/* اسم العائلة */}
            <div>
              <Label>اسم العائلة</Label>
              <Input
                value={form.lastname}
                onChange={(e) =>
                  handleChange("lastname", e.target.value)
                }
                required
              />
            </div>

            {/* الهاتف */}
            <div>
              <Label>رقم الهاتف</Label>
              <Input
                value={form.phone}
                onChange={(e) =>
                  handleChange("phone", e.target.value)
                }
                required
              />
            </div>

            {/* الشركة */}
            <div>
              <Label>اسم الشركة</Label>
              <Input
                value={form.companyname}
                onChange={(e) =>
                  handleChange("companyname", e.target.value)
                }
              />
            </div>

            {/* العنوان */}
            <div className="md:col-span-2">
              <Label>العنوان</Label>
              <Input
                value={form.address}
                onChange={(e) =>
                  handleChange("address", e.target.value)
                }
              />
            </div>

            {/* ✅ النوع (تم التعديل هنا فقط) */}
            <div>
              <Label>النوع</Label>
              <select
                className="w-full border rounded-md p-2"
                value={form.type}
                onChange={(e) =>
                  handleChange("type", e.target.value)
                }
              >
                <option value="CUSTOMER">عميل</option>
                <option value="SUPPLIER">مورد</option>
                <option value="IMPORTER">مستورد</option> {/* ✅ الجديد */}
              </select>
            </div>

            {/* نشط */}
            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                checked={form.isactive}
                onChange={(e) =>
                  handleChange("isactive", e.target.checked)
                }
              />
              <Label>نشط</Label>
            </div>

          </div>

          {/* buttons */}
          <div className="flex flex-col md:flex-row gap-3 justify-end pt-4">

            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="w-full md:w-auto"
            >
              إلغاء
            </Button>

            <Button type="submit" className="w-full md:w-auto">
              {isEdit ? "حفظ التعديلات" : "إضافة"}
            </Button>

          </div>

        </form>
      </DialogContent>
    </Dialog>
  );
}
