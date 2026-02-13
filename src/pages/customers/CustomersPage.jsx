import { useEffect, useState } from "react";
import CustomersService from "@/services/customers.service";
import CustomersTable from "@/components/customers/CustomersTable";
import CustomersCards from "@/components/customers/CustomersCards";
import CustomerFormDialog from "@/components/customers/CustomerFormDialog";
import DeleteCustomerDialog from "@/components/customers/DeleteCustomerDialog";
import { Button } from "@/components/ui/button";

const LIMIT = 10;

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [openForm, setOpenForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const [openDelete, setOpenDelete] = useState(false);
  const [deletingCustomer, setDeletingCustomer] = useState(null);

  const fetchCustomers = async (p = 1) => {
    const res = await CustomersService.list({ page: p, limit: LIMIT });
    setCustomers(res.customers);
    setTotalPages(res.totalPages);
  };

  useEffect(() => {
    document.title = "إدارة العملاء - السلام للمحاسبة";
  }, []);
  
  useEffect(() => {
    fetchCustomers(page);
  }, [page]);

  const handleSubmit = async (values) => {
    if (editingCustomer) {
      await CustomersService.update(editingCustomer.customerid, values);
    } else {
      await CustomersService.create(values);
    }

    setOpenForm(false);
    setEditingCustomer(null);
    fetchCustomers(page);
  };

  const handleDelete = async () => {
    await CustomersService.remove(deletingCustomer.customerid);
    setOpenDelete(false);
    fetchCustomers(page);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">العملاء</h1>
        <Button onClick={() => setOpenForm(true)}>إضافة عميل</Button>
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        <CustomersTable
          data={customers}
          onEdit={(c) => {
            setEditingCustomer(c);
            setOpenForm(true);
          }}
          onDelete={(c) => {
            setDeletingCustomer(c);
            setOpenDelete(true);
          }}
        />
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <CustomersCards
          data={customers}
          onEdit={(c) => {
            setEditingCustomer(c);
            setOpenForm(true);
          }}
          onDelete={(c) => {
            setDeletingCustomer(c);
            setOpenDelete(true);
          }}
        />
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-3">
        <Button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          السابق
        </Button>

        <span className="flex items-center">
          صفحة {page} من {totalPages}
        </span>

        <Button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          التالي
        </Button>
      </div>

      <CustomerFormDialog
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setEditingCustomer(null);
        }}
        onSubmit={handleSubmit}
        initial={editingCustomer}
      />

      <DeleteCustomerDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
