import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function BranchesCards({ data = [], onEdit, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="grid gap-4">
      {data.map((b) => (
        <div key={b.branchid} className="rounded-xl border bg-card p-4 space-y-3 shadow-sm relative overflow-hidden">
          {/* Tag لرقم الفرع */}
          <div className="absolute top-0 left-0 bg-blue-600 text-white px-3 py-1 text-xs rounded-br-lg font-mono">
            ID: {b.branchid}
          </div>

          <div className="pt-2">
            <h3 className="font-bold text-lg">{b.branchname}</h3>
            <p className="text-sm text-muted-foreground">{b.address}</p>
            <p className="text-sm font-mono">{b.phone}</p>
          </div>

          <div className="flex gap-2 border-t pt-3">
            <Button size="sm" className="flex-1" variant="secondary" onClick={() => navigate(`/branches/${b.branchid}`)}>عرض</Button>
            <Button size="sm" className="flex-1" variant="outline" onClick={() => onEdit(b)}>تعديل</Button>
            <Button size="sm" className="flex-1" variant="destructive" onClick={() => onDelete(b)}>حذف</Button>
          </div>
        </div>
      ))}
    </div>
  );
}