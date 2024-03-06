import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AccountCardWrapper({ title, description, children } : AccountCardWrapperProps) {
  return (
    <Card className="w-1/5">
      <CardHeader className="text-center">
        <CardTitle className="flex justify-center items-center text-4xl">
          {title}
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      {children}
    </Card>
  );
}
