// import { useEffect, useState, useMemo } from "react";
// import UsersService from "@/services/users.service";
// import AuthService from "@/services/auth.service";
// import { useAuth } from "@/hooks/useAuth";
// import { roles } from "@/constan/roles"; // تأكد من وجود USER, ADMIN, SUPER_ADMIN

// import UsersTable from "@/components/users/UsersTable";
// import UsersCards from "@/components/users/UsersCards";
// import Pagination from "@/components/common/Pagination";
// import UserEditDialog from "@/components/users/UserEditDialog";
// import UserCreateDialog from "@/components/users/UserCreateDialog";


// import { Button } from "@/components/ui/button";
// import { Plus } from "lucide-react";

// /** دالة مساعدة لمقارنة أرقام الفروع بدقة */
// function sameBranch(a, b) {
//   if (a == null || b == null) return false;
//   return Number(a) === Number(b);
// }

// export default function UsersPage() {
//   const { user: currentUser } = useAuth();

//   /* ================= State ================= */
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [selected, setSelected] = useState(null);
//   const [listError, setListError] = useState(null);
//   const [openEdit, setOpenEdit] = useState(false);
//   const [openCreate, setOpenCreate] = useState(false);
  

//   const LIMIT = 10;

//   useEffect(() => {
//     document.title = "إدارة المستخدمين - النظام التقني";
//   }, []);

//   /* ================= منطق عرض المستخدمين (Filtering) ================= */
//   const displayedUsers = useMemo(() => {
//     const list = users || [];

//     // ✅ السوبر أدمن يرى فقط الأدمنز
//     if (currentUser?.role === roles.SUPER_ADMIN) {
//       return list.filter((u) => u.role === roles.ADMIN);
//     }

//     // ✅ الأدمن يرى فقط اليوزرز ضمن فرعه
//     if (currentUser?.role === roles.ADMIN) {
//       return list.filter(
//         (u) =>
//           sameBranch(u.branchid, currentUser.branchid) && u.role === roles.USER,
//       );
//     }

//     return [];
//   }, [users, currentUser]);

//   const fetchUsers = async (p = page) => {
//     try {
//       setLoading(true);
//       setListError(null);

//       const params = {
//         page: p,
//         limit: LIMIT,
//       };

//       /* ================= فلترة حسب نوع المستخدم ================= */

//       // ✅ SUPER ADMIN يرى فقط الأدمنز
//       if (currentUser?.role === roles.SUPER_ADMIN) {
//         params.role = roles.ADMIN;
//       }

//       // ✅ ADMIN يرى فقط اليوزرز ضمن نفس الفرع
//       if (currentUser?.role === roles.ADMIN) {
//         params.branchid = currentUser.branchid;
//         params.role = roles.USER;
//       }

//       const res = await UsersService.list(params);

//       setUsers(res.users || []);
//       setTotalPages(res.totalPages || 1);
//       setPage(res.page || p);
//     } catch (err) {
//       const status = err?.response?.status;

//       if (status === 403) {
//         setListError("ليس لديك صلاحية لعرض هذه القائمة.");
//       } else {
//         setListError(err?.message || "فشل تحميل قائمة المستخدمين.");
//       }

//       setUsers([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (currentUser) {
//       fetchUsers(page);
//     }
//   }, [page, currentUser]);

//   /* ================= الإجراءات (Handlers) ================= */
//   const handleToggle = async (user) => {
//     try {
//       await UsersService.toggleActive(user.userid, !user.isactive);
//       fetchUsers(); // تحديث القائمة بعد التغيير
//     } catch (err) {
//       alert("فشل تغيير حالة المستخدم");
//     }
//   };

//   const handleEdit = (user) => {
//     setSelected(user);
//     setOpenEdit(true);
//   };

//   const handleEditSubmit = async (values) => {
//     try {
//       await UsersService.update(selected.userid, values);
//       setOpenEdit(false);
//       fetchUsers();
//     } catch (err) {
//       alert("حدث خطأ أثناء التعديل");
//     }
//   };

  

//   const handleCreateSubmit = async (payload) => {
//     try {
//       // السيرفر يحتاج الـ payload كاملاً (fullname, email, password, role, branchid)
//       await AuthService.registerAdmin(payload);

//       setOpenCreate(false);

//       // أهم خطوة: إعادة جلب البيانات من السيرفر
//       // لضمان أن الموظف الجديد دخل ضمن القائمة المفلترة
//       await fetchUsers(1);

//       alert("تمت إضافة الموظف بنجاح");
//     } catch (err) {
//       alert(err?.response?.data?.message || "فشل إنشاء المستخدم");
//     }
//   };

//   /* ================= الواجهة (UI) ================= */
//   return (
//     <div dir="rtl" className="space-y-6 p-4">
//       {/* الرأس */}
//       <div className="flex justify-between items-center flex-wrap gap-3">
//         <h1 className="text-2xl font-bold">إدارة المستخدمين</h1>

//         <Button
//           onClick={() => setOpenCreate(true)}
//           className="gap-2 bg-[#0073c0] hover:bg-[#005fa0]"
//         >
//           <Plus size={16} />
//           {currentUser?.role === roles.SUPER_ADMIN
//             ? "إضافة أدمن فرع"
//             : "إضافة موظف جديد"}
//         </Button>
//       </div>

//       {loading && (
//         <div className="text-center py-12 text-muted-foreground">
//           جاري التحميل...
//         </div>
//       )}

//       {!loading && listError && (
//         <div className="rounded-lg border border-destructive/50 bg-destructive/10 text-destructive px-4 py-3 text-sm text-center">
//           {listError}
//         </div>
//       )}

//       {!loading && !listError && displayedUsers.length === 0 && (
//         <div className="text-center py-12 text-muted-foreground border rounded-xl border-dashed">
//           لا يوجد مستخدمين لعرضهم حالياً.
//         </div>
//       )}

//       {!loading && !listError && displayedUsers.length > 0 && (
//         <>
//           {/* عرض البطاقات للموبايل */}
//           <div className="md:hidden">
//             <UsersCards
//               data={displayedUsers}
//               onEdit={handleEdit}
//               onToggle={handleToggle}
//             />
//           </div>

//           {/* عرض الجدول للشاشات الكبيرة */}
//           <div className="hidden md:block">
//             <UsersTable
//               data={displayedUsers}
//               onEdit={handleEdit}
//               onToggle={handleToggle}
//             />
//           </div>

//           <Pagination page={page} totalPages={totalPages} onChange={setPage} />
//         </>
//       )}

//       {/* النوافذ المنبثقة (Dialogs) */}
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


import { useEffect, useState } from "react";
import UsersService from "@/services/users.service";
import AuthService from "@/services/auth.service";
import BranchesService from "@/services/branches.service";
import { useAuth } from "@/hooks/useAuth";
import { roles } from "@/constan/roles";

import UsersTable from "@/components/users/UsersTable";
import UsersCards from "@/components/users/UsersCards";
import Pagination from "@/components/common/Pagination";
import UserEditDialog from "@/components/users/UserEditDialog";
import UserCreateDialog from "@/components/users/UserCreateDialog";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function UsersPage() {
  const { user: currentUser } = useAuth();

  const [users, setUsers] = useState([]);
  const [branchesMap, setBranchesMap] = useState({}); // ⭐ FIX
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selected, setSelected] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const LIMIT = 10;

  /* ================= تحميل الفروع ================= */
  const fetchBranches = async () => {
    try {
      const res = await BranchesService.list({ page: 1, limit: 100 });

      const map = {};
      (res.branches || []).forEach((b) => {
        map[b.branchid] = b.branchname;
      });

      setBranchesMap(map);
    } catch {
      setBranchesMap({});
    }
  };

  /* ================= تحميل المستخدمين ================= */
  const fetchUsers = async (p = 1) => {
    try {
      setLoading(true);

      const params = {
        page: p,
        limit: LIMIT,
      };

      // ✅ SUPER ADMIN يرى فقط ADMIN
      if (currentUser?.role === roles.SUPER_ADMIN) {
        params.role = roles.ADMIN;
      }

      // ✅ ADMIN يرى فقط USER ضمن فرعه
      if (currentUser?.role === roles.ADMIN) {
        params.role = roles.USER;
        params.branchid = currentUser.branchid;
      }

      const res = await UsersService.list(params);

      setUsers(res.users || []);
      setTotalPages(res.totalPages || 1);
      setPage(res.page || p);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!currentUser) return;
    fetchBranches();
    fetchUsers(1);
  }, [currentUser]);

  /* ================= actions ================= */

  const handleToggle = async (user) => {
    await UsersService.toggleActive(user.userid, !user.isactive);
    fetchUsers(page);
  };

  const handleEdit = (user) => {
    setSelected(user);
    setOpenEdit(true);
  };

  const handleEditSubmit = async (values) => {
    await UsersService.update(selected.userid, values);
    setOpenEdit(false);
    fetchUsers(page);
  };

  const handleCreateSubmit = async (payload) => {
    await AuthService.registerAdmin(payload);
    setOpenCreate(false);
    fetchUsers(1);
  };

  /* ================= UI ================= */

  return (
    <div dir="rtl" className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">إدارة المستخدمين</h1>

        {/* ⭐ FIX زر الإضافة عاد */}
        <Button onClick={() => setOpenCreate(true)} className="gap-2">
          <Plus size={16} />
          {currentUser?.role === roles.SUPER_ADMIN
            ? "إضافة مدير فرع"
            : "إضافة موظف"}
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-16">جاري التحميل...</div>
      ) : users.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          لا يوجد بيانات
        </div>
      ) : (
        <>
          <div className="hidden md:block">
            <UsersTable
              data={users}
              branchesMap={branchesMap}
              showBranchColumn={currentUser?.role === roles.SUPER_ADMIN}
              onEdit={handleEdit}
              onToggle={handleToggle}
            />
          </div>

          <div className="md:hidden">
            <UsersCards
              data={users}
              branchesMap={branchesMap}
              showBranchColumn={currentUser?.role === roles.SUPER_ADMIN}
              onEdit={handleEdit}
              onToggle={handleToggle}
            />
          </div>

          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={fetchUsers}
          />
        </>
      )}

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
        onSuccess={() => {
          setOpenCreate(false);
          fetchUsers(1);
        }}
      />
    </div>
  );
}


