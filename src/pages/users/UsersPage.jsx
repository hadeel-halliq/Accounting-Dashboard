import { useEffect, useState } from "react";

import UsersService from "@/services/users.service";
import AuthService from "@/services/auth.service";

import UsersTable from "@/components/users/UsersTable";
import UsersCards from "@/components/users/UsersCards";
import Pagination from "@/components/common/Pagination";
import UserEditDialog from "@/components/users/UserEditDialog";
import UserCreateDialog from "@/components/users/UserCreateDialog";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function UsersPage() {
  /* ================= State ================= */

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selected, setSelected] = useState(null);

  const [openEdit, setOpenEdit] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const LIMIT = 10;

  useEffect(() => {
    document.title = "إدارة الموظفين - السلام للمحاسبة";
  }, []);

  /* ================= Fetch ================= */

  const fetchUsers = async (p = page) => {
    try {
      setLoading(true);

      const res = await UsersService.list({
        page: p,
        limit: LIMIT,
      });

      setUsers(res.users || []);
      setTotalPages(res.totalPages || 1);
      setPage(res.page || p);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  /* ================= Handlers ================= */

  const handleToggle = async (user) => {
    await UsersService.toggleActive(user.userid, !user.isactive);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setSelected(user);
    setOpenEdit(true);
  };

  const handleEditSubmit = async (values) => {
    await UsersService.update(selected.userid, values);
    setOpenEdit(false);
    fetchUsers();
  };

  const handleCreateSubmit = async (values) => {
    await AuthService.registerAdmin(values);
    setOpenCreate(false);
    fetchUsers();
  };

  /* ================= UI ================= */

  return (
    <div dir="rtl" className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-3">
        <h1 className="text-2xl font-bold">إدارة المستخدمين</h1>

        <Button onClick={() => setOpenCreate(true)} className="gap-2">
          <Plus size={16} />
          إضافة مستخدم
        </Button>
      </div>

      {loading && (
        <div className="text-center py-12 text-muted-foreground">
          جاري التحميل...
        </div>
      )}

      {!loading && users.length > 0 && (
        <>
          <div className="md:hidden">
            <UsersCards
              data={users}
              onEdit={handleEdit}
              onToggle={handleToggle}
            />
          </div>

          <div className="hidden md:block">
            <UsersTable
              data={users}
              onEdit={handleEdit}
              onToggle={handleToggle}
            />
          </div>

          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}

      {/* Dialogs */}
      <UserEditDialog
        open={openEdit}
        user={selected}
        onClose={() => setOpenEdit(false)}
        onSubmit={handleEditSubmit}
      />

      <UserCreateDialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onSubmit={handleCreateSubmit}
      />
    </div>
  );
}
