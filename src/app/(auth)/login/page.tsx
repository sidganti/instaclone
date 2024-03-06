import LoginForm from "@/components/login-form";

import AccountCardWrapper from "@/components/account-card-wrapper";
import { Instagram } from "lucide-react";

export default function Page() {
  return (
    <AccountCardWrapper
      title={
        <>
          <Instagram className="mr-2 h-8 w-8" /> Instaclone
        </>
      }
      description="Login to your account"
    >
      <LoginForm />
    </AccountCardWrapper>
  );
}
