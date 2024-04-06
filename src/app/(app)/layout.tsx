import { createClient } from "@/utils/supabase/server";

import { redirect } from "next/navigation";

import Navbar from "@/components/navbar";

export default async function AppLayout({ children }: LayoutProps) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/signup');
  }

  return (
    <>
      <Navbar {...data} />
      {children}
    </>
  );
}
