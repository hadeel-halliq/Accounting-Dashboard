import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function BranchesTable({ data, onEdit, onDelete }) {
  return (
    <div className="hidden md:block rounded-xl border bg-card overflow-x-auto">

      <Table dir="rtl">
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">اسم الفرع</TableHead>
            <TableHead className="text-right">العنوان</TableHead>
            <TableHead className="text-right">الهاتف</TableHead>
            <TableHead className="text-right">الحالة</TableHead>
            <TableHead className="text-left">إجراءات</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((b) => (
            <TableRow key={b.branchid}>
              <TableCell className="text-right font-medium">
                {b.branchname}
              </TableCell>

              <TableCell className="text-right">{b.address}</TableCell>
              <TableCell className="text-right">{b.phone}</TableCell>
              <TableCell className="text-right">
                {b.isactive ? "مفعل" : "غير مفعل"}
              </TableCell>

              <TableCell className="text-left space-x-2">
                <Button size="sm" variant="outline" onClick={() => onEdit(b)}>
                  تعديل
                </Button>
                <Button size="sm" variant="destructive" onClick={() => onDelete(b)}>
                  حذف
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </div>
  );
}
