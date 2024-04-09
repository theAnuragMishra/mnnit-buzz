"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { returnPaths } from "@/lib/supabase-utils/actions";
import { MdOutlineExplore } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { GiNotebook, GiMeepleGroup } from "react-icons/gi";
import { IoPersonCircle } from "react-icons/io5";
import { FaPager } from "react-icons/fa";
import { TiGroup } from "react-icons/ti";
import { useState, useEffect } from "react";

export default function NavLinks() {
  const [paths, setPaths] = useState({ profilePath: "", myPostsPath: "" });
  useEffect(() => {
    const getPaths = async () => {
      const paths = await returnPaths();
      setPaths(paths);
    };
    getPaths();
  }, []);

  const pathname = usePathname();
  // console.log(profilePath);

  const links = [
    { name: "Explore", href: "/explore", icon: MdOutlineExplore },
    { name: "Create", href: "/create", icon: FaPlus },
    { name: "My Posts", href: paths.myPostsPath, icon: FaPager },
    {
      name: "Diary",
      href: "/diary",
      icon: GiNotebook,
    },
    { name: "People", href: "/people", icon: TiGroup },
    { name: "Clubs", href: "/clubs", icon: GiMeepleGroup },

    { name: "Profile", href: paths.profilePath, icon: IoPersonCircle },
  ];

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-1 text-md font-medium hover:bg-blue-300 hover:dark:bg-gray-700 hover:dark:text-white hover:text-black md:flex-none md:p-2 md:px-3 bg-blue-100 dark:bg-gray-900",
              {
                "bg-blue-300 dark:bg-gray-700 dark:text-white text-black":
                  pathname === link.href, //highlihting current route
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
