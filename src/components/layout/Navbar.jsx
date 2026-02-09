import { Menu, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
    console.log(user);
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  };

  return (
    <div className="h-14 border-b bg-card px-4 flex items-center justify-between">

      {/* left */}
      <div className="flex items-center gap-2">

        {/* mobile menu */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu size={18} />
        </Button>

        <span className="font-semibold">لوحة التحكم</span>
      </div>

      {/* right */}
      <div className="flex items-center gap-3">

        {/* theme toggle */}
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </Button>

        <span className="text-sm">{user?.fullname}</span>

        <Button size="sm" variant="outline" onClick={logout}>
          تسجيل الخروج
        </Button>
      </div>
    </div>
  );
}
