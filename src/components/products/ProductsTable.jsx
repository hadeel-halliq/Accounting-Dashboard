import { Button } from "@/components/ui/button";
import { usePermission } from "@/hooks/usePermission";

const UNIT_LABELS = {
  PIECE: "قطعة",
  DOZEN: "دزينة",
  BOX: "صندوق",
};

export default function ProductsTable({ data, onEdit, onDelete }) {
  const { has } = usePermission();

  if (!data.length) {
    return (
      <p className="text-center py-10 text-muted-foreground">
        لا يوجد منتجات
      </p>
    );
  }

  return (
    <div className="border rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="p-3 text-right">#</th>
            <th className="p-3 text-right">الاسم</th>
            <th className="p-3 text-right">الوحدة</th>
            <th className="p-3 text-right">سعر البيع</th>
            <th className="p-3 text-right">الكمية</th>
            <th className="p-3 text-center">الإجراءات</th>
          </tr>
        </thead>

        <tbody>
          {data.map((p) => (
            <tr key={p.productid} className="border-t">
              <td className="p-3">{p.productid}</td>
              <td className="p-3">{p.productname}</td>
              <td className="p-3">
                {UNIT_LABELS[p.minunit] || "-"}
              </td>
              <td className="p-3">{p.sellprice}</td>
              <td className="p-3">{p.stockquantity}</td>

              <td className="p-3 text-center">
                <div className="flex gap-2 justify-center">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
