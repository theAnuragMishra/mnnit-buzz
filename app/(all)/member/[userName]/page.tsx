import { createClient } from "@/lib/supabase-utils/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { lusitana, poppins } from "@/lib/font";
import Follow from "@/components/follow";
import { returnFollowData } from "@/lib/supabase-utils/actions";

export default async function Profile({
  params,
}: {
  params: { userName: string };
}) {
  const supabase = createClient();
  const userData = await supabase.auth.getUser();
  const id = userData.data.user?.id;

  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("username", params.userName);
  if (error) {
    console.error(error);
  }
  const user = data![0];

  if (!user) {
    return (
      <div
        className={`flex justify-center items-center text-7xl ${lusitana.className} h-2/3`}
      >
        Member not found!
      </div>
    );
  } else {
    const followData = await returnFollowData(params.userName);
    return (
      <div>
        <Avatar className="h-[120px] w-[120px] mb-3">
          <AvatarImage src={user.avatar_url} alt={user.full_name} />
          <AvatarFallback className="text-6xl">
            {user.full_name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <h1 className={`capitalize ${lusitana.className} text-4xl `}>
          {user.full_name}
        </h1>
        <div className="text-gray-400 mb-8">@{params.userName}</div>
        <div
          className={`flex flex-row ${poppins.className} text-lg text-gray-500 gap-5 mb-3`}
        >
          <div>
            <span className="text-black dark:text-white">
              {followData.follwers}
            </span>{" "}
            Followers
          </div>
          <div>
            <span className="text-black dark:text-white">
              {followData.following}
            </span>{" "}
            Following
          </div>
        </div>
        {user.id !== id && (
          <div className="">
            <Follow username={params.userName} />
          </div>
        )}
      </div>
    );
  }
}
