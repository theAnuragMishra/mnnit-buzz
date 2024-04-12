import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function PostCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-col">
          <div>
            <Skeleton className="h-[20px] w-full" />
          </div>
          <div className="text-sm mt-3">
            <Skeleton className="h-[16px] w-[100px]" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          <Skeleton className="w-full h-[60px]" />
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-[30px] w-[106px]" />
      </CardFooter>
    </Card>
  );
}

export function PostCardsWrapperSkeleton() {
  return (
    <div className="gap-3 flex flex-col">
      <PostCardSkeleton />
      <PostCardSkeleton />
      <PostCardSkeleton />
      <PostCardSkeleton />
    </div>
  );
}
