import { useEffect, useState } from "react";
import UsersService from "@/services/users.service";

import UsersTable from "@/components/users/UsersTable";
import UsersCards from "@/components/users/UsersCards";

import ResetPasswordDialog from "@/components/users/ResetPasswordDialog";

export default function UsersPage() {
  /* ==============================
     State
  ============================== */

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openForm, setOpenForm] = useState(false);
  const [openReset, setOpenReset] = useState(false);

  const [selected, setSelected] = useState(null);

  /* ==============================
     Fetch
  ============================== */

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await UsersService.list();
      setUsers(data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ==============================
     Handlers
  ============================== */

  const openCreate = () => {
    setSelected(null);
    setOpenForm(true);
  };

  const openEdit = (user) => {
    setSelected(user);
    setOpenForm(true);
  };

  const openResetDialog = (user) => {
    setSelected(user);
    setOpenReset(true);
  };

  const handleSubmit = async (values) => {
    if (selected) {
      await UsersService.update(selected.userid, values);
    } else {
      await UsersService.create(values);
    }

    setOpenForm(false);
    fetchUsers();
  };

  const handleToggle = async (user) => {
    await UsersService.toggleActive(user.userid, !user.isactive);
    fetchUsers();
  };

  const handleResetPassword = async (newPassword) => {
    await UsersService.resetPassword(selected.userid, newPassword);
    setOpenReset(false);
  };

  /* ==============================
     UI
  ============================== */

  return (
    <div dir="rtl" className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-3">
        <h1 className="text-2xl font-bold">إدارة المستخدمين</h1>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-12 text-muted-foreground">
          جاري التحميل...
        </div>
      )}

      {/* Content */}
      {!loading && (
        <>
          <div className="md:hidden">
            <UsersCards
              data={users}
              onEdit={openEdit}
              onToggle={handleToggle}
              onReset={openResetDialog}
            />
          </div>

          <div className="hidden md:block">
            <UsersTable
              data={users}
              onEdit={openEdit}
              onToggle={handleToggle}
              onReset={openResetDialog}
            />
          </div>
        </>
      )}

     
      

      <ResetPasswordDialog
        open={openReset}
        onClose={() => setOpenReset(false)}
        onSubmit={handleResetPassword}
      />
    </div>
  );
}
