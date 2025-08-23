import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import PropertyCard from "@/components/property-card";
import { 
  Home as HomeIcon, Settings, Calculator, Briefcase, ArrowLeft,
  MapPin, Users, FileText, DollarSign, Shield, Wrench, 
  Clipboard, Phone, CreditCard, Building2, Globe, Award, Search
} from "lucide-react";
import type { Property, Service } from "@shared/schema";
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
  const [partnerFilter, setPartnerFilter] = useState("");
  
  const { data: properties, isLoading: propertiesLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const { data: services, isLoading: servicesLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

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
      <section className="relative h-screen overflow-hidden bg-black">
        {/* Background Video */}
        <video 
          className="absolute top-5 left-0 w-full h-[calc(100%-1.25rem)] object-cover"
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
              <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg mt-16">
                Best View Properties
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md">
                Redefining real estate excellence in Dubai by delivering unparalleled service, innovative solutions, and lasting value for our clients
              </p>
              
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

            </motion.div>
          </div>
        </div>
      </section>

      {/* Tabbed Section - Partners & Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Compact Charcoal Black Radio Slider */}
          <div className="flex justify-center mb-8">
            <div className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 rounded-full p-0.5 shadow-lg border border-gray-200/60 backdrop-blur-sm">
              {/* Sliding Silver Highlight Button */}
              <div 
                className={`absolute top-0.5 h-[calc(100%-4px)] rounded-full shadow-md transition-all duration-400 ease-out ${
                  activeTab === 'partners' ? 'left-0.5 w-[calc(50%-2px)]' : 'left-[calc(50%+1px)] w-[calc(50%-2px)]'
                }`}
                style={{
                  background: 'linear-gradient(135deg, #374151 0%, #1f2937 25%, #111827 50%, #1f2937 75%, #374151 100%)',
                  backdropFilter: 'blur(8px)',
                  border: '0.5px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.1)'
                }}
              />
              
              {/* Radio Buttons */}
              <div className="relative flex">
                <button 
                  onClick={() => setActiveTab('partners')}
                  className={`relative px-8 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                    activeTab === 'partners' 
                      ? 'text-white' 
                      : 'text-gray-600 hover:text-gray-500 opacity-70'
                  }`}
                >
                  Premium Partners
                </button>
                <button 
                  onClick={() => setActiveTab('services')}
                  className={`relative px-8 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                    activeTab === 'services' 
                      ? 'text-white' 
                      : 'text-gray-600 hover:text-gray-500 opacity-70'
                  }`}
                >
                  Our Services
                </button>
              </div>
              
              {/* Charcoal Shine Overlay */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-40 pointer-events-none" />
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'partners' && (
          
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
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
              
              {/* Descriptive Text */}
              <div className="text-center mt-8">
                <p 
                  className="text-sm"
                  style={{
                    color: '#000000',
                    letterSpacing: '0.5px'
                  }}
                >
                  Dubai Featured Property Projects from our Premium Property partners
                </p>
              </div>
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
          
        </div>
      </section>

      {/* Partner Showcase Section - Landing Page Style */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Explore Our Premium Partners
            </h2>
            <p className="text-xl text-white/80 mb-8">
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
            {filteredPartners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/20 backdrop-blur-sm rounded-lg p-6 border border-white/10 shadow-lg w-56 hover:bg-white/25 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-center">
                  <div className="flex items-center justify-center h-20 mb-4">
                    <img 
                      src={partner.logo} 
                      alt={`${partner.name} logo`}
                      className="max-h-full max-w-full object-contain filter drop-shadow-md"
                    />
                  </div>
                  <h4 className="text-white text-sm font-bold mb-2">{partner.name}</h4>
                  <p className="text-white/80 text-xs mb-4">{partner.description}</p>
                  <Link href={`/projects?partner=${encodeURIComponent(partner.name)}`}>
                    <button className="bg-black text-white px-4 py-2 rounded-full text-xs font-medium hover:bg-gray-800 transition-colors w-full">
                      View Collection
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* No Results Message */}
          {filteredPartners.length === 0 && partnerFilter && (
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
      </section>

    </div>
  );
}
