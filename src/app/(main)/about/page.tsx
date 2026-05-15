import Image from "next/image";
import CafeFront from "@/src/asset/image/cafe-front.jpg";

export default function AboutPage() {
  return (
    <>
      <section className="relative h-[90vh] md:h-[80vh] bg-gray-800 flex items-center justify-center">
        <Image src={CafeFront} alt="hero-background" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-[#30261C] to-[#30261C]/10"></div>
        <div className="relative z-10 container mx-auto p-4 mt-8 md:mt-10">
          <div className="text-white max-w-2xl mx-auto flex flex-col items-start md:items-center md:justify-center px-4 md:px-0 text-left md:text-center">
            <div className="px-4 py-1 bg-gray-50/30 backdrop-blur-md w-fit mb-4 border border-gray-200/15 rounded-xl">
              <p className="text-lg font-lato">Perjalanan Profesional Kami</p>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight italic font-playfair">
              About <span className="not-italic text-[#C67C4E]">Us</span>
            </h1>
            <div className="flex flex-col items-start md:items-center md:justify-center">
              <p className="text-lg text-gray-200 font-lato">Perjalanan karir kami dari berbagai penjuru dunia, Menyajikan kopi dengan penuh kehangatan.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-12 py-16 grid grid-cols-3 items-center justify-between">
        <div className="my-4 col-span-2">
          <h1 className="text-4xl font-bold mb-6 font-playfair">
            Siapa <span className="text-[#C67C4E]">Kami?</span>
          </h1>
          <div className="flex flex-col gap-2 max-w-4xl">
            <p className="text-md font-lato">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate nulla temporibus, optio iure veniam laboriosam, expedita officiis non sed animi tempora facilis culpa. Illo, beatae. Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Ipsum error, facere voluptates quasi repellat magni iure accusamus aut est rem.
            </p>
            <p className="text-md font-lato">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur inventore cum facilis! Quod ullam repudiandae perspiciatis velit id quidem dolores voluptatum dolorem. Libero laudantium sunt consectetur voluptatem totam
              sapiente nostrum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde, consectetur nisi, esse iure nobis vel dolore explicabo architecto sit, quaerat repellat! Expedita amet maxime eius!
            </p>
            <p className="text-md font-lato">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque voluptas reiciendis recusandae esse eum eaque a neque voluptates, quasi, odio, quam molestias! Vitae laboriosam dolore incidunt nam quaerat autem dicta beatae,
              ex fugiat aliquam, distinctio ratione voluptatem inventore perferendis nemo sunt deleniti error illum obcaecati, sint cumque id est sed.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-1 items-center justify-center col-span-1"></div>
      </section>
    </>
  );
}
