"use client";

import {
  BiSolidUpvote,
  BiUpvote,
  BiDownvote,
  BiSolidDownvote,
} from "react-icons/bi";

import { manageInteractions } from "@/lib/supabase-utils/actions";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function Interactions(props: {
  post_id: string;
  currentUserVote: { upVoted: boolean; downVoted: boolean };
  voteCount: number;
}) {
  const [isUpvote, setIsUpvote] = useState(!props.currentUserVote.upVoted);
  const [isDownvote, setIsDownvote] = useState(
    !props.currentUserVote.downVoted
  );
  const [votes, setVotes] = useState(props.voteCount);

  // useEffect(() => {
  //   setVotes(props.voteCount);
  //   if (props.currentUserVote.downVoted) {
  //     setIsUpvote(true);
  //     setIsDownvote(false);
  //   }
  //   if (props.currentUserVote.upVoted) {
  //     setIsDownvote(true);
  //     setIsUpvote(false);
  //   }
  // }, [
  //   props.voteCount,
  //   props.currentUserVote.downVoted,
  //   props.currentUserVote.upVoted,
  // ]);

  async function handleInteractions(interactionParams: {
    interaction: "upvote" | "downvote";
    post_id: string;
    isUpvote?: boolean;
    isDownvote?: boolean;
  }) {
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

    await manageInteractions(interactionParams);
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
