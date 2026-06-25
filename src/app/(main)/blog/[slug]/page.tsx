import { blogArticles } from "@/constants/blog";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";

function renderContent(content: string) {
  const blocks = content.split("\n\n");

  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    const numberedHeading = /^\d+\.\s/.test(trimmed);
    const subHeading = /^[A-Za-z\u00C0-\u024F]+(:|$)/.test(trimmed) && trimmed.split("\n").length === 1 && trimmed.length < 60;
    const isListItem = trimmed.startsWith("- ");

    if (numberedHeading) {
      const lines = trimmed.split("\n");
      const title = lines[0];
      const rest = lines.slice(1).join("\n");
      return (
        <div key={i} className="mt-8 first:mt-0">
          <h2 className="text-2xl font-bold font-playfair text-[#30261C] mb-3">{title}</h2>
          {rest &&
            (rest.startsWith("- ") ? (
              <ul className="space-y-2">
                {rest.split("\n").map((item, j) => (
                  <li key={j} className="text-lg font-lato text-gray-700 leading-relaxed flex items-start gap-2">
                    <span className="text-[#C67C4E] mt-2 shrink-0">•</span>
                    <span>{item.replace(/^- /, "")}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-lg font-lato text-gray-700 leading-relaxed">{rest}</p>
            ))}
        </div>
      );
    }

    if (subHeading && !isListItem) {
      return (
        <h3 key={i} className="text-xl font-bold font-playfair text-[#30261C] mt-8 mb-3">
          {trimmed}
        </h3>
      );
    }

    if (isListItem) {
      return (
        <ul key={i} className="space-y-2 my-4">
          {trimmed.split("\n").map((item, j) => (
            <li key={j} className="text-lg font-lato text-gray-700 leading-relaxed flex items-start gap-2">
              <span className="text-[#C67C4E] mt-2 shrink-0">•</span>
              <span>{item.replace(/^- /, "")}</span>
            </li>
          ))}
        </ul>
      );
    }

    return (
      <p key={i} className="text-lg font-lato text-gray-700 leading-relaxed my-4">
        {trimmed}
      </p>
    );
  });
}

export default async function DetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = blogArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
    return;
  }

  return (
    <>
      <section className="relative h-[50vh] bg-gray-800 flex items-center justify-center">
        <Image src={article.image} alt={article.title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-[#30261C]/90 to-[#30261C]/20"></div>
        <div className="relative z-10 container mx-auto p-4">
          <div className="text-white max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1 text-sm font-lato font-semibold text-white bg-[#C67C4E] rounded-full mb-4">{article.category}</span>
            <h1 className="text-3xl md:text-5xl font-bold italic font-playfair leading-tight">{article.title}</h1>
          </div>
        </div>
      </section>

      <section className="py-12 px-8">
        <div className="container mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-md font-lato text-gray-500 mb-8 pb-6 border-b border-[#30261C]/10">
            <span className="font-semibold text-[#C67C4E]">{article.author}</span>
            <span className="hidden md:inline text-gray-300">|</span>
            <span>{formatDate(article.date)}</span>
            <span className="hidden md:inline text-gray-300">|</span>
            <span>{article.readingTime} menit membaca</span>
          </div>

          <div className="space-y-2">{renderContent(article.content)}</div>

          {article.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t border-[#30261C]/10">
              <h3 className="text-md font-semibold font-lato text-gray-500 mb-3">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 text-sm font-lato bg-[#F1F0EE] border border-[#30261C]/10 rounded-full text-gray-600 hover:bg-[#C67C4E]/10 hover:border-[#C67C4E]/30 transition-colors duration-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12">
            <Link href="/blog" className="inline-block px-4 py-1.5 font-lato text-md font-semibold text-white bg-[#C67C4E] rounded-lg hover:bg-[#C67C4E]/80 transition-colors duration-300 shadow-sm hover:shadow-md">
              Kembali ke Artikel
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
