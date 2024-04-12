import { lusitana, roboto } from "@/lib/font";
import Interactions from "@/components/interactions";
import Comments from "@/components/comments";
import Link from "next/link";
import { createClient } from "@/lib/supabase-utils/server";

export default async function Posts(props: {
  title: string;
  profiles: { username: string };
  content: string;
  timestamp: any;
  post_id: string;
}) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("comments")
    .select("*, profiles!inner(full_name, avatar_url)")
    .eq("post_id", props.post_id)
    .order("updated_at", { ascending: false });
  const comments = data;

  return (
    <div>
      <h1 className={`${lusitana.className} text-5xl mb-1`}>{props.title}</h1>
      <div className="flex flex-row gap-5 w-full justify-between px-0">
        <p className="text-gray-500">
          by{" "}
          <Link href={`/member/${props.profiles.username}`}>
            {props.profiles.username}
          </Link>
        </p>
        <p className="text-gray-600 dark:text-gray-400">{props.timestamp}</p>
      </div>
      <div className="w-full flex mt-6">
        <p className={`${roboto.className} text-lg w-2/3`}>{props.content}</p>
      </div>
      <div className="w-max mt-3">
        <Interactions post_id={props.post_id} />
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
