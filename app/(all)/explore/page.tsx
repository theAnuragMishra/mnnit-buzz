import { lusitana } from "@/lib/font";
import Sort from "@/components/sort";
import { Suspense } from "react";
import PostCardsWrapper from "@/components/post-cards";
import { PostCardsWrapperSkeleton } from "@/components/skeletons";

export default async function Explore({
  searchParams,
}: {
  searchParams: { sort: "top" | "controversial" };
}) {
  return (
    <div>
      <div
        className={`${lusitana.className} text-3xl sm:text-5xl mb-5 flex justify-between`}
      >
        Explore <Sort />
      </div>
      <Suspense fallback={<PostCardsWrapperSkeleton />}>
        <PostCardsWrapper username={null} sortby={searchParams.sort} />
      </Suspense>
    </div>
  );
}
