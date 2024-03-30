import AccountCardWrapper from "@/components/account-card-wrapper";
import SignupForm from "@/components/signup-form";
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
      description="Create an account"
      footer={
        <span className="text-sm">
          Already have an account?
          {/* <Button variant={"link"}>
            <Link href="/login">Login</Link>
          </Button> */}
          <Link href="/login">
            <Button variant={"link"}>Login</Button>
          </Link>
        </span>
      }
    >
      <SignupForm />
    </AccountCardWrapper>
  );
}
