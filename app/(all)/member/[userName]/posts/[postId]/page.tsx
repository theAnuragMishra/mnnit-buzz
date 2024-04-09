import { createClient } from "@/lib/supabase-utils/server";
import Post from "@/components/post";
import { formatTimestamp } from "@/lib/utils";

export default async function Posts({
  params,
}: {
  params: { postId: string; userName: string };
}) {
  const supabase = createClient();

  const fromPublicPosts = await supabase
    .from("public_posts")
    .select("*, profiles!inner(username)")
    .eq("id", params.postId)
    .eq("profiles.username", params.userName);
  const fromPrivatePosts = await supabase
    .from("public_posts")
    .select("*, profiles!inner(username)")
    .eq("id", params.postId)
    .eq("profiles.username", params.userName);

  // console.log(fromPublicPosts.data);

  if (fromPublicPosts.data![0]) {
    return (
      <div>
        <Post
          title={fromPublicPosts.data![0].title}
          content={fromPublicPosts.data![0].content}
          profiles={fromPublicPosts.data![0].profiles}
          timestamp={formatTimestamp(fromPublicPosts.data![0].updated_at)}
        />
      </div>
    );
  } else if (fromPrivatePosts.data![0]) {
    return (
      <div>
        <Post
          title={fromPrivatePosts.data![0].title}
          content={fromPrivatePosts.data![0].content}
          profiles={fromPrivatePosts.data![0].profiles}
          timestamp={formatTimestamp(fromPrivatePosts.data![0].updated_at)}
        />
      </div>
    );
  } else {
    return <div>Post not found</div>;
  }
}
