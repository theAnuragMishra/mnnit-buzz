"use client";
import { Button } from "@/components/ui/button";
import { setFollow } from "@/lib/supabase-utils/actions";

export default function Follow(props: { username: string }) {
  async function handleFollowButtonClick() {
    await setFollow(props.username);
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
        Follow
      </Button>
    </div>
  );
}
