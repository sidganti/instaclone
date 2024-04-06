"use client";

import { User } from "@supabase/supabase-js";

import { logout } from "@/lib/actions";

import { useTheme } from "next-themes";
import NextLink from "next/link";
import { useState, useEffect } from "react";

import { useProfiles } from "@/hooks/useProfiles";

import { Skeleton } from "./ui/skeleton";
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
  UserIcon,
  SunMoon,
  Sun,
  Moon,
  LogOut,
  Loader2
} from "lucide-react";

import { cx } from "class-variance-authority";

const Link = ({ children, href, disabled=false, ...props }: { children: React.ReactNode, href: string, disabled?: boolean}) => {
  return (
    <NextLink
      href={href}
      legacyBehavior
      passHref
      {...props}
    >
      <NavigationMenuLink
        className={cx(buttonVariants({ variant: "link" }), disabled ? "pointer-events-none text-muted" : "")}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        {...props}
      >
        {children}
      </NavigationMenuLink>
    </NextLink>
  );
};

function DropdownTriggerSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-2 w-[75px]" />
      <Skeleton className="h-2 w-[100px]" />
    </div>
  );
}

export default function Navbar( data: {
  user: User;
}) {
  const [loading, setLoading] = useState(false);

  const { setTheme } = useTheme();

  const { loadingProfiles, authenticatedProfile, getAuthenticatedProfile } = useProfiles();

  useEffect(() => {
    const error = getAuthenticatedProfile(data.user.id);
  }, []);

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
                <AvatarFallback><UserIcon /></AvatarFallback>
              </Avatar>
              {loadingProfiles
                ? <DropdownTriggerSkeleton />
                : <div className="flex flex-col text-xs text-left">
                    <span>@{authenticatedProfile?.username}</span>
                    <span>{authenticatedProfile?.fullname}</span>
                  </div>
              }
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <NextLink href="/profile" className="flex items-center">
                  <UserIcon className="mr-2 h-4 w-4" />
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
              <DropdownMenuItem className="cursor-pointer" onClick={async () => {
                setLoading(true);

                const error = await logout();
                if (error) {
                  throw new Error(`${error.status} ${error.name}: ${error.message}`);
                }

                setLoading(false);
              }}>
                <LogOut className="mr-2 h-4 w-4" />
                <span className="flex items-center">
                  Logout
                  { loading &&
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  }
                </span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator />
    </>
  );
}
