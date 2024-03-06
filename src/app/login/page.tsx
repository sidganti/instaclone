import { login, signup } from "@/lib/actions";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";

export default function Page() {
  return (
    <main className="flex min-h-screen justify-center items-center">

      <form>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <button formAction={login}>Log in</button>
        <button formAction={signup}>Sign up</button>
      </form>

      <div className="text-center">
        <Card className="h-full w-96">
          <CardHeader>
            <CardTitle className="flex justify-center items-center text-lg">
              <Instagram className="mr-2 h-4 w-4" /> Instaclone
            </CardTitle>
            {/* <CardDescription>Card Description</CardDescription> */}
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
            <p>Card Content</p>
            <p>Card Content</p>
          </CardContent>
          <CardFooter className="justify-between">
            <Button variant={"link"}>Link</Button>
            <Button>Login</Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
