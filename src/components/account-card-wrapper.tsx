import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from "@/components/ui/card";

export default function AccountCardWrapper({ header, description, children, footer } : AccountCardWrapperProps) {
  return (
    <Card className="w-1/5">
      <CardHeader className="text-center">
        <CardTitle className="flex justify-center items-center text-4xl">
          {header}
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {children}
      </CardContent>
      <CardFooter className="flex justify-center items-center">
        {footer}
      </CardFooter>
    </Card>
  );
}
