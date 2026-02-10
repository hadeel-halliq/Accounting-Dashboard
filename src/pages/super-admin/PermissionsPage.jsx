import { useEffect, useState } from "react";

import UsersService from "@/services/users.service";
import PermissionsService from "@/services/permissions.services";

import PermissionsTable from "@/components/permissions/PermissionsTable";
import PermissionFormDialog from "@/components/permissions/PermissionFormDialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function PermissionsPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState(null);

  /* ================= users ================= */

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await UsersService.list({ page: 1, limit: 100 });
      setUsers(data.users || []);
    };
    fetchUsers();
  }, []);

  /* ================= permissions ================= */

  const fetchPermissions = async (userId) => {
    try {
      setLoading(true);
      const list = await PermissionsService.getUserPermissions(userId);
      setPermissions(list || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedUser) fetchPermissions(selectedUser);
  }, [selectedUser]);

  /* ================= handlers ================= */

  const handleCreate = () => {
    setEditing(null);
    setOpenForm(true);
  };

  const handleEdit = (perm) => {
    setEditing(perm);
    setOpenForm(true);
  };

  const handleSubmit = async (values) => {
    if (editing) {
      await PermissionsService.update(editing.permissionid, values);
    } else {
      await PermissionsService.create({
        ...values,
        userid: Number(selectedUser),
      });
    }

    setOpenForm(false);
    fetchPermissions(selectedUser);
  };

  const handleDelete = async (perm) => {
    await PermissionsService.remove(perm.permissionid);
    fetchPermissions(selectedUser);
  };

  /* ================= UI ================= */

  return (
    <div dir="rtl" className="space-y-6">
      <h1 className="text-2xl font-bold">إدارة الصلاحيات</h1>

      {/* select user */}
      <div className="flex gap-3 flex-wrap">
        <Select onValueChange={setSelectedUser}>
          <SelectTrigger className="w-72">
            <SelectValue placeholder="اختر مستخدم" />
          </SelectTrigger>

          <SelectContent>
            {users.map((u) => (
              <SelectItem key={u.userid} value={String(u.userid)}>
                {u.fullname}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedUser && <Button onClick={handleCreate}>إضافة صلاحية</Button>}
      </div>

      {/* table */}
      {selectedUser && (
        <PermissionsTable
          data={permissions}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* dialog */}
      <PermissionFormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleSubmit}
        initial={editing}
      />
    </div>
  );
}
