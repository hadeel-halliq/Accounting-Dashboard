import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function BranchesTable({ data, onEdit, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border bg-card overflow-x-auto">

      <table className="w-full text-sm" dir="rtl">
        <thead className="border-b">
          <tr>
            <th className="text-right p-3">اسم الفرع</th>
            <th className="text-right p-3">العنوان</th>
            <th className="text-right p-3">الهاتف</th>
            <th className="text-right p-3">الحالة</th>
            <th className="text-left p-3">الإجراءات</th>
          </tr>
        </thead>

        <tbody>
          {data.map((b) => (
            <tr key={b.branchid} className="border-b">

              <td className="p-3">{b.branchname}</td>
              <td className="p-3">{b.address}</td>
              <td className="p-3">{b.phone}</td>
              <td className="p-3">
                {b.isactive ? "مفعل" : "غير مفعل"}
              </td>

              <td className="p-3">
                <div className="flex gap-2">

                  <Button
                    size="sm"
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
              </td>

            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
