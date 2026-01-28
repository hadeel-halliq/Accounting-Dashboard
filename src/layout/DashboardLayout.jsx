import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Outlet } from "react-router-dom";
import NavBar from "../components/navigation/NavBar/NavBar";
import Sidebar from "@/components/navigation/SideBar/SideBar";

export default function DashboardLayout() {
  const [isSideOpen, setIsSideOpen] = useState(false);
  const { user } = useAuth();
  return (
    <div className="flex min-h-screen  transition-colors duration-300">
      <main className="flex-1 p-6">
        <NavBar user={user} setIsSideOpen={setIsSideOpen} />
        <div className="mt-6">
          <Outlet />
        </div>
      </main>

      <Sidebar isSideOpen={isSideOpen} />
      {isSideOpen && (
        <div
          className="fixed bg-sidebar z-40 lg:hidden"
          onClick={() => setIsSideOpen(false)}
        />
      )}
    </div>
  );
}
