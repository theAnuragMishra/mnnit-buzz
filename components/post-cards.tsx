import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { createClient } from "@/lib/supabase-utils/server";
import { sliceString } from "@/lib/utils";
import Interactions from "./interactions";
import {
  returnCurrentUserVote,
  returnVoteCount,
} from "@/lib/supabase-utils/actions";

export async function PostCard(props: { post: any; slicedContent: string }) {
  const currentUserVote = await returnCurrentUserVote(props.post.id);
  const voteCount = await returnVoteCount(props.post.id);
  return (
    <Card key={props.post.id}>
      <CardHeader>
        <CardTitle className="flex flex-col">
          <div className="leading-relaxed">{props.post.title}</div>{" "}
          <div className="text-sm">
            <Link
              href={`/member/${props.post.profiles.username}`}
              className="dark:text-gray-400 text-gray-600"
            >
              @{props.post.profiles.username}
            </Link>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          {props.slicedContent}...
          <Link
            href={`/member/${props.post.profiles.username}/posts/${props.post.id}`}
            className="dark:text-white text-black"
          >
            Read More
          </Link>
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Interactions
          post_id={props.post.id}
          currentUserVote={currentUserVote}
          voteCount={voteCount}
        />
      </CardFooter>
    </Card>
  );
}

export default async function PostCardsWrapper(props: {
  username: string | null;
}) {
  const supabase = createClient();
  const today = new Date().toISOString().split("T")[0];
  if (props.username) {
    const { data, error } = await supabase
      .from("public_posts")
      .select("*, profiles!inner(username, full_name)")
      .eq("profiles.username", props.username)
      .order("updated_at", { ascending: false });
    return (
      <div className="gap-3 flex flex-col">
        {data!.map((post: any) => (
          <PostCard
            key={post.id}
            post={post}
            slicedContent={sliceString(post.content)}
          />
        ))}
      </div>
    );
  } else {
    const { data, error } = await supabase
      .from("public_posts")
      .select("*, profiles!inner(username, full_name)")
      .order("updated_at", { ascending: false })
      .limit(100);
    return (
      <div className="gap-3 flex flex-col">
        {data!.map((post: any) => (
          <PostCard
            key={post.id}
            post={post}
            slicedContent={sliceString(post.content)}
          />
        ))}
      </div>
    );
  }
}
