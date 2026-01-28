// import { useEffect, useState } from "react";
// import {getProducts } from "@/services/products-service";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

// بيانات وهمية مؤقتة (بدل API)
const products = [
  {
    id: 1,
    name: "زيت طبخ",
    code: "PR-001",
    category: "مواد غذائية",
    stock: 120,
    cost: 8000,
    price: 10000,
    status: "active",
  },
  {
    id: 2,
    name: "زيت طبخ",
    code: "PR-001",
    category: "مواد غذائية",
    stock: 120,
    cost: 8000,
    price: 10000,
    status: "active",
  },
  {
    id: 3,
    name: "زيت طبخ",
    code: "PR-001",
    category: "مواد غذائية",
    stock: 120,
    cost: 8000,
    price: 10000,
    status: "active",
  },
  {
    id: 4,
    name: "زيت طبخ",
    code: "PR-001",
    category: "مواد غذائية",
    stock: 120,
    cost: 8000,
    price: 10000,
    status: "active",
  },
  {
    id: 5,
    name: "زيت طبخ",
    code: "PR-001",
    category: "مواد غذائية",
    stock: 120,
    cost: 8000,
    price: 10000,
    status: "active",
  },
  {
    id: 6,
    name: "زيت طبخ",
    code: "PR-001",
    category: "مواد غذائية",
    stock: 120,
    cost: 8000,
    price: 10000,
    status: "active",
  },
];

const columns = [
  { key: "name", label: "الاسم", width: "w-1/4" },
  { key: "code", label: "الرمز", width: "w-1/6" },
  { key: "category", label: "الصنف", width: "w-1/6" },
  { key: "stock", label: "الكمية", width: "w-1/12" },
  { key: "cost", label: "التكلفة", width: "w-1/12" },
  { key: "price", label: "سعر البيع", width: "w-1/12" },
  { key: "status", label: "الحالة", width: "w-1/12" },
];



export default function ProductsTable() {
    //   const [products, setProducts] = useState([]);
    //   const [loading, setLoading] = useState(true);
    
    //   useEffect(() => {
    //     async function loadProducts() {
    //       try {
    //         const res = await getProducts();
    //         setProducts(res.data);
    //       } catch (error) {
    //         console.error("Failed to load products", error);
    //       } finally {
    //         setLoading(false);
    //       }
    //     }
    
    //     loadProducts();
    //   }, []);
    
    //   if (loading) {
    //     return (
    //       <div className="p-6 text-center text-muted-foreground">
    //         جاري تحميل المنتجات...
    //       </div>
    //     );
    //   }
    
    //   if (products.length === 0) {
    //     return (
    //       <div className="p-6 text-center text-muted-foreground">
    //         لا يوجد منتجات
    //       </div>
    //     );
    //   }
    // api للتعامل مع 
    
  return (
    <div className="rounded-lg border bg-card">
      <Table dir="rtl">
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.key} className={`text-right ${col.width} py-6`}>
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              {columns.map((col) =>
                col.key === "status" ? (
                  <TableCell key={col.key} className={`text-right ${col.width}`}>
                    <Badge
                      variant={product.status === "active" ? "success" : "destructive"}
                    >
                      {product.status === "active" ? "فعال" : "غير فعال"}
                    </Badge>
                  </TableCell>
                ) : (
                  <TableCell key={col.key} className={`text-right ${col.width} py-6`}>
                    {product[col.key]}
                  </TableCell>
                )
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}