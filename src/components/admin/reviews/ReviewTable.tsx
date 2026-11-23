"use client";

import TextInput from "@/components/ui/form/text-input";
import Button from "@/components/ui/button";
import ConfirmModal from "@/components/ui/confirm-modal";
import Pagination from "@/components/ui/pagination";
import { Search, Trash2, Star, Eye, MessageSquare, Filter } from "lucide-react";
import useReviewTable from "@/hooks/reviews/useReviewTable";
import ReviewDetailModal from "./ReviewDetailModal";

const RATING_FILTER_OPTIONS: { label: string; value: number | "ALL" }[] = [
  { label: "Semua Rating", value: "ALL" },
  { label: "5 Bintang", value: 5 },
  { label: "4 Bintang", value: 4 },
  { label: "3 Bintang", value: 3 },
  { label: "2 Bintang", value: 2 },
  { label: "1 Bintang", value: 1 },
];

export default function ReviewTable() {
  const { reviews, loading, search, setSearch, ratingFilter, setRatingFilter, page, setPage, totalPages, totalItem, deleteTarget, setDeleteTarget, selectedReview, setSelectedReview, handleDelete } = useReviewTable();

  return (
    <div>
      {/* Search and Filters Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 mb-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          {/* Search Box */}
          <div className="flex items-center gap-2 border-2 border-gray-900 px-3 py-1 rounded-md w-full sm:w-80 bg-white shadow-[3px_3px_0px_#000000]">
            <Search className="w-4 h-4 text-gray-500 shrink-0" />
            <TextInput type="text" placeholder="Cari pelanggan atau ulasan..." value={search} onChange={(e) => setSearch(e.target.value)} className="border-none focus:border-none focus:ring-0 w-full text-sm font-lato" />
          </div>

          {/* Rating Filter Dropdown */}
          <div className="flex items-center gap-2 border-2 border-gray-900 px-3 py-2 rounded-md bg-white shadow-[3px_3px_0px_#000000]">
            <Filter className="w-4 h-4 text-gray-500 shrink-0" />
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value === "ALL" ? "ALL" : Number(e.target.value))}
              className="bg-transparent border-none text-sm font-semibold text-gray-800 focus:outline-none cursor-pointer"
            >
              {RATING_FILTER_OPTIONS.map((opt) => (
                <option key={opt.label} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-2 self-start lg:self-auto px-3.5 py-1.5 border-2 border-gray-900 rounded-md bg-[#F5EFE6] shadow-[3px_3px_0px_#000000]">
          <MessageSquare className="w-4 h-4 text-[#C67C4E]" />
          <span className="text-xs font-bold text-gray-800 font-lato">Total: {totalItem} Ulasan</span>
        </div>
      </div>

      {/* Table Section */}
      {loading ? (
        <div className="p-8 text-center bg-white border-3 border-gray-900 rounded-md shadow-[6px_6px_0px_#000000]/60">
          <p className="text-gray-500 font-semibold font-lato">Memuat data ulasan...</p>
        </div>
      ) : reviews.length === 0 ? (
        <div className="p-12 text-center bg-white border-3 border-gray-900 rounded-md shadow-[6px_6px_0px_#000000]/60 space-y-3">
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border-2 border-black">
            <Star className="w-6 h-6" />
          </div>
          <p className="text-base font-bold text-gray-800 font-playfair">Belum ada ulasan ditemukan</p>
          <p className="text-xs text-gray-500 font-lato">{search || ratingFilter !== "ALL" ? "Coba gunakan kata kunci pencarian lain atau ubah filter rating." : "Belum ada pelanggan yang mengirimkan ulasan."}</p>
        </div>
      ) : (
        <div className="overflow-x-auto border-3 border-gray-900 rounded-md shadow-[6px_6px_0px_#000000]/60 bg-white">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b-3 border-gray-900">
                <th className="border-r border-gray-300 px-4 py-3 text-left font-bold text-gray-800 text-sm">Pelanggan</th>
                <th className="border-r border-gray-300 px-4 py-3 text-left font-bold text-gray-800 text-sm">Email</th>
                <th className="border-r border-gray-300 px-4 py-3 text-left font-bold text-gray-800 text-sm">Rating</th>
                <th className="border-r border-gray-300 px-4 py-3 text-left font-bold text-gray-800 text-sm">Ulasan</th>
                <th className="border-r border-gray-300 px-4 py-3 text-left font-bold text-gray-800 text-sm">Tanggal</th>
                <th className="px-4 py-3 text-center font-bold text-gray-800 text-sm">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => {
                const initial = review.user?.name ? review.user.name.charAt(0).toUpperCase() : review.user?.username ? review.user.username.charAt(0).toUpperCase() : "P";
                const email = review.user?.contacts?.[0]?.email;

                return (
                  <tr key={review.id} className="hover:bg-gray-100 border-b border-gray-300 last:border-b-0 transition-colors">
                    {/* Pelanggan */}
                    <td className="border-r border-gray-300 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#C67C4E] text-white flex items-center justify-center font-bold text-sm border border-black shadow-[1px_1px_0px_#000000] shrink-0">{initial}</div>
                        <div className="min-w-0">
                          <p className="font-bold text-gray-900 text-sm truncate max-w-44">{review.user?.name || "Pelanggan"}</p>
                          <p className="text-xs text-gray-500 font-lato truncate">@{review.user?.username || "-"}</p>
                        </div>
                      </div>
                    </td>

                    {/* Email / Kontak */}
                    <td className="border-r border-gray-300 px-4 py-3 text-xs text-gray-600 font-lato max-w-40 truncate">
                      {email ? <span className="font-medium text-gray-800">{email}</span> : <span className="text-gray-400 italic">Tidak ada email</span>}
                    </td>

                    {/* Rating */}
                    <td className="border-r border-gray-300 px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} fill={i < review.rating ? "#C67C4E" : "none"} className={i < review.rating ? "text-[#C67C4E]" : "text-gray-300"} />
                          ))}
                        </div>
                        <span className="text-xs font-bold text-gray-800 font-lato">({review.rating})</span>
                      </div>
                    </td>

                    {/* Ulasan */}
                    <td className="border-r border-gray-300 px-4 py-3 max-w-xs">
                      <p onClick={() => setSelectedReview(review)} className="text-xs font-lato text-gray-700 line-clamp-2 cursor-pointer hover:text-[#C67C4E] transition-colors" title="Klik untuk melihat ulasan lengkap">
                        &ldquo;{review.comment}&rdquo;
                      </p>
                    </td>

                    {/* Tanggal */}
                    <td className="border-r border-gray-300 px-4 py-3 text-xs text-gray-500 whitespace-nowrap font-lato">
                      {review.createdAt
                        ? new Date(review.createdAt).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "-"}
                    </td>

                    {/* Aksi */}
                    <td className="px-4 py-3 w-10 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          onClick={() => setSelectedReview(review)}
                          className="flex items-center gap-1 px-2.5 py-1 text-xs border border-black rounded-md bg-gray-100 hover:bg-gray-200 transition-all cursor-pointer font-semibold"
                          title="Lihat Detail Ulasan"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Detail</span>
                        </Button>
                        <Button
                          onClick={() =>
                            setDeleteTarget({
                              id: review.id,
                              name: `Ulasan dari ${review.user?.name || review.user?.username || "Pelanggan"}`,
                            })
                          }
                          className="flex items-center gap-1 px-2.5 py-1 text-xs border border-black rounded-md bg-gray-100 hover:bg-red-500 hover:text-white transition-all cursor-pointer font-semibold"
                          title="Hapus Ulasan"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Hapus</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} variant="brutalism" />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        open={!!deleteTarget}
        title="Hapus Ulasan Pelanggan"
        message={`Apakah Anda yakin ingin menghapus "${deleteTarget?.name}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Hapus"
        cancelLabel="Batal"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* Full Review Detail Modal */}
      <ReviewDetailModal review={selectedReview} onClose={() => setSelectedReview(null)} />
    </div>
  );
}
