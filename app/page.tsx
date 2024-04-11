import LoginButton from "@/components/login-button";
import { ModeToggle } from "@/components/mode-toggle";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-utils/server";
import TypewriterComponent from "@/components/typewriter";
import { poppins, lusitana } from "@/lib/font";

export default async function Home() {
  const supabase = createClient();
  const userData = await supabase.auth.getUser();
  if (userData.data.user) {
    redirect("/explore");
  }
  return (
    <main className="flex min-h-screen flex-col items-center ">
      <div className="w-full flex justify-end px-5 py-4">
        <ModeToggle />
      </div>

      <div className="flex flex-col gap-5 h-[60vh] items-center justify-center px-4">
        <h1 className={`text-4xl ${poppins.className} mb-5 text-center`}>
          Welcome to MNNIT Buzz!
        </h1>
        <div
          className={`${lusitana.className} lg:text-7xl text-5xl text-center`}
        >
          Where MNNITians{" "}
          <span className="text-amber-600 dark:text-amber-600 block md:inline">
            <TypewriterComponent />
          </span>
        </div>
        <LoginButton />
      </div>
    </main>
  );
}
