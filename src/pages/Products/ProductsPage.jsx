import { useEffect, useState } from "react";
import { usePermission } from "@/hooks/usePermission";

import ProductsService from "@/services/products.service";

import ProductsTable from "@/components/products/ProductsTable";
import ProductsCards from "@/components/products/ProductsCard";
import ProductFormDialog from "@/components/products/ProductFormDialog";

import { Button } from "@/components/ui/button";

/* ================================= */

export default function ProductsPage() {
  const { has } = usePermission();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState(null);

  /* ================= fetch ================= */

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await ProductsService.list({
        page: 1,
        limit: 100,
      });

      setProducts(res.products || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* ================= handlers ================= */

  const handleCreate = () => {
    setEditing(null);
    setOpenForm(true);
  };

  const handleEdit = (p) => {
    setEditing(p);
    setOpenForm(true);
  };

  const handleSubmit = async (values) => {
    if (editing) {
      await ProductsService.update(editing.productid, values);
    } else {
      await ProductsService.create(values);
    }

    setOpenForm(false);
    fetchProducts();
  };

  const handleDelete = async (p) => {
    if (!confirm("هل أنت متأكد من الحذف؟")) return;

    await ProductsService.remove(p.productid);
    fetchProducts();
  };

  /* ================= UI ================= */

  return (
    <div dir="rtl" className="space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">إدارة المنتجات</h1>

        {has("products", "add") && (
          <Button onClick={handleCreate}>
            إضافة منتج
          </Button>
        )}
      </div>

      {/* loading */}
      {loading && (
        <div className="text-center py-10 text-muted-foreground">
          جاري التحميل...
        </div>
      )}

      {/* desktop table */}
      {!loading && (
        <div className="hidden md:block">
          <ProductsTable
            data={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}

      {/* mobile cards */}
      {!loading && (
        <div className="md:hidden">
          <ProductsCards
            data={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}

      <ProductFormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleSubmit}
        initial={editing}
      />
    </div>
  );
}
