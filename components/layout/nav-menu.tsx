"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const links = [
  {
    href: "#product",
    label: "Product",
  },
  {
    href: "https://github.com/lehung1109/incident-copilot/docs",
    label: "Docs",
    target: "_blank",
  },
  {
    href: "https://github.com/lehung1109/incident-copilot",
    label: "Github",
    target: "_blank",
  },
];

export const NavMenu = ({
  className,
  ...props
}: ComponentProps<typeof NavigationMenu>) => {
  const { orientation } = props;

  return (
    <NavigationMenu {...props} className={className}>
      <NavigationMenuList
        className={cn(
          {
            "flex-col items-start": orientation === "vertical",
          },
          "gap-4",
        )}
      >
        {links.map((link) => (
          <NavigationMenuItem key={link.href}>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle({
                className: "text-lg",
              })}
            >
              <Link href={link.href} target={link.target}>
                {link.label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
