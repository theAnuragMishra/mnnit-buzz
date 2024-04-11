import { Toaster } from "@/components/ui/toaster";
import { userNameAlreadyCheck } from "@/lib/supabase-utils/actions";
import { createClient } from "@/lib/supabase-utils/server";
import { redirect } from "next/navigation";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const userData = await supabase.auth.getUser();
  if (!userData.data.user) {
    redirect("/");
  }
  await userNameAlreadyCheck();
  return (
    <>
      <main>{children}</main>
      <Toaster />
    </>
  );
}
