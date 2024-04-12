import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div>
      <h1 className={`mb-5`}>People</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {array.map((index) => (
          <div
            key={index}
            className="flex flex-col gap-5  w-[300px] rounded-lg px-8 py-3"
          >
            <div>
              <div>
                <Skeleton className="rounded-full w-24 h-24" />{" "}
              </div>
            </div>
            <div>
              <Skeleton className="w-[150px] h-[30px]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
