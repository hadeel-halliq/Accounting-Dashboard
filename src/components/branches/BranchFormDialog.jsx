import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/* =========================
   ZOD بالعربي
========================= */

const schema = z.object({
  branchname: z.string().min(2, "اسم الفرع مطلوب"),
  address: z.string().min(3, "العنوان مطلوب"),
  phone: z.string().min(4, "رقم الهاتف مطلوب"),
});

export default function BranchFormDialog({
  open,
  onClose,
  onSubmit,
  initial,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initial || {},
  });

  /* =========================
     Reset عند فتح الديالوغ
  ========================= */
  useEffect(() => {
    reset(initial || {});
  }, [initial, open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent dir="rtl" className="sm:max-w-md">

        <DialogHeader>
          <DialogTitle className="text-right text-lg font-bold">
            {initial ? "تعديل الفرع" : "إضافة فرع جديد"}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 text-right"
        >

          {/* اسم الفرع */}
          <div>
            <label className="text-sm mb-1 block">اسم الفرع</label>
            <Input {...register("branchname")} />
            {errors.branchname && (
              <p className="text-sm text-destructive mt-1">
                {errors.branchname.message}
              </p>
            )}
          </div>

          {/* العنوان */}
          <div>
            <label className="text-sm mb-1 block">العنوان</label>
            <Input {...register("address")} />
            {errors.address && (
              <p className="text-sm text-destructive mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* الهاتف */}
          <div>
            <label className="text-sm mb-1 block">رقم الهاتف</label>
            <Input {...register("phone")} />
            {errors.phone && (
              <p className="text-sm text-destructive mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting
              ? "جارٍ الحفظ..."
              : initial
              ? "حفظ التعديلات"
              : "إضافة الفرع"}
          </Button>

        </form>
      </DialogContent>
    </Dialog>
  );
}
