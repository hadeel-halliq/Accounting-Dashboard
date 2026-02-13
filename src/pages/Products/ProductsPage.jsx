import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductsService from "@/services/products.service";
import CategoriesService from "@/services/categories.service";

import ProductsTable from "@/components/products/ProductsTable";
import ProductsCards from "@/components/products/ProductsCard";
import ProductFormDialog from "@/components/products/ProductFormDialog";
import Pagination from "@/components/common/Pagination";

import { Button } from "@/components/ui/button";

const LIMIT = 10;

export default function ProductsPage() {
  const [searchParams] = useSearchParams();

  const categoryId = searchParams.get("categoryId");
  const categoryName = searchParams.get("categoryName");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [categoriesList, setCategoriesList] = useState([]);
  /* ================= fetch ================= */

  const fetchProducts = async (p = page) => {
    try {
      setLoading(true);

      const params = {
        page: p,
        limit: LIMIT,
      };

      if (categoryId) {
        params.categoryid = categoryId;
      }

      const res = await ProductsService.list(params);

      setData(res.products || []);
      setTotalPages(res.totalPages || 1);
      setPage(res.page || 1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page, categoryId]);

  useEffect(() => {
    if (!categoryId) {
      CategoriesService.list({ page: 1, limit: 1000 })
        .then((res) => {
          setCategoriesList(res.categories || []);
        })
        .catch((err) => {
          console.log("Failed to load categories", err);
        });
    }
  }, [categoryId]);

  /* ================= handlers ================= */

  const handleCreate = () => {
    setEditing(null);
    setOpenForm(true);
  };

  const handleEdit = (row) => {
    setEditing(row);
    setOpenForm(true);
  };

  const handleDelete = async (row) => {
    if (!confirm("متأكد من الحذف؟")) return;

    await ProductsService.remove(row.productid);
    fetchProducts();
  };

  const handleSubmit = async (values) => {
    // const payload = {
    //   ...values,
    //   categoryid: categoryId,
    // };

    const payload = {
      ...values,
      categoryid: categoryId ? Number(categoryId) : Number(values.categoryid),
    };

    console.log("SENDING:", payload);

    if (editing) {
      await ProductsService.update(editing.productid, payload);
    } else {
      await ProductsService.create(payload);
    }

    setOpenForm(false);
    fetchProducts();
  };

  /* ================= UI ================= */

  return (
    <div dir="rtl" className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {categoryName ? `منتجات الصنف (${categoryName})` : "المنتجات"}
        </h1>

        <Button onClick={handleCreate}>إضافة منتج</Button>
      </div>

      {loading && <p className="text-center py-10">جاري التحميل...</p>}

      {!loading && (
        <>
          <div className="md:hidden">
            <ProductsCards
              data={data}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>

          <div className="hidden md:block">
            <ProductsTable
              data={data}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>

          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}

      {/* <ProductFormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleSubmit}
        initial={editing}
      /> */}

      <ProductFormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleSubmit}
        initial={editing}
        categoryId={categoryId}
        categories={categoriesList} // بدك تجيبهم
      />
    </div>
  );
}
