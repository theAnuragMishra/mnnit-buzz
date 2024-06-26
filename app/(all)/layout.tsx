import SideNav from "@/components/navigation/side-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Toaster } from "@/components/ui/toaster";
import { createClient } from "@/lib/supabase-utils/server";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const userData = await supabase.auth.getUser();
  if (!userData.data.user) {
    redirect("/");
  }
  return (
    <>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="absolute top-2 right-2">
          <ModeToggle />
        </div>
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>

        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
          {children}
        </div>
      </div>
      <Toaster />
    </>
  );
}
