import { useEffect, useState } from "react";

import BranchesService from "@/services/branches.service";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import BranchesTable from "@/components/branches/BranchesTable";
import BranchesCards from "@/components/branches/BranchesCards";
import BranchFormDialog from "@/components/branches/BranchFormDialog";
import DeleteBranchDialog from "@/components/branches/DeleteBranchDialog";
import Pagination from "@/components/common/Pagination";

export default function BranchesPage() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selected, setSelected] = useState(null);

  const LIMIT = 10;

  /* ==============================
     Fetch (SERVER PAGINATION)
  ============================== */

  const fetchBranches = async (p = 1) => {
    try {
      setLoading(true);

      const data = await BranchesService.list({
        page: p,
        limit: LIMIT,
      });

      setBranches(data.branches);
      setTotalPages(data.totalPages || 1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches(page);
  }, [page]);

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
    fetchBranches(page);
  };

  const handleDelete = async () => {
    await BranchesService.remove(selected.branchid);

    setOpenDelete(false);
    fetchBranches(page);
  };

  /* ==============================
     UI
  ============================== */

  return (
    <div dir="rtl" className="space-y-6">

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">إدارة الفروع</h1>

        <Button onClick={openCreate} className="gap-2">
          <Plus size={16} />
          إضافة فرع
        </Button>
      </div>

      {loading && (
        <div className="text-center py-16 text-muted-foreground">
          جاري التحميل...
        </div>
      )}

      {!loading && (
        <>
          <div className="md:hidden">
            <BranchesCards
              data={branches}
              onEdit={openEdit}
              onDelete={openDeleteDialog}
            />
          </div>

          <div className="hidden md:block">
            <BranchesTable
              data={branches}
              onEdit={openEdit}
              onDelete={openDeleteDialog}
            />
          </div>

          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={setPage}
          />
        </>
      )}

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
