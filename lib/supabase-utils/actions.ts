"use server";

import { createClient } from "@/lib/supabase-utils/server";
import { redirect } from "next/navigation";
import { revalidatePath, unstable_noStore } from "next/cache";

export async function handleSignin() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.MAIN_URL}/api/auth/callback`,
    },
  });

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
}

export async function returnPaths() {
  const supabase = createClient();
  const userData = await supabase.auth.getUser();
  const id = userData.data.user?.id;
  const { data, error } = await supabase.from("profiles").select().eq("id", id);
  if (data![0]) {
    const userName = data![0].username;
    if (userName) {
      return {
        profilePath: "/member/" + userName,
        myPostsPath: "/member/" + userName + "/posts",
      };
    } else {
      return { profilePath: "/set-username", myPostsPath: "/set-username" };
    }
  } else {
    return { profilePath: "/", myPostsPath: "/" };
  }
}

export async function userNameAlreadyCheck() {
  const supabase = createClient();

  const userData = await supabase.auth.getUser();
  const userId = userData.data.user?.id;
  const { data, error } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", userId);
  if (data![0].username) {
    redirect(`/member/${data![0].username}`);
  }
}

export async function setUserNameLogic(values: { username: string }) {
  const supabase = createClient();
  const userData = await supabase.auth.getUser();
  const userId = userData.data.user?.id;
  const { data, error } = await supabase.from("profiles").select("username");
  for (const user of data!) {
    if (user.username === values.username) {
      return { title: "Username is taken :(", description: "" };
    }
  }
  await supabase
    .from("profiles")
    .upsert({ id: userId, username: values.username });
  revalidatePath("/(all)", "layout");
  return {
    title: "Username set!",
    description: "Redirecting you to your profile...",
  };
}

export async function handleSignout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function createPost(values: {
  title: string;
  content: string;
  type: "public" | "private";
}) {
  const supabase = createClient();
  const userData = await supabase.auth.getUser();
  const userId = userData.data.user?.id;
  const { data, error } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", userId);
  const username = data![0].username;

  if (values.type === "public") {
    const { data, error } = await supabase
      .from("public_posts")
      .insert({
        title: values.title,
        content: values.content,
        poster_id: userId,
      })
      .select();
    const postId = data![0].id;
    revalidatePath(`/member/${username}/posts/`);
    revalidatePath(`/explore`);
    redirect(`/member/${username}/posts/${postId}`);
  } else {
    const { data, error } = await supabase
      .from("private_posts")
      .insert({
        title: values.title,
        content: values.content,
        poster_id: userId,
      })
      .select();
    const postId = data![0].id;
    revalidatePath(`/member/${username}/posts/`);
    revalidatePath(`/explore`);
    redirect(`/member/${username}/posts/${postId}`);
  }
}

export async function manageInteractions(interactionParams: {
  interaction: "upvote" | "downvote";
  post_id: string;
  isUpvote?: boolean;
  isDownvote?: boolean;
}) {
  let vote;
  if (interactionParams.interaction === "upvote") {
    vote = 1;
  }

  if (interactionParams.interaction === "downvote") {
    vote = -1;
  }
  const supabase = createClient();
  const userData = await supabase.auth.getUser();
  const userId = userData.data.user?.id;

  if (interactionParams.interaction === "upvote") {
    if (interactionParams.isUpvote) {
      const { error: error2 } = await supabase
        .from("post_votes")
        .delete()
        .eq("voter_id", userId)
        .eq("post_id", interactionParams.post_id);
      const { error } = await supabase.from("post_votes").insert({
        post_id: interactionParams.post_id,
        voter_id: userId,
        inc: vote,
      });
    } else {
      const { error: error2 } = await supabase
        .from("post_votes")
        .delete()
        .eq("voter_id", userId)
        .eq("post_id", interactionParams.post_id);
    }
  }

  if (interactionParams.interaction === "downvote") {
    if (interactionParams.isDownvote) {
      const { error: error2 } = await supabase
        .from("post_votes")
        .delete()
        .eq("voter_id", userId)
        .eq("post_id", interactionParams.post_id);

      const { error } = await supabase.from("post_votes").insert({
        post_id: interactionParams.post_id,
        voter_id: userId,
        inc: vote,
      });
    } else {
      const { error: error2 } = await supabase
        .from("post_votes")
        .delete()
        .eq("voter_id", userId)
        .eq("post_id", interactionParams.post_id);
    }
  }
}

export async function returnCurrentUserVote(post_id: string) {
  const supabase = createClient();
  const userData = await supabase.auth.getUser();
  const userId = userData.data.user?.id;
  const { data, error } = await supabase
    .from("post_votes")
    .select("inc")
    .eq("post_id", post_id)
    .eq("voter_id", userId);
  if (data) {
    if (data[0]) {
      return {
        upVoted: data![0].inc === 1,
        downVoted: data![0].inc === -1,
      };
    } else {
      return { upVoted: false, downVoted: false };
    }
  } else {
    return { upVoted: false, downVoted: false };
  }
}

export async function returnVoteCount(post_id: string) {
  const supabase = createClient();
  const { count: upVoteCount, error: upVoteCountError } = await supabase
    .from("post_votes")
    .select("inc", { count: "exact", head: true })
    .eq("post_id", post_id)
    .eq("inc", 1);
  const { count: downVoteCount, error: downVoteCountError } = await supabase
    .from("post_votes")
    .select("inc", { count: "exact", head: true })
    .eq("post_id", post_id)
    .eq("inc", -1);

  if (upVoteCount && downVoteCount) {
    const votes = upVoteCount - downVoteCount;
    return votes;
  } else if (upVoteCount) {
    const votes = upVoteCount;
    return votes;
  } else if (downVoteCount) {
    const votes = -downVoteCount;
    return votes;
  } else {
    const votes = 0;
    return votes;
  }
}

export async function manageFollower({
  username,
  follow,
}: {
  username: string;
  follow: boolean;
}) {
  const supabase = createClient();
  const userData = await supabase.auth.getUser();
  const follower_id = userData.data.user?.id;
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username);
  const user_id = data![0].id;
  if (follow) {
    const { data: data2, error: error2 } = await supabase
      .from("follower_following")
      .insert({ user_id: user_id, follower_id: follower_id });
  } else {
    const { data: data2, error: error2 } = await supabase
      .from("follower_following")
      .delete()
      .eq("user_id", user_id)
      .eq("follower_id", follower_id);
  }
}

export async function returnFollowData(username: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username);
  const id = data![0].id;
  const { count: followingCount, error: followingCountError } = await supabase
    .from("follower_following")
    .select("id", { count: "exact", head: true })
    .eq("follower_id", id);
  const { count: followerCount, error: followerCountError } = await supabase
    .from("follower_following")
    .select("id", { count: "exact", head: true })
    .eq("user_id", id);

  return { follwers: followerCount, following: followingCount };
}
