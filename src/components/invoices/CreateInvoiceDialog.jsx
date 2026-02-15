import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import CustomersService from "@/services/customers.service";
import ProductsService from "@/services/products.service";
import InvoicesService from "@/services/invoices.service";

import InvoiceForm, {
  mapCustomersToOptions,
  mapProductsToOptions,
} from "./InvoiceForm";

function mapInvoiceToDefaultValues(inv, products = []) {
  if (!inv) return null;
  const items = Array.isArray(inv.items) ? inv.items : [];
  const productList = Array.isArray(products) ? products : [];
  const getMinunit = (productid) => {
    const p = productList.find((p) => String(p.productid ?? p.id ?? "") === String(productid));
    return p?.minunit ?? "PIECE";
  };
  return {
    customerid: inv.customerid != null ? String(inv.customerid) : "",
    paymentmethod: inv.paymentmethod ?? "CASH",
    paymenttype: inv.paymenttype ?? "CASH",
    currency: inv.currency ?? "USD",
    status: inv.status ?? "DRAFT",
    date: inv.date ? inv.date.slice(0, 10) : new Date().toISOString().slice(0, 10),
    discount: Number(inv.discount) || 0,
    items:
      items.length > 0
        ? items.map((row) => ({
            productid: row.productid != null ? String(row.productid) : "",
            selectedunit: row.selectedunit ?? "PIECE",
            minunit: row.minunit ?? getMinunit(row.productid),
            quantity: Number(row.quantity) || 1,
            dozensinbox: row.selectedunit === "BOX" ? (Number(row.dozensinbox) || undefined) : undefined,
            unitprice: Number(row.unitprice) || 0,
            itemdiscount: Number(row.itemdiscount) || 0,
          }))
        : [{ productid: "", selectedunit: "PIECE", minunit: "PIECE", quantity: 1, dozensinbox: undefined, unitprice: 0, itemdiscount: 0 }],
  };
}

export default function CreateInvoiceDialog({
  open,
  onClose,
  onSubmit,
  editingInvoiceId = null,
}) {
  const [customerOptions, setCustomerOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [formDefaultValues, setFormDefaultValues] = useState(null);

  const isEdit = Boolean(editingInvoiceId);

  useEffect(() => {
    if (!open) {
      setFormDefaultValues(null);
      return;
    }

    let cancelled = false;

    async function load() {
      setLoadingData(true);
      try {
        const [custRes, prodRes, ...rest] = await Promise.all([
          CustomersService.list({}),
          ProductsService.list({}),
          ...(editingInvoiceId
            ? [InvoicesService.get(editingInvoiceId)]
            : []),
        ]);

        if (cancelled) return;

        const custList = Array.isArray(custRes) ? custRes : custRes?.customers ?? [];
        const prodList = Array.isArray(prodRes) ? prodRes : prodRes?.products ?? [];
        setCustomerOptions(mapCustomersToOptions(custList));
        setProductOptions(mapProductsToOptions(prodList));

        if (editingInvoiceId && rest[0]) {
          setFormDefaultValues(mapInvoiceToDefaultValues(rest[0], prodList));
        } else if (!editingInvoiceId) {
          setFormDefaultValues(null);
        }
      } catch {
        if (!cancelled) {
          setCustomerOptions([]);
          setProductOptions([]);
          setFormDefaultValues(null);
        }
      } finally {
        if (!cancelled) setLoadingData(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [open, editingInvoiceId]);

  const handleSubmit = (payload) => {
    onSubmit(payload, isEdit ? editingInvoiceId : null);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent dir="rtl" className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-right text-lg font-bold">
            {isEdit ? "تعديل الفاتورة" : "إنشاء فاتورة جديدة"}
          </DialogTitle>
        </DialogHeader>

        {loadingData ? (
          <p className="text-center py-6 text-muted-foreground">
            {isEdit ? "جاري تحميل الفاتورة..." : "جاري تحميل العملاء والمنتجات..."}
          </p>
        ) : (
          <InvoiceForm
            key={isEdit ? `edit-${editingInvoiceId}` : "new"}
            customerOptions={customerOptions}
            productOptions={productOptions}
            defaultValues={formDefaultValues ?? undefined}
            onSubmit={handleSubmit}
            onCancel={onClose}
            submitLabel={isEdit ? "حفظ التعديلات" : "إنشاء الفاتورة"}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
