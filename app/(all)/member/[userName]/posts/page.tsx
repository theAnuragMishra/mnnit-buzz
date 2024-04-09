import { lusitana } from "@/lib/font";

export default function Posts({ params }: { params: { userName: string } }) {
  return (
    <div>
      <h1 className={`${lusitana.className} mb-5 text-5xl`}>
        {params.userName}
      </h1>
    </div>
  );
}
