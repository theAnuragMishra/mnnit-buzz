import { lusitana, poppins } from "@/lib/font";

import { Suspense } from "react";
import PostCardsWrapper from "@/components/post-cards";
import { PostCardsWrapperSkeleton } from "@/components/skeletons";
import Search from "@/components/search";
import Pagination from "@/components/pagination";
import { fetchPostPages } from "@/lib/supabase-utils/actions";

export default async function Explore({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchPostPages(query, null);

  return (
    <div>
      <div
        className={`${lusitana.className} text-3xl sm:text-5xl mb-5 flex justify-between`}
      >
        Explore
      </div>
      <Search placeholder="Search posts..." />
      <Suspense fallback={<PostCardsWrapperSkeleton />}>
        <PostCardsWrapper
          username={null}
          query={query}
          currentPage={currentPage}
        />
      </Suspense>
      <div className="w-full flex justify-center mt-3">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
