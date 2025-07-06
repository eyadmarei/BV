import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import PropertyCard from "@/components/property-card";
import ServiceCard from "@/components/service-card";
import AnimatedSidebar from "@/components/animated-sidebar";
import type { Property, Service } from "@shared/schema";
import heroVideo from "@assets/WhatsApp Video 2025-07-06 at 03.15.52_6b085703_1751757407515.mp4";

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
      {/* Hero Video Section */}
      <section className="relative h-screen overflow-hidden bg-black">
        {/* Background Video */}
        <video 
          className="absolute top-16 left-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          onError={(e) => console.error('Video error:', e)}
          onLoadStart={() => console.log('Video loading started')}
          onCanPlay={() => console.log('Video can play')}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          <source src={heroVideo} type="video/mp4" />
        </video>
        
        {/* Dark Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>
        
        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
                Dubai Real Estate Excellence
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md">
                Experience luxury properties in the heart of Dubai
              </p>
              <motion.button
                className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                whileHover={{ scale: 1.05 }}
              >
                Explore Properties
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dubai Properties Section with Animated Sidebar */}
      <section className="pt-20 pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex gap-8 items-start">
            {/* Animated Buy/Sell Sidebar */}
            <AnimatedSidebar />
            
            {/* Property Cards */}
            <div className="flex-1">
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
