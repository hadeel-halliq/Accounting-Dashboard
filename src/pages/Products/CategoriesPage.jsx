import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

import CategoriesService from "@/services/categories.service";

import CategoriesTable from "@/components/categories/CategoriesTable";
import CategoriesCards from "@/components/categories/CategoriesCards";
import CategoryFormDialog from "@/components/categories/CategoryFormDialog";

import { Button } from "@/components/ui/button";
import Pagination from "@/components/common/Pagination";

const LIMIT = 10;

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const { user } = useAuth();

  const navigate = useNavigate();

  /* ================= fetch ================= */

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const res = await CategoriesService.list({
        page,
        limit: LIMIT,
      });

      setCategories(res.categories || []);
      setTotalPages(res.totalPages || 1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [page]);

  /* ================= handlers ================= */

  const handleCreate = () => {
    setEditing(null);
    setOpenForm(true);
  };

  const handleEdit = (c) => {
    setEditing(c);
    setOpenForm(true);
  };

  const handleSubmit = async (values) => {
    if (editing) {
      await CategoriesService.update(editing.categoryid, values);
    } else {
      await CategoriesService.create(values);
    }

    setOpenForm(false);
    fetchCategories();
  };

  /* ⭐️ الانتقال لمنتجات الصنف */
  const handleViewProducts = (row) => {
    navigate(
      `/products?categoryId=${row.categoryid}&categoryName=${row.categoryname}`,
    );
  };

  /* ================= UI ================= */

  return (
    <div dir="rtl" className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">التصنيفات</h1>
        <Button onClick={handleCreate}>إضافة صنف</Button>
      </div>

      {loading && <p className="text-center">جاري التحميل...</p>}

      {!loading && (
        <>
          <div className="hidden md:block">
            <CategoriesTable
              data={categories}
              onEdit={handleEdit}
              onViewProducts={handleViewProducts}
            />
          </div>

          <div className="md:hidden">
            <CategoriesCards
              data={categories}
              onEdit={handleEdit}
              onViewProducts={handleViewProducts}
            />
          </div>

          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}

      <CategoryFormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleSubmit}
        initial={editing}
      />
    </div>
  );
}
