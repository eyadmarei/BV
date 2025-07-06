import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import type { Property } from "@shared/schema";

interface PropertyCardProps {
  property: Property;
  delay?: number;
  onViewCollection?: () => void;
}

export default function PropertyCard({ property, delay = 0, onViewCollection }: PropertyCardProps) {
  const getPropertyDescription = (type: string) => {
    switch (type) {
      case 'villa':
        return 'Exclusive luxury villas with premium amenities and breathtaking views in prestigious locations.';
      case 'townhouse':
        return 'Contemporary townhouses in prime locations offering the perfect blend of privacy and community.';
      case 'apartment':
        return 'Sophisticated apartments with modern design and world-class amenities in urban centers.';
      default:
        return property.description;
    }
  };

  const getPropertyTitle = (type: string) => {
    switch (type) {
      case 'villa':
        return 'Villas';
      case 'townhouse':
        return 'Townhouses';
      case 'apartment':
        return 'Apartments';
      default:
        return property.title;
    }
  };

  return (
    <motion.div
      className="property-card bg-white rounded-2xl overflow-hidden shadow-lg group"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8 }}
    >
      <div className="relative h-80 overflow-hidden">
        <img 
          src={property.imageUrl} 
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6">
          <h3 className="text-white text-2xl font-bold mb-2">
            {getPropertyTitle(property.type)}
          </h3>
          <p className="text-white/90 text-sm mb-4">
            {getPropertyDescription(property.type)}
          </p>
          <Link href={`/properties/${property.type}`}>
            <Button 
              className="bg-black text-white hover:bg-gray-800 font-semibold"
              onClick={onViewCollection}
            >
              View Collection
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
