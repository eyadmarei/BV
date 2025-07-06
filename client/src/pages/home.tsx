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
          className="absolute top-0 left-0 w-full h-full object-cover"
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
              
              {/* Overlay Boxes below button */}
              <motion.div
                className="mt-12 flex gap-6 justify-center max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                {/* BUY Box */}
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-xl w-72">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-black/10 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M7 19h9" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-black text-lg font-bold">BUY</h3>
                      <p className="text-gray-600 text-sm">Find Your Dream Property</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-black text-sm">
                      <div className="w-4 h-4 bg-black/10 rounded mr-2 flex items-center justify-center">
                        <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 8 8">
                          <circle cx="4" cy="4" r="3"/>
                        </svg>
                      </div>
                      <span>Luxury Villas & Apartments</span>
                    </div>
                    <div className="flex items-center text-black text-sm">
                      <div className="w-4 h-4 bg-black/10 rounded mr-2 flex items-center justify-center">
                        <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 8 8">
                          <circle cx="4" cy="4" r="3"/>
                        </svg>
                      </div>
                      <span>Legal Support & Documentation</span>
                    </div>
                  </div>
                </div>

                {/* SELL Box */}
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-xl w-72">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-black/10 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-black text-lg font-bold">SELL</h3>
                      <p className="text-gray-600 text-sm">Maximize Your Property Value</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-black text-sm">
                      <div className="w-4 h-4 bg-black/10 rounded mr-2 flex items-center justify-center">
                        <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 8 8">
                          <circle cx="4" cy="4" r="3"/>
                        </svg>
                      </div>
                      <span>Market Analysis & Pricing</span>
                    </div>
                    <div className="flex items-center text-black text-sm">
                      <div className="w-4 h-4 bg-black/10 rounded mr-2 flex items-center justify-center">
                        <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 8 8">
                          <circle cx="4" cy="4" r="3"/>
                        </svg>
                      </div>
                      <span>Professional Marketing</span>
                    </div>
                  </div>
                </div>
              </motion.div>
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
