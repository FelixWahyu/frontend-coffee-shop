import { profileData } from "@/src/lib/profileData";
import { notFound } from "next/navigation";
import Image from "next/image";
import Aqua from "@/app/asset/image/aqua-botol.jpg";

export default async function DetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profile = await profileData.find((profile) => profile.id === Number(slug));
  if (!profile) {
    notFound();
    return;
  }

  return (
    <section className="container mx-auto mt-32 p-4">
      <h1 className="text-3xl font-bold">Detail Page</h1>
      <h3 className="text-xl">This is the detail page for {profile.name}</h3>
      <div className="max-w-2xl px-6 py-3 shadow-md rounded-lg border border-gray-200 mt-6">
        <div>
          <Image src={Aqua} width={50} height={50} alt="aqua botol" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">{profile.name}</h3>
          <p className="text-md">Email: {profile.email}</p>
          <p className="text-md">Old: {profile.old}</p>
          <p className="text-md">Skills: {profile.skills.join(", ")}</p>
        </div>
      </div>
    </section>
  );
}
