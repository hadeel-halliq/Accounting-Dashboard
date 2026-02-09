import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function BranchesCards({ data = [], onEdit, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="grid gap-4">

      {data.map((b) => (
        <div
          key={b.branchid}
          className="rounded-xl border bg-card p-4 space-y-3 shadow-sm"
        >

          <div>
            <p className="font-semibold text-lg">
              {b.branchname}
            </p>
            <p className="text-sm text-muted-foreground">
              {b.address}
            </p>
            <p className="text-sm text-muted-foreground">
              {b.phone}
            </p>
          </div>

          <p className="text-sm">
            {b.isactive ? "مفعل" : "غير مفعل"}
          </p>

          {/* أزرار */}
          <div className="flex flex-wrap gap-2">

            <Button
              size="sm"
              variant="secondary"
              onClick={() => navigate(`/branches/${b.branchid}`)}
            >
              عرض
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => onEdit(b)}
            >
              تعديل
            </Button>

            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete(b)}
            >
              حذف
            </Button>

          </div>

        </div>
      ))}
    </div>
  );
}
