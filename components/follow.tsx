"use client";
import { Button } from "@/components/ui/button";
import { manageFollower } from "@/lib/supabase-utils/actions";
import { useState } from "react";
import { set } from "react-hook-form";

export default function Follow(props: { username: string }) {
  const [follow, setFollow] = useState(false);

  async function handleFollowButtonClick() {
    setFollow(!follow);
    await manageFollower({ username: props.username, follow });
  }
  return (
    <div>
      <Button
        variant="outline"
        className="text-lg"
        onClick={() => {
          handleFollowButtonClick();
        }}
      >
        {follow ? <span>Unfollow</span> : <span>Follow</span>}
      </Button>
    </div>
  );
}
