import { Coffee, Heart, Compass, Users, Award, Landmark, Store, Briefcase } from "lucide-react";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="bg-[#E2D9C8] text-stone-800">
      {/* 1. Detail & Sejarah */}
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/40 backdrop-blur-md rounded-full border border-white/20 text-xs font-bold uppercase tracking-wider text-[#C67C4E]">
              <Coffee className="w-3.5 h-3.5" />
              Cerita Tentang Kami
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-playfair leading-tight text-stone-900">
              Menyeduh Kehangatan, <br />
              <span className="text-[#C67C4E] italic">Menghubungkan Hati</span>
            </h2>
            <p className="text-lg font-lato leading-relaxed text-stone-700">
              Didirikan pada tahun 2018, Coffee Shop bermula dari sebuah garasi kecil dengan mimpi sederhana: menyajikan cangkir kopi yang jujur dan membangkitkan semangat. Bagi kami, kopi bukan sekadar minuman berkafein, melainkan sebuah
              media untuk menghubungkan cerita, ide, dan senyuman antar manusia.
            </p>
            <p className="text-md font-lato leading-relaxed text-stone-600">
              Kami bekerja sama langsung dengan para petani kopi lokal dari dataran tinggi Gayo, Kintamani, hingga Toraja untuk memastikan setiap biji kopi yang dipanen dihargai secara adil. Dengan proses roasting mandiri yang presisi, kami
              menjaga profil rasa unik dari setiap biji kopi agar selalu segar sampai ke meja Anda.
            </p>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative p-8 bg-white/70 backdrop-blur-lg border border-stone-200/50 shadow-xl rounded-3xl overflow-hidden space-y-6">
              <div className="w-12 h-12 bg-[#F5EFE6] rounded-2xl flex items-center justify-center text-[#C67C4E] border border-stone-200/20">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-playfair text-stone-900">Filosofi Seduhan</h3>
              <p className="text-sm font-lato text-stone-600 leading-relaxed">
                &ldquo;Kopi yang baik berawal dari kepedulian. Mulai dari tanah tempat pohon kopi tumbuh, tangan-tangan terampil yang memetiknya, hingga ketelitian barista saat mengekstraksi cita rasa terbaik.&rdquo;
              </p>
              <div className="pt-4 border-t border-stone-200 flex gap-4">
                <div>
                  <p className="text-xs text-stone-400 font-bold uppercase tracking-wider">Pemilik Cafe</p>
                  <p className="text-sm font-bold text-stone-800 font-playfair">Felix Wahyu Sejati</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Pengalaman / Milestones */}
      <div className="bg-stone-900/5 py-12 border-y border-stone-300/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="inline-flex p-3 bg-white/50 rounded-2xl text-[#C67C4E] mb-2">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-3xl font-bold font-playfair text-stone-900">8+ Tahun</h4>
              <p className="text-xs text-stone-600 font-lato">Konsistensi menyeduh kopi berkualitas tinggi</p>
            </div>
            <div className="space-y-2">
              <div className="inline-flex p-3 bg-white/50 rounded-2xl text-[#C67C4E] mb-2">
                <Compass className="w-6 h-6" />
              </div>
              <h4 className="text-3xl font-bold font-playfair text-stone-900">15+ Petani</h4>
              <p className="text-xs text-stone-600 font-lato">Mitra tani lokal berbagai daerah Indonesia</p>
            </div>
            <div className="space-y-2">
              <div className="inline-flex p-3 bg-white/50 rounded-2xl text-[#C67C4E] mb-2">
                <Store className="w-6 h-6" />
              </div>
              <h4 className="text-3xl font-bold font-playfair text-stone-900">10+ Cabang</h4>
              <p className="text-xs text-stone-600 font-lato">Cabang resmi di kota-kota besar</p>
            </div>
            <div className="space-y-2">
              <div className="inline-flex p-3 bg-white/50 rounded-2xl text-[#C67C4E] mb-2">
                <Briefcase className="w-6 h-6" />
              </div>
              <h4 className="text-3xl font-bold font-playfair text-stone-900">100+ Karyawan</h4>
              <p className="text-xs text-stone-600 font-lato">Barista & tim profesional berdedikasi</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Visi & Misi */}
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/40 backdrop-blur-md rounded-full border border-white/20 text-xs font-bold uppercase tracking-wider text-[#C67C4E]">
            <Landmark className="w-3.5 h-3.5" />
            Fondasi Kami
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-playfair text-stone-900">Visi & Misi Perusahaan</h2>
          <p className="text-sm text-stone-600 font-lato">Prinsip dasar yang memandu setiap langkah kami dalam melayani komunitas pecinta kopi.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Visi */}
          <div className="p-8 bg-white/60 hover:bg-white/80 border border-stone-200/40 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 space-y-4 group">
            <div className="w-10 h-10 bg-[#C67C4E]/10 rounded-xl flex items-center justify-center text-[#C67C4E] group-hover:scale-110 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold font-playfair text-stone-900">Visi</h3>
            <p className="text-stone-700 font-lato leading-relaxed">
              Menjadi ruang ketiga utama bagi komunitas yang menginspirasi kreativitas, melestarikan nilai kopi lokal Indonesia, serta memimpin praktik keberlanjutan yang bertanggung jawab dari hulu hingga ke setiap cangkir kopi yang kami
              sajikan.
            </p>
          </div>

          {/* Misi */}
          <div className="p-8 bg-white/60 hover:bg-white/80 border border-stone-200/40 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 space-y-4 group">
            <div className="w-10 h-10 bg-[#C67C4E]/10 rounded-xl flex items-center justify-center text-[#C67C4E] group-hover:scale-110 transition-transform">
              <Coffee className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold font-playfair text-stone-900">Misi</h3>
            <ul className="space-y-3 font-lato text-stone-700">
              <li className="flex gap-2">
                <span className="font-bold text-[#C67C4E]">01.</span>
                Menyajikan seduhan kopi premium dengan teknik brewing terbaik dan higienis secara konsisten.
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-[#C67C4E]">02.</span>
                Menerapkan fair trade untuk mendukung kesejahteraan dan kemandirian petani kopi lokal Indonesia.
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-[#C67C4E]">03.</span>
                Menciptakan ruang bersosialisasi yang ramah, hangat, dan inklusif bagi semua orang.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4. Section CTA */}
      <div className="relative flex items-center justify-center py-20 md:py-28 bg-stone-900 overflow-hidden border-t border-stone-800 text-white">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C67C4E_1.5px,transparent_1.5px)] background-size:24px_24px"></div>
        <div className="relative z-10 container mx-auto px-6 text-center max-w-2xl space-y-6">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold italic leading-tight">
            Rasakan Sendiri Kenikmatan <br />
            <span className="text-[#C67C4E] not-italic font-bold">Kopi Otentik Kami</span>
          </h2>
          <p className="text-md md:text-lg font-lato text-stone-300 max-w-lg mx-auto leading-relaxed">Pintu kami selalu terbuka untuk berbagi cerita hangat. Temukan cita rasa favorit Anda hari ini di daftar menu kami.</p>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <Link href="/products" className="px-4 py-1.5 bg-[#C67C4E] hover:bg-[#C67C4E]/80 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-xl cursor-pointer font-lato">
              Lihat Menu Kami
            </Link>
            <a
              href="https://wa.me/6281282829298"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 hover:border-stone-500 font-bold rounded-lg transition-all cursor-pointer font-lato"
            >
              Pesan WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
