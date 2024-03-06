import { Button } from "@/components/ui/button";

//

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import { logout } from "@/lib/actions";

//

export default async function Home() {

  //
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }
  //

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button>Hello {data.user.email}</Button>
      <form action={logout}>
        <button>logout</button>
      </form>
    </main>
  );
}
