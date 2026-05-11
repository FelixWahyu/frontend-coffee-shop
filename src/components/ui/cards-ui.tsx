import { Star } from "lucide-react";
import { ReviewCardProps } from "@/src/types/review";

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-[#F1F0EE] border border-gray-200 shadow-sm rounded-md px-6 pt-8 pb-12 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-gray-800 font-semibold">{review.user.name?.charAt(0).toUpperCase() || "A"}</div>
          <div>
            <h3 className="font-semibold font-playfair text-lg text-[#30261C]">{review.user.name}</h3>
            <p className="text-sm font-lato text-gray-600">{review.user.contacts[0]?.email || "Email tidak tersedia"}</p>
          </div>
        </div>

        <div className="flex gap-1 text-[#C67C4E]">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} fill={i < review.rating ? "#C67C4E" : "none"} className={i < review.rating ? "text-[#C67C4E]" : "text-gray-300"} />
          ))}
        </div>
      </div>

      <p className="text-sm font-lato text-gray-700">{review.comment.length > 120 ? review.comment.slice(0, 120) + "..." : review.comment}</p>
    </div>
  );
}
