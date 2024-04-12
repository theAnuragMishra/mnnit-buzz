"use client";

import { MdDelete } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { deletePost } from "@/lib/supabase-utils/actions";

export default function Delete(props: {
  post_id: string;
  posterUserName: string;
}) {
  async function handleDelete() {
    await deletePost({
      post_id: props.post_id,
      posteruserName: props.posterUserName,
    });
  }
  return (
    <Button variant={`outline`} className="text-xl" onClick={handleDelete}>
      Delete Post
      <MdDelete className="inline text-red-500 " />
    </Button>
  );
}
