import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Home, Building, Settings, Calculator, Briefcase, ArrowLeft,
  MapPin, Users, FileText, DollarSign, Shield, Wrench, 
  Clipboard, Phone, CreditCard, Building2, Globe, Award
} from "lucide-react";
import type { Service } from "@shared/schema";

const serviceCategories = [
  {
    id: "property-transactions",
    label: "Property Transactions",
    icon: Home,
    description: "Buy and sell properties with expert guidance across all market segments",
    subcategories: [
      {
        title: "Buying Properties",
        description: "Comprehensive property acquisition services covering all types of real estate investments with expert guidance.",
        services: [
          { name: "Residential", icon: Home },
          { name: "Commercial", icon: Building2 },
          { name: "Off-Plan", icon: MapPin },
          { name: "Consultancy", icon: Users }
        ]
      },
      {
        title: "Selling Properties", 
        description: "Professional property sales services ensuring optimal market value and smooth transaction processes.",
        services: [
          { name: "Residential", icon: Home },
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
          { name: "Industrial Services", icon: Building },
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
          { name: "Residential Mortgages", icon: Home },
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

export default function Services() {
  const [activeTab, setActiveTab] = useState("property-transactions");

  const activeCategory = serviceCategories.find(cat => cat.id === activeTab);

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Business Services
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Comprehensive solutions for your business and personal needs
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {serviceCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`group relative flex flex-col items-center p-6 rounded-xl transition-all duration-300 min-w-[160px] ${
                  activeTab === category.id
                    ? 'bg-gray-800 text-white shadow-lg'
                    : 'bg-gray-600 text-white hover:bg-gray-700'
                }`}
              >
                <div className="mb-3">
                  <IconComponent className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-bold text-center leading-tight">{category.label}</h3>
                <p className="text-xs text-center mt-1 opacity-80">
                  {category.label === "Property Transactions" ? "Buy & Sell" :
                   category.label === "Property Management" ? "Oversight" :
                   category.label === "Mortgage Advisory" ? "Financing" :
                   "Business Setup"}
                </p>
                <div className="bg-black/20 backdrop-blur-sm rounded-full px-4 py-2 mt-3">
                  <span className="text-xs font-medium">View Services</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {activeCategory && (
            <>
              {/* Category Header */}
              <div className="bg-gradient-to-r from-gray-50 to-white p-8 border-b border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-800 p-3 rounded-xl text-white">
                    <activeCategory.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-black">{activeCategory.label}</h2>
                    <p className="text-gray-600 mt-1">{activeCategory.description}</p>
                  </div>
                </div>
              </div>

              {/* Category Content */}
              <div className="p-8">
                <div className="space-y-8">
                  {activeCategory.subcategories.map((subcategory, subIndex) => (
                    <motion.div
                      key={subIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: subIndex * 0.1 }}
                    >
                      <h3 className="text-xl font-bold text-black mb-3">{subcategory.title}</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">{subcategory.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {subcategory.services.map((service, serviceIndex) => {
                          const ServiceIcon = service.icon;
                          return (
                            <motion.div
                              key={serviceIndex}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: serviceIndex * 0.05 }}
                              className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-all duration-200 cursor-pointer group hover:shadow-md"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="bg-white p-2 rounded-lg group-hover:bg-gray-800 group-hover:text-white transition-all duration-200">
                                  <ServiceIcon className="w-5 h-5" />
                                </div>
                                <span className="text-sm font-medium text-gray-800 group-hover:text-black">{service.name}</span>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
