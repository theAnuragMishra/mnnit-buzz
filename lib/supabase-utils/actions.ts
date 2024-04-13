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
    if (username) {
      revalidatePath(`/member/${username}/posts/`);
      revalidatePath(`/explore`);
      redirect(`/member/${username}/posts/${postId}`);
    } else {
      revalidatePath(`/explore`);
      redirect(`/explore`);
    }
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
    if (username) {
      revalidatePath(`/member/${username}/posts/`);
      revalidatePath(`/explore`);
      redirect(`/member/${username}/posts/${postId}`);
    } else {
      redirect(`/set-username`);
    }
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
  console.log(follow);
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
    console.log("unfollowng u ");
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

export async function followButtonState(username: string) {
  const supabase = createClient();
  const userData = await supabase.auth.getUser();
  const follower_id = userData.data.user?.id;
  const { data: followedPersonData, error: followedPersonError } =
    await supabase.from("profiles").select("id").eq("username", username);
  const { data, error } = await supabase
    .from("follower_following")
    .select("id")
    .eq("follower_id", follower_id)
    .eq("user_id", followedPersonData![0].id);

  if (data) {
    if (data[0]) {
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
}

export async function createComment(
  values: { comment: string },
  postData: { post_id: string; posteruserName: string }
) {
  const supabase = createClient();
  const userData = await supabase.auth.getUser();
  const userId = userData.data.user?.id;
  const { error } = await supabase.from("comments").insert({
    content: values.comment,
    post_id: postData.post_id,
    commenter_id: userId,
  });
  revalidatePath(
    `/member/${postData.posteruserName}/posts/${postData.post_id}`
  );
}

export async function deletePost(postData: {
  post_id: string;
  posteruserName: string;
}) {
  const supabase = createClient();
  const { error } = await supabase
    .from("public_posts")
    .delete()
    .eq("id", postData.post_id);
  revalidatePath(`/member/${postData.posteruserName}/posts/`);
  redirect(`/member/${postData.posteruserName}/posts/`);
}

export async function deleteComment(
  comment_id: string,
  postData: {
    post_id: string;
    posteruserName: string;
  }
) {
  const supabase = createClient();
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", comment_id);
  revalidatePath(
    `/member/${postData.posteruserName}/posts/${postData.post_id}`
  );
}

export async function fetchPostPages(query: string, username: string | null) {
  const itemsPerPage = 20; //setting number of items per page
  unstable_noStore();

  const supabase = createClient();
  if (username) {
    const { count, error } = await supabase
      .from("public_posts")
      .select("id, profiles!inner(username, full_name)", {
        count: "exact",
        head: true,
      })
      .eq("profiles.username", username)
      .ilike("title", `%${query}%`);
    const totalPages = Math.ceil(Number(count) / itemsPerPage);
    return totalPages;
  } else {
    const { count, error } = await supabase
      .from("public_posts")
      .select("id", { count: "exact", head: true })
      .ilike("title", `%${query}%`);
    const totalPages = Math.ceil(Number(count) / itemsPerPage);
    return totalPages;
  }
}
