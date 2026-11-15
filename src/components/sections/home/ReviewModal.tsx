"use client";

import { createPortal } from "react-dom";
import Link from "next/link";
import { Star, X, Coffee, Lock, Loader2, CheckCircle2, MessageSquarePlus } from "lucide-react";
import { UserResponse } from "@/types/users";
import useReviewModal from "@/hooks/reviews/useReviewModal";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  user: UserResponse | null;
  isAuth: boolean;
}

export default function ReviewModal({ isOpen, onClose, onSuccess, user, isAuth }: ReviewModalProps) {
  const { mounted, setRating, setHoverRating, comment, setComment, loading, errorMsg, successMsg, currentDisplayRating, ratingLabel, isSubmitDisabled, handleSubmit } = useReviewModal({ isOpen, onClose, onSuccess });

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity duration-300" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 md:p-8 z-10 border border-stone-200 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer" aria-label="Tutup">
          <X className="w-5 h-5" />
        </button>

        {/* If user is not authenticated */}
        {!isAuth || !user ? (
          <div className="text-center py-4 space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-[#C67C4E]/10 text-[#C67C4E] flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-playfair font-bold text-stone-900">Masuk untuk Beri Ulasan</h3>
              <p className="text-sm font-lato text-stone-600 max-w-sm mx-auto leading-relaxed">Hanya pelanggan terdaftar yang dapat memberikan ulasan untuk memastikan kejujuran dan keaslian ulasan di Coffee Shop kami.</p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl border border-stone-200 font-lato font-semibold text-stone-600 hover:bg-stone-50 transition cursor-pointer">
                Nanti Saja
              </button>
              <Link href="/login" className="px-6 py-2.5 rounded-xl bg-[#C67C4E] hover:bg-[#b06a3d] font-lato font-semibold text-white shadow-md active:scale-95 transition cursor-pointer flex items-center justify-center gap-2">
                Masuk Sekarang
              </Link>
            </div>
          </div>
        ) : (
          /* Authenticated Form */
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#C67C4E]/10 text-[#C67C4E] flex items-center justify-center shrink-0 shadow-inner">
                <MessageSquarePlus className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold font-playfair text-stone-900">Tulis Ulasan Anda</h3>
                <p className="text-xs md:text-sm font-lato text-stone-500">Bagikan pengalamanmu menikmati kopi dan suasana kami (maksimal 1000 karakter).</p>
              </div>
            </div>

            {/* User Identity Pill */}
            <div className="flex items-center gap-2.5 px-3.5 py-2 bg-stone-50 rounded-xl border border-stone-200/70 mb-5">
              <div className="w-7 h-7 rounded-full bg-[#C67C4E] text-white flex items-center justify-center text-xs font-bold">{user.name ? user.name[0].toUpperCase() : user.username[0].toUpperCase()}</div>
              <div className="text-xs font-lato">
                <span className="text-stone-500">Mengulas sebagai </span>
                <span className="font-bold text-stone-800">{user.name || user.username}</span>
                <span className="text-stone-400 ml-1">(@{user.username})</span>
              </div>
            </div>

            {/* Success Notification */}
            {successMsg ? (
              <div className="py-8 text-center space-y-3 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold font-playfair text-stone-900">Terima Kasih Atas Ulasan Anda!</h4>
                <p className="text-xs font-lato text-stone-600">Ulasan Anda sangat berarti untuk membantu kami menyajikan kopi terbaik.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Error Banner */}
                {errorMsg && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-lato text-red-600">{errorMsg}</div>}

                {/* Rating Stars Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2 font-lato">Beri Penilaian Bintang</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isFilled = star <= currentDisplayRating;
                      return (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 rounded-lg hover:scale-110 active:scale-95 transition-transform cursor-pointer focus:outline-hidden"
                          aria-label={`Beri ${star} bintang`}
                        >
                          <Star size={28} fill={isFilled ? "#C67C4E" : "none"} className={isFilled ? "text-[#C67C4E]" : "text-stone-300"} />
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs font-medium text-[#C67C4E] mt-2 font-lato h-4">{ratingLabel}</p>
                </div>

                {/* Comment Textarea */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label htmlFor="review-comment" className="text-xs font-bold uppercase tracking-wider text-stone-600 font-lato">
                      Ulasan / Komentar
                    </label>
                    <span className="text-[11px] font-lato text-stone-500">{comment.length} / 1000</span>
                  </div>
                  <textarea
                    id="review-comment"
                    rows={5}
                    maxLength={1000}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Ceritakan rasa kopi favoritmu, keramahan barista, atau suasana yang kamu rasakan (maksimal 1000 karakter)..."
                    className="w-full px-4 py-3 rounded-2xl border border-stone-300 focus:border-[#C67C4E] focus:ring-2 focus:ring-[#C67C4E]/20 text-sm font-lato text-stone-800 placeholder:text-stone-400 outline-hidden transition resize-none break-words [overflow-wrap:anywhere]"
                    required
                  />
                </div>

                {/* Modal Actions */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={loading}
                    className="px-5 py-2.5 rounded-xl border border-stone-200 text-sm font-semibold font-lato text-stone-600 hover:bg-stone-50 transition cursor-pointer disabled:opacity-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitDisabled}
                    className="px-6 py-2.5 rounded-xl bg-[#C67C4E] hover:bg-[#b06a3d] text-white text-sm font-semibold font-lato shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Mengirim...</span>
                      </>
                    ) : (
                      <>
                        <Coffee className="w-4 h-4" />
                        <span>Kirim Ulasan</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
