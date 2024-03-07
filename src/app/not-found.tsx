"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function Error() {
  const pathname = usePathname();
  return (
    <main className="flex min-h-screen justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-5xl">404</h1>
          <Separator orientation="vertical" className="h-12" />
          <div>{pathname.slice(1)}</div>
        </div>
        <Button>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </main>
  );
}
