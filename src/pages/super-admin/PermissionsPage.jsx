import { useEffect, useState, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { roles } from "@/constan/roles";
import UsersService from "@/services/users.service";
import PermissionsService from "@/services/permissions.services";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

/* ================= constants ================= */
const SYSTEM_MODULES = [
  { key: "products", label: "المنتجات" },
  { key: "categories", label: "التصنيفات" },
  { key: "invoices", label: "الفواتير" },
  { key: "customers", label: "العملاء" },
  { key: "payments", label: "المدفوعات" },
  { key: "returns", label: "المرتجعات" },
  { key: "users", label: "المستخدمون"},
];

const ACTIONS = [
  { key: "view", label: "عرض", apiKey: "canprint" },
  { key: "create", label: "إضافة", apiKey: "canadd" },
  { key: "edit", label: "تعديل", apiKey: "canedit" },
  { key: "delete", label: "حذف", apiKey: "candelete" },
];

/* ================= state shape: { id?, canprint, canadd, canedit, candelete } ================= */
const emptyPermissionsState = () =>
  SYSTEM_MODULES.reduce(
    (acc, m) => {
      acc[m.key] = {
        id: null,
        canprint: false,
        canadd: false,
        canedit: false,
        candelete: false,
      };
      return acc;
    },
    {}
  );

/** Map API array to permissionsState (keeps permissionid as id). */
const apiListToState = (list) => {
  const state = emptyPermissionsState();
  (list || []).forEach((p) => {
    const table = (p.targettable || "").toLowerCase();
    if (!state[table]) return;
    state[table] = {
      id: p.permissionid ?? null,
      canprint: !!p.canprint,
      canadd: !!p.canadd,
      canedit: !!p.canedit,
      candelete: !!p.candelete,
    };
  });
  return state;
};

const getRoleLabel = (role) => {
  switch (role) {
    case roles.SUPER_ADMIN:
      return "سوبر أدمن";
    case roles.ADMIN:
      return "مدير فرع";
    case roles.USER:
      return "موظف";
    default:
      return role || "—";
  }
};

export default function PermissionsPage() {
  const { user: currentUser } = useAuth();

  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [permissionsState, setPermissionsState] = useState(emptyPermissionsState());
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [usersLoading, setUsersLoading] = useState(true);

  /* ================= fetch users (limit 100) ================= */
  useEffect(() => {
    document.title = "الصلاحيات - السلام للمحاسبة";
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    const fetchUsers = async () => {
      setUsersLoading(true);
      try {
        const params = { page: 1, limit: 100 };
        if (currentUser.role === roles.ADMIN) {
          params.branchid = currentUser.branchid;
          params.role = roles.USER;
        }
        const data = await UsersService.list(params);
        setUsers(data.users || []);
      } catch {
        setUsers([]);
        toast.error("فشل في تحميل المستخدمين");
      } finally {
        setUsersLoading(false);
      }
    };

    fetchUsers();
  }, [currentUser]);

  /* ================= filtering: SUPER_ADMIN = all, ADMIN = same branch + USER only ================= */
  const filteredUsers = useMemo(() => {
    if (!currentUser) return [];
    if (currentUser.role === roles.SUPER_ADMIN) {
      return users;
    }
    if (currentUser.role === roles.ADMIN) {
      const branchId = Number(currentUser.branchid);
      return users.filter(
        (u) => Number(u.branchid) === branchId && u.role === roles.USER
      );
    }
    return [];
  }, [currentUser, users]);

  /* ================= fetch permissions when user selected; map API array to state ================= */
  useEffect(() => {
    if (!selectedUserId) {
      setPermissionsState(emptyPermissionsState());
      return;
    }

    const load = async () => {
      setLoading(true);
      try {
        const list = await PermissionsService.getByUser(selectedUserId);
        setPermissionsState(apiListToState(list));
      } catch {
        setPermissionsState(emptyPermissionsState());
        toast.error("فشل في تحميل الصلاحيات");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [selectedUserId]);

  const setPermission = (moduleKey, apiKey, value) => {
    setPermissionsState((prev) => ({
      ...prev,
      [moduleKey]: {
        ...prev[moduleKey],
        [apiKey]: value,
      },
    }));
  };

  const setRowAll = (moduleKey, value) => {
    const mod = SYSTEM_MODULES.find((m) => m.key === moduleKey);
    if (!mod) return;
    setPermissionsState((prev) => {
      const next = { ...prev[moduleKey] };
      if (mod.viewOnly) {
        next.canprint = value;
      } else {
        next.canprint = value;
        next.canadd = value;
        next.canedit = value;
        next.candelete = value;
      }
      return { ...prev, [moduleKey]: next };
    });
  };

  /* ================= Smart Save: per-module create vs update via Promise.all ================= */
  const handleSave = async () => {
    if (!selectedUserId) return;
    setSaving(true);
    try {
      const userId = Number(selectedUserId);
      const promises = [];

      for (const mod of SYSTEM_MODULES) {
        const row = permissionsState[mod.key];
        if (!row) continue;

        const payload = {
          canprint: !!row.canprint,
          canadd: !!row.canadd,
          canedit: !!row.canedit,
          candelete: !!row.candelete,
        };

        const hasId = row.id != null && Number(row.id) > 0;
        const hasAnyCheck = row.canprint || row.canadd || row.canedit || row.candelete;

        if (hasId) {
          promises.push(PermissionsService.update(row.id, payload));
        } else if (hasAnyCheck) {
          promises.push(
            PermissionsService.create({
              userid: userId,
              targettable: mod.key,
              ...payload,
            })
          );
        }
      }

      await Promise.all(promises);
      toast.success("تم حفظ الصلاحيات بنجاح");
      // Refetch so state gets updated ids for any new rows
      const list = await PermissionsService.getByUser(selectedUserId);
      setPermissionsState(apiListToState(list));
    } catch (err) {
      toast.error(err?.message || "فشل في حفظ الصلاحيات");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-background px-4 py-6 space-y-6 sm:px-6 lg:px-8 pb-24 sm:pb-6"
    >
      {/* Header: stacked on mobile, aligned on desktop */}
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">إدارة الصلاحيات</h1>
        <p className="text-gray-500 text-sm">
          اختر موظفاً ثم حدد صلاحياته لكل وحدة.
        </p>
      </header>

      {/* User selector: full width mobile, fixed width desktop */}
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
        <select
          className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 md:w-1/3 md:min-w-[16rem]"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          disabled={usersLoading}
        >
          <option value="">
            {usersLoading ? "جاري التحميل..." : "اختر الموظف"}
          </option>
          {filteredUsers.map((u) => (
            <option key={u.userid} value={String(u.userid)}>
              {u.fullname} - {getRoleLabel(u.role)}
            </option>
          ))}
        </select>
        {selectedUserId && (
          <Button
            onClick={handleSave}
            disabled={saving || loading}
            className="w-full sm:w-auto md:ml-0"
          >
            {saving ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                جاري الحفظ...
              </>
            ) : (
              "حفظ التغييرات"
            )}
          </Button>
        )}
      </div>

      {/* Permissions: Mobile = Cards, Desktop = Table */}
      {selectedUserId && (
        <>
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              {/* Mobile: Card-based layout */}
              <div className="block md:hidden space-y-4">
                {SYSTEM_MODULES.map((mod) => (
                  <div
                    key={mod.key}
                    className="bg-white dark:bg-card border border-border rounded-xl shadow-sm p-4 mb-4"
                  >
                    <div className="flex flex-row items-center justify-between gap-2">
                      <h3 className="font-bold text-base">{mod.label}</h3>
                      <div className="flex gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => setRowAll(mod.key, true)}
                          disabled={loading}
                          className="text-xs text-primary hover:underline disabled:opacity-50"
                        >
                          تحديد الكل
                        </button>
                        <span className="text-gray-400">|</span>
                        <button
                          type="button"
                          onClick={() => setRowAll(mod.key, false)}
                          disabled={loading}
                          className="text-xs text-muted-foreground hover:underline disabled:opacity-50"
                        >
                          إلغاء الكل
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      {ACTIONS.map((action) => {
                        const isViewOnly =
                          mod.viewOnly && action.apiKey !== "canprint";
                        const checked =
                          permissionsState[mod.key]?.[action.apiKey] ?? false;
                        return (
                          <label
                            key={action.apiKey}
                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer min-h-12 ${
                              isViewOnly
                                ? "opacity-60 cursor-not-allowed"
                                : "hover:bg-muted/40"
                            }`}
                          >
                            <Checkbox
                              checked={checked}
                              disabled={isViewOnly}
                              onCheckedChange={(v) =>
                                setPermission(mod.key, action.apiKey, !!v)
                              }
                              className="h-5 w-5 shrink-0 data-[state=checked]:bg-primary"
                            />
                            <span className="text-sm font-medium">
                              {action.icon} {action.label}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop: Table */}
              <div className="hidden md:block rounded-lg border bg-card shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-lg" dir="rtl">
                    <thead className="border-b bg-muted/40">
                      <tr>
                        <th className="p-3 text-right whitespace-nowrap">
                          الوحدة
                        </th>
                        <th className="p-3 text-center whitespace-nowrap">
                          عرض
                        </th>
                        <th className="p-3 text-center whitespace-nowrap">
                          إضافة
                        </th>
                        <th className="p-3 text-center whitespace-nowrap">
                          تعديل
                        </th>
                        <th className="p-3 text-center whitespace-nowrap">
                          حذف
                        </th>
                        <th className="p-3 text-center whitespace-nowrap">
                          الإجراء
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {SYSTEM_MODULES.map((mod) => (
                        <tr
                          key={mod.key}
                          className="border-b transition-colors hover:bg-gray-50 even:bg-gray-50/50 dark:hover:bg-muted/40 dark:even:bg-muted/20"
                        >
                          <td className="p-3 font-medium whitespace-nowrap">
                            {mod.label}
                          </td>
                          {ACTIONS.map((action) => {
                            const isViewOnly =
                              mod.viewOnly && action.apiKey !== "canprint";
                            const checked =
                              permissionsState[mod.key]?.[action.apiKey] ??
                              false;
                            return (
                              <td
                                key={action.apiKey}
                                className="p-4 text-center align-middle"
                              >
                                <div className="flex justify-center min-h-10 items-center">
                                  <Checkbox
                                    checked={checked}
                                    disabled={isViewOnly}
                                    onCheckedChange={(v) =>
                                      setPermission(
                                        mod.key,
                                        action.apiKey,
                                        !!v
                                      )
                                    }
                                    className="data-[state=checked]:bg-primary"
                                  />
                                </div>
                              </td>
                            );
                          })}
                          <td className="p-3 align-middle">
                            <div className="flex justify-center gap-1 flex-wrap">
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs whitespace-nowrap"
                                onClick={() => setRowAll(mod.key, true)}
                                disabled={loading}
                              >
                                تحديد الكل
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs whitespace-nowrap"
                                onClick={() => setRowAll(mod.key, false)}
                                disabled={loading}
                              >
                                إلغاء الكل
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </>
      )}

      {/* Sticky save bar on mobile when user selected */}
      {selectedUserId && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t shadow-lg sm:hidden z-10">
          <Button
            onClick={handleSave}
            disabled={saving || loading}
            className="w-full"
          >
            {saving ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                جاري الحفظ...
              </>
            ) : (
              "حفظ التغييرات"
            )}
          </Button>
        </div>
      )}

      {!selectedUserId && !usersLoading && (
        <p className="text-gray-500 text-sm">
          اختر موظفاً من القائمة أعلاه لإدارة صلاحياته.
        </p>
      )}
    </div>
  );
}
