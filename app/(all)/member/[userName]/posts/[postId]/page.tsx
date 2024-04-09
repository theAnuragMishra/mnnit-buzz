import { createClient } from "@/lib/supabase-utils/server";

export default async function Posts({
  params,
}: {
  params: { postId: string; userName: string };
}) {
  const postId = params.postId;
  const userName = params.userName;
  const supabase = createClient();

  const fromPublicPosts = await supabase
    .from("public_posts")
    .select()
    .eq("id", postId);
  const fromPrivatePosts = await supabase
    .from("public_posts")
    .select()
    .eq("id", postId);

  if (fromPublicPosts.data) {
    return <div>Public Post by {params.userName}</div>;
  } else if (fromPrivatePosts.data) {
    return <div>Private Post</div>;
  } else {
    return <div>Post not found</div>;
  }
}
