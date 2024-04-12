import { clubs } from "@/lib/data";
import NotAClub from "@/components/not-a-club";
import { lusitana } from "@/lib/font";

export default function Page({ params }: { params: { clubName: string } }) {
  if (!clubs.includes(params.clubName)) {
    return <NotAClub />;
  }
  return (
    <div>
      <h1
        className={`capitalize ${lusitana.className} mb-5 text-3xl sm:text-5xl`}
      >
        {params.clubName}
      </h1>
    </div>
  );
}
