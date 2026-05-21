import Card from "../ui/cards";
import { Star } from "lucide-react";

interface ReviewCardProps {
  name: string;
  email?: string | null;
  rating: number;
  comment: string;
}

export default function ReviewCard({ name, email, rating, comment }: ReviewCardProps) {
  return (
    <Card className="bg-[#F1F0EE] px-6 pt-8 pb-12">
      <div className="flex justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-gray-800 font-semibold">{name?.charAt(0).toUpperCase() || "A"}</div>
          <div>
            <h3 className="font-semibold font-playfair text-lg text-[#30261C]">{name}</h3>
            <p className="text-sm font-lato text-gray-600">{email || "Email tidak tersedia"}</p>
          </div>
        </div>

        <div className="flex gap-1 text-[#C67C4E]">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} fill={i < rating ? "#C67C4E" : "none"} className={i < rating ? "text-[#C67C4E]" : "text-gray-300"} />
          ))}
        </div>
      </div>

      <p className="text-sm font-lato text-gray-700">{comment.length > 120 ? comment.slice(0, 120) + "..." : comment}</p>
    </Card>
  );
}
