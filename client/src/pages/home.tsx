import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import PropertyCard from "@/components/property-card";
import { 
  Home as HomeIcon, Settings, Calculator, Briefcase, ArrowLeft,
  MapPin, Users, FileText, DollarSign, Shield, Wrench, 
  Clipboard, Phone, CreditCard, Building2, Globe, Award, Search, Eye
} from "lucide-react";
import type { Property, Service, FeaturedStory } from "@shared/schema";
import heroVideo from "@assets/WhatsApp Video 2025-07-06 at 03.15.52_6b085703_1751757407515.mp4";
import binghatiLogo from "@assets/binghate_1754074726263.png";
import danubeLogo from "@assets/danube_1754074726264.png";
import ellingtonLogo from "@assets/download_1754074726265.png";
import emaarLogo from "@assets/emar_1754074726266.png";
import imanLogo from "@assets/iman_1754074726267.png";
import marquisLogo from "@assets/mareques_1754074726267.png";
import rabdanLogo from "@assets/Rabdan_1754074726268.png";
import tigerLogo from "@assets/tiger_1754074726270.png";

const partners = [
  { name: "Binghatti", logo: binghatiLogo, description: "Luxury Developments" },
  { name: "Danube Properties", logo: danubeLogo, description: "Premium Locations" },
  { name: "Ellington Properties", logo: ellingtonLogo, description: "Modern Design" },
  { name: "Emaar", logo: emaarLogo, description: "Iconic Projects" },
  { name: "Iman Developers", logo: imanLogo, description: "Quality Living" },
  { name: "Marquis", logo: marquisLogo, description: "Elite Properties" },
  { name: "Rabdan", logo: rabdanLogo, description: "Contemporary Style" },
  { name: "Tiger Properties AE", logo: tigerLogo, description: "Investment Focus" }
];


const serviceCategories = [
  {
    id: "property-transactions",
    label: "Property Transactions",
    icon: HomeIcon,
    description: "Buy and sell properties with expert guidance across all market segments",
    subcategories: [
      {
        title: "Buying Properties",
        description: "Comprehensive property acquisition services covering all types of real estate investments with expert guidance.",
        services: [
          { name: "Residential", icon: HomeIcon },
          { name: "Commercial", icon: Building2 },
          { name: "Off-Plan", icon: MapPin },
          { name: "Consultancy", icon: Users }
        ]
      },
      {
        title: "Selling Properties", 
        description: "Professional property sales services ensuring optimal market value and smooth transaction processes.",
        services: [
          { name: "Residential", icon: HomeIcon },
          { name: "Commercial", icon: Building2 },
          { name: "Off-Plan", icon: MapPin },
          { name: "Consultancy", icon: Users }
        ]
      }
    ]
  },
  {
    id: "property-management",
    label: "Property Management",
    icon: Settings,
    description: "Complete property oversight and management services with expert consultation",
    subcategories: [
      {
        title: "Property Management Supervision",
        description: "Complete property oversight services with free consultations across all management aspects.",
        services: [
          { name: "Property Management Free Consultation", icon: Phone },
          { name: "Property Evaluation Free Consultation", icon: Calculator },
          { name: "Inspection and Snagging Services", icon: Clipboard },
          { name: "Industrial Services", icon: Settings },
          { name: "Relocation Services", icon: MapPin },
          { name: "Specialized Consultation", icon: Award },
          { name: "Commercial Property", icon: Building2 },
          { name: "Interior Design & Project Execution", icon: Wrench },
          { name: "Conveyancing", icon: FileText }
        ]
      }
    ]
  },
  {
    id: "mortgage-advisory",
    label: "Mortgage Advisory",
    icon: Calculator,
    description: "Expert mortgage guidance and financing solutions for all property investment scenarios",
    subcategories: [
      {
        title: "Mortgage Services",
        description: "Comprehensive mortgage solutions tailored to your investment needs with expert guidance throughout the process.",
        services: [
          { name: "Residential Mortgages", icon: HomeIcon },
          { name: "Commercial Mortgages", icon: Building2 },
          { name: "Non-Resident Mortgages", icon: Globe },
          { name: "Financing for Under Construction Properties", icon: Settings },
          { name: "Mortgage Financing", icon: CreditCard },
          { name: "Shariah Financing Solutions", icon: Shield }
        ]
      }
    ]
  },
  {
    id: "business-support",
    label: "Business Support",
    icon: Briefcase,
    description: "Comprehensive business setup and investment assistance including immigration services",
    subcategories: [
      {
        title: "Business and Investment Support",
        description: "Comprehensive business setup and investment assistance including immigration services for property investors.",
        services: [
          { name: "Business Set Up", icon: Briefcase },
          { name: "Financial Services", icon: DollarSign },
          { name: "Immigration Service Assistance (Golden Visa)", icon: Award }
        ]
      }
    ]
  }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("partners");
  const [partnerStyle, setPartnerStyle] = useState('fancy'); // 'fancy' or 'black'
  const [partnerFilter, setPartnerFilter] = useState("");
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Prioritize properties first (most important for LCP)
  const { data: properties, isLoading: propertiesLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  // Defer services loading slightly
  const { data: services, isLoading: servicesLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  // Defer stories loading (least critical for initial render)
  const { data: featuredStories = [], isLoading: isLoadingStories } = useQuery<FeaturedStory[]>({
    queryKey: ['/api/featured-stories'],
    staleTime: 10 * 60 * 1000, // Cache for 10 minutes
  });

  // Load video after critical content
  useEffect(() => {
    const timer = setTimeout(() => {
      setVideoLoaded(true);
    }, 1000); // Delay video loading by 1 second
    return () => clearTimeout(timer);
  }, []);

  const featuredProperties = properties?.filter(p => p.featured) || [];
  const activeCategory = serviceCategories.find(cat => cat.id === activeTab);
  
  // Filter partners based on search term
  const filteredPartners = partners.filter(partner => 
    partner.name.toLowerCase().includes(partnerFilter.toLowerCase()) ||
    partner.description.toLowerCase().includes(partnerFilter.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* Hero Video Section */}
      <section className="relative h-[120vh] sm:h-screen overflow-hidden bg-black">
        {/* Background Video - Lazy Loaded */}
        {videoLoaded && (
          <video 
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onError={(e) => console.error('Video error:', e)}
            onLoadStart={() => console.log('Video loading started')}
            onCanPlay={() => console.log('Video can play')}
          >
            <source src="/hero-video.mp4" type="video/mp4" />
            <source src={heroVideo} type="video/mp4" />
          </video>
        )}
        
        {/* Fallback background while video loads */}
        {!videoLoaded && (
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black via-gray-900 to-black"></div>
        )}
        
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
              <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg mt-16">
                Best View Properties
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md">
                Redefining real estate excellence in Dubai by delivering unparalleled service, innovative solutions, and lasting value for our clients
              </p>
              
              {/* Property Type Boxes with View Collection Buttons */}
              <motion.div
                className="mt-8 flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center w-full max-w-[250px] sm:max-w-none mx-auto px-6 sm:px-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                {/* Villas */}
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 sm:p-4 border border-white/10 shadow-lg w-full sm:w-36 max-w-[230px] sm:max-w-none">
                  <div className="text-center">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white mx-auto mb-1 sm:mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <h4 className="text-white text-xs sm:text-sm font-bold">Villas</h4>
                    <p className="text-white/80 text-xs mb-2 sm:mb-3">Luxury Living</p>
                    <Link href="/buy-sell?type=villa">
                      <button className="bg-black text-white px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs font-medium hover:bg-gray-800 transition-colors w-full">
                        View Collection
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Townhouses */}
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 sm:p-4 border border-white/10 shadow-lg w-full sm:w-36 max-w-[230px] sm:max-w-none">
                  <div className="text-center">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white mx-auto mb-1 sm:mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <h4 className="text-white text-xs sm:text-sm font-bold">Townhouses</h4>
                    <p className="text-white/80 text-xs mb-2 sm:mb-3">Modern Style</p>
                    <Link href="/buy-sell?type=townhouse">
                      <button className="bg-black text-white px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs font-medium hover:bg-gray-800 transition-colors w-full">
                        View Collection
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Apartments */}
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 sm:p-4 border border-white/10 shadow-lg w-full sm:w-36 max-w-[230px] sm:max-w-none">
                  <div className="text-center">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white mx-auto mb-1 sm:mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                    </svg>
                    <h4 className="text-white text-xs sm:text-sm font-bold">Apartments</h4>
                    <p className="text-white/80 text-xs mb-2 sm:mb-3">City Views</p>
                    <Link href="/buy-sell?type=apartment">
                      <button className="bg-black text-white px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs font-medium hover:bg-gray-800 transition-colors w-full">
                        View Collection
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>

            </motion.div>
          </div>
        </div>
        
        {/* Story Section - Slides over video */}
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, delay: 4, ease: "easeOut" }}
          className="absolute inset-0 bg-black/90 z-20 flex items-center justify-center"
        >
          <div className="text-center px-4 sm:px-6 lg:px-8">
            {/* Story Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 4.5 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gold/20 to-yellow-500/20 border border-gold/30 rounded-full px-6 py-2 mb-6"
            >
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse"></div>
              <span className="text-gold text-sm font-medium">BREAKING NEWS</span>
            </motion.div>

            {/* Story Content */}
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 5 }}
              className="text-4xl md:text-6xl font-bold text-white mb-4"
            >
              BestView Properties
            </motion.h2>
            
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 5.3 }}
              className="text-xl md:text-2xl text-gold font-semibold mb-8"
            >
              Opening Soon
            </motion.p>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 5.6 }}
              className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed"
            >
              Get ready to experience Dubai's most exclusive real estate destination. 
              Where luxury meets innovation, and every property tells a story of excellence.
            </motion.p>

            {/* Call to Action */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 5.9 }}
              className="mt-8"
            >
              <button className="bg-gradient-to-r from-gold to-yellow-500 text-black px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-gold/25 transition-all duration-300 transform hover:scale-105">
                Be the First to Know
              </button>
            </motion.div>

            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-10 left-10 w-20 h-20 border border-gold/30 rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-32 h-32 border border-gold/20 rounded-full"></div>
              <div className="absolute top-1/2 right-20 w-16 h-16 border border-gold/25 rounded-full"></div>
            </div>
          </div>
        </motion.div>

      </section>

      {/* Tabbed Section - Partners & Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Transparent Toggle Slider */}
          <div className="flex justify-center mb-8">
            <div className="relative bg-white/20 backdrop-blur-sm rounded-full p-0.5 shadow-lg border border-white/30 overflow-x-auto">
              {/* Sliding Highlight Button - Black for active tabs */}
              <div 
                className={`absolute top-0.5 h-[calc(100%-4px)] rounded-full shadow-md transition-all duration-400 ease-out ${
                  activeTab === 'partners' 
                    ? 'left-0.5 w-[calc(28%-2px)]' 
                    : activeTab === 'services' 
                    ? 'left-[calc(28%+1px)] w-[calc(30%-2px)]' 
                    : 'left-[calc(58%+1px)] w-[calc(42%-2px)]'
                }`}
                style={{
                  background: 'rgba(0, 0, 0, 0.9)',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1), inset 0 1px 2px rgba(255,255,255,0.4)'
                }}
              />
              
              {/* Radio Buttons */}
              <div className="relative flex">
                <button 
                  onClick={() => setActiveTab('partners')}
                  className={`relative px-2 sm:px-4 md:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-300 rounded-full whitespace-nowrap ${
                    activeTab === 'partners' 
                      ? 'text-white' 
                      : 'text-black/70 hover:text-black opacity-70'
                  }`}
                >
                  Premium Partners
                </button>
                <button 
                  onClick={() => setActiveTab('services')}
                  className={`relative px-2 sm:px-4 md:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-300 rounded-full whitespace-nowrap ${
                    activeTab === 'services' 
                      ? 'text-white' 
                      : 'text-black/70 hover:text-black opacity-70'
                  }`}
                >
                  Our Services
                </button>
                <button 
                  onClick={() => setActiveTab('market-updates')}
                  className={`relative px-2 sm:px-4 md:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-300 rounded-full flex items-center gap-1 sm:gap-2 whitespace-nowrap ${
                    activeTab === 'market-updates' 
                      ? 'text-white' 
                      : 'text-black/70 hover:text-black opacity-70'
                  }`}
                >
                  <span className="hidden sm:inline">📈</span>
                  <span className="sm:hidden">📈</span>
                  Property Market Updates
                </button>
              </div>
              
              {/* Transparent Shine Overlay */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-40 pointer-events-none" />
            </div>
          </div>

          {/* Style Toggle for Partners */}
          {activeTab === 'partners' && (
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setPartnerStyle(partnerStyle === 'fancy' ? 'black' : 'fancy')}
                className="opacity-20 hover:opacity-40 transition-opacity p-1"
                title="Toggle style"
              >
                <Eye className="w-3 h-3 text-gray-500" />
              </button>
            </div>
          )}

          {/* Tab Content */}
          {activeTab === 'partners' && (
          
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {partnerStyle === 'fancy' ? (
                <div>
              {/* Partner Cards Grid - Horizontal Layout */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            
            {/* Binghatti */}
            <div className="flex flex-col items-center">
              <div 
                className="relative rounded-lg p-4 overflow-hidden flex items-center justify-center h-32 w-full"
                style={{
                  background: 'linear-gradient(160deg, #fefefe, #faf9f7 30%, #f5f4f2 70%, #f0efed)',
                  boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.9), inset 0 -1px 3px rgba(0,0,0,0.05), 0 6px 25px rgba(0,0,0,0.08), 0 0 20px rgba(255,248,220,0.8)',
                  transition: 'transform .18s ease, outline-color .18s ease, box-shadow .18s ease',
                  border: '1px solid rgba(255,255,255,0.4)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'inset 0 2px 8px rgba(255,255,255,1), inset 0 -1px 4px rgba(0,0,0,0.08), 0 12px 35px rgba(0,0,0,0.12), 0 0 30px rgba(255,248,220,1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0px)';
                  e.currentTarget.style.boxShadow = 'inset 0 2px 6px rgba(255,255,255,0.9), inset 0 -1px 3px rgba(0,0,0,0.05), 0 6px 25px rgba(0,0,0,0.08), 0 0 20px rgba(255,248,220,0.8)';
                }}
              >
                <img 
                  src={binghatiLogo} 
                  alt="Binghatti logo"
                  loading="lazy"
                  style={{
                    maxWidth: '90%',
                    maxHeight: '90%',
                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.5))'
                  }}
                />
              </div>
              <div className="font-semibold text-xs mt-2" style={{ letterSpacing: '.1px', color: '#6b7280' }}>
                Binghatti
              </div>
              <Link href="/projects?partner=Binghatti" className="mt-1">
                <div 
                  className="text-xs cursor-pointer transition-all hover:opacity-90 px-3 py-1 rounded-full"
                  style={{ 
                    background: '#ffffff',
                    color: '#000000',
                    fontSize: '10px',
                    letterSpacing: '.1px',
                    fontWeight: '400',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  View Collection
                </div>
              </Link>
            </div>

            {/* Danube Properties */}
            <div className="flex flex-col items-center">
              <div 
                className="relative rounded-lg p-4 overflow-hidden flex items-center justify-center h-32 w-full"
                style={{
                  background: 'linear-gradient(160deg, #fefefe, #faf9f7 30%, #f5f4f2 70%, #f0efed)',
                  boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.9), inset 0 -1px 3px rgba(0,0,0,0.05), 0 6px 25px rgba(0,0,0,0.08), 0 0 20px rgba(255,248,220,0.8)',
                  transition: 'transform .18s ease, outline-color .18s ease, box-shadow .18s ease',
                  border: '1px solid rgba(255,255,255,0.4)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'inset 0 2px 8px rgba(255,255,255,1), inset 0 -1px 4px rgba(0,0,0,0.08), 0 12px 35px rgba(0,0,0,0.12), 0 0 30px rgba(255,248,220,1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0px)';
                  e.currentTarget.style.boxShadow = 'inset 0 2px 6px rgba(255,255,255,0.9), inset 0 -1px 3px rgba(0,0,0,0.05), 0 6px 25px rgba(0,0,0,0.08), 0 0 20px rgba(255,248,220,0.8)';
                }}
              >
                <img 
                  src={danubeLogo} 
                  alt="Danube Properties logo"
                  loading="lazy"
                  style={{
                    maxWidth: '90%',
                    maxHeight: '90%',
                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.5))'
                  }}
                />
              </div>
              <div className="font-semibold text-xs mt-2" style={{ letterSpacing: '.1px', color: '#6b7280' }}>
                Danube Properties
              </div>
              <Link href="/projects?partner=Danube Properties" className="mt-1">
                <div 
                  className="text-xs cursor-pointer transition-all hover:opacity-90 px-3 py-1 rounded-full"
                  style={{ 
                    background: '#ffffff',
                    color: '#000000',
                    fontSize: '10px',
                    letterSpacing: '.1px',
                    fontWeight: '400',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  View Collection
                </div>
              </Link>
            </div>

            {/* Ellington Properties */}
            <div className="flex flex-col items-center">
              <div 
                className="relative rounded-lg p-4 overflow-hidden flex items-center justify-center h-32 w-full"
                style={{
                  background: 'linear-gradient(160deg, #fefefe, #faf9f7 30%, #f5f4f2 70%, #f0efed)',
                  boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.9), inset 0 -1px 3px rgba(0,0,0,0.05), 0 6px 25px rgba(0,0,0,0.08), 0 0 20px rgba(255,248,220,0.8)',
                  transition: 'transform .18s ease, outline-color .18s ease, box-shadow .18s ease',
                  border: '1px solid rgba(255,255,255,0.4)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'inset 0 2px 8px rgba(255,255,255,1), inset 0 -1px 4px rgba(0,0,0,0.08), 0 12px 35px rgba(0,0,0,0.12), 0 0 30px rgba(255,248,220,1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0px)';
                  e.currentTarget.style.boxShadow = 'inset 0 2px 6px rgba(255,255,255,0.9), inset 0 -1px 3px rgba(0,0,0,0.05), 0 6px 25px rgba(0,0,0,0.08), 0 0 20px rgba(255,248,220,0.8)';
                }}
              >
                <img 
                  src={ellingtonLogo} 
                  alt="Ellington Properties logo"
                  loading="lazy"
                  style={{
                    maxWidth: '90%',
                    maxHeight: '90%',
                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.5))'
                  }}
                />
              </div>
              <div className="font-semibold text-xs mt-2" style={{ letterSpacing: '.1px', color: '#6b7280' }}>
                Ellington Properties
              </div>
              <Link href="/projects?partner=Ellington Properties" className="mt-1">
                <div 
                  className="text-xs cursor-pointer transition-all hover:opacity-90 px-3 py-1 rounded-full"
                  style={{ 
                    background: '#ffffff',
                    color: '#000000',
                    fontSize: '10px',
                    letterSpacing: '.1px',
                    fontWeight: '400',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  View Collection
                </div>
              </Link>
            </div>

            {/* Emaar */}
            <div className="flex flex-col items-center">
              <div 
                className="relative rounded-lg p-4 overflow-hidden flex items-center justify-center h-32 w-full"
                style={{
                  background: 'linear-gradient(160deg, #fefefe, #faf9f7 30%, #f5f4f2 70%, #f0efed)',
                  boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.9), inset 0 -1px 3px rgba(0,0,0,0.05), 0 6px 25px rgba(0,0,0,0.08), 0 0 20px rgba(255,248,220,0.8)',
                  transition: 'transform .18s ease, outline-color .18s ease, box-shadow .18s ease',
                  border: '1px solid rgba(255,255,255,0.4)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'inset 0 2px 8px rgba(255,255,255,1), inset 0 -1px 4px rgba(0,0,0,0.08), 0 12px 35px rgba(0,0,0,0.12), 0 0 30px rgba(255,248,220,1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0px)';
                  e.currentTarget.style.boxShadow = 'inset 0 2px 6px rgba(255,255,255,0.9), inset 0 -1px 3px rgba(0,0,0,0.05), 0 6px 25px rgba(0,0,0,0.08), 0 0 20px rgba(255,248,220,0.8)';
                }}
              >
                <img 
                  src={emaarLogo} 
                  alt="Emaar logo"
                  loading="lazy"
                  style={{
                    maxWidth: '90%',
                    maxHeight: '90%',
                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.5))'
                  }}
                />
              </div>
              <div className="font-semibold text-xs mt-2" style={{ letterSpacing: '.1px', color: '#6b7280' }}>
                Emaar
              </div>
              <Link href="/projects?partner=Emaar" className="mt-1">
                <div 
                  className="text-xs cursor-pointer transition-all hover:opacity-90 px-3 py-1 rounded-full"
                  style={{ 
                    background: '#ffffff',
                    color: '#000000',
                    fontSize: '10px',
                    letterSpacing: '.1px',
                    fontWeight: '400',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  View Collection
                </div>
              </Link>
            </div>

            {/* Iman Developers */}
            <div className="flex flex-col items-center">
              <div 
                className="relative rounded-lg p-4 overflow-hidden flex items-center justify-center h-32 w-full"
                style={{
                  background: 'linear-gradient(160deg, #fefefe, #faf9f7 30%, #f5f4f2 70%, #f0efed)',
                  boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.9), inset 0 -1px 3px rgba(0,0,0,0.05), 0 6px 25px rgba(0,0,0,0.08), 0 0 20px rgba(255,248,220,0.8)',
                  transition: 'transform .18s ease, outline-color .18s ease, box-shadow .18s ease',
                  border: '1px solid rgba(255,255,255,0.4)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'inset 0 2px 8px rgba(255,255,255,1), inset 0 -1px 4px rgba(0,0,0,0.08), 0 12px 35px rgba(0,0,0,0.12), 0 0 30px rgba(255,248,220,1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0px)';
                  e.currentTarget.style.boxShadow = 'inset 0 2px 6px rgba(255,255,255,0.9), inset 0 -1px 3px rgba(0,0,0,0.05), 0 6px 25px rgba(0,0,0,0.08), 0 0 20px rgba(255,248,220,0.8)';
                }}
              >
                <img 
                  src={imanLogo} 
                  alt="IMAN Developers logo"
                  loading="lazy"
                  style={{
                    maxWidth: '90%',
                    maxHeight: '90%',
                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.5))'
                  }}
                />
              </div>
              <div className="font-semibold text-xs mt-2" style={{ letterSpacing: '.1px', color: '#6b7280' }}>
                IMAN Developers
              </div>
              <Link href="/projects?partner=Iman Developers" className="mt-1">
                <div 
                  className="text-xs cursor-pointer transition-all hover:opacity-90 px-3 py-1 rounded-full"
                  style={{ 
                    background: '#ffffff',
                    color: '#000000',
                    fontSize: '10px',
                    letterSpacing: '.1px',
                    fontWeight: '400',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  View Collection
                </div>
              </Link>
            </div>

            {/* Marquis */}
            <div className="flex flex-col items-center">
              <div 
                className="relative rounded-lg p-4 overflow-hidden flex items-center justify-center h-32 w-full"
                style={{
                  background: 'linear-gradient(160deg, #fefefe, #faf9f7 30%, #f5f4f2 70%, #f0efed)',
                  boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.9), inset 0 -1px 3px rgba(0,0,0,0.05), 0 6px 25px rgba(0,0,0,0.08), 0 0 20px rgba(255,248,220,0.8)',
                  transition: 'transform .18s ease, outline-color .18s ease, box-shadow .18s ease',
                  border: '1px solid rgba(255,255,255,0.4)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'inset 0 2px 8px rgba(255,255,255,1), inset 0 -1px 4px rgba(0,0,0,0.08), 0 12px 35px rgba(0,0,0,0.12), 0 0 30px rgba(255,248,220,1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0px)';
                  e.currentTarget.style.boxShadow = 'inset 0 2px 6px rgba(255,255,255,0.9), inset 0 -1px 3px rgba(0,0,0,0.05), 0 6px 25px rgba(0,0,0,0.08), 0 0 20px rgba(255,248,220,0.8)';
                }}
              >
                <img 
                  src={marquisLogo} 
                  alt="Marquis logo"
                  loading="lazy"
                  style={{
                    maxWidth: '90%',
                    maxHeight: '90%',
                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.5))'
                  }}
                />
              </div>
              <div className="font-semibold text-xs mt-2" style={{ letterSpacing: '.1px', color: '#6b7280' }}>
                Marquis
              </div>
              <Link href="/projects?partner=Marquis" className="mt-1">
                <div 
                  className="text-xs cursor-pointer transition-all hover:opacity-90 px-3 py-1 rounded-full"
                  style={{ 
                    background: '#ffffff',
                    color: '#000000',
                    fontSize: '10px',
                    letterSpacing: '.1px',
                    fontWeight: '400',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  View Collection
                </div>
              </Link>
            </div>

            {/* Rabdan */}
            <div className="flex flex-col items-center">
              <div 
                className="relative rounded-lg p-4 overflow-hidden flex items-center justify-center h-32 w-full"
                style={{
                  background: 'linear-gradient(160deg, #fefefe, #faf9f7 30%, #f5f4f2 70%, #f0efed)',
                  boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.9), inset 0 -1px 3px rgba(0,0,0,0.05), 0 6px 25px rgba(0,0,0,0.08), 0 0 20px rgba(255,248,220,0.8)',
                  transition: 'transform .18s ease, outline-color .18s ease, box-shadow .18s ease',
                  border: '1px solid rgba(255,255,255,0.4)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'inset 0 2px 8px rgba(255,255,255,1), inset 0 -1px 4px rgba(0,0,0,0.08), 0 12px 35px rgba(0,0,0,0.12), 0 0 30px rgba(255,248,220,1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0px)';
                  e.currentTarget.style.boxShadow = 'inset 0 2px 6px rgba(255,255,255,0.9), inset 0 -1px 3px rgba(0,0,0,0.05), 0 6px 25px rgba(0,0,0,0.08), 0 0 20px rgba(255,248,220,0.8)';
                }}
              >
                <img 
                  src={rabdanLogo} 
                  alt="Rabdan logo"
                  loading="lazy"
                  style={{
                    maxWidth: '90%',
                    maxHeight: '90%',
                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.5))'
                  }}
                />
              </div>
              <div className="font-semibold text-xs mt-2" style={{ letterSpacing: '.1px', color: '#6b7280' }}>
                Rabdan
              </div>
              <Link href="/projects?partner=Rabdan Developments" className="mt-1">
                <div 
                  className="text-xs cursor-pointer transition-all hover:opacity-90 px-3 py-1 rounded-full"
                  style={{ 
                    background: '#ffffff',
                    color: '#000000',
                    fontSize: '10px',
                    letterSpacing: '.1px',
                    fontWeight: '400',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  View Collection
                </div>
              </Link>
            </div>

            {/* Tiger Properties */}
            <div className="flex flex-col items-center">
              <div 
                className="relative rounded-lg p-4 overflow-hidden flex items-center justify-center h-32 w-full"
                style={{
                  background: 'linear-gradient(160deg, #fefefe, #faf9f7 30%, #f5f4f2 70%, #f0efed)',
                  boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.9), inset 0 -1px 3px rgba(0,0,0,0.05), 0 6px 25px rgba(0,0,0,0.08), 0 0 20px rgba(255,248,220,0.8)',
                  transition: 'transform .18s ease, outline-color .18s ease, box-shadow .18s ease',
                  border: '1px solid rgba(255,255,255,0.4)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'inset 0 2px 8px rgba(255,255,255,1), inset 0 -1px 4px rgba(0,0,0,0.08), 0 12px 35px rgba(0,0,0,0.12), 0 0 30px rgba(255,248,220,1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0px)';
                  e.currentTarget.style.boxShadow = 'inset 0 2px 6px rgba(255,255,255,0.9), inset 0 -1px 3px rgba(0,0,0,0.05), 0 6px 25px rgba(0,0,0,0.08), 0 0 20px rgba(255,248,220,0.8)';
                }}
              >
                <img 
                  src={tigerLogo} 
                  alt="Tiger Properties logo"
                  loading="lazy"
                  style={{
                    maxWidth: '90%',
                    maxHeight: '90%',
                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.5))'
                  }}
                />
              </div>
              <div className="font-semibold text-xs mt-2" style={{ letterSpacing: '.1px', color: '#6b7280' }}>
                Tiger Properties
              </div>
              <Link href="/projects?partner=Tiger Properties AE" className="mt-1">
                <div 
                  className="text-xs cursor-pointer transition-all hover:opacity-90 px-3 py-1 rounded-full"
                  style={{ 
                    background: '#ffffff',
                    color: '#000000',
                    fontSize: '10px',
                    letterSpacing: '.1px',
                    fontWeight: '400',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  View Collection
                </div>
              </Link>
            </div>

              </div>
              
              {/* Elegant Text Below Partners */}
              <div className="text-center mt-8">
                <p 
                  className="text-lg md:text-xl font-light tracking-wide"
                  style={{
                    color: '#374151',
                    fontFamily: 'Georgia, serif',
                    letterSpacing: '0.5px',
                    lineHeight: '1.6'
                  }}
                >
                  Dubai Featured Property Projects from our Premium Property Partners
                </p>
              </div>
                </div>
              ) : (
                <div className="py-16 bg-gray-900 rounded-lg">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                      <h2 className="text-lg md:text-xl font-bold text-white mb-2">
                        Explore Our Premium Partners
                      </h2>
                      <p className="text-sm text-white/80 mb-6">
                        Discover luxury developments from Dubai's most trusted developers
                      </p>
                      
                      {/* Search Filter */}
                      <div className="max-w-md mx-auto mb-8">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                          <input
                            type="text"
                            placeholder="Search partners or development type..."
                            value={partnerFilter}
                            onChange={(e) => setPartnerFilter(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Partner Cards Grid - Landing Page Style */}
                    <motion.div
                      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      {[
                        { name: 'Binghatti', logo: binghatiLogo, description: 'Innovative architectural designs with distinctive lifestyle developments' },
                        { name: 'Danube Properties', logo: danubeLogo, description: 'Affordable luxury properties with modern amenities and prime locations' },
                        { name: 'Ellington Properties', logo: ellingtonLogo, description: 'Contemporary design-focused developments in premium Dubai locations' },
                        { name: 'Emaar', logo: emaarLogo, description: 'World-class developments including Dubai Mall, Burj Khalifa and luxury communities' },
                        { name: 'Iman Developers', logo: imanLogo, description: 'Quality residential and commercial developments with modern infrastructure' },
                        { name: 'Marquis', logo: marquisLogo, description: 'Luxury residential projects with premium finishes and exclusive amenities' },
                        { name: 'Rabdan', logo: rabdanLogo, description: 'Sustainable and innovative property developments in key Dubai areas' },
                        { name: 'Tiger Properties AE', logo: tigerLogo, description: 'Premium villa communities and luxury residential developments' }
                      ].filter(partner => 
                        partner.name.toLowerCase().includes(partnerFilter.toLowerCase()) ||
                        partner.description.toLowerCase().includes(partnerFilter.toLowerCase())
                      ).map((partner, index) => (
                        <motion.div
                          key={partner.name}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/10 shadow-lg w-48 hover:bg-white/25 transition-all duration-300"
                          whileHover={{ scale: 1.05, y: -5 }}
                        >
                          <div className="text-center">
                            <div className="flex items-center justify-center h-16 mb-3">
                              <img 
                                src={partner.logo} 
                                alt={`${partner.name} logo`}
                                loading="lazy"
                                className="max-h-full max-w-full object-contain filter drop-shadow-md"
                              />
                            </div>
                            <h4 className="text-white text-xs font-bold mb-1">{partner.name}</h4>
                            <p className="text-white/80 text-[10px] mb-3">{partner.description}</p>
                            <Link href={`/projects?partner=${encodeURIComponent(partner.name)}`}>
                              <button className="bg-black text-white px-3 py-1.5 rounded-full text-[10px] font-medium hover:bg-gray-800 transition-colors w-full">
                                View Collection
                              </button>
                            </Link>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* No Results Message */}
                    {[
                      { name: 'Binghatti', logo: binghatiLogo, description: 'Innovative architectural designs with distinctive lifestyle developments' },
                      { name: 'Danube Properties', logo: danubeLogo, description: 'Affordable luxury properties with modern amenities and prime locations' },
                      { name: 'Ellington Properties', logo: ellingtonLogo, description: 'Contemporary design-focused developments in premium Dubai locations' },
                      { name: 'Emaar', logo: emaarLogo, description: 'World-class developments including Dubai Mall, Burj Khalifa and luxury communities' },
                      { name: 'Iman Developers', logo: imanLogo, description: 'Quality residential and commercial developments with modern infrastructure' },
                      { name: 'Marquis', logo: marquisLogo, description: 'Luxury residential projects with premium finishes and exclusive amenities' },
                      { name: 'Rabdan', logo: rabdanLogo, description: 'Sustainable and innovative property developments in key Dubai areas' },
                      { name: 'Tiger Properties AE', logo: tigerLogo, description: 'Premium villa communities and luxury residential developments' }
                    ].filter(partner => 
                      partner.name.toLowerCase().includes(partnerFilter.toLowerCase()) ||
                      partner.description.toLowerCase().includes(partnerFilter.toLowerCase())
                    ).length === 0 && partnerFilter && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                      >
                        <p className="text-white/60 text-lg">
                          No partners found matching "{partnerFilter}"
                        </p>
                        <button
                          onClick={() => setPartnerFilter("")}
                          className="mt-4 text-white underline hover:text-white/80 transition-colors"
                        >
                          Clear search
                        </button>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'services' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Service Category Cards */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {serviceCategories.map((category, index) => {
                    const IconComponent = category.icon;
                    return (
                      <Link key={category.id} href="/services">
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          className="flex items-center space-x-4 p-6 rounded-lg transition-all duration-300 text-left w-full h-24 text-gray-600 hover:text-black cursor-pointer group bg-white hover:bg-gray-50"
                          whileHover={{ scale: 1.02 }}
                        >
                          <IconComponent className="w-6 h-6 flex-shrink-0" />
                          <div className="min-w-0">
                            <div className="font-semibold text-base">{category.label}</div>
                            <div className="text-sm opacity-75">
                              {category.label === "Property Transactions" ? "Buy & Sell" :
                               category.label === "Property Management" ? "Oversight" :
                               category.label === "Mortgage Advisory" ? "Financing" :
                               "Business Setup"}
                            </div>
                          </div>
                          <ArrowLeft className="w-4 h-4 rotate-180 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                        </motion.div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* Property Market Updates Tab Content */}
          {activeTab === 'market-updates' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Market Updates Content */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Property Market Updates</h3>
                  <p className="text-gray-600">Latest insights and trends from Dubai's real estate market</p>
                </div>
                
                {/* News Stories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      id: 1,
                      title: "Dubai Property Market Hits Record High",
                      summary: "Q4 2024 shows unprecedented growth in luxury property segment",
                      icon: "📈",
                      category: "Market Trends"
                    },
                    {
                      id: 2,
                      title: "New Development Projects Announced",
                      summary: "Major developers unveil ambitious projects for 2025",
                      icon: "🏗️",
                      category: "Development News"
                    },
                    {
                      id: 3,
                      title: "Investment Opportunities in Downtown",
                      summary: "Prime locations showing strong ROI potential",
                      icon: "💰",
                      category: "Investment"
                    },
                    {
                      id: 4,
                      title: "Expo Area Real Estate Boom",
                      summary: "Post-Expo developments attract international buyers",
                      icon: "🌍",
                      category: "International"
                    },
                    {
                      id: 5,
                      title: "Sustainability in Real Estate",
                      summary: "Green building initiatives gain momentum",
                      icon: "🌱",
                      category: "Sustainability"
                    },
                    {
                      id: 6,
                      title: "Tech-Enabled Property Solutions",
                      summary: "Digital transformation in property management",
                      icon: "💻",
                      category: "Technology"
                    }
                  ].map((story, index) => (
                    <motion.a
                      key={story.id}
                      href="#news-section"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-all duration-300 group cursor-pointer block"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start gap-3">
                        {/* Story Icon */}
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-2xl">
                            {story.icon}
                          </div>
                        </div>
                          
                        {/* Story Content */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-blue-600 transition-colors">
                            {story.title}
                          </h4>
                          <p className="text-gray-600 text-xs mb-2">
                            {story.summary}
                          </p>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-50 text-blue-700">
                            {story.category}
                          </span>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          
        </div>
      </section>

      {/* Property Market Updates - Featured Stories - HIDDEN FOR NOW */}
      {/*
      <section id="news-section" className="py-12 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Market Stories
            </h2>
            <p className="text-white/70">
              Latest insights from Dubai's property market
            </p>
          </div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {featuredStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-white/10">
                      <img 
                        src={story.imageUrl} 
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-white font-semibold text-sm md:text-base line-clamp-2 group-hover:text-white/90 transition-colors">
                        {story.title}
                      </h3>
                      <span className="text-white/50 text-xs whitespace-nowrap">
                        {story.publishedAt ? new Date(story.publishedAt).toLocaleDateString() : 'Recent'}
                      </span>
                    </div>
                    <p className="text-white/70 text-xs md:text-sm mt-1 line-clamp-2">
                      {story.content}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-white/10 text-white/80">
                        📊 Market Update
                      </span>
                      <button className="text-white/60 hover:text-white text-xs flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Read more →
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {featuredStories.length === 0 && (
            <div className="text-center py-8 bg-white/5 rounded-lg border border-white/10">
              <div className="text-white/40 text-4xl mb-2">📰</div>
              <p className="text-white/60">
                No market stories available yet
              </p>
              <p className="text-white/40 text-sm mt-1">
                Check back soon for the latest property market updates
              </p>
            </div>
          )}
        </div>
      </section>
      */}

    </div>
  );
}
