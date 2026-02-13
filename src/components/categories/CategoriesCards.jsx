import { Button } from "@/components/ui/button";

export default function CategoriesCards({ data, onEdit, onViewProducts }) {
  return (
    <div className="grid gap-4">
      {data.map((c) => (
        <div key={c.categoryid} className="border rounded-xl p-4 space-y-3">
          <div>
            <p className="font-semibold">{c.categoryname}</p>
            <p className="text-sm">{c.origincountry}</p>
            <p className="text-xs">{c.isactive ? "مفعل" : "معطل"}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button size="sm" onClick={() => onViewProducts(c)}>
              المنتجات
            </Button>

            <Button size="sm" onClick={() => onEdit(c)}>
              تعديل
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
