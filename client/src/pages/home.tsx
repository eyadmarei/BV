import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import PropertyCard from "@/components/property-card";
import ServiceCard from "@/components/service-card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
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
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Buy Card */}
            <motion.div
              className="property-card bg-white rounded-2xl overflow-hidden shadow-lg group relative h-80"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              whileHover={{ y: -8 }}
            >
              <div className="relative h-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-wood/90 to-charcoal/90"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-2xl font-bold mb-2">BUY</h3>
                  <p className="text-white/90 text-sm mb-4">Investment acquisition with expert guidance and market analysis</p>
                  <Link href="/contact">
                    <Button className="bg-gold text-black hover:bg-yellow-500 font-semibold w-full">
                      Start Buying
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Property Cards */}
            {propertiesLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-80 bg-gray-200 rounded-2xl animate-pulse"></div>
              ))
            ) : (
              featuredProperties.map((property, index) => (
                <PropertyCard 
                  key={property.id} 
                  property={property} 
                  delay={(index + 1) * 0.2}
                />
              ))
            )}

            {/* Sell Card */}
            <motion.div
              className="property-card bg-white rounded-2xl overflow-hidden shadow-lg group relative h-80"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              whileHover={{ y: -8 }}
            >
              <div className="relative h-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-charcoal/90 to-black/90"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-2xl font-bold mb-2">SELL</h3>
                  <p className="text-white/90 text-sm mb-4">Investment optimization with market valuation and buyer matching</p>
                  <Link href="/contact">
                    <Button className="bg-gold text-black hover:bg-yellow-500 font-semibold w-full">
                      Start Selling
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

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
