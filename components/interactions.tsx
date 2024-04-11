"use client";

import {
  BiSolidUpvote,
  BiUpvote,
  BiDownvote,
  BiSolidDownvote,
} from "react-icons/bi";
import {
  returnCurrentUserVote,
  returnVoteCount,
} from "@/lib/supabase-utils/actions";
import { manageInteractions } from "@/lib/supabase-utils/actions";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function Interactions(props: { post_id: string }) {
  const [isUpvote, setIsUpvote] = useState(true);
  const [isDownvote, setIsDownvote] = useState(true);
  const [votes, setVotes] = useState(0);

  useEffect(() => {
    const getVotes = async () => {
      const data = await returnCurrentUserVote(props.post_id);
      const voteCount = await returnVoteCount(props.post_id);

      setVotes(voteCount);
      if (data.downVoted) {
        setIsUpvote(true);
        setIsDownvote(false);
      }
      if (data.upVoted) {
        setIsDownvote(true);
        setIsUpvote(false);
      }
    };
    getVotes();
  }, [props.post_id]);

  async function handleInteractions(interactionParams: {
    interaction: "upvote" | "downvote";
    post_id: string;
    isUpvote?: boolean;
    isDownvote?: boolean;
  }) {
    await manageInteractions(interactionParams);
    if (interactionParams.interaction === "upvote") {
      if (isUpvote) {
        setIsUpvote(false);
        setIsDownvote(true);
        setVotes((prev) => prev + 1);
        if (!isDownvote) {
          setVotes((prev) => prev + 1);
        }
      } else {
        setIsUpvote(true);
        setVotes((prev) => prev - 1);
      }
    } else {
      if (isDownvote) {
        setIsDownvote(false);
        setIsUpvote(true);
        setVotes((prev) => prev - 1);
        if (!isUpvote) {
          setVotes((prev) => prev - 1);
        }
      } else {
        setIsDownvote(true);
        setVotes((prev) => prev + 1);
      }
    }
  }
  return (
    <div className="flex border-2 rounded-lg">
      <Button
        variant={"outline"}
        className="border-0 hover:bg-inherit"
        onClick={() => {
          handleInteractions({
            interaction: "upvote",
            post_id: props.post_id,
            isUpvote,
          });
        }}
      >
        {isUpvote ? <BiUpvote /> : <BiSolidUpvote className="text-red-600" />}
      </Button>
      <div className="flex justify-center items-center"> {votes}</div>
      <Button
        variant={"outline"}
        className="border-0 hover:bg-inherit"
        onClick={() => {
          handleInteractions({
            interaction: "downvote",
            post_id: props.post_id,
            isDownvote,
          });
        }}
      >
        {isDownvote ? (
          <BiDownvote />
        ) : (
          <BiSolidDownvote className="text-red-600" />
        )}
      </Button>
    </div>
  );
}
