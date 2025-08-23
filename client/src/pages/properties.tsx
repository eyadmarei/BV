import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Square, MapPin } from "lucide-react";
import type { Property } from "@shared/schema";

export default function Properties() {
  const { type } = useParams<{ type?: string }>();
  
  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: type ? [`/api/properties/type/${type}`] : ["/api/properties"],
  });

  const getPageTitle = () => {
    if (type) {
      const titles = {
        villa: "Luxury Villas",
        townhouse: "Modern Townhouses", 
        apartment: "Premium Apartments"
      };
      return titles[type as keyof typeof titles] || "Properties";
    }
    return "All Properties";
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="pt-24 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg">
                <div className="h-64 bg-gray-200 animate-pulse"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            {getPageTitle()}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover exceptional properties that redefine luxury living
          </p>
        </motion.div>

        {properties && properties.length === 0 ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Properties Found</h3>
            <p className="text-gray-600">Check back soon for new listings in this category.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties?.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={property.imageUrl}
                      alt={property.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gold text-black font-semibold capitalize">
                        {property.type}
                      </Badge>
                    </div>
                    {property.price && (
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-white/90 text-black font-bold">
                          {formatPrice(property.price)}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-black mb-2">{property.title}</h3>
                    {property.location && (
                      <div className="flex items-center text-gray-600 mb-3">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{property.location}</span>
                      </div>
                    )}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {property.description}
                    </p>
                    
                    {(property.bedrooms || property.bathrooms || property.area) && (
                      <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                        {property.bedrooms && (
                          <div className="flex items-center">
                            <Bed className="w-4 h-4 mr-1" />
                            <span>{property.bedrooms} bed</span>
                          </div>
                        )}
                        {property.bathrooms && (
                          <div className="flex items-center">
                            <Bath className="w-4 h-4 mr-1" />
                            <span>{property.bathrooms} bath</span>
                          </div>
                        )}
                        {property.area && (
                          <div className="flex items-center">
                            <Square className="w-4 h-4 mr-1" />
                            <span>{property.area.toLocaleString()} sqft</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="flex gap-3">
                      <Button 
                        asChild 
                        className="flex-1 bg-black text-white hover:bg-charcoal font-semibold"
                      >
                        <Link href="/contact">
                          Contact Us
                        </Link>
                      </Button>
                      {property.brochureUrl && (
                        <Button 
                          asChild 
                          className="flex-1 bg-white border border-black text-black hover:bg-gray-50 font-semibold"
                        >
                          <a 
                            href={property.brochureUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            Download Brochure
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
