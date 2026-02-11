import { useEffect, useState } from "react";
import { usePermission } from "@/hooks/usePermission";
import { useAuth } from "@/hooks/useAuth";

import CategoriesService from "@/services/categories.service";

import CategoriesTable from "@/components/categories/CategoriesTable";
import CategoriesCards from "@/components/categories/CategoriesCards";
import CategoryFormDialog from "@/components/categories/CategoryFormDialog";

import { Button } from "@/components/ui/button";

const LIMIT = 10;

/* ======================================= */

export default function CategoriesPage() {
  const { has } = usePermission();
  const { user } = useAuth();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState(null);

  /* ================= fetch ================= */

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const res = await CategoriesService.list({
        page: 1,
        limit: LIMIT,
        branchid: user.branchid, // 🔥 مهم
      });

      setCategories(res.categories || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchCategories();
  }, [user]);

  /* ================= handlers ================= */

  const handleSubmit = async (values) => {
    const payload = {
      ...values,
      branchid: user.branchid,
    };

    if (editing) {
      await CategoriesService.update(editing.categoryid, payload);
    } else {
      await CategoriesService.create(payload);
    }

    setOpenForm(false);
    setEditing(null);
    fetchCategories();
  };

  const handleDelete = async (c) => {
    await CategoriesService.remove(c.categoryid);
    fetchCategories();
  };

  /* ================= UI ================= */

  return (
    <div dir="rtl" className="space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">التصنيفات</h1>

        {has("categories", "add") && (
          <Button onClick={() => setOpenForm(true)}>
            إضافة تصنيف
          </Button>
        )}
      </div>

      {loading && <p className="text-center">جاري التحميل...</p>}

      {!loading && (
        <>
          {/* table */}
          <div className="hidden md:block">
            <CategoriesTable
              data={categories}
              onEdit={(c) => {
                setEditing(c);
                setOpenForm(true);
              }}
              onDelete={handleDelete}
            />
          </div>

          {/* cards */}
          <div className="md:hidden">
            <CategoriesCards
              data={categories}
              onEdit={(c) => {
                setEditing(c);
                setOpenForm(true);
              }}
              onDelete={handleDelete}
            />
          </div>
        </>
      )}

      <CategoryFormDialog
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setEditing(null);
        }}
        onSubmit={handleSubmit}
        initial={editing}
      />
    </div>
  );
}
