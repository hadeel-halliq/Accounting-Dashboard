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
import { updateProduct } from "@/services/products-service";
import { Edit } from "lucide-react";

export default function EditProductModal({ product, onUpdated }) {
  const [open, setOpen] = useState(false);

  async function handleSubmit(data) {
    try {
      await updateProduct(product.id, data);
      setOpen(false);
      if (onUpdated) onUpdated();
    } catch (err) {
      console.error("Failed to update product", err);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>تعديل المنتج</DialogTitle>
        </DialogHeader>

        <ProductForm
          defaultValues={{
            name: product.name,
            code: product.code,
            category_id: product.category_id,
            cost: product.cost,
            price: product.price,
            stock: product.stock,
            unit: product.unit,
          }}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
