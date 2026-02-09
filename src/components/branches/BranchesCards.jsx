import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function BranchesCards({ data, onEdit, onDelete }) {
  return (
    <div className="grid gap-4 md:hidden">
      {data.map((b) => (
        <Card key={b.branchid}>
          <CardContent className="p-4 space-y-2 text-right">

            <div>
              <p className="text-xs text-muted-foreground">اسم الفرع</p>
              <p className="font-medium">{b.branchname}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">العنوان</p>
              <p>{b.address}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">رقم الهاتف</p>
              <p>{b.phone}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">الحالة</p>
              <p>{b.isactive ? "مفعل" : "غير مفعل"}</p>
            </div>

            <div className="flex justify-start gap-2 pt-2">
              <Button size="sm" variant="outline" onClick={() => onEdit(b)}>
                تعديل
              </Button>
              <Button size="sm" variant="destructive" onClick={() => onDelete(b)}>
                حذف
              </Button>
            </div>

          </CardContent>
        </Card>
      ))}
    </div>
  );
}
