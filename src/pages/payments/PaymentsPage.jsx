import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";

import PaymentsService from "@/services/payments.service";
import PaymentsTable from "@/components/payments/PaymentsTable";
import PaymentForm from "@/components/payments/PaymentForm";
import { Button } from "@/components/ui/button";

/**
 * PaymentsPage - Container Component
 * Manages state and data fetching for the Payments module
 */
export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);

  const LIMIT = 10;

  useEffect(() => {
    document.title = "إدارة الدفعات - السلام للمحاسبة";
    fetchPayments();
  }, [page]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await PaymentsService.getAll({ page, limit: LIMIT });
      const paymentsList = response?.payments ?? response?.data ?? response ?? [];
      setPayments(Array.isArray(paymentsList) ? paymentsList : []);
      setTotalPages(response?.totalPages ?? 1);
    } catch (error) {
      console.error("Failed to fetch payments:", error);
      toast.error("فشل في تحميل الدفعات");
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingPayment(null);
    setIsModalOpen(true);
  };

  const handleEdit = (payment) => {
    setEditingPayment(payment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPayment(null);
  };

  const handleSuccess = () => {
    fetchPayments();
  };

  const handleDelete = async (payment) => {
    if (!window.confirm(`هل أنت متأكد من حذف الدفعة #${payment.paymentid}؟`)) {
      return;
    }

    try {
      await PaymentsService.remove(payment.paymentid);
      toast.success("تم حذف الدفعة بنجاح");
      fetchPayments();
    } catch (error) {
      console.error("Failed to delete payment:", error);
      toast.error("فشل في حذف الدفعة");
    }
  };


  return (
    <div dir="rtl" className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">إدارة الدفعات</h1>
        <Button onClick={handleCreate} className="gap-2">
          <Plus size={16} />
          إضافة دفعة
        </Button>
      </div>

      {/* Payments Table */}
      <PaymentsTable
        data={payments}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 p-4 border border-border rounded-xl bg-card">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            السابق
          </Button>
          <span className="text-sm text-muted-foreground">
            صفحة {page} من {totalPages}
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            التالي
          </Button>
        </div>
      )}

      {/* Add/Edit Payment Form Modal */}
      <PaymentForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialData={editingPayment}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
