"use server";

import { createClient } from "@/lib/supabase-utils/server";
import { redirect } from "next/navigation";

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
  if (data) {
    const userName = data[0].username;
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
      // toast({ title: "Username is already taken." });
      return { title: "Username is taken :(", description: "" };
    }
  }
  await supabase
    .from("profiles")
    .upsert({ id: userId, username: values.username });
  // toast({
  //   title: "Username set!",
  //   description: "Redirecting you to your profile.",
  // });
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
    redirect(`/member/${username}/posts/${postId}`);
  }
}
