import PhotoModal from "@/app/(afterLogin)/@modal/[username]/status/[id]/photo/[photo]/page";
import Home from "@/app/(afterLogin)/home/page";

type Props = {
  params: { username: string; id: string; photoId: string };
};
export default function Page({ params }: Props) {
  params.username;
  params.id;
  params.photoId;
  return (
    <>
      <Home />;
      <PhotoModal params={params} />
    </>
  );
}
