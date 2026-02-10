import { Button } from "@/components/ui/button";

export default function PermissionsTable({
  data = [],
  loading,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <p className="text-center py-10 text-muted-foreground">جاري التحميل...</p>
    );
  }

  if (data.length === 0) {
    return (
      <p className="text-center py-10 text-muted-foreground">لا يوجد صلاحيات</p>
    );
  }

  return (
    <div className="rounded-xl border bg-card overflow-x-auto">
      <table className="w-full text-sm" dir="rtl">
        <thead className="border-b bg-muted/40">
          <tr>
            <th className="p-3 text-right">الجدول</th>
            <th className="p-3">عرض</th>
            <th className="p-3">إضافة</th>
            <th className="p-3">تعديل</th>
            <th className="p-3">حذف</th>
            <th className="p-3 text-center">الإجراءات</th>
          </tr>
        </thead>

        <tbody>
          {data.map((p) => (
            <tr key={p.permissionid} className="border-b text-center">
              <td className="p-3">{p.targettable}</td>

              <td className="p-3">{p.canprint ? "✓" : "X"}</td>

              <td className="p-3">{p.canadd ? "✓" : "X"}</td>
              <td className="p-3">{p.canedit ? "✓" : "X"}</td>
              <td className="p-3">{p.candelete ? "✓" : "X"}</td>

              <td className="p-3">
                <div className="flex gap-2 justify-center">
                  <Button size="sm" onClick={() => onEdit(p)}>
                    تعديل
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDelete(p)}
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
