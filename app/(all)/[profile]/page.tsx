export default async function Profile({
  params,
}: {
  params: { profile: string };
}) {
  return (
    <div>
      <h1>{params.profile}</h1>
    </div>
  );
}
