"use client";
import { Button } from "@/components/ui/button";
import { manageFollower } from "@/lib/supabase-utils/actions";
import { useState, useEffect, use } from "react";
import { followButtonState } from "@/lib/supabase-utils/actions";

export default function Follow(props: { username: string }) {
  const [follow, setFollow] = useState(false);
  useEffect(() => {
    const getFollowState = async () => {
      const data = await followButtonState(props.username);
      setFollow(data);
    };
    getFollowState();
  }, [props.username]);
  async function handleFollowButtonClick() {
    setFollow((prev) => !prev);
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
