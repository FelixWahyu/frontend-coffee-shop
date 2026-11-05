"use client";

import Card from "../ui/cards";
import { Star } from "lucide-react";
import { ReviewCardProps } from "@/types/review";

export default function ReviewCard({ name, email, username, rating, comment, createdAt }: ReviewCardProps) {
  const initial = name ? name.charAt(0).toUpperCase() : username ? username.charAt(0).toUpperCase() : "P";
  const displaySubtitle = email || (username ? `@${username}` : "Pelanggan Terverifikasi");

  return (
    <Card className="bg-[#F1F0EE] p-5 md:p-6 flex flex-col justify-between h-[270px] w-full min-w-0 max-w-full rounded-2xl border border-stone-200/70 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* Header: User Info & Star Rating (Fixed Height / No Shrink) */}
      <div className="flex justify-between items-start gap-3 mb-3 w-full min-w-0 shrink-0">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#C67C4E]/15 text-[#C67C4E] font-bold text-base shadow-inner shrink-0">
            {initial}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold font-playfair text-base md:text-lg text-[#30261C] truncate">
              {name || "Pelanggan"}
            </h3>
            <p className="text-xs font-lato text-stone-500 truncate">{displaySubtitle}</p>
          </div>
        </div>

        <div className="flex gap-1 text-[#C67C4E] shrink-0 mt-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={15}
              fill={i < rating ? "#C67C4E" : "none"}
              className={i < rating ? "text-[#C67C4E]" : "text-stone-300"}
            />
          ))}
        </div>
      </div>

      {/* Comment Body: Consistent height with scroll for longer reviews */}
      <div className="flex-1 min-h-0 w-full overflow-y-auto pr-1.5 my-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-stone-300 [&::-webkit-scrollbar-thumb]:rounded-full">
        <p className="text-sm font-lato text-stone-700 leading-relaxed italic break-words [overflow-wrap:anywhere] [word-break:break-word] whitespace-pre-line">
          &ldquo;{comment}&rdquo;
        </p>
      </div>

      {/* Footer Info (Fixed Height / No Shrink) */}
      <div className="mt-3 pt-3 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-stone-500 font-lato w-full shrink-0">
        <span className="font-semibold text-[#C67C4E]">Review Terverifikasi</span>
        <span>
          {createdAt
            ? new Date(createdAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : "Baru saja"}
        </span>
      </div>
    </Card>
  );
}
