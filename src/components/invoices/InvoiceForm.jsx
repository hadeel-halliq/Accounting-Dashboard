// // import { useForm, useFieldArray } from "react-hook-form";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { z } from "zod";

// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";

// // /* ========== Power user: select on focus for numeric inputs ========== */
// // export const selectOnFocus = (e) => e.target.select();

// // /* ========== Display helpers (ID → Name) ========== */

// // export function getCustomerLabel(c) {
// //   if (!c) return "";
// //   const first = c.firstname?.trim();
// //   const last = c.lastname?.trim();
// //   if (first || last) return [first, last].filter(Boolean).join(" ").trim();
// //   return c.companyname ?? c.customername ?? c.name ?? String(c.customerid ?? "");
// // }

// // export function getProductLabel(p) {
// //   if (!p) return "";
// //   return p.productname ?? p.name ?? String(p.productid ?? "");
// // }

// // export function getProductPrice(p) {
// //   if (p == null) return 0;
// //   const n = p.sellprice ?? p.price;
// //   return typeof n === "number" && !Number.isNaN(n) ? n : 0;
// // }

// // /* ========== Units ========== */

// // export const UNIT_OPTIONS = [
// //   { value: "PIECE", label: "قطعة" },
// //   { value: "DOZEN", label: "دزينة" },
// //   { value: "BOX", label: "صندوق" },
// // ];

// // /* ========== Header options (strict schema) ========== */

// // export const PAYMENT_METHOD_OPTIONS = [
// //   { value: "CASH", label: "Cash" },
// //   { value: "SHAM_CASH", label: "Sham Cash" },
// //   { value: "SYRIATEL_CASH", label: "Syriatel Cash" },
// //   { value: "AL_HARAM", label: "Al Haram" },
// //   { value: "TRANSFER", label: "Transfer" },
// // ];

// // export const PAYMENT_TYPE_OPTIONS = [
// //   { value: "CASH", label: "مباشر (Mubashar)" },
// //   { value: "DEFERRED", label: "آجل (Ajel/Debt)" },
// // ];

// // export const CURRENCY_OPTIONS = [
// //   { value: "USD", label: "USD" },
// //   { value: "SYP", label: "SYP" },
// // ];

// // export const INVOICE_STATUS_OPTIONS = [
// //   { value: "DRAFT", label: "مسودة" },
// //   { value: "SHIPPED", label: "تم الشحن" },
// //   { value: "PROCESSING", label: "قيد المعالجة" },
// //   { value: "CONFIRMED", label: "مؤكد" },
// // ];

// // /* ========== Validation (conditional Dozens in Box when Unit === BOX) ========== */

// // const itemSchema = z
// //   .object({
// //     productid: z.union([z.number(), z.string()]).refine((v) => v !== "" && v != null, "اختر المنتج"),
// //     selectedunit: z.enum(["PIECE", "DOZEN", "BOX"]),
// //     quantity: z.number().min(0.001, "الكمية يجب أن تكون أكبر من صفر"),
// //     dozensinbox: z.union([z.number(), z.nan()]).optional(),
// //     unitprice: z.number().min(0, "السعر مطلوب"),
// //     itemdiscount: z.union([z.number(), z.nan()]).optional(),
// //   })
// //   .refine(
// //     (data) => {
// //       if (data.selectedunit !== "BOX") return true;
// //       const n = Number(data.dozensinbox);
// //       return Number.isFinite(n) && n > 0;
// //     },
// //     { message: "عدد الدستات مطلوب وأكبر من صفر عند اختيار الوحدة صندوق", path: ["dozensinbox"] }
// //   );

// // const schema = z
// //   .object({
// //     customerid: z.union([z.number(), z.string()]).refine((v) => v !== "" && v != null, "اختر العميل"),
// //     paymentmethod: z.enum(["CASH", "SHAM_CASH", "SYRIATEL_CASH", "AL_HARAM", "TRANSFER"]),
// //     paymenttype: z.enum(["CASH", "DEFERRED"]),
// //     currency: z.string().default("USD"),
// //     status: z.string().default("DRAFT"),
// //     date: z.string().min(1, "التاريخ مطلوب"),
// //     discount: z.union([z.number(), z.nan()]).transform((v) => (Number.isNaN(v) ? 0 : Math.max(0, Number(v)))),
// //     items: z.array(itemSchema).min(1, "أضف صنف واحد على الأقل"),
// //   })
// //   .refine(
// //     (data) => {
// //       const rowTotals = data.items.map((row) => {
// //         const before = (Number(row.quantity) || 0) * (Number(row.unitprice) || 0);
// //         const itemDisc = Number(row.itemdiscount) || 0;
// //         return before - itemDisc;
// //       });
// //       const sum = rowTotals.reduce((a, b) => a + b, 0);
// //       const afterDiscount = sum - (Number(data.discount) || 0);
// //       return afterDiscount > 0;
// //     },
// //     { message: "الإجمالي يجب أن يكون أكبر من صفر", path: ["items"] }
// //   );

// // const defaultItem = {
// //   productid: "",
// //   selectedunit: "PIECE",
// //   quantity: 1,
// //   dozensinbox: undefined,
// //   unitprice: 0,
// //   itemdiscount: 0,
// // };

// // /* ========== Options for API ========== */

// // export function mapCustomersToOptions(customers) {
// //   const list = Array.isArray(customers) ? customers : [];
// //   return list
// //     .map((c) => ({
// //       label: getCustomerLabel(c),
// //       value: String(c.customerid ?? c.id ?? ""),
// //     }))
// //     .filter((o) => o.value !== "");
// // }

// // export function mapProductsToOptions(products) {
// //   const list = Array.isArray(products) ? products : [];
// //   return list
// //     .map((p) => ({
// //       label: getProductLabel(p),
// //       value: String(p.productid ?? p.id ?? ""),
// //       sellprice: getProductPrice(p),
// //     }))
// //     .filter((o) => o.value !== "");
// // }

// // /* ========== InvoiceForm ========== */

// // export default function InvoiceForm({
// //   customerOptions = [],
// //   productOptions = [],
// //   defaultValues,
// //   onSubmit,
// //   onCancel,
// //   submitLabel = "إنشاء الفاتورة",
// // }) {
// //   const {
// //     register,
// //     control,
// //     handleSubmit,
// //     watch,
// //     setValue,
// //     formState: { errors, isSubmitting },
// //   } = useForm({
// //     resolver: zodResolver(schema),
// //     defaultValues:
// //       defaultValues ?? {
// //         customerid: "",
// //         paymentmethod: "CASH",
// //         paymenttype: "CASH",
// //         currency: "USD",
// //         status: "DRAFT",
// //         date: new Date().toISOString().slice(0, 10),
// //         discount: 0,
// //         items: [{ ...defaultItem }],
// //       },
// //   });

// //   const { fields, append, remove } = useFieldArray({
// //     control,
// //     name: "items",
// //   });

// //   const items = watch("items") ?? [];
// //   const discount = Number(watch("discount")) || 0;

// //   const rowNetTotals = items.map((row) => {
// //     const before = (Number(row.quantity) || 0) * (Number(row.unitprice) || 0);
// //     const itemDisc = Number(row.itemdiscount) || 0;
// //     return before - itemDisc;
// //   });
// //   const subtotal = rowNetTotals.reduce((a, b) => a + b, 0);
// //   const netTotal = Math.max(0, subtotal - discount);

// //   const handleProductChange = (index, productId) => {
// //     setValue(`items.${index}.productid`, productId);
// //     const opt = productOptions.find((o) => o.value === String(productId));
// //     if (opt != null && typeof opt.sellprice === "number") {
// //       setValue(`items.${index}.unitprice`, opt.sellprice);
// //     }
// //   };

// //   const onFormSubmit = (values) => {
// //     const payload = {
// //       customerid: Number(values.customerid),
// //       paymentmethod: values.paymentmethod,
// //       paymenttype: values.paymenttype,
// //       currency: values.currency ?? "USD",
// //       status: values.status ?? "DRAFT",
// //       date: values.date,
// //       discount: Number(values.discount) || 0,
// //       items: values.items.map((row) => ({
// //         productid: Number(row.productid),
// //         selectedunit: row.selectedunit,
// //         quantity: Number(row.quantity),
// //         dozensinbox: row.selectedunit === "BOX" ? Number(row.dozensinbox) || undefined : undefined,
// //         unitprice: Number(row.unitprice),
// //         itemdiscount: Number(row.itemdiscount) || 0,
// //       })),
// //     };
// //     return Promise.resolve(onSubmit(payload));
// //   };

// //   const numInputProps = (name, opts = {}) => ({
// //     ...register(name, opts),
// //     onFocus: selectOnFocus,
// //     className: "text-left border border-input rounded-md px-3 py-2 h-9 min-w-0 " + (opts.className ?? ""),
// //   });

// //   return (
// //     <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 text-right">
// //       {/* ========== Header: Customer, Payment, Currency, Status, Date ========== */}
// //       <section className="rounded-lg border border-border bg-muted/20 p-4 space-y-4">
// //         <h3 className="text-sm font-semibold text-foreground border-b border-border pb-2">
// //           بيانات الفاتورة
// //         </h3>
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
// //           <div className="space-y-2">
// //             <Label>العميل</Label>
// //             <Select
// //               value={String(watch("customerid") ?? "")}
// //               onValueChange={(v) => setValue("customerid", v)}
// //             >
// //               <SelectTrigger className="w-full border border-input rounded-md px-3 py-2 h-9">
// //                 <SelectValue placeholder="اختر العميل" />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 {customerOptions.map((opt) => (
// //                   <SelectItem key={opt.value} value={opt.value}>
// //                     {opt.label}
// //                   </SelectItem>
// //                 ))}
// //               </SelectContent>
// //             </Select>
// //             {errors.customerid && (
// //               <p className="text-sm text-destructive">{errors.customerid.message}</p>
// //             )}
// //           </div>
// //           <div className="space-y-2">
// //             <Label>طريقة الدفع</Label>
// //             <Select
// //               value={watch("paymentmethod") ?? "CASH"}
// //               onValueChange={(v) => setValue("paymentmethod", v)}
// //             >
// //               <SelectTrigger className="w-full border border-input rounded-md px-3 py-2 h-9">
// //                 <SelectValue />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 {PAYMENT_METHOD_OPTIONS.map((o) => (
// //                   <SelectItem key={o.value} value={o.value}>
// //                     {o.label}
// //                   </SelectItem>
// //                 ))}
// //               </SelectContent>
// //             </Select>
// //           </div>
// //           <div className="space-y-2">
// //             <Label>نوع الدفع</Label>
// //             <Select
// //               value={watch("paymenttype") ?? "CASH"}
// //               onValueChange={(v) => setValue("paymenttype", v)}
// //             >
// //               <SelectTrigger className="w-full border border-input rounded-md px-3 py-2 h-9">
// //                 <SelectValue />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 {PAYMENT_TYPE_OPTIONS.map((o) => (
// //                   <SelectItem key={o.value} value={o.value}>
// //                     {o.label}
// //                   </SelectItem>
// //                 ))}
// //               </SelectContent>
// //             </Select>
// //           </div>
// //           <div className="space-y-2">
// //             <Label>العملة</Label>
// //             <Select
// //               value={watch("currency") ?? "USD"}
// //               onValueChange={(v) => setValue("currency", v)}
// //             >
// //               <SelectTrigger className="w-full border border-input rounded-md px-3 py-2 h-9">
// //                 <SelectValue />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 {CURRENCY_OPTIONS.map((o) => (
// //                   <SelectItem key={o.value} value={o.value}>
// //                     {o.label}
// //                   </SelectItem>
// //                 ))}
// //               </SelectContent>
// //             </Select>
// //           </div>
// //           <div className="space-y-2">
// //             <Label>الحالة / الملاحظات</Label>
// //             <Select
// //               value={watch("status") ?? "DRAFT"}
// //               onValueChange={(v) => setValue("status", v)}
// //             >
// //               <SelectTrigger className="w-full border border-input rounded-md px-3 py-2 h-9">
// //                 <SelectValue />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 {INVOICE_STATUS_OPTIONS.map((o) => (
// //                   <SelectItem key={o.value} value={o.value}>
// //                     {o.label}
// //                   </SelectItem>
// //                 ))}
// //               </SelectContent>
// //             </Select>
// //           </div>
// //           <div className="space-y-2">
// //             <Label>التاريخ</Label>
// //             <Input
// //               type="date"
// //               className="border border-input rounded-md px-3 py-2 h-9"
// //               {...register("date")}
// //             />
// //             {errors.date && (
// //               <p className="text-sm text-destructive">{errors.date.message}</p>
// //             )}
// //           </div>
// //         </div>
// //       </section>

// //       {/* ========== Items grid: Product | Unit | Qty | Dozens in Box (if BOX) | Price | Discount | Totals | Action ========== */}
// //       <section className="space-y-3">
// //         <div className="flex justify-between items-center">
// //           <h3 className="text-sm font-semibold text-foreground">أصناف الفاتورة</h3>
// //           <Button
// //             type="button"
// //             variant="outline"
// //             size="sm"
// //             onClick={() => append({ ...defaultItem })}
// //           >
// //             إضافة صنف
// //           </Button>
// //         </div>

// //         <div className="border border-border rounded-lg overflow-x-auto">
// //           <table className="w-full text-sm">
// //             <thead className="bg-muted/40 border-b border-border">
// //               <tr>
// //                 <th className="text-right p-3">المنتج</th>
// //                 <th className="text-right p-3 w-24">الوحدة</th>
// //                 <th className="text-right p-3 w-20">الكمية</th>
// //                 <th className="text-right p-3 w-24">عدد الدستات</th>
// //                 <th className="text-right p-3 w-24">السعر</th>
// //                 <th className="text-right p-3 w-20">خصم الصنف</th>
// //                 <th className="text-right p-3 w-24">قبل الخصم</th>
// //                 <th className="text-right p-3 w-24">صافي السطر</th>
// //                 <th className="w-14 p-3" />
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {fields.map((field, index) => {
// //                 const row = items[index] ?? field;
// //                 const isBox = (row.selectedunit ?? "PIECE") === "BOX";
// //                 const q = Number(row.quantity) || 0;
// //                 const p = Number(row.unitprice) || 0;
// //                 const beforeDiscount = q * p;
// //                 const itemDisc = Number(row.itemdiscount) || 0;
// //                 const lineNet = beforeDiscount - itemDisc;
// //                 return (
// //                   <tr key={field.id} className="border-b border-border last:border-0 hover:bg-muted/20">
// //                     <td className="p-2">
// //                       <Select
// //                         value={String(row.productid ?? "")}
// //                         onValueChange={(v) => handleProductChange(index, v)}
// //                       >
// //                         <SelectTrigger className="w-full min-w-[160px] border border-input rounded-md px-2 py-1.5 h-9">
// //                           <SelectValue placeholder="اختر المنتج" />
// //                         </SelectTrigger>
// //                         <SelectContent>
// //                           {productOptions.map((opt) => (
// //                             <SelectItem key={opt.value} value={opt.value}>
// //                               {opt.label}
// //                             </SelectItem>
// //                           ))}
// //                         </SelectContent>
// //                       </Select>
// //                     </td>
// //                     <td className="p-2">
// //                       <Select
// //                         value={row.selectedunit ?? "PIECE"}
// //                         onValueChange={(v) => {
// //                           setValue(`items.${index}.selectedunit`, v);
// //                           if (v !== "BOX") setValue(`items.${index}.dozensinbox`, undefined);
// //                         }}
// //                       >
// //                         <SelectTrigger className="w-full border border-input rounded-md px-2 py-1.5 h-9">
// //                           <SelectValue />
// //                         </SelectTrigger>
// //                         <SelectContent>
// //                           {UNIT_OPTIONS.map((o) => (
// //                             <SelectItem key={o.value} value={o.value}>
// //                               {o.label}
// //                             </SelectItem>
// //                           ))}
// //                         </SelectContent>
// //                       </Select>
// //                     </td>
// //                     <td className="p-2">
// //                       <Input
// //                         type="number"
// //                         min={1}
// //                         step={1}
// //                         tabIndex={0}
// //                         {...numInputProps(`items.${index}.quantity`, {
// //                           setValueAs: (v) => (v === "" || v == null ? 0 : Number(v)),
// //                         })}
// //                       />
// //                     </td>
// //                     <td className="p-2">
// //                       {isBox ? (
// //                         <Input
// //                           type="number"
// //                           min={1}
// //                           step={1}
// //                           tabIndex={0}
// //                           placeholder="عدد الدستات"
// //                           {...numInputProps(`items.${index}.dozensinbox`, {
// //                             setValueAs: (v) => (v === "" || v == null ? undefined : Number(v)),
// //                           })}
// //                         />
// //                       ) : (
// //                         <span className="text-muted-foreground text-xs">—</span>
// //                       )}
// //                     </td>
// //                     <td className="p-2">
// //                       <Input
// //                         type="number"
// //                         min={0}
// //                         step={1}
// //                         tabIndex={0}
// //                         {...numInputProps(`items.${index}.unitprice`, {
// //                           setValueAs: (v) => (v === "" || v == null ? 0 : Number(v)),
// //                         })}
// //                       />
// //                     </td>
// //                     <td className="p-2">
// //                       <Input
// //                         type="number"
// //                         min={0}
// //                         step={1}
// //                         tabIndex={0}
// //                         {...numInputProps(`items.${index}.itemdiscount`, {
// //                           setValueAs: (v) => (v === "" || v == null ? 0 : Number(v)),
// //                         })}
// //                       />
// //                     </td>
// //                     <td className="p-2 font-medium text-foreground" aria-readonly>
// //                       {beforeDiscount.toFixed(2)}
// //                     </td>
// //                     <td className="p-2 font-medium text-foreground" aria-readonly>
// //                       {lineNet.toFixed(2)}
// //                     </td>
// //                     <td className="p-2">
// //                       <Button
// //                         type="button"
// //                         variant="ghost"
// //                         size="icon-sm"
// //                         onClick={() => remove(index)}
// //                         disabled={fields.length <= 1}
// //                         aria-label="حذف السطر"
// //                       >
// //                         حذف
// //                       </Button>
// //                     </td>
// //                   </tr>
// //                 );
// //               })}
// //             </tbody>
// //           </table>
// //         </div>

// //         {(errors.items?.message || errors.items?.root?.message) && (
// //           <p className="text-sm text-destructive">
// //             {errors.items?.message ?? errors.items?.root?.message}
// //           </p>
// //         )}
// //         {items.map((_, i) => errors.items?.[i]?.dozensinbox?.message).filter(Boolean)[0] && (
// //           <p className="text-sm text-destructive">
// //             {items.map((_, i) => errors.items?.[i]?.dozensinbox?.message).find(Boolean)}
// //           </p>
// //         )}
// //       </section>

// //       {/* ========== Summary ========== */}
// //       <section className="flex justify-end">
// //         <div className="rounded-lg border border-border bg-card p-4 min-w-[260px] space-y-2 text-left">
// //           <div className="flex justify-between text-sm">
// //             <span className="text-muted-foreground">مجموع الأسطر</span>
// //             <span>{subtotal.toFixed(2)}</span>
// //           </div>
// //           <div className="flex justify-between items-center gap-2 text-sm">
// //             <span className="text-muted-foreground">الخصم العام</span>
// //             <Input
// //               id="invoice-discount"
// //               type="number"
// //               min={0}
// //               step={0.01}
// //               className="h-9 w-28 text-left border border-input rounded-md px-2"
// //               onFocus={selectOnFocus}
// //               {...register("discount", {
// //                 setValueAs: (v) => (v === "" || v == null ? 0 : Math.max(0, Number(v))),
// //               })}
// //             />
// //           </div>
// //           <div className="flex justify-between items-center pt-2 border-t border-border text-base font-bold">
// //             <span>صافي الإجمالي</span>
// //             <span className="text-lg">{netTotal.toFixed(2)}</span>
// //           </div>
// //         </div>
// //       </section>

// //       <div className="flex gap-2 justify-end pt-2">
// //         {onCancel && (
// //           <Button type="button" variant="outline" onClick={onCancel}>
// //             إلغاء
// //           </Button>
// //         )}
// //         <Button type="submit" disabled={isSubmitting || netTotal <= 0}>
// //           {isSubmitting ? "جارٍ الحفظ..." : submitLabel}
// //         </Button>
// //       </div>
// //     </form>
// //   );
// // }


// import { useForm, useFieldArray } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// /* ========== Power user: select on focus for numeric inputs ========== */
// export const selectOnFocus = (e) => e.target.select();

// /* ========== Display helpers (ID → Name) ========== */

// export function getCustomerLabel(c) {
//   if (!c) return "";
//   const first = c.firstname?.trim();
//   const last = c.lastname?.trim();
//   if (first || last) return [first, last].filter(Boolean).join(" ").trim();
//   return c.companyname ?? c.customername ?? c.name ?? String(c.customerid ?? "");
// }

// export function getProductLabel(p) {
//   if (!p) return "";
//   return p.productname ?? p.name ?? String(p.productid ?? "");
// }

// export function getProductPrice(p) {
//   if (p == null) return 0;
//   const n = p.sellprice ?? p.price;
//   return typeof n === "number" && !Number.isNaN(n) ? n : 0;
// }

// /* ========== Units ========== */

// export const UNIT_OPTIONS = [
//   { value: "PIECE", label: "قطعة" },
//   { value: "DOZEN", label: "دزينة" },
//   { value: "BOX", label: "صندوق" },
// ];

// /* ========== Header options (strict schema) ========== */

// export const PAYMENT_METHOD_OPTIONS = [
//   { value: "CASH", label: "Cash" },
//   { value: "SHAM_CASH", label: "Sham Cash" },
//   { value: "SYRIATEL_CASH", label: "Syriatel Cash" },
//   { value: "AL_HARAM", label: "Al Haram" },
//   { value: "TRANSFER", label: "Transfer" },
// ];

// export const PAYMENT_TYPE_OPTIONS = [
//   { value: "CASH", label: "مباشر (Mubashar)" },
//   { value: "DEFERRED", label: "آجل (Ajel/Debt)" },
// ];

// export const CURRENCY_OPTIONS = [
//   { value: "USD", label: "USD" },
//   { value: "SYP", label: "SYP" },
// ];

// export const INVOICE_STATUS_OPTIONS = [
//   { value: "DRAFT", label: "مسودة" },
//   { value: "SHIPPED", label: "تم الشحن" },
//   { value: "PROCESSING", label: "قيد المعالجة" },
//   { value: "CONFIRMED", label: "مؤكد" },
// ];

// /* ========== Validation (conditional Dozens in Box when Unit === BOX) ========== */

// const itemSchema = z
//   .object({
//     productid: z.union([z.number(), z.string()]).refine((v) => v !== "" && v != null, "اختر المنتج"),
//     selectedunit: z.enum(["PIECE", "DOZEN", "BOX"]),
//     quantity: z.number().min(0.001, "الكمية يجب أن تكون أكبر من صفر"),
//     dozensinbox: z.union([z.number(), z.nan()]).optional(),
//     unitprice: z.number().min(0, "السعر مطلوب"),
//     itemdiscount: z.union([z.number(), z.nan()]).optional(),
//   })
//   .refine(
//     (data) => {
//       if (data.selectedunit !== "BOX") return true;
//       const n = Number(data.dozensinbox);
//       return Number.isFinite(n) && n > 0;
//     },
//     { message: "عدد الدستات مطلوب وأكبر من صفر عند اختيار الوحدة صندوق", path: ["dozensinbox"] }
//   );

// const schema = z
//   .object({
//     customerid: z.union([z.number(), z.string()]).refine((v) => v !== "" && v != null, "اختر العميل"),
//     paymentmethod: z.enum(["CASH", "SHAM_CASH", "SYRIATEL_CASH", "AL_HARAM", "TRANSFER"]),
//     paymenttype: z.enum(["CASH", "DEFERRED"]),
//     currency: z.string().default("USD"),
//     status: z.string().default("DRAFT"),
//     date: z.string().min(1, "التاريخ مطلوب"),
//     discount: z.union([z.number(), z.nan()]).transform((v) => (Number.isNaN(v) ? 0 : Math.max(0, Number(v)))),
//     items: z.array(itemSchema).min(1, "أضف صنف واحد على الأقل"),
//   })
//   .refine(
//     (data) => {
//       const rowTotals = data.items.map((row) => {
//         const before = (Number(row.quantity) || 0) * (Number(row.unitprice) || 0);
//         const itemDisc = Number(row.itemdiscount) || 0;
//         return before - itemDisc;
//       });
//       const sum = rowTotals.reduce((a, b) => a + b, 0);
//       const afterDiscount = sum - (Number(data.discount) || 0);
//       return afterDiscount > 0;
//     },
//     { message: "الإجمالي يجب أن يكون أكبر من صفر", path: ["items"] }
//   );

// const defaultItem = {
//   productid: "",
//   selectedunit: "PIECE",
//   quantity: 1,
//   dozensinbox: undefined,
//   unitprice: 0,
//   itemdiscount: 0,
// };

// /* ========== Options for API ========== */

// export function mapCustomersToOptions(customers) {
//   const list = Array.isArray(customers) ? customers : [];
//   return list
//     .map((c) => ({
//       label: getCustomerLabel(c),
//       value: String(c.customerid ?? c.id ?? ""),
//     }))
//     .filter((o) => o.value !== "");
// }

// export function mapProductsToOptions(products) {
//   const list = Array.isArray(products) ? products : [];
//   return list
//     .map((p) => ({
//       label: getProductLabel(p),
//       value: String(p.productid ?? p.id ?? ""),
//       sellprice: getProductPrice(p),
//     }))
//     .filter((o) => o.value !== "");
// }

// /* ========== InvoiceForm ========== */

// export default function InvoiceForm({
//   customerOptions = [],
//   productOptions = [],
//   defaultValues,
//   onSubmit,
//   onCancel,
//   submitLabel = "إنشاء الفاتورة",
// }) {
//   const {
//     register,
//     control,
//     handleSubmit,
//     watch,
//     setValue,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: zodResolver(schema),
//     defaultValues:
//       defaultValues ?? {
//         customerid: "",
//         paymentmethod: "CASH",
//         paymenttype: "CASH",
//         currency: "USD",
//         status: "DRAFT",
//         date: new Date().toISOString().slice(0, 10),
//         discount: 0,
//         items: [{ ...defaultItem }],
//       },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "items",
//   });

//   const items = watch("items") ?? [];
//   const discount = Number(watch("discount")) || 0;

//   const rowNetTotals = items.map((row) => {
//     const before = (Number(row.quantity) || 0) * (Number(row.unitprice) || 0);
//     const itemDisc = Number(row.itemdiscount) || 0;
//     return before - itemDisc;
//   });
//   const subtotal = rowNetTotals.reduce((a, b) => a + b, 0);
//   const netTotal = Math.max(0, subtotal - discount);

//   const handleProductChange = (index, productId) => {
//     setValue(`items.${index}.productid`, productId);
//     const opt = productOptions.find((o) => o.value === String(productId));
//     if (opt != null && typeof opt.sellprice === "number") {
//       setValue(`items.${index}.unitprice`, opt.sellprice);
//     }
//   };

//   const onFormSubmit = (values) => {
//     const payload = {
//       customerid: Number(values.customerid),
//       paymentmethod: values.paymentmethod,
//       paymenttype: values.paymenttype,
//       currency: values.currency ?? "USD",
//       status: values.status ?? "DRAFT",
//       date: values.date,
//       discount: Number(values.discount) || 0,
//       items: values.items.map((row) => ({
//         productid: Number(row.productid),
//         selectedunit: row.selectedunit,
//         quantity: Number(row.quantity),
//         dozensinbox: row.selectedunit === "BOX" ? Number(row.dozensinbox) || undefined : undefined,
//         unitprice: Number(row.unitprice),
//         itemdiscount: Number(row.itemdiscount) || 0,
//       })),
//     };
//     return Promise.resolve(onSubmit(payload));
//   };

//   const numInputProps = (name, opts = {}) => ({
//     ...register(name, opts),
//     onFocus: selectOnFocus,
//     className: "text-left border border-input rounded-md px-3 py-2 h-9 min-w-0 " + (opts.className ?? ""),
//   });

//   return (
//     <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 text-right">
//       {/* ========== Header: Customer, Payment, Currency, Status, Date ========== */}
//       <section className="rounded-lg border border-border bg-muted/20 p-3 md:p-4 space-y-4">
//         <h3 className="text-sm font-semibold text-foreground border-b border-border pb-2">
//           بيانات الفاتورة
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="space-y-2">
//             <Label>العميل</Label>
//             <Select
//               value={String(watch("customerid") ?? "")}
//               onValueChange={(v) => setValue("customerid", v)}
//             >
//               <SelectTrigger className="w-full border border-input rounded-md px-3 py-2 h-9">
//                 <SelectValue placeholder="اختر العميل" />
//               </SelectTrigger>
//               <SelectContent>
//                 {customerOptions.map((opt) => (
//                   <SelectItem key={opt.value} value={opt.value}>
//                     {opt.label}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             {errors.customerid && (
//               <p className="text-sm text-destructive">{errors.customerid.message}</p>
//             )}
//           </div>
//           <div className="space-y-2">
//             <Label>طريقة الدفع</Label>
//             <Select
//               value={watch("paymentmethod") ?? "CASH"}
//               onValueChange={(v) => setValue("paymentmethod", v)}
//             >
//               <SelectTrigger className="w-full border border-input rounded-md px-3 py-2 h-9">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 {PAYMENT_METHOD_OPTIONS.map((o) => (
//                   <SelectItem key={o.value} value={o.value}>
//                     {o.label}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="space-y-2">
//             <Label>نوع الدفع</Label>
//             <Select
//               value={watch("paymenttype") ?? "CASH"}
//               onValueChange={(v) => setValue("paymenttype", v)}
//             >
//               <SelectTrigger className="w-full border border-input rounded-md px-3 py-2 h-9">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 {PAYMENT_TYPE_OPTIONS.map((o) => (
//                   <SelectItem key={o.value} value={o.value}>
//                     {o.label}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="space-y-2">
//             <Label>العملة</Label>
//             <Select
//               value={watch("currency") ?? "USD"}
//               onValueChange={(v) => setValue("currency", v)}
//             >
//               <SelectTrigger className="w-full border border-input rounded-md px-3 py-2 h-9">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 {CURRENCY_OPTIONS.map((o) => (
//                   <SelectItem key={o.value} value={o.value}>
//                     {o.label}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="space-y-2">
//             <Label>الحالة / الملاحظات</Label>
//             <Select
//               value={watch("status") ?? "DRAFT"}
//               onValueChange={(v) => setValue("status", v)}
//             >
//               <SelectTrigger className="w-full border border-input rounded-md px-3 py-2 h-9">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 {INVOICE_STATUS_OPTIONS.map((o) => (
//                   <SelectItem key={o.value} value={o.value}>
//                     {o.label}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="space-y-2">
//             <Label>التاريخ</Label>
//             <Input
//               type="date"
//               className="border border-input rounded-md px-3 py-2 h-9"
//               {...register("date")}
//             />
//             {errors.date && (
//               <p className="text-sm text-destructive">{errors.date.message}</p>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* ========== Items grid: Product | Unit | Qty | Dozens in Box (if BOX) | Price | Discount | Totals | Action ========== */}
//       <section className="space-y-3">
//         <div className="flex justify-between items-center">
//           <h3 className="text-sm font-semibold text-foreground">أصناف الفاتورة</h3>
//           <Button
//             type="button"
//             variant="outline"
//             size="sm"
//             onClick={() => append({ ...defaultItem })}
//           >
//             إضافة صنف
//           </Button>
//         </div>

//         {/* Desktop: table */}
//         <div className="hidden md:block border border-border rounded-lg overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead className="bg-muted/40 border-b border-border">
//               <tr>
//                 <th className="text-right p-3">المنتج</th>
//                 <th className="text-right p-3 w-24">الوحدة</th>
//                 <th className="text-right p-3 w-20">الكمية</th>
//                 <th className="text-right p-3 w-24">عدد الدستات</th>
//                 <th className="text-right p-3 w-24">السعر</th>
//                 <th className="text-right p-3 w-20">خصم الصنف</th>
//                 <th className="text-right p-3 w-24">قبل الخصم</th>
//                 <th className="text-right p-3 w-24">صافي السطر</th>
//                 <th className="w-14 p-3" />
//               </tr>
//             </thead>
//             <tbody>
//               {fields.map((field, index) => {
//                 const row = items[index] ?? field;
//                 const isBox = (row.selectedunit ?? "PIECE") === "BOX";
//                 const q = Number(row.quantity) || 0;
//                 const p = Number(row.unitprice) || 0;
//                 const beforeDiscount = q * p;
//                 const itemDisc = Number(row.itemdiscount) || 0;
//                 const lineNet = beforeDiscount - itemDisc;
//                 return (
//                   <tr key={field.id} className="border-b border-border last:border-0 hover:bg-muted/20">
//                     <td className="p-2">
//                       <Select
//                         value={String(row.productid ?? "")}
//                         onValueChange={(v) => handleProductChange(index, v)}
//                       >
//                         <SelectTrigger className="w-full min-w-[160px] border border-input rounded-md px-2 py-1.5 h-9">
//                           <SelectValue placeholder="اختر المنتج" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {productOptions.map((opt) => (
//                             <SelectItem key={opt.value} value={opt.value}>
//                               {opt.label}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </td>
//                     <td className="p-2">
//                       <Select
//                         value={row.selectedunit ?? "PIECE"}
//                         onValueChange={(v) => {
//                           setValue(`items.${index}.selectedunit`, v);
//                           if (v !== "BOX") setValue(`items.${index}.dozensinbox`, undefined);
//                         }}
//                       >
//                         <SelectTrigger className="w-full border border-input rounded-md px-2 py-1.5 h-9">
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {UNIT_OPTIONS.map((o) => (
//                             <SelectItem key={o.value} value={o.value}>
//                               {o.label}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </td>
//                     <td className="p-2">
//                       <Input
//                         type="number"
//                         min={1}
//                         step={1}
//                         tabIndex={0}
//                         {...numInputProps(`items.${index}.quantity`, {
//                           setValueAs: (v) => (v === "" || v == null ? 0 : Number(v)),
//                         })}
//                       />
//                     </td>
//                     <td className="p-2">
//                       {isBox ? (
//                         <Input
//                           type="number"
//                           min={1}
//                           step={1}
//                           tabIndex={0}
//                           placeholder="عدد الدستات"
//                           {...numInputProps(`items.${index}.dozensinbox`, {
//                             setValueAs: (v) => (v === "" || v == null ? undefined : Number(v)),
//                           })}
//                         />
//                       ) : (
//                         <span className="text-muted-foreground text-xs">—</span>
//                       )}
//                     </td>
//                     <td className="p-2">
//                       <Input
//                         type="number"
//                         min={0}
//                         step={1}
//                         tabIndex={0}
//                         {...numInputProps(`items.${index}.unitprice`, {
//                           setValueAs: (v) => (v === "" || v == null ? 0 : Number(v)),
//                         })}
//                       />
//                     </td>
//                     <td className="p-2">
//                       <Input
//                         type="number"
//                         min={0}
//                         step={1}
//                         tabIndex={0}
//                         {...numInputProps(`items.${index}.itemdiscount`, {
//                           setValueAs: (v) => (v === "" || v == null ? 0 : Number(v)),
//                         })}
//                       />
//                     </td>
//                     <td className="p-2 font-medium text-foreground" aria-readonly>
//                       {beforeDiscount.toFixed(2)}
//                     </td>
//                     <td className="p-2 font-medium text-foreground" aria-readonly>
//                       {lineNet.toFixed(2)}
//                     </td>
//                     <td className="p-2">
//                       <Button
//                         type="button"
//                         variant="ghost"
//                         size="icon-sm"
//                         onClick={() => remove(index)}
//                         disabled={fields.length <= 1}
//                         aria-label="حذف السطر"
//                       >
//                         حذف
//                       </Button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>

//         {/* Mobile: vertical stack per item */}
//         <div className="md:hidden space-y-4">
//           {fields.map((field, index) => {
//             const row = items[index] ?? field;
//             const isBox = (row.selectedunit ?? "PIECE") === "BOX";
//             const q = Number(row.quantity) || 0;
//             const p = Number(row.unitprice) || 0;
//             const beforeDiscount = q * p;
//             const itemDisc = Number(row.itemdiscount) || 0;
//             const lineNet = beforeDiscount - itemDisc;
//             return (
//               <div
//                 key={field.id}
//                 className="border border-dashed border-border rounded-lg p-3 bg-gray-50 dark:bg-slate-800 space-y-3"
//               >
//                 <div className="w-full">
//                   <Label className="text-xs text-muted-foreground">المنتج</Label>
//                   <Select
//                     value={String(row.productid ?? "")}
//                     onValueChange={(v) => handleProductChange(index, v)}
//                   >
//                     <SelectTrigger className="w-full mt-1 border border-input rounded-md px-2 py-1.5 h-9">
//                       <SelectValue placeholder="اختر المنتج" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {productOptions.map((opt) => (
//                         <SelectItem key={opt.value} value={opt.value}>
//                           {opt.label}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="grid grid-cols-2 gap-3">
//                   <div className="space-y-1">
//                     <Label className="text-xs text-muted-foreground">الوحدة</Label>
//                     <Select
//                       value={row.selectedunit ?? "PIECE"}
//                       onValueChange={(v) => {
//                         setValue(`items.${index}.selectedunit`, v);
//                         if (v !== "BOX") setValue(`items.${index}.dozensinbox`, undefined);
//                       }}
//                     >
//                       <SelectTrigger className="w-full border border-input rounded-md px-2 py-1.5 h-9">
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {UNIT_OPTIONS.map((o) => (
//                           <SelectItem key={o.value} value={o.value}>
//                             {o.label}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="space-y-1">
//                     <Label className="text-xs text-muted-foreground">الكمية</Label>
//                     <Input
//                       type="number"
//                       min={1}
//                       step={1}
//                       className="w-full border border-input rounded-md px-2 py-1.5 h-9 text-left"
//                       {...register(`items.${index}.quantity`, {
//                         setValueAs: (v) => (v === "" || v == null ? 0 : Number(v)),
//                       })}
//                       onFocus={selectOnFocus}
//                     />
//                   </div>
//                 </div>
//                 {isBox && (
//                   <div className="grid grid-cols-2 gap-3">
//                     <div className="col-span-2 space-y-1">
//                       <Label className="text-xs text-muted-foreground">عدد الدستات في الصندوق</Label>
//                       <Input
//                         type="number"
//                         min={1}
//                         step={1}
//                         placeholder="عدد الدستات"
//                         className="w-full border border-input rounded-md px-2 py-1.5 h-9 text-left"
//                         {...register(`items.${index}.dozensinbox`, {
//                           setValueAs: (v) => (v === "" || v == null ? undefined : Number(v)),
//                         })}
//                         onFocus={selectOnFocus}
//                       />
//                     </div>
//                   </div>
//                 )}
//                 <div className="grid grid-cols-2 gap-3">
//                   <div className="space-y-1">
//                     <Label className="text-xs text-muted-foreground">السعر</Label>
//                     <Input
//                       type="number"
//                       min={0}
//                       step={1}
//                       className="w-full border border-input rounded-md px-2 py-1.5 h-9 text-left"
//                       {...numInputProps(`items.${index}.unitprice`, {
//                         setValueAs: (v) => (v === "" || v == null ? 0 : Number(v)),
//                       })}
//                     />
//                   </div>
//                   <div className="space-y-1">
//                     <Label className="text-xs text-muted-foreground">خصم الصنف</Label>
//                     <Input
//                       type="number"
//                       min={0}
//                       step={1}
//                       className="w-full border border-input rounded-md px-2 py-1.5 h-9 text-left"
//                       {...numInputProps(`items.${index}.itemdiscount`, {
//                         setValueAs: (v) => (v === "" || v == null ? 0 : Number(v)),
//                       })}
//                     />
//                   </div>
//                 </div>
//                 <div className="flex justify-between items-center pt-2 border-t border-border">
//                   <span className="font-bold text-foreground">صافي السطر: {lineNet.toFixed(2)}</span>
//                   <Button
//                     type="button"
//                     variant="destructive"
//                     size="sm"
//                     onClick={() => remove(index)}
//                     disabled={fields.length <= 1}
//                     aria-label="حذف السطر"
//                   >
//                     حذف
//                   </Button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {(errors.items?.message || errors.items?.root?.message) && (
//           <p className="text-sm text-destructive">
//             {errors.items?.message ?? errors.items?.root?.message}
//           </p>
//         )}
//         {items.map((_, i) => errors.items?.[i]?.dozensinbox?.message).filter(Boolean)[0] && (
//           <p className="text-sm text-destructive">
//             {items.map((_, i) => errors.items?.[i]?.dozensinbox?.message).find(Boolean)}
//           </p>
//         )}
//       </section>

//       {/* ========== Summary ========== */}
//       <section className="flex justify-end">
//         <div className="w-full md:min-w-[260px] md:w-auto rounded-lg border border-border bg-card p-3 md:p-4 space-y-2 text-left">
//           <div className="flex justify-between text-sm">
//             <span className="text-muted-foreground">مجموع الأسطر</span>
//             <span>{subtotal.toFixed(2)}</span>
//           </div>
//           <div className="flex justify-between items-center gap-2 text-sm flex-wrap">
//             <span className="text-muted-foreground">الخصم العام</span>
//             <Input
//               id="invoice-discount"
//               type="number"
//               min={0}
//               step={0.01}
//               className="h-9 w-24 md:w-28 text-left border border-input rounded-md px-2"
//               onFocus={selectOnFocus}
//               {...register("discount", {
//                 setValueAs: (v) => (v === "" || v == null ? 0 : Math.max(0, Number(v))),
//               })}
//             />
//           </div>
//           <div className="flex justify-between items-center pt-2 border-t border-border text-base font-bold">
//             <span>صافي الإجمالي</span>
//             <span className="text-lg">{netTotal.toFixed(2)}</span>
//           </div>
//         </div>
//       </section>

//       <div className="flex flex-col-reverse sm:flex-row gap-2 justify-end pt-2 pb-2">
//         {onCancel && (
//           <Button type="button" variant="outline" onClick={onCancel} className="w-full sm:w-auto">
//             إلغاء
//           </Button>
//         )}
//         <Button
//           type="submit"
//           disabled={isSubmitting || netTotal <= 0}
//           className="w-full sm:w-auto"
//         >
//           {isSubmitting ? "جارٍ الحفظ..." : submitLabel}
//         </Button>
//       </div>
//     </form>
//   );
// }



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

import InvoicesService from "@/services/invoices.service";

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

/**
 * Weight in "piece-equivalents" for a unit (used for relative pricing).
 * PIECE = 1, DOZEN = 12, BOX = 12 * (boxDozens || 1).
 */
export function getUnitWeight(unit, boxDozens) {
  if (unit === "BOX") return 12 * (Math.max(1, Number(boxDozens) || 1));
  if (unit === "DOZEN") return 12;
  return 1; // PIECE or unknown
}

/**
 * Price factor for row total: RowTotal = (PriceInput * Factor * Quantity) - Discount.
 * Factor = Weight(SelectedUnit) / Weight(ProductMinUnit).
 * sellPrice is the price of the product's minimum unit; factor scales to selected unit.
 */
export function getPriceFactor(selectedUnit, minUnit, dozensInBox) {
  const minWeight = getUnitWeight(minUnit || "PIECE", dozensInBox);
  if (minWeight <= 0) return 1;
  const selectedWeight = getUnitWeight(selectedUnit || "PIECE", dozensInBox);
  return selectedWeight / minWeight;
}

/* ========== Units ========== */

export const UNIT_OPTIONS = [
  { value: "PIECE", label: "قطعة" },
  { value: "DOZEN", label: "دزينة" },
  { value: "BOX", label: "صندوق" },
];

/** Unit hierarchy for minunit constraint: PIECE (1) < DOZEN (2) < BOX (3). */
export const UNIT_RANKS = { PIECE: 1, DOZEN: 2, BOX: 3 };

/** Alias for compatibility. */
export const UNIT_HIERARCHY = UNIT_RANKS;

/** Returns true if unitToCheck is allowed given product's minUnit (same or larger in hierarchy). */
export function isUnitAllowed(unitToCheck, minUnit) {
  const min = minUnit ? UNIT_RANKS[minUnit] ?? 1 : 1;
  const current = UNIT_RANKS[unitToCheck] ?? 1;
  return current >= min;
}

/** Returns unit options allowed for the given minunit (only units >= minunit in hierarchy). */
export function getAllowedUnitOptions(minunit) {
  return UNIT_OPTIONS.filter((o) => isUnitAllowed(o.value, minunit));
}

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
  { value: "PENDING", label: "معلقة" },
  { value: "SHIPPED", label: "تم الشحن" },
  { value: "PROCESSING", label: "قيد المعالجة" },
  { value: "CONFIRMED", label: "مؤكد" },
];

/* ========== Validation (conditional Dozens in Box when Unit === BOX) ========== */

const itemSchema = z
  .object({
    productid: z.union([z.number(), z.string()]).refine((v) => v !== "" && v != null, "اختر المنتج"),
    selectedunit: z.enum(["PIECE", "DOZEN", "BOX"]),
    minunit: z.enum(["PIECE", "DOZEN", "BOX"]).optional(),
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
        const P = Number(row.unitprice) || 0;
        const Q = Number(row.quantity) || 0;
        const D = Number(row.itemdiscount) || 0;
        const factor = getPriceFactor(row.selectedunit, row.minunit ?? "PIECE", row.dozensinbox);
        const before = P * factor * Q;
        return before - D;
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
  minunit: "PIECE",
  quantity: 1,
  dozensinbox: undefined,
  unitprice: 0,
  itemdiscount: 0,
};

/* ========== Payload sanitization for API (strict enums + numbers) ========== */

const UNIT_MAP = {
  قطعة: "PIECE",
  دزينة: "DOZEN",
  صندوق: "BOX",
  PIECE: "PIECE",
  DOZEN: "DOZEN",
  BOX: "BOX",
};

const PAYMENT_TYPE_MAP = {
  CASH: "CASH",
  كاش: "CASH",
  Cash: "CASH",
  مباشر: "CASH",
  DEFERRED: "CREDIT",
  CREDIT: "CREDIT",
  آجل: "CREDIT",
  Debt: "CREDIT",
  Ajel: "CREDIT",
};

const STATUS_MAP = {
  DRAFT: "DRAFT",
  SHIPPED: "SHIPPED",
  PROCESSING: "PROCESSING",
  CONFIRMED: "CONFIRMED",
  مسودة: "DRAFT",
  "تم الشحن": "SHIPPED",
  "قيد المعالجة": "PROCESSING",
  مؤكد: "CONFIRMED",
};

function normalizeUnit(v) {
  if (v == null || v === "") return "PIECE";
  const s = String(v).trim();
  return UNIT_MAP[s] ?? "PIECE";
}

/** Normalize any date value to YYYY-MM-DD for input[type="date"]. */
function normalizeDateToYYYYMMDD(val) {
  if (val == null || val === "") return new Date().toISOString().slice(0, 10);
  if (typeof val === "string") {
    const trimmed = val.trim();
    if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) return trimmed.slice(0, 10);
    const d = new Date(trimmed);
    return Number.isNaN(d.getTime()) ? new Date().toISOString().slice(0, 10) : d.toISOString().slice(0, 10);
  }
  const d = new Date(val);
  return Number.isNaN(d.getTime()) ? new Date().toISOString().slice(0, 10) : d.toISOString().slice(0, 10);
}

/** Map UI unit to API enum. Only maps the actual selected value – never infer BOX from dozensinbox. */
function mapUnitToEnum(v) {
  return normalizeUnit(v);
}

function normalizePaymentType(v) {
  if (v == null || v === "") return "CASH";
  const s = String(v).trim();
  return PAYMENT_TYPE_MAP[s] ?? "CASH";
}

function normalizeStatus(v) {
  if (v == null || v === "") return "DRAFT";
  const s = String(v).trim();
  return STATUS_MAP[s] ?? "DRAFT";
}

/* ========== Options for API ========== */

export function mapCustomersToOptions(customers) {
  const list = Array.isArray(customers) ? customers : [];
  return list
    .map((c) => ({
      label: getCustomerLabel(c),
      value: String(c.customerid ?? c.id ?? ""),
      type: c.type ?? "CUSTOMER", // Include customer type for filtering
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
      minunit: p.minunit ?? "PIECE",
    }))
    .filter((o) => o.value !== "");
}

/**
 * Map API invoice response to form default values (edit mode).
 * Handles both flat (customerid, discount) and nested (customer.id, discountvalue) backend shapes.
 * Items support: productid, selectedunit/unit, unitprice/price, quantity, itemdiscount, dozensinbox.
 * CRITICAL: Backend returns 'invoiceitems', not 'items'
 */
function mapInvoiceToDefaultValues(inv, productOptions = []) {
  if (!inv) return null;
  const raw = inv?.invoice ?? inv;
  // FIX: Check for invoiceitems first, then fallback to items
  const items = raw.invoiceitems || raw.items || [];
  if (!Array.isArray(items)) return null;
  const getMinunit = (productid) => {
    const opt = productOptions.find((o) => o.value === String(productid));
    return opt?.minunit ?? "PIECE";
  };

  const customerid =
    raw.customerid != null
      ? String(raw.customerid)
      : raw.customer?.id != null
        ? String(raw.customer.id)
        : raw.customer?.customerid != null
          ? String(raw.customer.customerid)
          : "";

  const paymentType = raw.paymenttype === "CREDIT" ? "DEFERRED" : (raw.paymenttype ?? "CASH");
  const discount = Number(raw.discount ?? raw.discountvalue ?? 0) || 0;
  const date = normalizeDateToYYYYMMDD(raw.date ?? raw.invoicedate);

  const mappedItems =
    items.length > 0
      ? items.map((row) => {
          const productid = row.productid ?? row.product?.id ?? row.product?.productid ?? "";
          const selectedunit = normalizeUnit(row.selectedunit ?? row.unit ?? "PIECE");
          const unitprice = Number(row.unitprice ?? row.price ?? 0) || 0;
          const quantity = Number(row.quantity ?? row.qty ?? 1) || 1;
          const itemdiscount = Number(row.itemdiscount ?? row.discount ?? 0) || 0;
          const dozensinbox =
            selectedunit === "BOX" ? (Number(row.dozensinbox) || undefined) : undefined;
          return {
            productid: productid !== "" ? String(productid) : "",
            selectedunit,
            minunit: row.minunit ?? getMinunit(productid),
            quantity,
            dozensinbox,
            unitprice,
            itemdiscount,
          };
        })
      : [{ ...defaultItem }];

  return {
    customerid,
    paymentmethod: raw.paymentmethod ?? "CASH",
    paymenttype: paymentType,
    currency: raw.currency ?? "USD",
    status: raw.status ?? "DRAFT",
    date,
    discount,
    items: mappedItems,
  };
}

/* ========== InvoiceForm ========== */

export default function InvoiceForm({
  customerOptions = [],
  productOptions = [],
  defaultValues,
  onSubmit,
  onCancel,
  submitLabel = "إنشاء الفاتورة",
  invoiceId: invoiceIdProp,
}) {
  const { id: routeId } = useParams();
  const editId = invoiceIdProp ?? routeId ?? null;

  const [invoiceType, setInvoiceType] = useState("EXPORT");
  const [loading, setLoading] = useState(() => Boolean(editId));

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

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "items",
  });

  /**
   * EDIT MODE INITIALIZATION
   * When component mounts with an id, fetch invoice and precisely map to form state.
   * Handles: Type toggle, Header fields, Items Grid, and Financials.
   */
  useEffect(() => {
    if (!editId) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchInvoice = async () => {
      try {
        setLoading(true);
        const response = await InvoicesService.get(editId);
        
        if (cancelled) return;

        // Handle response structure (response.data or response.invoice or response)
        const invoice = response?.data ?? response?.invoice ?? response ?? {};
        
        if (!invoice || typeof invoice !== "object") {
          throw new Error("Invalid invoice data structure");
        }

        console.log("✅ Fetched Invoice:", invoice);

        // ========== A. HEADER MAPPING ==========
        
        // 1. Set Type (Triggers Import/Export toggle color)
        const invoiceTypeValue = invoice.type === "IMPORT" ? "IMPORT" : "EXPORT";
        setInvoiceType(invoiceTypeValue);
        console.log("📦 Invoice Type:", invoiceTypeValue);

        // 2. Customer ID (handle nested customer object)
        const customerid =
          invoice.customerid != null
            ? String(invoice.customerid)
            : invoice.customer?.id != null
              ? String(invoice.customer.id)
              : invoice.customer?.customerid != null
                ? String(invoice.customer.customerid)
                : "";

        // 3. Payment Type (API sends CREDIT, form expects DEFERRED)
        const paymenttype = invoice.paymenttype === "CREDIT" ? "DEFERRED" : (invoice.paymenttype ?? "CASH");

        // 4. Format Date (CRITICAL: HTML Input needs YYYY-MM-DD)
        const dateStr = normalizeDateToYYYYMMDD(invoice.invoicedate ?? invoice.date);

        // 5. Discount (handle both discountvalue and discount)
        const discountValue = Number(invoice.discountvalue ?? invoice.discount ?? 0) || 0;

        // Set all header fields
        setValue("customerid", customerid);
        setValue("paymentmethod", invoice.paymentmethod ?? "CASH");
        setValue("paymenttype", paymenttype);
        setValue("currency", invoice.currency ?? "USD");
        setValue("status", invoice.status ?? "DRAFT");
        setValue("date", dateStr);
        setValue("discount", discountValue);

        console.log("📋 Header Mapped:", {
          customerid,
          paymentmethod: invoice.paymentmethod,
          paymenttype,
          currency: invoice.currency,
          date: dateStr,
          discount: discountValue,
        });

        // ========== B. ITEMS GRID MAPPING (The Complex Part) ==========
        
        // FIX: Backend returns 'invoiceitems', not 'items'
        // Check for invoiceitems OR items to be safe
        const rawItems = invoice.invoiceitems || invoice.items || [];
        
        console.log("🔍 Raw Items from API:", rawItems);
        
        if (Array.isArray(rawItems) && rawItems.length > 0) {
          const getMinunit = (productid) => {
            const opt = productOptions.find((o) => o.value === String(productid));
            return opt?.minunit ?? "PIECE";
          };

          // Transform backend items to frontend grid structure
          const mappedItems = rawItems.map((item, index) => {
            const productid = item.productid ?? item.product?.id ?? item.product?.productid ?? "";
            
            // Backend sends 'selectedunit' or 'unit', Frontend expects normalized unit
            const unit = normalizeUnit(item.unit ?? item.selectedunit ?? "PIECE");
            
            // Handle both 'price' and 'unitprice' from backend
            const price = Number(item.price ?? item.unitprice ?? 0) || 0;
            const quantity = Number(item.quantity ?? item.qty ?? 1) || 1;
            const itemdiscount = Number(item.itemdiscount ?? item.discount ?? 0) || 0;
            const dozensinbox = unit === "BOX" ? (Number(item.dozensinbox ?? 0) || undefined) : undefined;
            
            // Calculate total for verification
            const total = quantity * price;
            
            const mappedItem = {
              productid: productid !== "" ? String(productid) : "",
              selectedunit: unit,
              minunit: item.minunit ?? getMinunit(productid),
              quantity,
              dozensinbox,
              unitprice: price,
              itemdiscount,
            };

            console.log(`📦 Item ${index + 1}:`, {
              productid: mappedItem.productid,
              productName: item.product?.name ?? item.product?.productname ?? "منتج غير معروف",
              unit: mappedItem.selectedunit,
              quantity: mappedItem.quantity,
              price: mappedItem.unitprice,
              total: total,
            });

            return mappedItem;
          });

          replace(mappedItems);
          console.log(`✅ Mapped Items for Grid:`, mappedItems);
          console.log(`✅ Replaced ${mappedItems.length} items in grid`);
        } else {
          console.warn("⚠️ No items found in invoice (checked both invoiceitems and items)");
        }

      } catch (error) {
        if (!cancelled) {
          console.error("❌ Failed to load invoice:", error);
          toast.error("فشل تحميل بيانات الفاتورة");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchInvoice();

    return () => {
      cancelled = true;
    };
  }, [editId, setValue, replace]);

  const items = watch("items") ?? [];
  const discount = Number(watch("discount")) || 0;

  const rowNetTotals = items.map((row) => {
    const P = Number(row.unitprice) || 0;
    const Q = Number(row.quantity) || 0;
    const D = Number(row.itemdiscount) || 0;
    const minUnit = row.minunit ?? getMinUnit(row.productid);
    const factor = getPriceFactor(row.selectedunit, minUnit, row.dozensinbox);
    return P * factor * Q - D;
  });
  const subtotal = rowNetTotals.reduce((a, b) => a + b, 0);
  const netTotal = Math.max(0, subtotal - discount);

  const getMinUnit = (productId) => {
    const opt = productOptions.find((o) => o.value === String(productId));
    return opt?.minunit ?? "PIECE";
  };

  /** On product select: set price (min-unit price), store minunit, enforce unit >= minunit. */
  const handleProductChange = (index, productId) => {
    setValue(`items.${index}.productid`, productId);
    const opt = productOptions.find((o) => o.value === String(productId));
    const minunit = opt?.minunit ?? "PIECE";
    setValue(`items.${index}.minunit`, minunit);
    if (opt != null && typeof opt.sellprice === "number") {
      setValue(`items.${index}.unitprice`, opt.sellprice);
    }
    const row = items[index];
    const currentUnit = row?.selectedunit ?? "PIECE";
    const minOrder = UNIT_HIERARCHY[minunit] ?? 1;
    const currentOrder = UNIT_HIERARCHY[currentUnit] ?? 1;
    if (currentOrder < minOrder) {
      setValue(`items.${index}.selectedunit`, minunit);
      if (minunit === "BOX") setValue(`items.${index}.dozensinbox`, 1);
      else setValue(`items.${index}.dozensinbox`, undefined);
    }
  };

  /** Auto-correct unit when product's minunit is above current selection (e.g. after options load). */
  useEffect(() => {
    (items ?? []).forEach((row, index) => {
      const productId = row?.productid;
      if (!productId) return;
      const minunit = getMinUnit(productId);
      const current = row?.selectedunit ?? "PIECE";
      const minOrder = UNIT_HIERARCHY[minunit] ?? 1;
      const currentOrder = UNIT_HIERARCHY[current] ?? 1;
      if (currentOrder >= minOrder) return;
      setValue(`items.${index}.selectedunit`, minunit);
      if (minunit === "BOX") setValue(`items.${index}.dozensinbox`, 1);
      else setValue(`items.${index}.dozensinbox`, undefined);
    });
  }, [items, productOptions]);

  /**
   * Clear selected customer when switching invoice type if the customer
   * is not valid for the new type (e.g. switching from EXPORT to IMPORT
   * but selected customer is CUSTOMER type, not IMPORTER).
   */
  useEffect(() => {
    const currentCustomerId = watch("customerid");
    if (!currentCustomerId) return;

    const filteredIds = customerOptions
      .filter((c) => {
        if (invoiceType === "EXPORT") {
          return c.type === "CUSTOMER" || c.type === "SUPPLIER";
        }
        if (invoiceType === "IMPORT") {
          return c.type === "IMPORTER";
        }
        return true;
      })
      .map((c) => c.value);

    // If current selection is not in filtered list, clear it
    if (!filteredIds.includes(String(currentCustomerId))) {
      setValue("customerid", "");
      console.log("🔄 Cleared customer selection due to invoice type change");
    }
  }, [invoiceType, customerOptions, setValue, watch]);

  const onFormSubmit = (values) => {
    const data = values;
    const payload = {
      type: invoiceType,
      customerid: Number(data.customerid),
      paymenttype: normalizePaymentType(data.paymenttype),
      currency: data.currency || "USD",
      discountvalue: Number(data.discount || 0),
      items: (data.items ?? []).map((item) => ({
        productid: Number(item.productid),
        selectedunit: mapUnitToEnum(item.selectedunit),
        quantity: Number(item.quantity),
        itemdiscount: Number(item.itemdiscount || 0),
      })),
    };
    return Promise.resolve(onSubmit(payload, editId));
  };

  const effectiveSubmitLabel = submitLabel ?? (editId ? "حفظ التعديلات" : "إنشاء الفاتورة");

  const inputClass = "text-left border border-input rounded-md px-3 py-2 h-9 min-w-0";

  /** Controlled number fields for item rows – editable, with select-on-focus and correct step. */
  const renderNumberField = (name, opts = {}) => {
    const isDisabled = Boolean(opts.disabled);
    const className = [opts.className ?? inputClass, isDisabled && "bg-muted text-muted-foreground cursor-not-allowed"].filter(Boolean).join(" ");
    return (
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          const displayValue = field.value === undefined || field.value === null ? "" : field.value;
          return (
            <Input
              type="number"
              min={opts.min ?? 0}
              step={opts.step ?? "any"}
              tabIndex={isDisabled ? -1 : 0}
              placeholder={opts.placeholder}
              className={className}
              disabled={isDisabled}
              value={displayValue}
              onChange={(e) => {
                if (isDisabled) return;
                const v = e.target.value;
                if (v === "") {
                  field.onChange(opts.emptyAs);
                  return;
                }
                const num = Number(v);
                field.onChange(Number.isNaN(num) ? (opts.emptyAs ?? 0) : num);
              }}
              onBlur={field.onBlur}
              onFocus={isDisabled ? undefined : selectOnFocus}
            />
          );
        }}
      />
    );
  };

  const isImport = invoiceType === "IMPORT";
  const customerLabel = isImport ? "المورد" : "العميل";
  const customerPlaceholder = isImport ? "اختر المورد" : "اختر العميل";

  /**
   * DYNAMIC FILTERING: Filter customers based on invoice type
   * - EXPORT (Sale): Show CUSTOMER or SUPPLIER types
   * - IMPORT (Purchase): Show IMPORTER type only
   */
  const filteredCustomerOptions = customerOptions.filter((c) => {
    if (invoiceType === "EXPORT") {
      // For sales/exports: show customers and suppliers
      return c.type === "CUSTOMER" || c.type === "SUPPLIER";
    }
    if (invoiceType === "IMPORT") {
      // For purchases/imports: show importers only
      return c.type === "IMPORTER";
    }
    // Fallback: show all if type is unknown
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-muted-foreground">
        جاري تحميل الفاتورة...
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 text-right">
      {/* ========== Invoice Mode Switcher (EXPORT / IMPORT) ========== */}
      <div className="flex gap-3 flex-wrap">
        <button
          type="button"
          onClick={() => setInvoiceType("EXPORT")}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors border-2 ${
            invoiceType === "EXPORT"
              ? "bg-blue-600 border-blue-600 text-white hover:bg-blue-700"
              : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
          }`}
        >
          <span aria-hidden>📤</span>
          فاتورة مبيع (تصدير)
        </button>
        <button
          type="button"
          onClick={() => setInvoiceType("IMPORT")}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors border-2 ${
            invoiceType === "IMPORT"
              ? "bg-orange-500 border-orange-500 text-white hover:bg-orange-600"
              : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
          }`}
        >
          <span aria-hidden>📥</span>
          فاتورة شراء (استيراد)
        </button>
      </div>

      {/* ========== Header: Customer/Supplier, Payment, Currency, Status, Date ========== */}
      <section
        className={`rounded-lg border-2 bg-muted/20 p-3 md:p-4 space-y-4 ${
          invoiceType === "EXPORT"
            ? "border-blue-500/50"
            : "border-orange-500/50"
        }`}
      >
        <h3 className="text-sm font-semibold text-foreground border-b border-border pb-2">
          بيانات الفاتورة
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>{customerLabel}</Label>
            <Select
              value={String(watch("customerid") ?? "")}
              onValueChange={(v) => setValue("customerid", v)}
            >
              <SelectTrigger className="w-full border border-input rounded-md px-3 py-2 h-9">
                <SelectValue placeholder={customerPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {filteredCustomerOptions.map((opt) => (
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

        {/* Desktop: table */}
        <div className="hidden md:block border border-border rounded-lg overflow-x-auto">
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
                const P = Number(row.unitprice) || 0;
                const Q = Number(row.quantity) || 0;
                const D = Number(row.itemdiscount) || 0;
                const minUnit = row.minunit ?? getMinUnit(row.productid);
                const isBoxBase = minUnit === "BOX";
                const factor = getPriceFactor(row.selectedunit, minUnit, row.dozensinbox);
                const beforeDiscount = P * factor * Q;
                const lineNet = beforeDiscount - D;
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
                      {(() => {
                        const minunit = getMinUnit(row.productid);
                        const allowedUnits = getAllowedUnitOptions(minunit);
                        const currentUnit = row.selectedunit ?? "PIECE";
                        const validUnit = allowedUnits.some((o) => o.value === currentUnit) ? currentUnit : minunit;
                        return (
                          <Select
                            value={validUnit}
                            onValueChange={(v) => {
                              setValue(`items.${index}.selectedunit`, v);
                              if (v === "BOX") setValue(`items.${index}.dozensinbox`, 1);
                              else setValue(`items.${index}.dozensinbox`, undefined);
                            }}
                          >
                            <SelectTrigger className="w-full border border-input rounded-md px-2 py-1.5 h-9">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {allowedUnits.map((o) => (
                                <SelectItem key={o.value} value={o.value}>
                                  {o.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        );
                      })()}
                    </td>
                    <td className="p-2">
                      {renderNumberField(`items.${index}.quantity`, { min: 1, step: 1, emptyAs: 0 })}
                    </td>
                    <td className="p-2">
                      {isBox ? (
                        renderNumberField(`items.${index}.dozensinbox`, {
                          min: 1,
                          step: 1,
                          emptyAs: undefined,
                          placeholder: "عدد الدستات",
                          disabled: isBoxBase,
                        })
                      ) : (
                        <span className="text-muted-foreground text-xs">—</span>
                      )}
                    </td>
                    <td className="p-2">
                      {renderNumberField(`items.${index}.unitprice`, { min: 0, step: "any", emptyAs: 0 })}
                    </td>
                    <td className="p-2">
                      {renderNumberField(`items.${index}.itemdiscount`, { min: 0, step: 0.1, emptyAs: 0 })}
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

        {/* Mobile: vertical stack per item */}
        <div className="md:hidden space-y-4">
          {fields.map((field, index) => {
            const row = items[index] ?? field;
            const isBox = (row.selectedunit ?? "PIECE") === "BOX";
            const P = Number(row.unitprice) || 0;
            const Q = Number(row.quantity) || 0;
            const D = Number(row.itemdiscount) || 0;
            const minUnit = row.minunit ?? getMinUnit(row.productid);
            const isBoxBase = minUnit === "BOX";
            const factor = getPriceFactor(row.selectedunit, minUnit, row.dozensinbox);
            const beforeDiscount = P * factor * Q;
            const lineNet = beforeDiscount - D;
            return (
              <div
                key={field.id}
                className="border border-dashed border-border rounded-lg p-3 bg-gray-50 dark:bg-slate-800 space-y-3"
              >
                <div className="w-full">
                  <Label className="text-xs text-muted-foreground">المنتج</Label>
                  <Select
                    value={String(row.productid ?? "")}
                    onValueChange={(v) => handleProductChange(index, v)}
                  >
                    <SelectTrigger className="w-full mt-1 border border-input rounded-md px-2 py-1.5 h-9">
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
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">الوحدة</Label>
                    {(() => {
                      const minunit = getMinUnit(row.productid);
                      const allowedUnits = getAllowedUnitOptions(minunit);
                      const currentUnit = row.selectedunit ?? "PIECE";
                      const validUnit = allowedUnits.some((o) => o.value === currentUnit) ? currentUnit : minunit;
                      return (
                        <Select
                          value={validUnit}
                          onValueChange={(v) => {
                            setValue(`items.${index}.selectedunit`, v);
                            if (v === "BOX") setValue(`items.${index}.dozensinbox`, 1);
                            else setValue(`items.${index}.dozensinbox`, undefined);
                          }}
                        >
                          <SelectTrigger className="w-full border border-input rounded-md px-2 py-1.5 h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {allowedUnits.map((o) => (
                              <SelectItem key={o.value} value={o.value}>
                                {o.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      );
                    })()}
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">الكمية</Label>
                    {renderNumberField(`items.${index}.quantity`, { min: 1, step: 1, emptyAs: 0, className: "w-full border border-input rounded-md px-2 py-1.5 h-9 text-left" })}
                  </div>
                </div>
                {isBox && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2 space-y-1">
                      <Label className="text-xs text-muted-foreground">عدد الدستات في الصندوق</Label>
                      {renderNumberField(`items.${index}.dozensinbox`, {
                        min: 1,
                        step: 1,
                        emptyAs: undefined,
                        placeholder: "عدد الدستات",
                        className: "w-full border border-input rounded-md px-2 py-1.5 h-9 text-left",
                        disabled: isBoxBase,
                      })}
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">السعر</Label>
                    {renderNumberField(`items.${index}.unitprice`, { min: 0, step: "any", emptyAs: 0, className: "w-full border border-input rounded-md px-2 py-1.5 h-9 text-left" })}
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">خصم الصنف</Label>
                    {renderNumberField(`items.${index}.itemdiscount`, { min: 0, step: "any", emptyAs: 0, className: "w-full border border-input rounded-md px-2 py-1.5 h-9 text-left" })}
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-border">
                  <span className="font-bold text-foreground">صافي السطر: {lineNet.toFixed(2)}</span>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => remove(index)}
                    disabled={fields.length <= 1}
                    aria-label="حذف السطر"
                  >
                    حذف
                  </Button>
                </div>
              </div>
            );
          })}
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
        <div className="w-full md:min-w-[260px] md:w-auto rounded-lg border border-border bg-card p-3 md:p-4 space-y-2 text-left">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">مجموع الأسطر</span>
            <span>{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center gap-2 text-sm flex-wrap">
            <span className="text-muted-foreground">الخصم العام</span>
            <Input
              id="invoice-discount"
              type="number"
              min={0}
              step={0.1}
              className="h-9 w-24 md:w-28 text-left border border-input rounded-md px-2"
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

      <div className="flex flex-col-reverse sm:flex-row gap-2 justify-end pt-2 pb-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} className="w-full sm:w-auto">
            إلغاء
          </Button>
        )}
        <Button
          type="submit"
          disabled={isSubmitting || netTotal <= 0}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? "جارٍ الحفظ..." : effectiveSubmitLabel}
        </Button>
      </div>
    </form>
  );
}
