import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import CustomersService from "@/services/customers.service";
import ProductsService from "@/services/products.service";

import InvoiceForm, {
  mapCustomersToOptions,
  mapProductsToOptions,
} from "./InvoiceForm";

export default function CreateInvoiceDialog({
  open,
  onClose,
  onSubmit,
  editingInvoiceId = null,
}) {
  const [customerOptions, setCustomerOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const isEdit = Boolean(editingInvoiceId);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setLoadingData(true);
    Promise.all([CustomersService.list({}), ProductsService.list({})])
      .then(([custRes, prodRes]) => {
        if (cancelled) return;
        const custList = Array.isArray(custRes) ? custRes : custRes?.customers ?? [];
        const prodList = Array.isArray(prodRes) ? prodRes : prodRes?.products ?? [];
        setCustomerOptions(mapCustomersToOptions(custList));
        setProductOptions(mapProductsToOptions(prodList));
      })
      .catch(() => {
        if (!cancelled) {
          setCustomerOptions([]);
          setProductOptions([]);
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingData(false);
      });
    return () => { cancelled = true; };
  }, [open]);

  const handleSubmit = (payload, invoiceId) => {
    onSubmit(payload, invoiceId ?? (isEdit ? editingInvoiceId : null));
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
            جاري تحميل العملاء والمنتجات...
          </p>
        ) : (
          <InvoiceForm
            key={open ? (isEdit ? `edit-${editingInvoiceId}` : "new") : "closed"}
            customerOptions={customerOptions}
            productOptions={productOptions}
            invoiceId={editingInvoiceId ?? undefined}
            onSubmit={handleSubmit}
            onCancel={onClose}
            submitLabel={isEdit ? "حفظ التعديلات" : "إنشاء الفاتورة"}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
