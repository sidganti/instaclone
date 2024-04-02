"use client";

import { logout } from "@/lib/actions";

import { useTheme } from "next-themes";
import NextLink from "next/link";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Instagram,
  User,
  SunMoon,
  Sun,
  Moon,
  LogOut
} from "lucide-react";

import { cn } from "@/lib/utils";

const Link = ({ children, href, ...props }: { children: React.ReactNode, href: string | any}) => {
  return (
    <NextLink href={href} legacyBehavior passHref>
      <NavigationMenuLink className={cn(buttonVariants({ variant: "link" }))}>
        {children}
      </NavigationMenuLink>
    </NextLink>
  );
};

export default function Navbar() {
  const { setTheme } = useTheme();

  return (
    <>
      <div className="flex justify-between items-center px-36 py-4">
        <NextLink href="/" className="flex justify-center items-center text-2xl">
          <Instagram className="mr-2 h-6 w-6" /> Instaclone
        </NextLink>

        <NavigationMenu>
          <NavigationMenuList className="flex justify-between w-max">
            <NavigationMenuItem>
              <Link href="/explore">
                Explore
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/create">
                Create
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/chat">
                Chat
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"}>
              <Avatar className="mr-2 h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-xs">
                <span>@shadcn</span>
                <span>Shad CN</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <NextLink href="/profile" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </NextLink>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <SunMoon className="mr-2 h-4 w-4" />
                  <span>Theme</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent sideOffset={6}>
                    <DropdownMenuItem onClick={() => {setTheme("light")}}>
                      <Sun className="mr-2 h-4 w-4" />
                      <span>Light</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {setTheme("dark")}}>
                      <Moon className="mr-2 h-4 w-4" />
                      <span>Dark</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {setTheme("system")}}>
                      <SunMoon className="mr-2 h-4 w-4" />
                      <span>System</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer" onClick={() => {logout()}}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator />
    </>
  );
}
