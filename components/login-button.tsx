import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { handleSignin } from "@/lib/supabase-utils/actions";

export default function LoginButton() {
  return (
    <form>
      <Button formAction={handleSignin} className="w-[200px] h-[60px] text-3xl">
        <FcGoogle className="mr-2" /> Sign In!
      </Button>
    </form>
  );
}
