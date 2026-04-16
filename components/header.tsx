import { Menu, Wheat, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { NavMenu } from "./nav-menu";

const Header = () => {
  return (
    <div className="h-16 border-b bg-background px-6 sticky top-0 left-0 w-full z-50 container">
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Link className="flex items-center gap-3" href="/">
            <Wheat />
            <span className="font-bold text-xl">Incident Copilot</span>
          </Link>
        </div>

        {/* Desktop navigation menu */}
        <div className="hidden md:flex">
          <NavMenu />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button className="inline-flex cursor-pointer">Sign In</Button>
          </div>

          {/* Mobile navigation menu */}
          <Popover>
            <PopoverTrigger className="group md:hidden">
              <Menu className="group-data-[state=open]:hidden" />
              <X className="hidden group-data-[state=open]:block" />
            </PopoverTrigger>
            <PopoverContent
              className="animate-none! h-[calc(100svh-4rem)] w-screen rounded-none border-none bg-background p-3.5"
              sideOffset={20}
              align="start"
            >
              <NavMenu orientation="vertical" className="flex-0" />
            </PopoverContent>
          </Popover>
        </div>
      </nav>
    </div>
  );
};

export default Header;
