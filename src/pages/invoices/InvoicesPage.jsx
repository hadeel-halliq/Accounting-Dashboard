// import { useEffect, useState } from "react";

// import InvoicesService from "@/services/invoices.service";
// import CustomersService from "@/services/customers.service";

// import { Button } from "@/components/ui/button";
// import { Plus } from "lucide-react";

// import InvoicesTable from "@/components/invoices/InvoicesTable";
// import CreateInvoiceDialog from "@/components/invoices/CreateInvoiceDialog";
// import DeleteInvoiceDialog from "@/components/invoices/DeleteInvoiceDialog";
// import { getCustomerLabel } from "@/components/invoices/InvoiceForm";
// import Pagination from "@/components/common/Pagination";

// const LIMIT = 10;

// export default function InvoicesPage() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const [openForm, setOpenForm] = useState(false);
//   const [openDelete, setOpenDelete] = useState(false);
//   const [editingInvoiceId, setEditingInvoiceId] = useState(null);
//   const [selected, setSelected] = useState(null);

//   const [customerNames, setCustomerNames] = useState({});

//   useEffect(() => {
//     document.title = "إدارة الفواتير - السلام للمحاسبة";
//   }, []);

//   const fetchInvoices = async (p = page) => {
//     try {
//       setLoading(true);
//       const res = await InvoicesService.list({
//         page: p,
//         limit: LIMIT,
//       });
//       setData(res?.invoices ?? []);
//       setTotalPages(res?.totalPages ?? 1);
//       setPage(res?.page ?? p);
//     } catch (e) {
//       setData([]);
//       setTotalPages(1);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchInvoices(page);
//   }, [page]);

//   useEffect(() => {
//     let cancelled = false;
//     CustomersService.list({})
//       .then((res) => {
//         if (cancelled) return;
//         const list = Array.isArray(res) ? res : (res?.customers ?? []);
//         const map = {};
//         list.forEach((c) => {
//           const id = c.customerid ?? c.id;
//           if (id != null) map[id] = getCustomerLabel(c);
//         });
//         setCustomerNames(map);
//       })
//       .catch(() => {});
//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   const openCreate = () => {
//     setEditingInvoiceId(null);
//     setOpenForm(true);
//   };

//   const openEdit = (inv) => {
//     setEditingInvoiceId(inv.invoiceid);
//     setOpenForm(true);
//   };

//   const handleSubmit = async (payload, invoiceId) => {
//     if (invoiceId != null) {
//       await InvoicesService.update(invoiceId, payload);
//     } else {
//       await InvoicesService.create(payload);
//     }
//     setOpenForm(false);
//     setEditingInvoiceId(null);
//     fetchInvoices(page);
//   };

//   const handleStatusChange = async (inv, newStatus) => {
//     try {
//       await InvoicesService.update(inv.invoiceid, { status: newStatus });
//       fetchInvoices(page);
//     } catch (e) {
//       // Optionally toast or set error state
//     }
//   };

//   const openDeleteDialog = (inv) => {
//     setSelected(inv);
//     setOpenDelete(true);
//   };

//   const handleDelete = async () => {
//     if (!selected) return;
//     await InvoicesService.remove(selected.invoiceid);
//     setOpenDelete(false);
//     setSelected(null);
//     fetchInvoices(page);
//   };

//   return (
//     <div dir="rtl" className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold">إدارة الفواتير</h1>
//         <Button onClick={openCreate} className="gap-2">
//           <Plus size={16} />
//           إضافة فاتورة
//         </Button>
//       </div>

//       {loading && (
//         <div className="text-center py-16 text-muted-foreground">
//           جاري التحميل...
//         </div>
//       )}

//       {!loading && (
//         <>
//           <InvoicesTable
//             data={data}
//             onEdit={openEdit}
//             onDelete={openDeleteDialog}
//             onStatusChange={handleStatusChange}
//             customerNames={customerNames}
//           />

//           {totalPages > 1 && (
//             <Pagination
//               page={page}
//               totalPages={totalPages}
//               onChange={setPage}
//             />
//           )}
//         </>
//       )}

//       <CreateInvoiceDialog
//         open={openForm}
//         onClose={() => {
//           setOpenForm(false);
//           setEditingInvoiceId(null);
//         }}
//         onSubmit={handleSubmit}
//         editingInvoiceId={editingInvoiceId}
//       />

//       <DeleteInvoiceDialog
//         open={openDelete}
//         onClose={() => setOpenDelete(false)}
//         onConfirm={handleDelete}
//         invoiceId={selected?.invoiceid}
//       />
//     </div>
//   );
// }

import { useEffect, useState } from "react";

import InvoicesService from "@/services/invoices.service";
import CustomersService from "@/services/customers.service";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import InvoicesTable from "@/components/invoices/InvoicesTable";
import CreateInvoiceDialog from "@/components/invoices/CreateInvoiceDialog";
import DeleteInvoiceDialog from "@/components/invoices/DeleteInvoiceDialog";
import { getCustomerLabel } from "@/components/invoices/InvoiceForm";
import Pagination from "@/components/common/Pagination";

const LIMIT = 10;

export default function InvoicesPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [editingInvoiceId, setEditingInvoiceId] = useState(null);
  const [selected, setSelected] = useState(null);

  const [customerNames, setCustomerNames] = useState({});

  useEffect(() => {
    document.title = "إدارة الفواتير - السلام للمحاسبة";
  }, []);

  const fetchInvoices = async (p = page) => {
    try {
      setLoading(true);
      const res = await InvoicesService.list({
        page: p,
        limit: LIMIT,
      });
      setData(res?.invoices ?? []);
      setTotalPages(res?.totalPages ?? 1);
      setPage(res?.page ?? p);
    } catch (e) {
      setData([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices(page);
  }, [page]);

  useEffect(() => {
    let cancelled = false;
    CustomersService.list({})
      .then((res) => {
        if (cancelled) return;
        const list = Array.isArray(res) ? res : (res?.customers ?? []);
        const map = {};
        list.forEach((c) => {
          const id = c.customerid ?? c.id;
          if (id != null) map[id] = getCustomerLabel(c);
        });
        setCustomerNames(map);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const openCreate = () => {
    setEditingInvoiceId(null);
    setOpenForm(true);
  };

  const openEdit = (inv) => {
    setEditingInvoiceId(inv.invoiceid);
    setOpenForm(true);
  };

  const handleSubmit = async (payload, invoiceId) => {
    if (invoiceId != null) {
      await InvoicesService.update(invoiceId, payload);
    } else {
      await InvoicesService.create(payload);
    }
    setOpenForm(false);
    setEditingInvoiceId(null);
    fetchInvoices(page);
  };

  const handleStatusChange = async (inv, newStatus) => {
    try {
      await InvoicesService.update(inv.invoiceid, { status: newStatus });
      fetchInvoices(page);
    } catch (e) {
      // Optionally toast or set error state
    }
  };

  const openDeleteDialog = (inv) => {
    setSelected(inv);
    setOpenDelete(true);
  };

  const handleDelete = async () => {
    if (!selected) return;
    await InvoicesService.remove(selected.invoiceid);
    setOpenDelete(false);
    setSelected(null);
    fetchInvoices(page);
  };

  return (
    <div dir="rtl" className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">إدارة الفواتير</h1>
        <Button onClick={openCreate} className="gap-2">
          <Plus size={16} />
          إضافة فاتورة
        </Button>
      </div>

      {loading && (
        <div className="text-center py-16 text-muted-foreground">
          جاري التحميل...
        </div>
      )}

      {!loading && (
        <>
          <InvoicesTable
            data={data}
            onEdit={openEdit}
            onDelete={openDeleteDialog}
            onStatusChange={handleStatusChange}
            customerNames={customerNames}
          />

          {totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={setPage}
            />
          )}
        </>
      )}

      <CreateInvoiceDialog
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setEditingInvoiceId(null);
        }}
        onSubmit={handleSubmit}
        editingInvoiceId={editingInvoiceId}
      />

      <DeleteInvoiceDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
        invoiceId={selected?.invoiceid}
      />
    </div>
  );
}