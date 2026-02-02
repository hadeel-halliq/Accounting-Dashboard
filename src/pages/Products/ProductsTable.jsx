import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "@/services/products-service";
import { usePermissions } from "@/context/PermissionContext";
import { Button } from "@/components/ui/button";
import CreateProductModal from "./CreateProductModal";
import EditProductModal from "./EditProductModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { productColumns } from "./product-columns.jsx";

/* ==============================
   Mock Data (للتجربة بدون Backend)
============================== */
const mockProducts = [
  {
    id: 1,
    name: "منظف أرضيات",
    code: "CLN-001",
    category: { id: 1, name: "مواد تنظيف" },
    stock: 120,
    cost: 5000,
    price: 6500,
    status: "active",
  },
  {
    id: 2,
    name: "دفتر A4",
    code: "ST-010",
    category: { id: 2, name: "أدوات مكتبية" },
    stock: 300,
    cost: 1500,
    price: 2500,
    status: "inactive",
  },
];

export default function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const permissions = usePermissions();

  /* ==============================
     Load Products (API + Mock fallback)
  ============================== */
  const loadProducts = async () => {
    try {
      setLoading(true);

      setProducts(mockProducts); // fallback
      // const res = await getProducts();
      // const data = Array.isArray(res.data)
      //   ? res.data
      //   : Array.isArray(res.data?.data)
      //   ? res.data.data
      //   : [];

      // setProducts(data);
    } catch (error) {
      console.error("Failed to load products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  /* ==============================
     Handle Update (Edit)
  ============================== */
  const handleUpdate = (id, updatedData) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
    );
  };

  /* ==============================
     Handle Delete (with API)
  ============================== */
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id); // 🔹 API call
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Failed to delete product", err);
    }
  };

  /* ==============================
     Actions Column
  ============================== */
  const actionsColumn = {
    key: "actions",
    header: "إجراءات",
    align: "center",
    render: (product) => (
      <div className="flex justify-center gap-2">
        {permissions.canEditProduct && (
          <EditProductModal
            product={product}
            onUpdated={(data) => handleUpdate(product.id, data)}
          />
        )}
        {permissions.canDeleteProduct && (
          <ConfirmDeleteModal onConfirm={() => handleDelete(product.id)}>
            <Button size="sm" variant="destructive">
              حذف
            </Button>
          </ConfirmDeleteModal>
        )}
      </div>
    ),
  };

  const tableColumns = [...productColumns, actionsColumn];

  if (loading) {
    return <p>جارٍ تحميل المنتجات...</p>;
  }

  /* ==============================
     Render Table
  ============================== */
  return (
    <div className="space-y-4" dir="rtl">
      {permissions.canCreateProduct && (
        <CreateProductModal onCreated={loadProducts} />
      )}

      <table className="w-full border border-border rounded-xl overflow-hidden">
        <thead className="bg-muted text-sm">
          <tr>
            {tableColumns.map((col) => (
              <th
                key={col.key}
                className={`p-3 font-medium ${
                  col.align === "center" ? "text-center" : "text-right"
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td
                colSpan={tableColumns.length}
                className="py-8 text-center text-muted-foreground"
              >
                لا يوجد منتجات
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr
                key={product.id}
                className="border-t transition-colors hover:bg-muted/40"
              >
                {tableColumns.map((col) => (
                  <td
                    key={col.key}
                    className={`p-3 ${
                      col.align === "center" ? "text-center" : "text-right"
                    }`}
                  >
                    {col.render(product)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}


