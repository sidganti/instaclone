import AccountCardWrapper from "@/components/account-card-wrapper";
import SignupForm from "@/components/signup-form";
import { Instagram } from "lucide-react";

export default function Page() {
  return (
    <AccountCardWrapper
      title={
        <>
          <Instagram className="mr-2 h-8 w-8" /> Instaclone
        </>
      }
      description="Create an account"
    >
      <SignupForm />
    </AccountCardWrapper>
  );
}
