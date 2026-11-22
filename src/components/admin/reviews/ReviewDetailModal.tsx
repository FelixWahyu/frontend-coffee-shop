"use client";

import { Review } from "@/types/review";
import { Star, X, Calendar, User, Mail, MessageSquare } from "lucide-react";
import Button from "@/components/ui/button";

interface ReviewDetailModalProps {
  review: Review | null;
  onClose: () => void;
}

const RATING_LABELS: Record<number, string> = {
  1: "Sangat Buruk 😞",
  2: "Kurang Memuaskan 😐",
  3: "Cukup Baik 😊",
  4: "Sangat Puas 👍",
  5: "Luar Biasa / Sempurna! ☕",
};

export default function ReviewDetailModal({ review, onClose }: ReviewDetailModalProps) {
  if (!review) return null;

  const initial = review.user?.name ? review.user.name.charAt(0).toUpperCase() : review.user?.username ? review.user.username.charAt(0).toUpperCase() : "P";

  const email = review.user?.contacts?.[0]?.email;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="fixed inset-0 bg-black/60" onClick={onClose}></div>
      <div className="relative w-full max-w-lg bg-white border-3 border-gray-900 rounded-xl shadow-[8px_8px_0px_#000000] p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-gray-200 mb-5">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-[#C67C4E]" />
            <h3 className="text-xl font-bold font-playfair text-gray-900">Detail Ulasan Pelanggan</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg border border-black hover:bg-gray-100 transition-colors cursor-pointer" aria-label="Tutup">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Customer Profile Card */}
        <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border-2 border-gray-200 mb-5">
          <div className="w-12 h-12 rounded-full bg-[#C67C4E] text-white flex items-center justify-center font-bold text-lg border-2 border-black shadow-[2px_2px_0px_#000000] shrink-0">{initial}</div>
          <div className="flex-1 min-w-0 space-y-1">
            <h4 className="font-bold text-gray-900 text-base truncate">{review.user?.name || "Pelanggan"}</h4>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-lato">
              <User className="w-3.5 h-3.5 shrink-0" />
              <span>@{review.user?.username || "-"}</span>
            </div>
            {email && (
              <div className="flex items-center gap-1.5 text-xs text-gray-500 font-lato">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{email}</span>
              </div>
            )}
          </div>
        </div>

        {/* Rating Section */}
        <div className="mb-5 space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500 font-lato">Penilaian Bintang</label>
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={22} fill={star <= review.rating ? "#C67C4E" : "none"} className={star <= review.rating ? "text-[#C67C4E]" : "text-gray-300"} />
              ))}
            </div>
            <span className="text-sm font-bold text-[#C67C4E] font-lato">{review.rating}.0 / 5.0</span>
          </div>
          <p className="text-xs text-gray-600 font-medium font-lato">{RATING_LABELS[review.rating] || ""}</p>
        </div>

        {/* Comment Text */}
        <div className="mb-5 space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500 font-lato">Isi Ulasan</label>
          <div className="p-4 rounded-xl bg-amber-50/40 border-2 border-amber-200/80 max-h-60 overflow-y-auto">
            <p className="text-sm font-lato text-gray-800 leading-relaxed whitespace-pre-line wrap-break-word">&ldquo;{review.comment}&rdquo;</p>
          </div>
        </div>

        {/* Date Info */}
        <div className="flex items-center gap-2 text-xs text-gray-500 font-lato mb-6 pt-3 border-t border-gray-200">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span>
            Dikirim pada:{" "}
            {review.createdAt
              ? new Date(review.createdAt).toLocaleString("id-ID", {
                  dateStyle: "full",
                  timeStyle: "short",
                })
              : "-"}
          </span>
        </div>

        {/* Actions */}
        <div className="flex justify-end">
          <Button onClick={onClose} className="px-6 py-2 border-2 border-black rounded-lg bg-gray-200 hover:bg-gray-300 font-semibold shadow-[3px_3px_0px_#000000] cursor-pointer">
            Tutup
          </Button>
        </div>
      </div>
    </div>
  );
}
