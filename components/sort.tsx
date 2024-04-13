"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { poppins } from "@/lib/font";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
export default function Sort() {
  const router = useRouter();
  const handleSort = (sort: "top" | "controversial" | "recent") => {
    console.log("hi");
    if (sort === "recent") router.push(`/explore`);
    else {
      router.push(`/explore?sort=${sort}`);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={`${poppins.className}`} asChild>
        <Button variant={"outline"}>Sort</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent defaultValue={`Recent`}>
        <DropdownMenuItem
          onClick={() => {
            handleSort("recent");
          }}
        >
          Recent
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            handleSort("top");
          }}
        >
          Top
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            handleSort("controversial");
          }}
        >
          Controversial
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
