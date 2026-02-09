import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import DashboardLayout from "../layout/DashboardLayout";

import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/DashboardPage";

import UsersPage from "../pages/users/UsersPage";
import PermissionsPage from "../pages/users/PermissionsPage";

import ProductsPage from "../pages/products/ProductsPage";
import CategoriesPage from "../pages/products/CategoriesPage";

import CustomersPage from "../pages/customers/CustomersPage";
import InvoicesPage from "../pages/invoices/InvoicesPage";
import PaymentsPage from "../pages/payments/PaymentsPage";
import ReturnsPage from "../pages/returns/ReturnsPage";
import LogsPage from "../pages/logs/LogsPage";
import BranchesPage from "../pages/super-admin/BranchesPage";
import SubscriptionsPage from "../pages/subscriptions/SubscriptionsPage";
import BranchDetailsPage from "@/pages/super-admin/BranchDetailsPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<DashboardPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="permissions" element={<PermissionsPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="invoices" element={<InvoicesPage />} />
        <Route path="payments" element={<PaymentsPage />} />
        <Route path="returns" element={<ReturnsPage />} />
        <Route path="logs" element={<LogsPage />} />
        <Route path="branches" element={<BranchesPage />} />
        <Route path="branches/:id" element={<BranchDetailsPage />} />

        <Route path="subscriptions" element={<SubscriptionsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
