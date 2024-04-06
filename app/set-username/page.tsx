import { ModeToggle } from "@/components/mode-toggle";
import { Input } from "@/components/ui/input";

export default function SetUsername() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full flex justify-end px-5 py-4">
        <ModeToggle />
      </div>
      <h1 className="text-[44px]">Set your username!</h1>
      <Input className="w-full max-w-[400px] mt-4" />
    </div>
  );
}
