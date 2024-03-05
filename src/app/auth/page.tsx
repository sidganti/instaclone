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
