import { lusitana, poppins } from "@/lib/font";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Explore() {
  return (
    <div>
      <h1 className={`${lusitana.className} text-5xl mb-5`}>Explore</h1>
      <Card>
        <CardHeader>
          <CardTitle>Hi</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </CardDescription>
        </CardContent>
        <CardFooter>Bye</CardFooter>
      </Card>
    </div>
  );
}
