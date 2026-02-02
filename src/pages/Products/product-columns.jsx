import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/helpers";

export const productColumns = [
  {
    key: "name",
    header: "الاسم",
    align: "right",
    render: (product) => <strong>{product.name}</strong>,
  },
  {
    key: "code",
    header: "الرمز",
    align: "right",
    render: (product) => (
      <span className="text-xs text-muted-foreground">{product.code}</span>
    ),
  },
  {
    key: "category",
    header: "الفئة",
    align: "right",
    render: (product) => product.category?.name || "-",
  },
  {
    key: "stock",
    header: "الكمية",
    align: "center",
    render: (product) => product.stock,
  },
  {
    key: "cost",
    header: "التكلفة",
    align: "center",
    render: (product) => formatCurrency(product.cost),
  },
  {
    key: "price",
    header: "سعر البيع",
    align: "center",
    render: (product) => formatCurrency(product.price),
  },
  {
    key: "status",
    header: "الحالة",
    align: "center",
    render: (product) => (
      <Badge
        variant={product.status === "active" ? "success" : "destructive"}
      >
        {product.status === "active" ? "فعال" : "غير فعال"}
      </Badge>
    ),
  },
];
