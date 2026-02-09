import { useEffect, useState } from "react";

import BranchesService from "@/services/branches.service";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import BranchesTable from "@/components/branches/BranchesTable";
import BranchesCards from "@/components/branches/BranchesCards";
import BranchFormDialog from "@/components/branches/BranchFormDialog";
import DeleteBranchDialog from "@/components/branches/DeleteBranchDialog";

export default function BranchesPage() {
  /* ==============================
     State
  ============================== */

  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [selected, setSelected] = useState(null);

  /* ==============================
     Fetch branches
  ============================== */

  const fetchBranches = async () => {
    try {
      setLoading(true);
      const data = await BranchesService.list();
      setBranches(data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  /* ==============================
     Handlers
  ============================== */

  const openCreate = () => {
    setSelected(null);
    setOpenForm(true);
  };

  const openEdit = (branch) => {
    setSelected(branch);
    setOpenForm(true);
  };

  const openDeleteDialog = (branch) => {
    setSelected(branch);
    setOpenDelete(true);
  };

  const handleSubmit = async (values) => {
    if (selected) {
      await BranchesService.update(selected.branchid, values);
    } else {
      await BranchesService.create(values);
    }

    setOpenForm(false);
    fetchBranches();
  };

  const handleDelete = async () => {
    await BranchesService.remove(selected.branchid);
    setOpenDelete(false);
    fetchBranches();
  };

  /* ==============================
     UI
  ============================== */

  return (
    <div dir="rtl" className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">

        <h1 className="text-2xl font-bold">
          إدارة الفروع
        </h1>

        <Button onClick={openCreate} className="gap-2">
          <Plus size={16} />
          إضافة فرع
        </Button>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-muted-foreground text-center py-10">
          جاري التحميل...
        </p>
      )}

      {/* Empty state */}
      {!loading && branches.length === 0 && (
        <p className="text-muted-foreground text-center py-10">
          لا يوجد فروع بعد
        </p>
      )}

      {/* Content */}
      {!loading && branches.length > 0 && (
        <>
          {/* 📱 Mobile Cards */}
          <BranchesCards
            data={branches}
            onEdit={openEdit}
            onDelete={openDeleteDialog}
          />

          {/* 💻 Desktop Table */}
          <BranchesTable
            data={branches}
            onEdit={openEdit}
            onDelete={openDeleteDialog}
          />
        </>
      )}

      {/* Dialogs */}
      <BranchFormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleSubmit}
        initial={selected}
      />

      <DeleteBranchDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
        name={selected?.branchname}
      />
    </div>
  );
}
