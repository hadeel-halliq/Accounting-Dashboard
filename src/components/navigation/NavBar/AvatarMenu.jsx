import mohamad from "@/images/mohamad.jpg"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronDown, User, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AvatarMenu({ user }) {
  const { logout } = useAuth();

  const initials = user?.name
    ?.split(" ")
    .map(n => n[0])
    .join("");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="navbar"
          className="flex items-center gap-2 px-2"
        >
          <Avatar className="h-12 w-12">
           <AvatarImage src={user?.avatar} />
            <AvatarFallback>
              {initials || "U"}
            </AvatarFallback>
          </Avatar>

          <span className="text-sm font-medium"> {user?.name}</span>

          <ChevronDown className="h-4 w-4 opacity-70" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48 mt-3">
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-red-500">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

