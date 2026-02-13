import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* ========== Power user: select on focus for numeric inputs ========== */
export const selectOnFocus = (e) => e.target.select();

/* ========== Display helpers (ID → Name) ========== */

export function getCustomerLabel(c) {
  if (!c) return "";
  const first = c.firstname?.trim();
  const last = c.lastname?.trim();
  if (first || last) return [first, last].filter(Boolean).join(" ").trim();
  return c.companyname ?? c.customername ?? c.name ?? String(c.customerid ?? "");
}

export function getProductLabel(p) {
  if (!p) return "";
  return p.productname ?? p.name ?? String(p.productid ?? "");
}

export function getProductPrice(p) {
  if (p == null) return 0;
  const n = p.sellprice ?? p.price;
  return typeof n === "number" && !Number.isNaN(n) ? n : 0;
}

/* ========== Units ========== */

export const UNIT_OPTIONS = [
  { value: "PIECE", label: "قطعة" },
  { value: "DOZEN", label: "دزينة" },
  { value: "BOX", label: "صندوق" },
];

/* ========== Header options (strict schema) ========== */

export const PAYMENT_METHOD_OPTIONS = [
  { value: "CASH", label: "Cash" },
  { value: "SHAM_CASH", label: "Sham Cash" },
  { value: "SYRIATEL_CASH", label: "Syriatel Cash" },
  { value: "AL_HARAM", label: "Al Haram" },
  { value: "TRANSFER", label: "Transfer" },
];

export const PAYMENT_TYPE_OPTIONS = [
  { value: "CASH", label: "مباشر (Mubashar)" },
  { value: "DEFERRED", label: "آجل (Ajel/Debt)" },
];

export const CURRENCY_OPTIONS = [
  { value: "USD", label: "USD" },
  { value: "SYP", label: "SYP" },
];

export const INVOICE_STATUS_OPTIONS = [
  { value: "DRAFT", label: "مسودة" },
  { value: "SHIPPED", label: "تم الشحن" },
  { value: "PROCESSING", label: "قيد المعالجة" },
  { value: "CONFIRMED", label: "مؤكد" },
];

/* ========== Validation (conditional Dozens in Box when Unit === BOX) ========== */

const itemSchema = z
  .object({
    productid: z.union([z.number(), z.string()]).refine((v) => v !== "" && v != null, "اختر المنتج"),
    selectedunit: z.enum(["PIECE", "DOZEN", "BOX"]),
    quantity: z.number().min(0.001, "الكمية يجب أن تكون أكبر من صفر"),
    dozensinbox: z.union([z.number(), z.nan()]).optional(),
    unitprice: z.number().min(0, "السعر مطلوب"),
    itemdiscount: z.union([z.number(), z.nan()]).optional(),
  })
  .refine(
    (data) => {
      if (data.selectedunit !== "BOX") return true;
      const n = Number(data.dozensinbox);
      return Number.isFinite(n) && n > 0;
    },
    { message: "عدد الدستات مطلوب وأكبر من صفر عند اختيار الوحدة صندوق", path: ["dozensinbox"] }
  );

const schema = z
  .object({
    customerid: z.union([z.number(), z.string()]).refine((v) => v !== "" && v != null, "اختر العميل"),
    paymentmethod: z.enum(["CASH", "SHAM_CASH", "SYRIATEL_CASH", "AL_HARAM", "TRANSFER"]),
    paymenttype: z.enum(["CASH", "DEFERRED"]),
    currency: z.string().default("USD"),
    status: z.string().default("DRAFT"),
    date: z.string().min(1, "التاريخ مطلوب"),
    discount: z.union([z.number(), z.nan()]).transform((v) => (Number.isNaN(v) ? 0 : Math.max(0, Number(v)))),
    items: z.array(itemSchema).min(1, "أضف صنف واحد على الأقل"),
  })
  .refine(
    (data) => {
      const rowTotals = data.items.map((row) => {
        const before = (Number(row.quantity) || 0) * (Number(row.unitprice) || 0);
        const itemDisc = Number(row.itemdiscount) || 0;
        return before - itemDisc;
      });
      const sum = rowTotals.reduce((a, b) => a + b, 0);
      const afterDiscount = sum - (Number(data.discount) || 0);
      return afterDiscount > 0;
    },
    { message: "الإجمالي يجب أن يكون أكبر من صفر", path: ["items"] }
  );

const defaultItem = {
  productid: "",
  selectedunit: "PIECE",
  quantity: 1,
  dozensinbox: undefined,
  unitprice: 0,
  itemdiscount: 0,
};

/* ========== Options for API ========== */

export function mapCustomersToOptions(customers) {
  const list = Array.isArray(customers) ? customers : [];
  return list
    .map((c) => ({
      label: getCustomerLabel(c),
      value: String(c.customerid ?? c.id ?? ""),
    }))
    .filter((o) => o.value !== "");
}

export function mapProductsToOptions(products) {
  const list = Array.isArray(products) ? products : [];
  return list
    .map((p) => ({
      label: getProductLabel(p),
      value: String(p.productid ?? p.id ?? ""),
      sellprice: getProductPrice(p),
    }))
    .filter((o) => o.value !== "");
}

/* ========== InvoiceForm ========== */

export default function InvoiceForm({
  customerOptions = [],
  productOptions = [],
  defaultValues,
  onSubmit,
  onCancel,
  submitLabel = "إنشاء الفاتورة",
}) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues:
      defaultValues ?? {
        customerid: "",
        paymentmethod: "CASH",
        paymenttype: "CASH",
        currency: "USD",
        status: "DRAFT",
        date: new Date().toISOString().slice(0, 10),
        discount: 0,
        items: [{ ...defaultItem }],
      },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const items = watch("items") ?? [];
  const discount = Number(watch("discount")) || 0;

  const rowNetTotals = items.map((row) => {
    const before = (Number(row.quantity) || 0) * (Number(row.unitprice) || 0);
    const itemDisc = Number(row.itemdiscount) || 0;
    return before - itemDisc;
  });
  const subtotal = rowNetTotals.reduce((a, b) => a + b, 0);
  const netTotal = Math.max(0, subtotal - discount);

  const handleProductChange = (index, productId) => {
    setValue(`items.${index}.productid`, productId);
    const opt = productOptions.find((o) => o.value === String(productId));
    if (opt != null && typeof opt.sellprice === "number") {
      setValue(`items.${index}.unitprice`, opt.sellprice);
    }
  };

  const onFormSubmit = (values) => {
    const payload = {
      customerid: Number(values.customerid),
      paymentmethod: values.paymentmethod,
      paymenttype: values.paymenttype,
      currency: values.currency ?? "USD",
      status: values.status ?? "DRAFT",
      date: values.date,
      discount: Number(values.discount) || 0,
      items: values.items.map((row) => ({
        productid: Number(row.productid),
        selectedunit: row.selectedunit,
        quantity: Number(row.quantity),
        dozensinbox: row.selectedunit === "BOX" ? Number(row.dozensinbox) || undefined : undefined,
        unitprice: Number(row.unitprice),
        itemdiscount: Number(row.itemdiscount) || 0,
      })),
    };
    return Promise.resolve(onSubmit(payload));
  };

  const numInputProps = (name, opts = {}) => ({
    ...register(name, opts),
    onFocus: selectOnFocus,
    className: "text-left border border-input rounded-md px-3 py-2 h-9 min-w-0 " + (opts.className ?? ""),
  });

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 text-right">
      {/* ========== Header: Customer, Payment, Currency, Status, Date ========== */}
      <section className="rounded-lg border border-border bg-muted/20 p-4 space-y-4">
        <h3 className="text-sm font-semibold text-foreground border-b border-border pb-2">
          بيانات الفاتورة
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>العميل</Label>
            <Select
              value={String(watch("customerid") ?? "")}
              onValueChange={(v) => setValue("customerid", v)}
            >
              <SelectTrigger className="w-full border border-input rounded-md px-3 py-2 h-9">
                <SelectValue placeholder="اختر العميل" />
              </SelectTrigger>
              <SelectContent>
                {customerOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.customerid && (
              <p className="text-sm text-destructive">{errors.customerid.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>طريقة الدفع</Label>
            <Select
              value={watch("paymentmethod") ?? "CASH"}
              onValueChange={(v) => setValue("paymentmethod", v)}
            >
              <SelectTrigger className="w-full border border-input rounded-md px-3 py-2 h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAYMENT_METHOD_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>نوع الدفع</Label>
            <Select
              value={watch("paymenttype") ?? "CASH"}
              onValueChange={(v) => setValue("paymenttype", v)}
            >
              <SelectTrigger className="w-full border border-input rounded-md px-3 py-2 h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAYMENT_TYPE_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>العملة</Label>
            <Select
              value={watch("currency") ?? "USD"}
              onValueChange={(v) => setValue("currency", v)}
            >
              <SelectTrigger className="w-full border border-input rounded-md px-3 py-2 h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CURRENCY_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>الحالة / الملاحظات</Label>
            <Select
              value={watch("status") ?? "DRAFT"}
              onValueChange={(v) => setValue("status", v)}
            >
              <SelectTrigger className="w-full border border-input rounded-md px-3 py-2 h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {INVOICE_STATUS_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>التاريخ</Label>
            <Input
              type="date"
              className="border border-input rounded-md px-3 py-2 h-9"
              {...register("date")}
            />
            {errors.date && (
              <p className="text-sm text-destructive">{errors.date.message}</p>
            )}
          </div>
        </div>
      </section>

      {/* ========== Items grid: Product | Unit | Qty | Dozens in Box (if BOX) | Price | Discount | Totals | Action ========== */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-foreground">أصناف الفاتورة</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ ...defaultItem })}
          >
            إضافة صنف
          </Button>
        </div>

        <div className="border border-border rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 border-b border-border">
              <tr>
                <th className="text-right p-3">المنتج</th>
                <th className="text-right p-3 w-24">الوحدة</th>
                <th className="text-right p-3 w-20">الكمية</th>
                <th className="text-right p-3 w-24">عدد الدستات</th>
                <th className="text-right p-3 w-24">السعر</th>
                <th className="text-right p-3 w-20">خصم الصنف</th>
                <th className="text-right p-3 w-24">قبل الخصم</th>
                <th className="text-right p-3 w-24">صافي السطر</th>
                <th className="w-14 p-3" />
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => {
                const row = items[index] ?? field;
                const isBox = (row.selectedunit ?? "PIECE") === "BOX";
                const q = Number(row.quantity) || 0;
                const p = Number(row.unitprice) || 0;
                const beforeDiscount = q * p;
                const itemDisc = Number(row.itemdiscount) || 0;
                const lineNet = beforeDiscount - itemDisc;
                return (
                  <tr key={field.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                    <td className="p-2">
                      <Select
                        value={String(row.productid ?? "")}
                        onValueChange={(v) => handleProductChange(index, v)}
                      >
                        <SelectTrigger className="w-full min-w-[160px] border border-input rounded-md px-2 py-1.5 h-9">
                          <SelectValue placeholder="اختر المنتج" />
                        </SelectTrigger>
                        <SelectContent>
                          {productOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-2">
                      <Select
                        value={row.selectedunit ?? "PIECE"}
                        onValueChange={(v) => {
                          setValue(`items.${index}.selectedunit`, v);
                          if (v !== "BOX") setValue(`items.${index}.dozensinbox`, undefined);
                        }}
                      >
                        <SelectTrigger className="w-full border border-input rounded-md px-2 py-1.5 h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {UNIT_OPTIONS.map((o) => (
                            <SelectItem key={o.value} value={o.value}>
                              {o.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-2">
                      <Input
                        type="number"
                        min={1}
                        step={1}
                        tabIndex={0}
                        {...numInputProps(`items.${index}.quantity`, {
                          setValueAs: (v) => (v === "" || v == null ? 0 : Number(v)),
                        })}
                      />
                    </td>
                    <td className="p-2">
                      {isBox ? (
                        <Input
                          type="number"
                          min={1}
                          step={1}
                          tabIndex={0}
                          placeholder="عدد الدستات"
                          {...numInputProps(`items.${index}.dozensinbox`, {
                            setValueAs: (v) => (v === "" || v == null ? undefined : Number(v)),
                          })}
                        />
                      ) : (
                        <span className="text-muted-foreground text-xs">—</span>
                      )}
                    </td>
                    <td className="p-2">
                      <Input
                        type="number"
                        min={0}
                        step={1}
                        tabIndex={0}
                        {...numInputProps(`items.${index}.unitprice`, {
                          setValueAs: (v) => (v === "" || v == null ? 0 : Number(v)),
                        })}
                      />
                    </td>
                    <td className="p-2">
                      <Input
                        type="number"
                        min={0}
                        step={1}
                        tabIndex={0}
                        {...numInputProps(`items.${index}.itemdiscount`, {
                          setValueAs: (v) => (v === "" || v == null ? 0 : Number(v)),
                        })}
                      />
                    </td>
                    <td className="p-2 font-medium text-foreground" aria-readonly>
                      {beforeDiscount.toFixed(2)}
                    </td>
                    <td className="p-2 font-medium text-foreground" aria-readonly>
                      {lineNet.toFixed(2)}
                    </td>
                    <td className="p-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => remove(index)}
                        disabled={fields.length <= 1}
                        aria-label="حذف السطر"
                      >
                        حذف
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {(errors.items?.message || errors.items?.root?.message) && (
          <p className="text-sm text-destructive">
            {errors.items?.message ?? errors.items?.root?.message}
          </p>
        )}
        {items.map((_, i) => errors.items?.[i]?.dozensinbox?.message).filter(Boolean)[0] && (
          <p className="text-sm text-destructive">
            {items.map((_, i) => errors.items?.[i]?.dozensinbox?.message).find(Boolean)}
          </p>
        )}
      </section>

      {/* ========== Summary ========== */}
      <section className="flex justify-end">
        <div className="rounded-lg border border-border bg-card p-4 min-w-[260px] space-y-2 text-left">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">مجموع الأسطر</span>
            <span>{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center gap-2 text-sm">
            <span className="text-muted-foreground">الخصم العام</span>
            <Input
              id="invoice-discount"
              type="number"
              min={0}
              step={0.01}
              className="h-9 w-28 text-left border border-input rounded-md px-2"
              onFocus={selectOnFocus}
              {...register("discount", {
                setValueAs: (v) => (v === "" || v == null ? 0 : Math.max(0, Number(v))),
              })}
            />
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-border text-base font-bold">
            <span>صافي الإجمالي</span>
            <span className="text-lg">{netTotal.toFixed(2)}</span>
          </div>
        </div>
      </section>

      <div className="flex gap-2 justify-end pt-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            إلغاء
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting || netTotal <= 0}>
          {isSubmitting ? "جارٍ الحفظ..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
