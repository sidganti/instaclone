"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset}: ErrorProps) {
  return (
    <main className="flex min-h-screen justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-5xl">{error.name}</h1>
          <Separator orientation="vertical" className="h-12" />
          <div>{error.message}</div>
        </div>
        <Button
          onClick={() => {
            console.clear();
            reset();
          }}
        >
          Try again
        </Button>
      </div>
    </main>
  );
}
