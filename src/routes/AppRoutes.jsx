import { Routes, Route, Navigate } from "react-router-dom";

/* guards */
import ProtectedRoute from "./ProtectedRoute";
import PermissionGuard from "../routes/PermissionGuard";
import RoleRoute from "../constan/RoleRoute";

/* layout */
import DashboardLayout from "../layout/DashboardLayout";

/* auth */
import LoginPage from "../pages/auth/LoginPage";

/* common */
import DashboardPage from "@/pages/Dashboard/DashboardPage";

/* admin pages */
import UsersPage from "../pages/users/UsersPage";
import UserDetailsPage from "@/components/users/UserDetailsPage";

import ProductsPage from "../pages/products/ProductsPage";
import CategoriesPage from "../pages/products/CategoriesPage";

import CustomersPage from "../pages/customers/CustomersPage";
import InvoicesPage from "../pages/invoices/InvoicesPage";
import PaymentsPage from "../pages/payments/PaymentsPage";
import ReturnsPage from "../pages/returns/ReturnsPage";

/* super admin pages */
import LogsPage from "../pages/_logs/LogsPage";
import BranchesPage from "../pages/super-admin/BranchesPage";
import PermissionsPage from "../pages/super-admin/PermissionsPage";
// import SubscriptionsPage from "../pages/subscriptions/SubscriptionsPage";
import BranchDetailsPage from "@/pages/super-admin/BranchDetailsPage";

/* roles */
import { roles } from "../constan/roles";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ================= PUBLIC ================= */}
      <Route path="/login" element={<LoginPage />} />

      {/* ================= PROTECTED ================= */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* dashboard */}
        <Route index element={<DashboardPage />} />

        {/* ========================================= */}
        {/* ========== ADMIN (permission based) ====== */}
        {/* ========================================= */}

        <Route
          path="users"
          element={
            <PermissionGuard table="users">
              <UsersPage />
            </PermissionGuard>
          }
        />

        <Route
          path="users/:id"
          element={
            <PermissionGuard table="users">
              <UserDetailsPage />
            </PermissionGuard>
          }
        />

        <Route
          path="products"
          element={
            <PermissionGuard table="products">
              <ProductsPage />
            </PermissionGuard>
          }
        />

        <Route
          path="categories"
          element={
            <PermissionGuard table="categories">
              <CategoriesPage />
            </PermissionGuard>
          }
        />

        <Route
          path="customers"
          element={
            <PermissionGuard table="customers">
              <CustomersPage />
            </PermissionGuard>
          }
        />

        <Route
          path="invoices"
          element={
            <PermissionGuard table="invoices">
              <InvoicesPage />
            </PermissionGuard>
          }
        />

        <Route
          path="payments"
          element={
            <PermissionGuard table="payments">
              <PaymentsPage />
            </PermissionGuard>
          }
        />

        <Route
          path="returns"
          element={
            <PermissionGuard table="returns">
              <ReturnsPage />
            </PermissionGuard>
          }
        />
        {/* ========================================= */}
        {/* Permissions: SUPER-ADMIN and ADMIN */}
        {/* ========================================= */}
        <Route element={<RoleRoute allowedRoles={[roles.SUPER_ADMIN, roles.ADMIN]} />}>
          <Route path="permissions" element={<PermissionsPage />} />
        </Route>

        {/* ========================================= */}
        {/* ========== SUPER ADMIN ONLY ============== */}
        {/* ========================================= */}

        <Route element={<RoleRoute allowedRoles={[roles.SUPER_ADMIN]} />}>
          <Route path="logs" element={<LogsPage />} />
          <Route path="branches" element={<BranchesPage />} />
          <Route path="branches/:id" element={<BranchDetailsPage />} />
          {/* <Route path="subscriptions" element={<SubscriptionsPage />} /> */}
        </Route>
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
