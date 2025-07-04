import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import PropertyCard from "@/components/property-card";
import ServiceCard from "@/components/service-card";
import BuySellSection from "@/components/buy-sell-section";
import type { Property, Service } from "@shared/schema";

export default function Home() {
  const { data: properties, isLoading: propertiesLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const { data: services, isLoading: servicesLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const featuredProperties = properties?.filter(p => p.featured) || [];

  return (
    <div className="min-h-screen">
      {/* Dubai Properties Section */}
      <section className="pt-24 pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-black mb-4">Dubai Properties</h2>
            <p className="text-gray-600 text-lg">Exceptional properties across diverse markets</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {propertiesLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-80 bg-gray-200 rounded-2xl animate-pulse"></div>
              ))
            ) : (
              featuredProperties.map((property, index) => (
                <PropertyCard 
                  key={property.id} 
                  property={property} 
                  delay={index * 0.2}
                />
              ))
            )}
          </div>
        </div>
      </section>

      <BuySellSection />

      {/* Our Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-black mb-4">Our Services</h2>
            <p className="text-gray-600 text-lg">Complete property investment support from purchase to management</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicesLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-96 bg-gray-200 rounded-2xl animate-pulse"></div>
              ))
            ) : (
              services?.map((service, index) => (
                <ServiceCard 
                  key={service.id} 
                  service={service} 
                  delay={index * 0.2}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
