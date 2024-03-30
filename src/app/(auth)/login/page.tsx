import AccountCardWrapper from "@/components/account-card-wrapper";
import LoginForm from "@/components/login-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Instagram } from "lucide-react";

export default function Page() {
  return (
    <AccountCardWrapper
      header={
        <>
          <Instagram className="mr-2 h-8 w-8" /> Instaclone
        </>
      }
      description="Login to your account"
      footer={
        <span className="text-sm">
          Dont have an account?
          <Link href="/signup">
            <Button variant={"link"}>Sign up</Button>
          </Link>
        </span>
      }
    >
      <LoginForm />
    </AccountCardWrapper>
  );
}
