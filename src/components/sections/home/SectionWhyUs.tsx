import Image from "next/image";
import ImgCoffe from "@/public/assets/image/biji-coffe-cup.jpg";

export default function WhyUsSection() {
  return (
    <section className="px-8 py-14 bg-[#E2D9C8]">
      <div className="flex flex-col md:flex-row items-center gap-8 container mx-auto">
        <div className="w-full flex-1">
          <h2 className="text-4xl font-playfair font-bold italic mb-4">
            Why Choose <span className="text-[#C67C4E]">Us?</span>
          </h2>
          <p className="text-lg font-medium font-lato mb-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, dolorem! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate nesciunt exercitationem aspernatur, doloribus repellendus dignissimos deleniti
            beatae ratione maiores eveniet consectetur ipsum adipisci expedita optio, voluptatum dolorum, reprehenderit similique! Assumenda.
          </p>
          <p className="text-lg font-medium font-lato mb-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, dolorem! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate nesciunt exercitationem aspernatur, doloribus repellendus dignissimos deleniti
            beatae ratione maiores eveniet consectetur ipsum adipisci expedita optio, voluptatum dolorum, reprehenderit similique! Assumenda. Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, accusantium!
          </p>
          <div className="flex gap-8 mb-8">
            <div>
              <p className="text-3xl font-playfair font-bold text-[#30261C]">10+</p>
              <p className="text-sm font-lato text-[#30261C]/60">Tahun Pengalaman</p>
            </div>
            <div>
              <p className="text-3xl font-playfair font-bold text-[#30261C]">50+</p>
              <p className="text-sm font-lato text-[#30261C]/60">Jenis Kopi</p>
            </div>
            <div>
              <p className="text-3xl font-playfair font-bold text-[#30261C]">1K+</p>
              <p className="text-sm font-lato text-[#30261C]/60">Pelanggan Setia</p>
            </div>
          </div>
          <button className="bg-[#30261C] px-6 py-1.5 text-white font-semibold rounded-2xl shadow-sm hover:bg-[#30261C]/70 transition-colors duration-300 cursor-pointer">More Info</button>
        </div>

        <div className="aspect-square overflow-hidden relative w-full md:flex-1">
          <Image src={ImgCoffe} alt="coffe-image" fill sizes="(max-width: 640px) 50vw,(max-width: 768px) 33vw,(max-width: 1024px) 25vw,20vw" className="object-cover rounded-md shadow-md" />
        </div>
      </div>
    </section>
  );
}
