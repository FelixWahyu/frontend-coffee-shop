import Image from "next/image";
import photo from "@/public/image/aqua-botol.jpg";

export default function AboutPage() {
  return (
    <main>
      <section className="h-screen bg-gray-800 flex flex-col items-center mb-6 justify-center">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-white">About Page</h1>
          <p className="text-md text-white">This is the about page.</p>
        </div>
      </section>

      <section className="px-12 py-4 grid grid-cols-3 items-center justify-between">
        <div className="my-4 col-span-2">
          <h1 className="text-3xl font-bold mb-6">About title</h1>
          <div className="flex flex-col gap-2 max-w-4xl">
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate nulla temporibus, optio iure veniam laboriosam, expedita officiis non sed animi tempora facilis culpa. Illo, beatae. Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Ipsum error, facere voluptates quasi repellat magni iure accusamus aut est rem.
            </p>
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur inventore cum facilis! Quod ullam repudiandae perspiciatis velit id quidem dolores voluptatum dolorem. Libero laudantium sunt consectetur voluptatem totam
              sapiente nostrum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde, consectetur nisi, esse iure nobis vel dolore explicabo architecto sit, quaerat repellat! Expedita amet maxime eius!
            </p>
            <p className="text-md">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque voluptas reiciendis recusandae esse eum eaque a neque voluptates, quasi, odio, quam molestias! Vitae laboriosam dolore incidunt nam quaerat autem dicta beatae,
              ex fugiat aliquam, distinctio ratione voluptatem inventore perferendis nemo sunt deleniti error illum obcaecati, sint cumque id est sed.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-1 items-center justify-center col-span-1">
          <div className="flex p-3 gap-4 items-center border border-gray-200 shadow-md rounded-md">
            <div className="flex items-center justify-center">
              <Image src={photo} alt="artikel" className="w-full object-cover" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Artikel title</h3>
              <p className="text-sm line-clamp-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum a repellendus molestiae eveniet et omnis facere sequi cupiditate exercitationem explicabo.</p>
            </div>
          </div>
          <div className="flex p-3 gap-4 items-center border border-gray-200 shadow-md rounded-md">
            <div className="flex items-center justify-center">
              <Image src={photo} alt="artikel" className="w-full object-cover" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Artikel title</h3>
              <p className="text-sm line-clamp-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum a repellendus molestiae eveniet et omnis facere sequi cupiditate exercitationem explicabo.</p>
            </div>
          </div>
          <div className="flex p-3 gap-4 items-center border border-gray-200 shadow-md rounded-md">
            <div className="flex items-center justify-center">
              <Image src={photo} alt="artikel" className="w-full object-cover" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Artikel title</h3>
              <p className="text-sm line-clamp-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum a repellendus molestiae eveniet et omnis facere sequi cupiditate exercitationem explicabo.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
