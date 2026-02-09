import { useAuth } from "../../hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="h-14 border-b flex items-center justify-between px-6 bg-white">
      <span className="font-semibold">Mini ERP</span>

      <div className="flex items-center gap-4">
        <span className="text-sm">{user?.fullname}</span>
        <Button size="sm" variant="outline" onClick={logout}>
          Logout
        </Button>
      </div>
    </div>
  );
}
