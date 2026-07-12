import type { BlockType } from "@/types";
import {
  BookOpen,
  Car,
  Clock,
  CreditCard,
  Gift,
  Heart,
  HelpCircle,
  ImageIcon,
  MapPin,
  Music,
  PartyPopper,
  Shirt,
  Users,
} from "lucide-react";

export function BlockIcon({
  type,
  size = 18,
  className,
}: {
  type: BlockType;
  size?: number;
  className?: string;
}) {
  const props = { size, className };
  switch (type) {
    case "hero":
      return <ImageIcon {...props} />;
    case "countdown":
      return <Clock {...props} />;
    case "story":
      return <BookOpen {...props} />;
    case "rsvp":
      return <Heart {...props} />;
    case "schedule":
      return <Clock {...props} />;
    case "transfer":
      return <Car {...props} />;
    case "location":
      return <MapPin {...props} />;
    case "wishes":
      return <Gift {...props} />;
    case "dresscode":
      return <Shirt {...props} />;
    case "faq":
      return <HelpCircle {...props} />;
    case "gifts":
      return <Gift {...props} />;
    case "music":
      return <Music {...props} />;
    case "afterparty":
      return <PartyPopper {...props} />;
    case "seating":
      return <Users {...props} />;
    case "payment":
      return <CreditCard {...props} />;
    default:
      return <Heart {...props} />;
  }
}
