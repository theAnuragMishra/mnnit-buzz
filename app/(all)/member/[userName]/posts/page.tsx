import { lusitana } from "@/lib/font";
import { createClient } from "@/lib/supabase-utils/server";
import PostCardsWrapper from "@/components/post-cards";
import { Suspense } from "react";
import { PostCardsWrapperSkeleton } from "@/components/skeletons";
export default async function Posts({
  params,
}: {
  params: { userName: string };
}) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("public_posts")
    .select("*, profiles!inner(username, full_name)")
    .eq("profiles.username", params.userName);
  return (
    <div>
      <h1
        className={`${lusitana.className} mb-5 text-3xl sm:text-5xl capitalize`}
      >
        {data![0].profiles.full_name}&apos;s Posts
      </h1>
      <Suspense fallback={<PostCardsWrapperSkeleton />}>
        <PostCardsWrapper username={params.userName} />
      </Suspense>
    </div>
  );
}
