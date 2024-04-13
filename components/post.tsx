import { lusitana, roboto } from "@/lib/font";
import Interactions from "@/components/interactions";
import Comments from "@/components/comments";
import Link from "next/link";
import { createClient } from "@/lib/supabase-utils/server";
import {
  returnCurrentUserVote,
  returnVoteCount,
} from "@/lib/supabase-utils/actions";
import Delete from "@/components/delete-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default async function Posts(props: {
  title: string;
  profiles: {
    username: string;
    id: string;
    full_name: string;
    avatar_url: string;
  };
  content: string;
  timestamp: any;
  post_id: string;
}) {
  const supabase = createClient();
  const userData = await supabase.auth.getUser();
  const id = userData.data.user?.id;
  const { data, error } = await supabase
    .from("comments")
    .select("*, profiles!inner(full_name, avatar_url)")
    .eq("post_id", props.post_id)
    .order("updated_at", { ascending: false });
  const comments = data;

  const currentUserVote = await returnCurrentUserVote(props.post_id);
  const voteCount = await returnVoteCount(props.post_id);

  return (
    <div>
      <h1 className={`${lusitana.className} text-3xl sm:text-5xl mb-1`}>
        {props.title}
      </h1>

      <div className="flex flex-row gap-5 w-full justify-between px-0">
        <div className="dark:text-gray-400 text-gray-600 text-md">
          <Link href={`/member/${props.profiles.username}`} className="flex">
            <Avatar className="w-8 h-8 mr-3">
              <AvatarImage src={props.profiles.avatar_url} />
              <AvatarFallback>
                {props.profiles.full_name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            @{props.profiles.username}
          </Link>
        </div>
        <p className="text-gray-600 dark:text-gray-400">{props.timestamp}</p>
      </div>

      <div className="w-full flex mt-6">
        <p className={`${roboto.className} text-lg w-2/3`}>{props.content}</p>
      </div>
      <div className="flex w-full justify-between mt-3">
        <div className="w-max ">
          <Interactions
            post_id={props.post_id}
            currentUserVote={currentUserVote}
            voteCount={voteCount}
          />
        </div>
        {id === props.profiles.id && (
          <Delete
            post_id={props.post_id}
            posterUserName={props.profiles.username}
          />
        )}
      </div>
      <div>
        <Comments
          post_id={props.post_id}
          comments={comments}
          posterUserName={props.profiles.username}
        />
      </div>
    </div>
  );
}
