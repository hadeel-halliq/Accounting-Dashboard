import { Button } from "@/components/ui/button";
import { usePermission } from "@/hooks/usePermission";

const UNIT_LABELS = {
  PIECE: "قطعة",
  DOZEN: "دزينة",
  BOX: "صندوق",
};

export default function ProductsCards({ data, onEdit, onDelete }) {
  const { has } = usePermission();

  return (
    <div className="space-y-4">
      {data.map((p) => (
        <div
          key={p.productid}
          className="border rounded-xl p-4 bg-card space-y-3"
        >
          <div className="font-bold">{p.productname}</div>

          <div className="text-sm text-muted-foreground">
            الوحدة: {UNIT_LABELS[p.minunit] || "-"}
          </div>

          <div className="text-sm text-muted-foreground">
            سعر البيع: {p.sellprice}
          </div>

          <div className="text-sm text-muted-foreground">
            الكمية: {p.stockquantity}
          </div>

          <div className="text-sm text-muted-foreground">
            الصنف: {p.categories?.categoryname}
          </div>

          <div className="flex gap-2">
            {has("products", "edit") && (
              <Button size="sm" onClick={() => onEdit(p)}>
                تعديل
              </Button>
            )}

            {has("products", "delete") && (
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDelete(p)}
              >
                حذف
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
