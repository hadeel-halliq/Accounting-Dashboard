import { Button } from "@/components/ui/button";
import { usePermission } from "@/hooks/usePermission";

export default function ProductsCards({ data, onEdit, onDelete }) {
  const { has } = usePermission();

  return (
    <div className="space-y-4">

      {data.map((p) => (
        <div
          key={p.productid}
          className="border rounded-xl p-4 bg-card space-y-3"
        >
          <div className="font-bold">{p.name}</div>

          <div className="text-sm text-muted-foreground">
            السعر: {p.price}
          </div>

          <div className="text-sm text-muted-foreground">
            الكمية: {p.quantity}
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
