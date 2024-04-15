import { lusitana } from "@/lib/font";
import { createClient } from "@/lib/supabase-utils/server";
import PostCardsWrapper from "@/components/post-cards";
import { Suspense } from "react";
import { PostCardsWrapperSkeleton } from "@/components/skeletons";
import Search from "@/components/search";
import { fetchPostPages } from "@/lib/supabase-utils/actions";
import Pagination from "@/components/pagination";
export default async function Posts({
  params,
  searchParams,
}: {
  params: { userName: string };
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchPostPages(query, params.userName);

  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", params.userName);
  return (
    <div>
      <h1
        className={`${lusitana.className} mb-5 text-3xl sm:text-5xl capitalize`}
      >
        {data![0].full_name}&apos;s Posts
      </h1>
      <Search placeholder="Search posts..." />
      <Suspense fallback={<PostCardsWrapperSkeleton />}>
        <PostCardsWrapper
          username={params.userName}
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
