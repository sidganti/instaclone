import { createClient } from "@/utils/supabase/server";
import { logout } from "@/lib/actions";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";


export default async function Home() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/signup');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button>Hello {data.user.email}</Button>
      <form action={logout}>
        <button>logout</button>
      </form>
    </main>
  );
}
