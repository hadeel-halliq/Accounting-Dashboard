import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function DeleteInvoiceDialog({
  open,
  onClose,
  onConfirm,
  invoiceId,
}) {
  const handleDelete = async () => {
    await onConfirm();
    onClose(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent dir="rtl">
        <AlertDialogHeader className="text-right">
          <AlertDialogTitle>حذف الفاتورة</AlertDialogTitle>
          <AlertDialogDescription>
            هل أنت متأكد من حذف الفاتورة
            <span className="font-bold"> #{invoiceId} </span>؟
            <br />
            لا يمكن التراجع بعد الحذف.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row-reverse gap-2">
          <AlertDialogCancel>إلغاء</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-white"
          >
            حذف
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
