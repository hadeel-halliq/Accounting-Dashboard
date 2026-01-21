import { useState } from "react";
import NavBar from "./NavBar/NavBar";

export default function DashboardLayout({ children }) {
  const [isSideOpen, setIsSideOpen] = useState(false);
  return (
    <div className="flex min-h-screen  transition-colors duration-300">
      <main className="flex-1 p-6">
        <NavBar setIsSideOpen={setIsSideOpen} />
        <div className="mt-6">{children}</div>
      </main>
      <aside
        className={`
          w-64 border-l p-4 bg-sidebar text-sidebar-foreground
          transition-transform duration-300 ease-in-out
          fixed lg:static top-0 right-0 min-h-screen z-50
          ${isSideOpen ? "translate-x-0" : "translate-x-full"}
          lg:translate-x-0
        `}
      >
        Sidebar
      </aside>
      {isSideOpen && (
        <div
          className="fixed bg-sidebar z-40 lg:hidden"
          onClick={() => setIsSideOpen(false)}
        />
      )}
    </div>
  );
}
