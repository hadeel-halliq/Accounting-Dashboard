// import { useEffect, useState } from "react";

// import UsersService from "@/services/users.service";
// import AuthService from "@/services/auth.service";

// import UsersTable from "@/components/users/UsersTable";
// import UsersCards from "@/components/users/UsersCards";
// import Pagination from "@/components/common/Pagination";
// import UserEditDialog from "@/components/users/UserEditDialog";
// import UserCreateDialog from "@/components/users/UserCreateDialog";

// import { Button } from "@/components/ui/button";
// import { Plus } from "lucide-react";

// export default function UsersPage() {
//   /* ================= State ================= */

//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const [selected, setSelected] = useState(null);

//   const [openEdit, setOpenEdit] = useState(false);
//   const [openCreate, setOpenCreate] = useState(false);

//   const LIMIT = 10;

//   useEffect(() => {
//     document.title = "إدارة الموظفين - السلام للمحاسبة";
//   }, []);

//   /* ================= Fetch ================= */

//   const fetchUsers = async (p = page) => {
//     try {
//       setLoading(true);

//       const res = await UsersService.list({
//         page: p,
//         limit: LIMIT,
//       });

//       setUsers(res.users || []);
//       setTotalPages(res.totalPages || 1);
//       setPage(res.page || p);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers(page);
//   }, [page]);

//   /* ================= Handlers ================= */

//   const handleToggle = async (user) => {
//     await UsersService.toggleActive(user.userid, !user.isactive);
//     fetchUsers();
//   };

//   const handleEdit = (user) => {
//     setSelected(user);
//     setOpenEdit(true);
//   };

//   const handleEditSubmit = async (values) => {
//     await UsersService.update(selected.userid, values);
//     setOpenEdit(false);
//     fetchUsers();
//   };

  

// const handleCreateSubmit = async (values) => {
//   await AuthService.registerUser(values); 
//   setOpenCreate(false);
//   fetchUsers();
// };


//   /* ================= UI ================= */

//   return (
//     <div dir="rtl" className="space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center flex-wrap gap-3">
//         <h1 className="text-2xl font-bold">إدارة المستخدمين</h1>

//         <Button onClick={() => setOpenCreate(true)} className="gap-2">
//           <Plus size={16} />
//           إضافة مستخدم
//         </Button>
//       </div>

//       {loading && (
//         <div className="text-center py-12 text-muted-foreground">
//           جاري التحميل...
//         </div>
//       )}

//       {!loading && users.length > 0 && (
//         <>
//           <div className="md:hidden">
//             <UsersCards
//               data={users}
//               onEdit={handleEdit}
//               onToggle={handleToggle}
//             />
//           </div>

//           <div className="hidden md:block">
//             <UsersTable
//               data={users}
//               onEdit={handleEdit}
//               onToggle={handleToggle}
//             />
//           </div>

//           <Pagination page={page} totalPages={totalPages} onChange={setPage} />
//         </>
//       )}

//       {/* Dialogs */}
//       <UserEditDialog
//         open={openEdit}
//         user={selected}
//         onClose={() => setOpenEdit(false)}
//         onSubmit={handleEditSubmit}
//       />

//       <UserCreateDialog
//         open={openCreate}
//         onClose={() => setOpenCreate(false)}
//         onSubmit={handleCreateSubmit}
//       />
//     </div>
//   );
// }




import { useEffect, useState, useMemo } from "react";

import UsersService from "@/services/users.service";
import AuthService from "@/services/auth.service";
import { useAuth } from "@/hooks/useAuth";

import UsersTable from "@/components/users/UsersTable";
import UsersCards from "@/components/users/UsersCards";
import Pagination from "@/components/common/Pagination";
import UserEditDialog from "@/components/users/UserEditDialog";
import UserCreateDialog from "@/components/users/UserCreateDialog";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const ROLES = { SUPER_ADMIN: "SUPER-ADMIN", ADMIN: "ADMIN", USER: "USER" };

/** Type-safe equality for branch IDs (string or number). */
function sameBranch(a, b) {
  if (a == null || b == null) return false;
  return Number(a) === Number(b);
}

export default function UsersPage() {
  const { user: currentUser } = useAuth();

  /* ================= State ================= */

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selected, setSelected] = useState(null);
  const [listError, setListError] = useState(null);

  const [openEdit, setOpenEdit] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const LIMIT = 10;

  useEffect(() => {
    document.title = "إدارة الموظفين - السلام للمحاسبة";
  }, []);

  /* ================= Role-based visibility ================= */

  const displayedUsers = useMemo(() => {
    const list = users || [];
    const role = currentUser?.role;
    if (role === ROLES.SUPER_ADMIN) return list;
    if (role === ROLES.ADMIN) {
      const branchid = currentUser?.branchid;
      return list.filter(
        (u) => sameBranch(u.branchid, branchid) && (u.role === ROLES.USER || u.role === "USER")
      );
    }
    return list;
  }, [users, currentUser?.role, currentUser?.branchid]);

  /* ================= Fetch ================= */

  const fetchUsers = async (p = page) => {
    try {
      setLoading(true);
      setListError(null);

      const params = { page: p, limit: LIMIT };
      if (currentUser?.role === ROLES.ADMIN && currentUser?.branchid != null) {
        params.branchid = Number(currentUser.branchid);
        params.role = ROLES.USER;
      }

      const res = await UsersService.list(params);

      setUsers(res.users || []);
      setTotalPages(res.totalPages || 1);
      setPage(res.page || p);
    } catch (err) {
      const status = err?.response?.status;
      if (status === 403) {
        setListError("You do not have permission to view users. Please contact Super Admin.");
      } else {
        setListError(err?.message || "Failed to load users.");
      }
      setUsers([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page, currentUser?.role, currentUser?.branchid]);

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

      {!loading && listError && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 text-destructive px-4 py-3 text-sm text-center">
          {listError}
        </div>
      )}

      {!loading && !listError && displayedUsers.length > 0 && (
        <>
          <div className="md:hidden">
            <UsersCards
              data={displayedUsers}
              onEdit={handleEdit}
              onToggle={handleToggle}
            />
          </div>

          <div className="hidden md:block">
            <UsersTable
              data={displayedUsers}
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