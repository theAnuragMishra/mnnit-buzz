import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div>
      <div>
        <Skeleton className="h-[120px] w-[120px] mb-3 rounded-full" />
      </div>
      <div className="mb-3">
        <Skeleton className="h-[50px] w-[100px]" />
      </div>
      <div className="text-gray-400 mb-8">
        <Skeleton className="w-[200px] h-[30px]" />
      </div>
      <div className={`flex flex-row gap-5 mb-3`}>
        <div>
          <span className="text-black dark:text-white">
            <Skeleton className="w-[200px] h-[30px]" />
          </span>{" "}
        </div>
        <div>
          <span className="text-black dark:text-white">
            <Skeleton className="w-[200px] h-[30px]" />
          </span>{" "}
        </div>
      </div>

      <div className="mb-3">
        <div className="" />
      </div>

      <div className="">
        <div></div>
      </div>
    </div>
  );
}
