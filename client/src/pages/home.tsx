import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useState } from "react";
import PropertyCard from "@/components/property-card";
import { 
  Home as HomeIcon, Settings, Calculator, Briefcase, ArrowLeft,
  MapPin, Users, FileText, DollarSign, Shield, Wrench, 
  Clipboard, Phone, CreditCard, Building2, Globe, Award
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
  const [activeTab, setActiveTab] = useState("property-transactions");
  
  const { data: properties, isLoading: propertiesLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const { data: services, isLoading: servicesLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const featuredProperties = properties?.filter(p => p.featured) || [];
  const activeCategory = serviceCategories.find(cat => cat.id === activeTab);

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


      {/* Our Services */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-lg md:text-xl font-bold text-black mb-2">
              Our Services
            </h2>
            <p className="text-gray-600 text-sm max-w-lg mx-auto">
              Complete property investment support from purchase to management
            </p>
          </motion.div>

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
        </div>
      </section>

      {/* Featured Partners - Dark Metallic Silver */}
      <section 
        className="py-16 relative overflow-hidden"
        style={{
          background: `radial-gradient(1000px 600px at 20% -10%, #1f1f1f 0%, transparent 60%), radial-gradient(800px 600px at 120% 10%, #0d0d0d 0%, transparent 60%), #121212`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <motion.div
            className="flex items-end justify-between gap-4 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <h2 
                className="font-bold text-white mb-1"
                style={{
                  fontSize: 'clamp(20px,2.5vw,28px)',
                  letterSpacing: '.3px'
                }}
              >
                Featured Developers
              </h2>
              <p className="text-gray-400 text-sm">
                Curated luxury projects from top UAE developers
              </p>
            </div>
          </motion.div>
          
          {/* Partner Cards Grid - Horizontal Layout */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            
            {/* Binghatti */}
            <div 
              className="relative rounded-lg p-4 overflow-hidden"
              style={{
                background: '#1a1a1add',
                boxShadow: '0 6px 20px rgba(0,0,0,.4)',
                border: '1px solid rgba(255,255,255,.06)',
                transition: 'transform .18s ease, outline-color .18s ease, box-shadow .18s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 26px rgba(192,192,192,.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,.4)';
              }}
            >
              {/* Logo Box */}
              <div 
                className="rounded-lg flex items-center justify-center mb-3 overflow-hidden"
                style={{
                  background: 'linear-gradient(160deg, #1c1c1c, #2a2a2a)',
                  boxShadow: 'inset 0 1px 3px rgba(255,255,255,.2), 0 0 8px rgba(192,192,192,.4)',
                  aspectRatio: '1 / 1',

                }}
              >
                <img 
                  src={binghatiLogo} 
                  alt="Binghatti logo"
                  style={{
                    maxWidth: '85%',
                    maxHeight: '85%',
                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.5))'
                  }}
                />
              </div>
              <div className="font-semibold text-sm mb-2" style={{ letterSpacing: '.2px', background: 'linear-gradient(145deg, #f0f0f0, #c0c0c0)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Binghatti
              </div>
              <Link href="/projects?partner=Binghatti">
                <button 
                  className="border-none cursor-pointer font-semibold text-black text-xs transition-all duration-200"
                  style={{
                    background: 'linear-gradient(145deg, #f0f0f0, #c0c0c0 40%, #7d7d7d)',
                    padding: '10px 12px',
                    letterSpacing: '.2px',
                    borderRadius: '12px',
                    boxShadow: 'inset 0 1px 2px rgba(255,255,255,.4), 0 2px 6px rgba(0,0,0,.5), 0 0 12px rgba(192,192,192,0.6)',
                    backgroundSize: '200% 200%',
                    animation: 'shine 5s linear infinite'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'brightness(1.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'brightness(1)';
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'translateY(1px)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = 'translateY(0px)';
                  }}
                >
                  View Collection
                </button>
              </Link>
            </div>

            {/* Danube Properties */}
            <div 
              className="relative rounded-lg p-4 overflow-hidden"
              style={{
                background: '#1a1a1add',
                boxShadow: '0 6px 20px rgba(0,0,0,.4)',
                border: '1px solid rgba(255,255,255,.06)',
                transition: 'transform .18s ease, outline-color .18s ease, box-shadow .18s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 26px rgba(192,192,192,.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,.4)';
              }}
            >
              <div 
                className="rounded-lg flex items-center justify-center mb-3 overflow-hidden"
                style={{
                  background: 'linear-gradient(160deg, #1c1c1c, #2a2a2a)',
                  boxShadow: 'inset 0 1px 3px rgba(255,255,255,.2), 0 0 8px rgba(192,192,192,.4)',
                  aspectRatio: '1 / 1',

                }}
              >
                <img 
                  src={danubeLogo} 
                  alt="Danube Properties logo"
                  style={{
                    maxWidth: '85%',
                    maxHeight: '85%',
                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.5))'
                  }}
                />
              </div>
              <div className="font-semibold text-sm mb-2" style={{ letterSpacing: '.2px', background: 'linear-gradient(145deg, #f0f0f0, #c0c0c0)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Danube Properties
              </div>
              <Link href="/projects?partner=Danube Properties">
                <button 
                  className="border-none cursor-pointer font-semibold text-black text-xs transition-all duration-200"
                  style={{
                    background: 'linear-gradient(145deg, #f0f0f0, #c0c0c0 40%, #7d7d7d)',
                    padding: '10px 12px',
                    letterSpacing: '.2px',
                    borderRadius: '12px',
                    boxShadow: 'inset 0 1px 2px rgba(255,255,255,.4), 0 2px 6px rgba(0,0,0,.5), 0 0 12px rgba(192,192,192,0.6)',
                    backgroundSize: '200% 200%',
                    animation: 'shine 5s linear infinite'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'brightness(1.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'brightness(1)';
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'translateY(1px)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = 'translateY(0px)';
                  }}
                >
                  View Collection
                </button>
              </Link>
            </div>

            {/* Ellington Properties */}
            <div 
              className="relative rounded-lg p-4 overflow-hidden"
              style={{
                background: '#1a1a1add',
                boxShadow: '0 6px 20px rgba(0,0,0,.4)',
                border: '1px solid rgba(255,255,255,.06)',
                transition: 'transform .18s ease, outline-color .18s ease, box-shadow .18s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 26px rgba(192,192,192,.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,.4)';
              }}
            >
              <div 
                className="rounded-lg flex items-center justify-center mb-3 overflow-hidden"
                style={{
                  background: 'linear-gradient(160deg, #1c1c1c, #2a2a2a)',
                  boxShadow: 'inset 0 1px 3px rgba(255,255,255,.2), 0 0 8px rgba(192,192,192,.4)',
                  aspectRatio: '1 / 1',

                }}
              >
                <img 
                  src={ellingtonLogo} 
                  alt="Ellington Properties logo"
                  style={{
                    maxWidth: '85%',
                    maxHeight: '85%',
                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.5))'
                  }}
                />
              </div>
              <div className="font-semibold text-sm mb-2" style={{ letterSpacing: '.2px', background: 'linear-gradient(145deg, #f0f0f0, #c0c0c0)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Ellington Properties
              </div>
              <Link href="/projects?partner=Ellington Properties">
                <button 
                  className="border-none cursor-pointer font-semibold text-black text-xs transition-all duration-200"
                  style={{
                    background: 'linear-gradient(145deg, #f0f0f0, #c0c0c0 40%, #7d7d7d)',
                    padding: '10px 12px',
                    letterSpacing: '.2px',
                    borderRadius: '12px',
                    boxShadow: 'inset 0 1px 2px rgba(255,255,255,.4), 0 2px 6px rgba(0,0,0,.5), 0 0 12px rgba(192,192,192,0.6)',
                    backgroundSize: '200% 200%',
                    animation: 'shine 5s linear infinite'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'brightness(1.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'brightness(1)';
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'translateY(1px)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = 'translateY(0px)';
                  }}
                >
                  View Collection
                </button>
              </Link>
            </div>

            {/* Emaar */}
            <div 
              className="relative rounded-lg p-4 overflow-hidden"
              style={{
                background: '#1a1a1add',
                boxShadow: '0 6px 20px rgba(0,0,0,.4)',
                border: '1px solid rgba(255,255,255,.06)',
                transition: 'transform .18s ease, outline-color .18s ease, box-shadow .18s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 26px rgba(192,192,192,.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,.4)';
              }}
            >
              <div className="absolute top-2 right-2 text-xs text-black rounded-full px-2 py-1 opacity-95"
                   style={{
                     background: 'linear-gradient(135deg, #f0f0f0, #c0c0c0)',
                     border: '1px solid #2a2a2a',
                     boxShadow: '0 0 6px rgba(192,192,192,0.7)'
                   }}>
                Premium
              </div>
              <div 
                className="rounded-lg flex items-center justify-center mb-3 overflow-hidden"
                style={{
                  background: 'linear-gradient(160deg, #1c1c1c, #2a2a2a)',
                  boxShadow: 'inset 0 1px 3px rgba(255,255,255,.2), 0 0 8px rgba(192,192,192,.4)',
                  aspectRatio: '1 / 1',

                }}
              >
                <img 
                  src={emaarLogo} 
                  alt="Emaar logo"
                  style={{
                    maxWidth: '85%',
                    maxHeight: '85%',
                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.5))'
                  }}
                />
              </div>
              <div className="font-semibold text-sm mb-2" style={{ letterSpacing: '.2px', background: 'linear-gradient(145deg, #f0f0f0, #c0c0c0)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Emaar
              </div>
              <Link href="/projects?partner=Emaar">
                <button 
                  className="border-none cursor-pointer font-semibold text-black text-xs transition-all duration-200"
                  style={{
                    background: 'linear-gradient(145deg, #f0f0f0, #c0c0c0 40%, #7d7d7d)',
                    padding: '10px 12px',
                    letterSpacing: '.2px',
                    borderRadius: '12px',
                    boxShadow: 'inset 0 1px 2px rgba(255,255,255,.4), 0 2px 6px rgba(0,0,0,.5), 0 0 12px rgba(192,192,192,0.6)',
                    backgroundSize: '200% 200%',
                    animation: 'shine 5s linear infinite'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'brightness(1.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'brightness(1)';
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'translateY(1px)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = 'translateY(0px)';
                  }}
                >
                  View Collection
                </button>
              </Link>
            </div>

            {/* Iman Developers */}
            <div 
              className="relative rounded-lg p-4 overflow-hidden"
              style={{
                background: '#1a1a1add',
                boxShadow: '0 6px 20px rgba(0,0,0,.4)',
                border: '1px solid rgba(255,255,255,.06)',
                transition: 'transform .18s ease, outline-color .18s ease, box-shadow .18s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 26px rgba(192,192,192,.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,.4)';
              }}
            >
              <div 
                className="rounded-lg flex items-center justify-center mb-3 overflow-hidden"
                style={{
                  background: 'linear-gradient(160deg, #1c1c1c, #2a2a2a)',
                  boxShadow: 'inset 0 1px 3px rgba(255,255,255,.2), 0 0 8px rgba(192,192,192,.4)',
                  aspectRatio: '1 / 1',

                }}
              >
                <img 
                  src={imanLogo} 
                  alt="IMAN Developers logo"
                  style={{
                    maxWidth: '85%',
                    maxHeight: '85%',
                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.5))'
                  }}
                />
              </div>
              <div className="font-semibold text-sm mb-2" style={{ letterSpacing: '.2px', background: 'linear-gradient(145deg, #f0f0f0, #c0c0c0)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                IMAN Developers
              </div>
              <Link href="/projects?partner=Iman Developers">
                <button 
                  className="border-none cursor-pointer font-semibold text-black text-xs transition-all duration-200"
                  style={{
                    background: 'linear-gradient(145deg, #f0f0f0, #c0c0c0 40%, #7d7d7d)',
                    padding: '10px 12px',
                    letterSpacing: '.2px',
                    borderRadius: '12px',
                    boxShadow: 'inset 0 1px 2px rgba(255,255,255,.4), 0 2px 6px rgba(0,0,0,.5), 0 0 12px rgba(192,192,192,0.6)',
                    backgroundSize: '200% 200%',
                    animation: 'shine 5s linear infinite'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'brightness(1.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'brightness(1)';
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'translateY(1px)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = 'translateY(0px)';
                  }}
                >
                  View Collection
                </button>
              </Link>
            </div>

            {/* Marquis */}
            <div 
              className="relative rounded-lg p-4 overflow-hidden"
              style={{
                background: '#1a1a1add',
                boxShadow: '0 6px 20px rgba(0,0,0,.4)',
                border: '1px solid rgba(255,255,255,.06)',
                transition: 'transform .18s ease, outline-color .18s ease, box-shadow .18s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 26px rgba(192,192,192,.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,.4)';
              }}
            >
              <div 
                className="rounded-lg flex items-center justify-center mb-3 overflow-hidden"
                style={{
                  background: 'linear-gradient(160deg, #1c1c1c, #2a2a2a)',
                  boxShadow: 'inset 0 1px 3px rgba(255,255,255,.2), 0 0 8px rgba(192,192,192,.4)',
                  aspectRatio: '1 / 1',

                }}
              >
                <img 
                  src={marquisLogo} 
                  alt="Marquis logo"
                  style={{
                    maxWidth: '85%',
                    maxHeight: '85%',
                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.5))'
                  }}
                />
              </div>
              <div className="font-semibold text-sm mb-2" style={{ letterSpacing: '.2px', background: 'linear-gradient(145deg, #f0f0f0, #c0c0c0)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Marquis
              </div>
              <Link href="/projects?partner=Marquis">
                <button 
                  className="border-none cursor-pointer font-semibold text-black text-xs transition-all duration-200"
                  style={{
                    background: 'linear-gradient(145deg, #f0f0f0, #c0c0c0 40%, #7d7d7d)',
                    padding: '10px 12px',
                    letterSpacing: '.2px',
                    borderRadius: '12px',
                    boxShadow: 'inset 0 1px 2px rgba(255,255,255,.4), 0 2px 6px rgba(0,0,0,.5), 0 0 12px rgba(192,192,192,0.6)',
                    backgroundSize: '200% 200%',
                    animation: 'shine 5s linear infinite'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'brightness(1.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'brightness(1)';
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'translateY(1px)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = 'translateY(0px)';
                  }}
                >
                  View Collection
                </button>
              </Link>
            </div>

            {/* Rabdan */}
            <div 
              className="relative rounded-lg p-4 overflow-hidden"
              style={{
                background: '#1a1a1add',
                boxShadow: '0 6px 20px rgba(0,0,0,.4)',
                border: '1px solid rgba(255,255,255,.06)',
                transition: 'transform .18s ease, outline-color .18s ease, box-shadow .18s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 26px rgba(192,192,192,.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,.4)';
              }}
            >
              <div 
                className="rounded-lg flex items-center justify-center mb-3 overflow-hidden"
                style={{
                  background: 'linear-gradient(160deg, #1c1c1c, #2a2a2a)',
                  boxShadow: 'inset 0 1px 3px rgba(255,255,255,.2), 0 0 8px rgba(192,192,192,.4)',
                  aspectRatio: '1 / 1',

                }}
              >
                <img 
                  src={rabdanLogo} 
                  alt="Rabdan logo"
                  style={{
                    maxWidth: '85%',
                    maxHeight: '85%',
                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.5))'
                  }}
                />
              </div>
              <div className="font-semibold text-sm mb-2" style={{ letterSpacing: '.2px', background: 'linear-gradient(145deg, #f0f0f0, #c0c0c0)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Rabdan
              </div>
              <Link href="/projects?partner=Rabdan Developments">
                <button 
                  className="border-none cursor-pointer font-semibold text-black text-xs transition-all duration-200"
                  style={{
                    background: 'linear-gradient(145deg, #f0f0f0, #c0c0c0 40%, #7d7d7d)',
                    padding: '10px 12px',
                    letterSpacing: '.2px',
                    borderRadius: '12px',
                    boxShadow: 'inset 0 1px 2px rgba(255,255,255,.4), 0 2px 6px rgba(0,0,0,.5), 0 0 12px rgba(192,192,192,0.6)',
                    backgroundSize: '200% 200%',
                    animation: 'shine 5s linear infinite'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'brightness(1.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'brightness(1)';
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'translateY(1px)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = 'translateY(0px)';
                  }}
                >
                  View Collection
                </button>
              </Link>
            </div>

            {/* Tiger Properties */}
            <div 
              className="relative rounded-lg p-4 overflow-hidden"
              style={{
                background: '#1a1a1add',
                boxShadow: '0 6px 20px rgba(0,0,0,.4)',
                border: '1px solid rgba(255,255,255,.06)',
                transition: 'transform .18s ease, outline-color .18s ease, box-shadow .18s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 26px rgba(192,192,192,.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,.4)';
              }}
            >
              <div 
                className="rounded-lg flex items-center justify-center mb-3 overflow-hidden"
                style={{
                  background: 'linear-gradient(160deg, #1c1c1c, #2a2a2a)',
                  boxShadow: 'inset 0 1px 3px rgba(255,255,255,.2), 0 0 8px rgba(192,192,192,.4)',
                  aspectRatio: '1 / 1',

                }}
              >
                <img 
                  src={tigerLogo} 
                  alt="Tiger Properties logo"
                  style={{
                    maxWidth: '85%',
                    maxHeight: '85%',
                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.5))'
                  }}
                />
              </div>
              <div className="font-semibold text-sm mb-2" style={{ letterSpacing: '.2px', background: 'linear-gradient(145deg, #f0f0f0, #c0c0c0)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Tiger Properties
              </div>
              <Link href="/projects?partner=Tiger Properties AE">
                <button 
                  className="border-none cursor-pointer font-semibold text-black text-xs transition-all duration-200"
                  style={{
                    background: 'linear-gradient(145deg, #f0f0f0, #c0c0c0 40%, #7d7d7d)',
                    padding: '10px 12px',
                    letterSpacing: '.2px',
                    borderRadius: '12px',
                    boxShadow: 'inset 0 1px 2px rgba(255,255,255,.4), 0 2px 6px rgba(0,0,0,.5), 0 0 12px rgba(192,192,192,0.6)',
                    backgroundSize: '200% 200%',
                    animation: 'shine 5s linear infinite'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'brightness(1.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'brightness(1)';
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'translateY(1px)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = 'translateY(0px)';
                  }}
                >
                  View Collection
                </button>
              </Link>
            </div>

          </motion.div>
        </div>
      </section>

    </div>
  );
}
