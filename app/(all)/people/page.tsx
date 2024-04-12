import { lusitana } from "@/lib/font";
import { createClient } from "@/lib/supabase-utils/server";
import Image from "next/image";
import Link from "next/link";
export default async function People() {
  const supabase = createClient();
  const userData = await supabase.auth.getUser();
  const id = userData.data.user?.id;
  const { data, error } = await supabase
    .from("profiles")
    .select()
    .neq("id", id);

  return (
    <div>
      <h1 className={`${lusitana.className} text-3xl sm:text-5xl mb-5`}>
        People
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {data!.map((user: any) => {
          if (user.username) {
            return (
              <Link
                key={user.id}
                className="flex flex-col gap-5 hover:bg-neutral-200 hover:dark:bg-neutral-900 w-[300px] rounded-lg px-8 py-3"
                href={`/member/${user.username}`}
              >
                <div>
                  <Image
                    src={user.avatar_url}
                    alt={user.full_name}
                    width={96}
                    height={96}
                    className="rounded-full w-24 h-24"
                  />
                </div>
                <div>
                  <h2 className="text-xl">{user.full_name}</h2>
                </div>
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
}
