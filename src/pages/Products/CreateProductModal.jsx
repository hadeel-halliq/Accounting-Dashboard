import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ProductForm from "./ProductForm";
import { addProduct } from "@/services/products-service";

export default function CreateProductModal({ onCreated }) {
  const [open, setOpen] = useState(false);

  async function handleSubmit(data) {
    try {
      await addProduct(data); // إرسال للـ API
      setOpen(false);
      if (onCreated) onCreated(); // إعادة تحميل الجدول
    } catch (err) {
      console.error("Failed to create product", err);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>إضافة منتج</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>إضافة منتج جديد</DialogTitle>
        </DialogHeader>

        <ProductForm
          defaultValues={{
            name: "",
            code: "",
            category_id: null,
            cost: 0,
            price: 0,
            stock: 0,
            unit: "",
          }}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
