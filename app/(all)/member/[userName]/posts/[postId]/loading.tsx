import { Skeleton } from "@/components/ui/skeleton";
export default function Loading() {
  return (
    <div>
      <div>
        <div className={`mb-2`}>
          <Skeleton className="w-full h-[70px]" />
        </div>
        <div className="flex flex-row gap-5 w-full justify-between px-0 mb-3">
          <div>
            <Skeleton className="w-[200px] h-[20px] mb-3" />
          </div>

          <Skeleton className="w-[70px] h-[16px] mb-3" />
        </div>
        <div className="w-full flex mb-6">
          <Skeleton className={`w-2/3 mb-6 h-[300px]`} />
        </div>
        <div className="w-max mb-3">
          <Skeleton className="w-[200px] h-[20px]" />
        </div>
        <div>
          <div className="w-full">
            <Skeleton className="w-full h-[40px] mb-2" />
            <Skeleton className="w-full h-[40px] mb-2" />
            <Skeleton className="w-full h-[40px] mb-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
