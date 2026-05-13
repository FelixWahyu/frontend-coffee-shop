import Image, { ImageProps } from "next/image";
import Card from "../ui/cards";

interface FeatureCardProps {
  title: string;
  description: string;
  image: ImageProps["src"];
}

export default function FeatureCard({ title, description, image }: FeatureCardProps) {
  return (
    <Card className="h-full group">
      <div className="relative overflow-hidden aspect-4/3">
        <Image src={image} alt={title} className="object-cover opacity-100 group-hover:opacity-80 group-hover:scale-105 transition-all duration-300" fill />
      </div>
      <div className="p-5">
        <h3 className="mb-3 text-xl font-semibold font-playfair">{title}</h3>
        <p className="text-gray-600 font-lato">{description}</p>
      </div>
    </Card>
  );
}
