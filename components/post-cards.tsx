import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
          <div className="leading-relaxed text-xl md:text-2xl">
            <Link
              href={`/member/${props.post.profiles.username}/posts/${props.post.id}`}
            >
              {props.post.title}
            </Link>
          </div>{" "}
          <div className="text-sm flex">
            <Link
              href={`/member/${props.post.profiles.username}`}
              className="dark:text-gray-400 text-gray-600 flex"
            >
              <Avatar className="w-7 h-7 mr-3">
                <AvatarImage src={props.post.profiles.avatar_url} />
                <AvatarFallback>
                  {props.post.profiles.full_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
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
  query: string;
  currentPage: number;
}) {
  const itemsPerPage = 20;
  const offset = (props.currentPage - 1) * itemsPerPage;
  const supabase = createClient();

  if (props.username) {
    const { data, error } = await supabase
      .from("public_posts")
      .select("*, profiles!inner(username, full_name)")
      .eq("profiles.username", props.username)
      .ilike("title", `%${props.query}%`)
      .order("updated_at", { ascending: false })
      .range(offset, offset + itemsPerPage - 1);
    if (data!.length === 0) {
      return (
        <div key={1} className=" text-2xl md:4xl">
          No such post 😭.
        </div>
      );
    }
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
      .select("*, profiles!inner(username, full_name, avatar_url)")
      .order("updated_at", { ascending: false })
      .ilike("title", `%${props.query}%`)
      .range(offset, offset + itemsPerPage - 1);
    if (data!.length === 0) {
      return (
        <div key={1} className=" text-2xl md:4xl">
          No such post 😭.
        </div>
      );
    }
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
