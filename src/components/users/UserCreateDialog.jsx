// import { useState } from "react";
// import { useAuth } from "@/hooks/useAuth";
// import { roles } from "@/constan/roles";

// // استيراد مكونات UI (تأكد من مساراتها في مشروعك)
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";

// export default function UserCreateDialog({ open, onClose, onSubmit }) {
//   const { user: currentUser } = useAuth();
  
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({
//     fullname: "",
//     email: "",
//     password: "",
//     branchid: "", // يستخدم فقط من قبل السوبر أدمن
//   });

//   // تنظيف النموذج عند الإغلاق
//   const handleClose = () => {
//     setForm({ fullname: "", email: "", password: "", branchid: "" });
//     onClose();
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // التحقق من الحقول الأساسية
//     if (!form.fullname || !form.email || !form.password) {
//       alert("يرجى تعبئة كافة الحقول الأساسية");
//       return;
//     }

//     setLoading(true);

//     try {
//       // تجهيز البيانات الأساسية
//       const payload = {
//         fullname: form.fullname,
//         email: form.email,
//         password: form.password,
//       };

//       /* منطق توزيع الأدوار (السر هنا) */
//       if (currentUser?.role === roles.SUPER_ADMIN) {
//         // السوبر أدمن يضيف "مدير فرع" حصراً
//         payload.role = roles.ADMIN;
//         payload.branchid = Number(form.branchid);

//         if (!payload.branchid) {
//           throw new Error("يجب تحديد رقم الفرع للمدير الجديد");
//         }
//       } 
//       else if (currentUser?.role === roles.ADMIN) {
//         // الأدمن يضيف "موظف" حصراً ويتم ربطه بفرع الأدمن تلقائياً
//         payload.role = roles.USER; 
//         payload.branchid = Number(currentUser.branchid);
//       }

//       // إرسال البيانات للأب (UsersPage)
//       await onSubmit(payload);
//       handleClose(); // إغلاق وتهيئة النموذج بعد النجاح
//     } catch (err) {
//       alert(err.message || "فشل في إضافة المستخدم");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={handleClose}>
//       <DialogContent className="sm:max-w-[425px]" dir="rtl">
//         <DialogHeader>
//           <DialogTitle className="text-right">
//             {currentUser?.role === roles.SUPER_ADMIN 
//               ? "إضافة مدير فرع جديد (Admin)" 
//               : "إضافة موظف جديد لفرعك (User)"}
//           </DialogTitle>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-4 py-4">
          
//           {/* حقل رقم الفرع: يظهر فقط للسوبر أدمن */}
//           {currentUser?.role === roles.SUPER_ADMIN && (
//             <div className="space-y-2">
//               <Label htmlFor="branchid">رقم الفرع المستهدف</Label>
//               <Input
//                 id="branchid"
//                 type="number"
//                 placeholder="مثلاً: 101"
//                 value={form.branchid}
//                 onChange={(e) => setForm({ ...form, branchid: e.target.value })}
//                 required
//               />
//             </div>
//           )}

//           <div className="space-y-2">
//             <Label htmlFor="fullname">الاسم الكامل</Label>
//             <Input
//               id="fullname"
//               placeholder="أدخل اسم الموظف"
//               value={form.fullname}
//               onChange={(e) => setForm({ ...form, fullname: e.target.value })}
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="email">البريد الإلكتروني</Label>
//             <Input
//               id="email"
//               type="email"
//               placeholder="example@mail.com"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="password">كلمة المرور</Label>
//             <Input
//               id="password"
//               type="password"
//               placeholder="••••••••"
//               value={form.password}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//               required
//             />
//           </div>

//           <DialogFooter className="flex gap-2 pt-4">
//             <Button 
//               type="submit" 
//               className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
//               disabled={loading}
//             >
//               {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
//               حفظ البيانات
//             </Button>
//             <Button 
//               type="button" 
//               variant="outline" 
//               onClick={handleClose}
//               className="flex-1"
//             >
//               إلغاء
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }



import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { roles } from "@/constan/roles";
import AuthService from "@/services/auth.service";
import BranchesService from "@/services/branches.service";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function UserCreateDialog({ open, onClose, onSubmit, onSuccess }) {
  const { user: currentUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const [branches, setBranches] = useState([]); // ⭐ MODIFIED

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    branchid: "",
  });

  /* ======================================================
     ⭐ جلب الأفرع فقط إذا كان SUPER ADMIN
  ====================================================== */
  useEffect(() => {
    if (!open) return;

    if (currentUser?.role === roles.SUPER_ADMIN) {
      BranchesService.list({ page: 1, limit: 100 })
        .then((res) => setBranches(res.branches || []))
        .catch(() => setBranches([]));
    }
  }, [open, currentUser]);

  const handleClose = () => {
    setForm({ fullname: "", email: "", password: "", branchid: "" });
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = {
        fullname: form.fullname,
        email: form.email,
        password: form.password,
      };

      if (currentUser.role === roles.ADMIN) {
        // ADMIN: enforce role & branch — do not trust form values
        const payload = {
          ...data,
          role: "USER",
          branchid: currentUser.branchid,
        };
        console.log("🚀 Admin creating Employee via AuthService...", payload);
        await AuthService.registerUser(payload);
        onSuccess?.();
        handleClose();
        return;
      }

      /* ======================================================
         SUPER-ADMIN → create branch admin via parent handler
      ====================================================== */
      const payload = {
        ...data,
        role: roles.ADMIN,
      };
      if (!form.branchid) throw new Error("يجب اختيار الفرع");
      payload.branchid = Number(form.branchid);

      await onSubmit(payload);
      handleClose();
    } catch (err) {
      alert(err.message || "فشل في إضافة المستخدم");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent dir="rtl">
        <DialogHeader>
          <DialogTitle>
            {currentUser?.role === roles.SUPER_ADMIN
              ? "إضافة مدير فرع"
              : "إضافة موظف"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* ⭐ اختيار الفرع فقط للسوبر أدمن */}
          {currentUser?.role === roles.SUPER_ADMIN && (
            <div>
              <Label>الفرع</Label>

              <select
                className="w-full border rounded-md p-2"
                value={form.branchid}
                onChange={(e) =>
                  setForm({ ...form, branchid: e.target.value })
                }
              >
                <option value="">اختر الفرع</option>

                {branches.map((b) => (
                  <option key={b.branchid} value={b.branchid}>
                    {b.branchname}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <Label>الاسم الكامل</Label>
            <Input
              value={form.fullname}
              onChange={(e) =>
                setForm({ ...form, fullname: e.target.value })
              }
            />
          </div>

          <div>
            <Label>البريد الإلكتروني</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div>
            <Label>كلمة المرور</Label>
            <Input
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          <DialogFooter>
            <Button disabled={loading}>
              {loading && <Loader2 className="animate-spin ml-2" />}
              حفظ
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
