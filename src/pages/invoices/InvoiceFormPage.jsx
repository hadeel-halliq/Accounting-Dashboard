import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import CustomersService from "@/services/customers.service";
import ProductsService from "@/services/products.service";
import InvoicesService from "@/services/invoices.service";

import InvoiceForm, {
  mapCustomersToOptions,
  mapProductsToOptions,
} from "@/components/invoices/InvoiceForm";

export default function InvoiceFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customerOptions, setCustomerOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [optionsLoading, setOptionsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setOptionsLoading(true);
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
        if (!cancelled) setOptionsLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const handleSubmit = async (payload, invoiceId) => {
    try {
      if (invoiceId != null) {
        await InvoicesService.update(invoiceId, payload);
        toast.success("تم تحديث الفاتورة بنجاح");
      } else {
        await InvoicesService.create(payload);
        toast.success("تم إنشاء الفاتورة بنجاح");
      }
      navigate("/invoices");
    } catch (err) {
      toast.error(err?.response?.data?.message ?? err?.message ?? "فشل في حفظ الفاتورة");
    }
  };

  const isEdit = Boolean(id);

  if (optionsLoading) {
    return (
      <div className="flex items-center justify-center py-12 text-muted-foreground">
        جاري تحميل البيانات...
      </div>
    );
  }

  return (
    <div dir="rtl" className="space-y-6">
      <h1 className="text-2xl font-bold">
        {isEdit ? "تعديل فاتورة" : "إنشاء فاتورة"}
      </h1>
      <div className="rounded-lg border bg-card p-4 md:p-6">
        <InvoiceForm
          customerOptions={customerOptions}
          productOptions={productOptions}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/invoices")}
          submitLabel={isEdit ? "حفظ التعديلات" : "إنشاء الفاتورة"}
        />
      </div>
    </div>
  );
}
