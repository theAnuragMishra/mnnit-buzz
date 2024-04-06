import Image from "next/image";
import LoginButton from "@/components/login-button";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center ">
      <div className="w-full flex justify-end px-5 py-4">
        <ModeToggle />
      </div>

      <h1 className="text-6xl">Welcome to MNNIT Buzz!</h1>
      <LoginButton />
    </main>
  );
}
