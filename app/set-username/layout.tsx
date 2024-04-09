import { Toaster } from "@/components/ui/toaster";
import { userNameAlreadyCheck } from "@/lib/supabase-utils/actions";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await userNameAlreadyCheck();
  return (
    <>
      <main>{children}</main>
      <Toaster />
    </>
  );
}
