import { ReactNode } from "react";

export function renderBlogContent(content: string): ReactNode[] {
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
