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
  const user = await supabase.auth.getUser();
  const id = user.data.user?.id;
  const { data, error } = await supabase.from("profiles").select().eq("id", id);
  if (data) {
    const userName = data[0].username;
    if (userName) {
      return {
        profilePath: "/" + userName,
        myPostsPath: "/" + userName + "/posts",
      };
    } else {
      return { profilePath: "/set-username", myPostsPath: "/set-username" };
    }
  } else {
    return { profilePath: "/", myPostsPath: "/" };
  }
}
