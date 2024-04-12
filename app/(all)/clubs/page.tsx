import { lusitana } from "@/lib/font";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { clubData } from "@/lib/data";
import Link from "next/link";
export default async function Clubs() {
  return (
    <div>
      <h1 className={`${lusitana.className} text-3xl sm:text-5xl mb-5`}>
        Clubs
      </h1>
      <div className="clubs grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
        {clubData.map((item) => (
          <Card key={item.name}>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{item.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Link href={item.link}>Go to</Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
