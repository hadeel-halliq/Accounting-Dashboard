import { Navigate, Route, Routes } from "react-router-dom";

import Login from "@/pages/auth/Login";
import DashBoard from "@/pages/dashboard/DashBoard";
import Products from "@/pages/Products/Products";
import Invoices from "@/pages/Invoices/Invoices";
import Categories from "@/pages/Categories/Categories";
import Branches from "@/pages/Branches/Branches ";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<DashBoard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route
          path="/categories"
          element={
            <RoleRoute roles={["super_admin"]}>
              <Categories />
            </RoleRoute>
          }
        />
        <Route
          path="/branches"
          element={
            <RoleRoute roles={["super_admin"]}>
              <Branches />
            </RoleRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Route>
    </Routes>
  );
}
