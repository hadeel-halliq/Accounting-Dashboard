import { Button } from "@/components/ui/button";

export default function CategoriesCards({ data, onEdit, onDelete }) {
  return (
    <div className="space-y-4">

      {data.map((c) => (
        <div
          key={c.categoryid}
          className="border rounded-xl bg-card p-4 space-y-3"
        >

          <div>
            <p className="font-semibold">{c.categoryname}</p>
            <p className="text-sm text-muted-foreground">
              {c.origincountry}
            </p>
            <p className="text-xs">
              الفرع: {c.branches?.branchname}
            </p>
          </div>

          <div className="flex gap-2">

            <Button size="sm" onClick={() => onEdit(c)}>
              تعديل
            </Button>

            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete(c)}
            >
              حذف
            </Button>

          </div>
        </div>
      ))}
    </div>
  );
}
