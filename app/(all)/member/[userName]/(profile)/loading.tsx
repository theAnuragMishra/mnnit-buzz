import { Skeleton } from "@/components/ui/skeleton";
import { lusitana } from "@/lib/font";

export default function Loading() {
  return (
    <div>
      <div className={`${lusitana.className} text-3xl sm:text-5xl mb-5 `}>
        Profile
      </div>
      <div>
        <Skeleton className="h-[120px] w-[120px] mb-3 rounded-full" />
      </div>
      <div className="mb-3">
        <Skeleton className="h-[30px] w-[200px]" />
      </div>
      <div className="text-gray-400 mb-8">
        <Skeleton className="w-[150px] h-[30px]" />
      </div>
      <div className={`flex flex-row gap-5 mb-3`}>
        <div>
          <span className="text-black dark:text-white">
            <Skeleton className="w-[100px] h-[30px]" />
          </span>{" "}
        </div>
        <div>
          <span className="text-black dark:text-white">
            <Skeleton className="w-[100px] h-[30px]" />
          </span>{" "}
        </div>
      </div>

      <div>
        <Skeleton className="h-[30px] w-[100px]" />
      </div>
      <div className="mt-2">
        <Skeleton className="h-[30px] w-[150px]" />
      </div>
    </div>
  );
}
