import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import HeroSection from "@/components/hero-section";
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
      <HeroSection />
      
      {/* Property Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-black mb-4">Global Projects</h2>
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

      {/* Buy and Sell Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-black mb-6">Buy & Sell with Confidence</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Whether you're looking to acquire your dream property or maximize the value of your current investment, 
                our expert team provides personalized guidance throughout every step of the process.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <span className="text-charcoal">Market analysis and property valuation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <span className="text-charcoal">Negotiation and transaction management</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <span className="text-charcoal">Legal and financial guidance</span>
                </div>
              </div>
              <Link href="/contact">
                <Button className="bg-black text-white hover:bg-charcoal font-semibold px-8 py-3">
                  Start Your Journey
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Real estate consultation" 
                className="rounded-2xl shadow-2xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Business Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-black mb-4">Comprehensive Business Services</h2>
            <p className="text-gray-600 text-lg">Complete solutions for your business and personal needs</p>
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
