"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { roboto, lusitana, poppins } from "@/lib/font";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createComment } from "@/lib/supabase-utils/actions";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  comment: z.string().min(1, { message: "Comment cannot be empty!" }).max(500),
});

export default function Comments(props: {
  post_id: string;
  comments: any;
  posterUserName: string;
}) {
  const [isDisabled, setIsDisabled] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsDisabled(true);
    await createComment(values, {
      post_id: props.post_id,
      posteruserName: props.posterUserName,
    });
    setIsDisabled(false);
    form.reset();
  }
  function timeAgo(timestamp: any) {
    const now = new Date();
    const commentDate = new Date(timestamp);
    const timeDifference = now.getTime() - commentDate.getTime();

    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (timeDifference < 60000) {
      return "Just now";
    } else if (timeDifference < 3600 * 1000) {
      return `${Math.floor(timeDifference / 60000)} minutes ago`;
    } else if (timeDifference < 86400 * 1000) {
      return `${Math.floor(timeDifference / (3600 * 1000))} hours ago`;
    }

    if (daysDifference === 0) {
      return "Today";
    } else if (daysDifference === 1) {
      return "Yesterday";
    } else if (daysDifference > 1 && daysDifference < 7) {
      return `${daysDifference} days ago`;
    } else {
      return commentDate.toDateString();
    }
  }

  return (
    <div className="mt-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Add your comment..."
                    {...field}
                    className="resize-none h-[80px]"
                  />
                </FormControl>
                <FormDescription>
                  Please be nice and respectful to others.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isDisabled}>
            Add Comment
          </Button>
        </form>
      </Form>

      <div>
        <h1 className={`text-2xl ${poppins.className} mt-8`}>Comments</h1>
        {props.comments.map((comment: any, index: number) => (
          <div className="mt-4" key={index}>
            <div className="flex flex-row gap-4">
              <Avatar>
                <AvatarImage src={comment.profiles.avatar_url} />
                <AvatarFallback>
                  {comment.profiles.full_name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="w-full">
                <div
                  className={`${lusitana.className} text-lg flex flex-col md:flex-row justify-between gap-2 w-full`}
                >
                  <span>{comment.profiles.full_name}</span>{" "}
                  <span> {timeAgo(comment.updated_at)}</span>
                </div>
                <p
                  className={`${roboto.className} text-sm text-gray-600 dark:text-gray-400`}
                >
                  {comment.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
