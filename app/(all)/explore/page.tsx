import { lusitana, poppins } from "@/lib/font";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Suspense } from "react";
import PostCardsWrapper from "@/components/post-cards";
import { PostCardsWrapperSkeleton } from "@/components/skeletons";

export default async function Explore() {
  return (
    <div>
      <div
        className={`${lusitana.className} text-3xl sm:text-5xl mb-5 flex justify-between`}
      >
        Explore{" "}
        <Select>
          <SelectTrigger
            className={`w-[90px] border-0 ${poppins.className} focus:border-0`}
          >
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Recent</SelectItem>
            <SelectItem value="top">Top</SelectItem>
            <SelectItem value="controversial">Controversial</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Suspense fallback={<PostCardsWrapperSkeleton />}>
        <PostCardsWrapper username={null} />
      </Suspense>
    </div>
  );
}
