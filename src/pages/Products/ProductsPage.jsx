import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import ProductsTable from "./ProductsTable";

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button><Plus className="mr-2 h-4 w-4"/></Button>
        <h1 className="text-2xl font-bold">المنتجات</h1>
      </div>
      <ProductsTable/>
    </div>
  )
}

