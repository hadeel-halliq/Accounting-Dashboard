import { useEffect, useState } from "react";

import { Button } from "../../ui/Button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { Sun, Moon } from "lucide-react";
import { SearchIcon } from "lucide-react";
import { Menu } from "lucide-react";

import AvatarMenu from "./AvatarMenu";

export default function NavBar({ setIsSideOpen }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) html.classList.add("dark");
    else html.classList.remove("dark");
  }, [darkMode]);

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-3">
        <div className="grid w-full max-w-sm gap-6">
          <InputGroup>
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <Button onClick={() => setIsSideOpen(prev => !prev)}>
          <Menu />
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <Button
          className="h-12 w-12 rounded-full p-0"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <Moon /> : <Sun />}
        </Button>
        <AvatarMenu />
      </div>
    </div>
  );
}
