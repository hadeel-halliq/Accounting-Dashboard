import { Navigate, Route, Routes } from "react-router-dom";

import Login from "@/pages/auth/Login";
import DashBoard from "@/pages/dashboard/DashBoard";
import Products from "@/pages/Products/ProductsPage";
import Invoices from "@/pages/Invoices/Invoices";
import Categories from "@/pages/Categories/Categories";
import Branches from "@/pages/Branches/Branches ";

import ProtectedRoute from "./ProtectedRoute";
import PermissionRoute from "./PermissionRoute";
import DashboardLayout from "@/layout/DashboardLayout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<DashBoard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/invoices" element={<Invoices />} />

          <Route
            path="/categories"
            element={
              <PermissionRoute resource="categories" action="can_view">
                <Categories />
              </PermissionRoute>
            }
          />

          <Route
            path="/branches"
            element={
              <PermissionRoute resource="branches" action="can_view">
                <Branches />
              </PermissionRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Route>
    </Routes>
  );
}
