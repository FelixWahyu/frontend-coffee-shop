import { profileData } from "@/src/lib/profileData";
import { CardBody } from "@/src/components/ui/card-body";
import Link from "next/link";

export default function BlogPage() {
  return (
    <>
      <section>
        <div className="h-screen bg-gray-800 flex flex-col items-center mb-6 justify-center">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-white">Blog Page</h1>
            <p className="text-md text-white">This is the blog page.</p>
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold">My Blog</h1>
          <p className="text-md">This is the my blog.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
            {profileData.map((profile) => (
              <Link key={profile.id} href={`/blog/${profile.id}`} className="block">
                <CardBody profiles={profile} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
