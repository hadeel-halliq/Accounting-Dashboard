import { useAuth } from "@/context/AuthContext";
import { sidebarLinks } from "@/config/sidebar-links";
import { NavLink } from "react-router-dom";

export default function Sidebar({ isSideOpen }) {
  const { user } = useAuth();
  const role = user?.role || "admin"; // fallback

  const links = sidebarLinks[role] || [];

  return (
    <aside className={`
          w-64 border-l p-4 bg-sidebar text-sidebar-foreground
          transition-transform duration-300 ease-in-out
          fixed lg:static top-0 right-0 min-h-screen z-50
          ${isSideOpen ? "translate-x-0" : "translate-x-full"}
          lg:translate-x-0
        `}>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `px-3 py-2 rounded-md hover:bg-muted transition-colors
               ${isActive ? "bg-primary text-primary-foreground" : ""}`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
