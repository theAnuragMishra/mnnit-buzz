import { lusitana, poppins } from "@/lib/font";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import PostCardsWrapper from "@/components/post-cards";

export default async function Explore() {
  return (
    <div>
      <div
        className={`${lusitana.className} text-5xl mb-5 flex justify-between`}
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
      <PostCardsWrapper username={null} />
    </div>
  );
}
