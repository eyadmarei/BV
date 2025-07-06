import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import PropertyCard from "@/components/property-card";
import ServiceCard from "@/components/service-card";
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
          className="absolute top-0 left-0 w-full h-[calc(100%+6rem)] object-cover transform -translate-y-24"
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
              
              {/* Property Type Boxes with View Collection Buttons */}
              <motion.div
                className="mt-8 flex gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                {/* Villas */}
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/10 shadow-lg w-36">
                  <div className="text-center">
                    <svg className="w-6 h-6 text-white mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <h4 className="text-white text-sm font-bold">Villas</h4>
                    <p className="text-white/80 text-xs mb-3">Luxury Living</p>
                    <button className="bg-black text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-gray-800 transition-colors">
                      View Collection
                    </button>
                  </div>
                </div>

                {/* Townhouses */}
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/10 shadow-lg w-36">
                  <div className="text-center">
                    <svg className="w-6 h-6 text-white mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <h4 className="text-white text-sm font-bold">Townhouses</h4>
                    <p className="text-white/80 text-xs mb-3">Modern Style</p>
                    <button className="bg-black text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-gray-800 transition-colors">
                      View Collection
                    </button>
                  </div>
                </div>

                {/* Apartments */}
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/10 shadow-lg w-36">
                  <div className="text-center">
                    <svg className="w-6 h-6 text-white mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                    </svg>
                    <h4 className="text-white text-sm font-bold">Apartments</h4>
                    <p className="text-white/80 text-xs mb-3">City Views</p>
                    <button className="bg-black text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-gray-800 transition-colors">
                      View Collection
                    </button>
                  </div>
                </div>
              </motion.div>
              
              {/* BUY/SELL Overlay below property types */}
              <motion.div
                className="mt-8 flex gap-6 justify-center max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2 }}
              >
                {/* BUY Box */}
                <div className="bg-white/30 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-xl w-72">
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
                      <span>Luxury 
                        Villas
                        Exclusive luxury villas with premium amenities and breathtaking views in prestigious locations. & Apartments</span>
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
                <div className="bg-white/30 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-xl w-72">
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


      {/* Our Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Side Title Box */}
            <motion.div 
              className="lg:w-1/3"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white p-6 rounded-2xl shadow-sm h-fit sticky top-8">
                <h2 className="text-2xl font-bold text-black mb-2">Our Services</h2>
                <p className="text-gray-600 text-sm">Complete property investment support from purchase to management</p>
              </div>
            </motion.div>
            
            {/* Services Grid */}
            <div className="lg:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
          </div>
        </div>
      </section>
    </div>
  );
}
