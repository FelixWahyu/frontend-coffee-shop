import { Star } from "lucide-react";
import { ReviewCardProps } from "@/src/lib/profileData";

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-[#F1F0EE] border border-gray-200 shadow-sm rounded-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-gray-800 font-semibold">{review.name.charAt(0)}</div>
          <div>
            <h3 className="font-semibold font-playfair text-lg text-[#30261C]">{review.name}</h3>
            <p className="text-sm font-lato text-gray-600">{review.email}</p>
          </div>
        </div>

        <div className="flex gap-1 text-[#C67C4E]">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className={i < review.rating ? "text-[#C67C4E]" : "text-gray-300"} />
          ))}
        </div>
      </div>

      <p className="text-sm font-lato text-gray-700">{review.review.slice(0, 120) + "..."}</p>
    </div>
  );
}
