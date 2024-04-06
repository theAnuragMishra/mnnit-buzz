import Link from "next/link";
import NavLinks from "@/components/navigation/nav-links";
import { FaSignOutAlt } from "react-icons/fa";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-5 flex h-20 items-center justify-center rounded-md p-4 md:h-30"
        href="/"
      >
        <div className="w-32 text-black dark:text-white md:w-60 text-[32px]">
          logo here
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <form
          action={async () => {
            "use server";
            //signout here
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md  p-3 text-md font-medium hover:bg-blue-300 hover:dark:bg-gray-700 hover:dark:text-white hover:text-black bg-blue-100 dark:bg-gray-900 md:flex-none md:p-2 md:px-3">
            <FaSignOutAlt className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
