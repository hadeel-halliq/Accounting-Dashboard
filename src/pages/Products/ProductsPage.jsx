// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import CategoriesService from "@/services/categories.service";

// import CategoriesTable from "@/components/categories/CategoriesTable";
// import CategoriesCards from "@/components/categories/CategoriesCards";
// import CategoryFormDialog from "@/components/categories/CategoryFormDialog";
// import Pagination from "@/components/common/Pagination";

// import { Button } from "@/components/ui/button";

// const LIMIT = 10;

// export default function CategoriesPage() {
//   const navigate = useNavigate();

//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const [open, setOpen] = useState(false);
//   const [editing, setEditing] = useState(null);

//   /* ================= fetch ================= */

//   const fetchCategories = async (p = page) => {
//     try {
//       setLoading(true);

//       const res = await CategoriesService.list({
//         page: p,
//         limit: LIMIT,
//       });

//       setData(res.categories || []);
//       setTotalPages(res.totalPages || 1);
//       setPage(res.page || 1);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategories(page);
//   }, [page]);

//   /* ================= handlers ================= */

//   const handleCreate = () => {
//     setEditing(null);
//     setOpen(true);
//   };

//   const handleEdit = (row) => {
//     setEditing(row);
//     setOpen(true);
//   };

//   const handleDelete = async (row) => {
//     if (!confirm("هل أنت متأكد من الحذف؟")) return;

//     await CategoriesService.remove(row.categoryid);
//     fetchCategories();
//   };

//   const handleSubmit = async (values) => {
//     if (editing) {
//       await CategoriesService.update(editing.categoryid, values);
//     } else {
//       await CategoriesService.create(values);
//     }

//     setOpen(false);
//     fetchCategories();
//   };

//   const goToProducts = (row) => {
//     // ✅ ينتقل لمنتجات الصنف
//     navigate(`/products?category=${row.categoryid}&name=${row.categoryname}`);
//   };

//   /* ================= UI ================= */

//   return (
//     <div dir="rtl" className="space-y-6">

//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">الأصناف</h1>

//         <Button onClick={handleCreate}>
//           إضافة صنف
//         </Button>
//       </div>

//       {loading && <p className="text-center py-10">جاري التحميل...</p>}

//       {!loading && (
//         <>
//           <div className="md:hidden">
//             <CategoriesCards
//               data={data}
//               onEdit={handleEdit}
//               onDelete={handleDelete}
//               onProducts={goToProducts}
//             />
//           </div>

//           <div className="hidden md:block">
//             <CategoriesTable
//               data={data}
//               onEdit={handleEdit}
//               onDelete={handleDelete}
//               onProducts={goToProducts}
//             />
//           </div>

//           <Pagination
//             page={page}
//             totalPages={totalPages}
//             onChange={setPage}
//           />
//         </>
//       )}

//       <CategoryFormDialog
//         open={open}
//         onClose={() => setOpen(false)}
//         onSubmit={handleSubmit}
//         initial={editing}
//       />
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductsService from "@/services/products.service";

import ProductsTable from "@/components/products/ProductsTable";
import ProductsCards from "@/components/products/ProductsCard";
import Pagination from "@/components/common/Pagination";

const LIMIT = 10;

export default function ProductsPage() {
  /* =============================
     🔥  NEW: قراءة query params
  ============================= */
  const [searchParams] = useSearchParams();

  const categoryId = searchParams.get("categoryId");
  const categoryName = searchParams.get("categoryName");

  /* ================= state ================= */

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  /* ================= fetch ================= */

  const fetchProducts = async (p = page) => {
    try {
      setLoading(true);

      const params = {
        page: p,
        limit: LIMIT,
      };

      /* =====================================
         🔥 فلترة حسب الصنف إذا موجود
      ===================================== */
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

  /* ============================= */

  useEffect(() => {
    fetchProducts(page);
  }, [page, categoryId]); // 🔥 مهم جداً يعيد التحميل عند تغير الصنف

  /* ================= UI ================= */

  return (
    <div dir="rtl" className="space-y-6">

      {/* =====================================
         🔥 العنوان ديناميكي
      ===================================== */}
      <h1 className="text-2xl font-bold">
        {categoryName
          ? `منتجات (${categoryName})`
          : "المنتجات"}
      </h1>

      {loading && (
        <p className="text-center py-10">جاري التحميل...</p>
      )}

      {!loading && (
        <>
          <div className="md:hidden">
            <ProductsCards data={data} />
          </div>

          <div className="hidden md:block">
            <ProductsTable data={data} />
          </div>

          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={setPage}
          />
        </>
      )}
    </div>
  );
}
