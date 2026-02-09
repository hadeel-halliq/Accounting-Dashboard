import { Outlet } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Navbar from "@/components/layout/Navbar";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    // 👇 أهم سطر
    <div className="flex flex-row-reverse min-h-screen bg-muted/40">

      {/* ===== Desktop Sidebar (يمين) ===== */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* ===== Main ===== */}
      <div className="flex-1 flex flex-col">
        <Navbar onMenuClick={() => setOpen(true)} />

        <main className="p-6 flex-1">
          <Outlet />
        </main>
      </div>

      {/* ===== Mobile Drawer ===== */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black z-40 lg:hidden"
            />

            <motion.div
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="fixed right-0 top-0 h-full z-50 lg:hidden"
            >
              <Sidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
