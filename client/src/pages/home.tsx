import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import PropertyCard from "@/components/property-card";
import ServiceCard from "@/components/service-card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ShoppingCart, TrendingUp, Search, FileText, Shield, Users } from "lucide-react";
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
      {/* Buy & Sell Section */}
      <section className="pt-24 pb-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Buy Card */}
            <motion.div
              className="property-card bg-white rounded-2xl overflow-hidden shadow-lg group relative h-64"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              whileHover={{ y: -8 }}
            >
              <div className="relative h-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
                <div className="p-6 relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-4">
                      <motion.div 
                        className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center mr-4"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ShoppingCart className="w-6 h-6 gold" />
                      </motion.div>
                      <div>
                        <h3 className="text-white text-2xl font-bold">BUY</h3>
                        <p className="text-gray-300 text-sm">Investment Acquisition</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <motion.div 
                        className="flex items-center text-gray-300 text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Search className="w-4 h-4 mr-3 gold" />
                        <span>Property Search & Analysis</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center text-gray-300 text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <FileText className="w-4 h-4 mr-3 gold" />
                        <span>Legal Due Diligence</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center text-gray-300 text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Shield className="w-4 h-4 mr-3 gold" />
                        <span>Investment Protection</span>
                      </motion.div>
                    </div>
                  </div>
                  
                  <Link href="/contact">
                    <Button className="w-full bg-gold text-black hover:bg-yellow-500 font-semibold mt-4">
                      Start Buying Process
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Sell Card */}
            <motion.div
              className="property-card bg-white rounded-2xl overflow-hidden shadow-lg group relative h-64"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ y: -8 }}
            >
              <div className="relative h-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-black"></div>
                <div className="p-6 relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-4">
                      <motion.div 
                        className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center mr-4"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <TrendingUp className="w-6 h-6 gold" />
                      </motion.div>
                      <div>
                        <h3 className="text-white text-2xl font-bold">SELL</h3>
                        <p className="text-gray-300 text-sm">Investment Optimization</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <motion.div 
                        className="flex items-center text-gray-300 text-sm"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <TrendingUp className="w-4 h-4 mr-3 gold" />
                        <span>Market Valuation</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center text-gray-300 text-sm"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <Users className="w-4 h-4 mr-3 gold" />
                        <span>Buyer Matching</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center text-gray-300 text-sm"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <FileText className="w-4 h-4 mr-3 gold" />
                        <span>Transaction Management</span>
                      </motion.div>
                    </div>
                  </div>
                  
                  <Link href="/contact">
                    <Button className="w-full bg-gold text-black hover:bg-yellow-500 font-semibold mt-4">
                      Start Selling Process
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dubai Properties Section */}
      <section className="pb-20 bg-gray-50">
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
