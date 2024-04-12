"use client";
import { Button } from "@/components/ui/button";
import { manageFollower } from "@/lib/supabase-utils/actions";
import { useState } from "react";

import clsx from "clsx";

export default function Follow(props: {
  username: string;
  followButtonStateData: boolean;
}) {
  const [follow, setFollow] = useState(props.followButtonStateData);

  async function handleFollowButtonClick() {
    await manageFollower({ username: props.username, follow });
    setFollow((prev) => !prev);
  }
  return (
    <div>
      <Button
        variant="outline"
        className={clsx("text-lg bg-green-400 dark:bg-green-600", {
          "bg-red-500 dark:bg-red-400": !follow,
        })}
        onClick={() => {
          handleFollowButtonClick();
        }}
      >
        {follow ? <span>Follow</span> : <span>Unfollow</span>}
      </Button>
    </div>
  );
}
