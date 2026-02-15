import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";

import ReturnsService from "@/services/returns.service";
import ReturnsTable from "@/components/returns/ReturnsTable";
import ReturnForm from "@/components/returns/ReturnForm";
import { Button } from "@/components/ui/button";

/**
 * ReturnsPage - Container Component (المرتجعات)
 * Manages state and data fetching for the Returns module
 */
export default function ReturnsPage() {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const LIMIT = 10;

  useEffect(() => {
    document.title = "إدارة المرتجعات - السلام للمحاسبة";
    fetchReturns();
  }, [page]);

  const fetchReturns = async () => {
    try {
      setLoading(true);
      const response = await ReturnsService.getAll({ page, limit: LIMIT });
      const list = response?.returns ?? response?.data ?? response ?? [];
      setReturns(Array.isArray(list) ? list : []);
      setTotalPages(response?.totalPages ?? 1);
    } catch (error) {
      console.error("Failed to fetch returns:", error);
      toast.error("فشل في تحميل المرتجعات");
      setReturns([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSuccess = () => {
    fetchReturns();
  };

  const handleDelete = async (ret) => {
    const id = ret.returnid ?? ret.id;
    if (!window.confirm(`هل أنت متأكد من حذف المرتجع #${id}؟`)) {
      return;
    }

    try {
      await ReturnsService.remove(id);
      toast.success("تم حذف المرتجع بنجاح");
      fetchReturns();
    } catch (error) {
      console.error("Failed to delete return:", error);
      toast.error("فشل في حذف المرتجع");
    }
  };

  const handleStatusUpdate = async (ret, newStatus) => {
    const id = ret.returnid ?? ret.id;
    try {
      await ReturnsService.updateStatus(id, { status: newStatus });
      toast.success("تم تحديث الحالة بنجاح");
      fetchReturns();
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("فشل في تحديث الحالة");
    }
  };

  return (
    <div dir="rtl" className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">إدارة المرتجعات</h1>
        <Button onClick={handleCreate} className="gap-2">
          <Plus size={16} />
          إضافة مرتجع
        </Button>
      </div>

      {/* Returns Table */}
      <ReturnsTable
        data={returns}
        loading={loading}
        onDelete={handleDelete}
        onStatusChange={handleStatusUpdate}
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

      {/* Create Return Form Modal */}
      <ReturnForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
