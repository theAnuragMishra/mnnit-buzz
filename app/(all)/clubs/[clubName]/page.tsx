import { clubs } from "@/lib/utils";
import NotAClub from "@/components/not-a-club";

export default function Page({
  params,
}: {
  params: { communityName: string };
}) {
  if (!(params.communityName in clubs)) {
    return <NotAClub />;
  }
  return <div>My Post: {params.communityName}</div>;
}
