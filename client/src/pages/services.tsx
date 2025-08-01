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

        {/* All Services Expanded */}
        <div className="space-y-12">
          {serviceCategories.map((category, categoryIndex) => {
            const CategoryIcon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* Category Header */}
                <div className="bg-gradient-to-r from-gray-50 to-white p-6 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="bg-black/5 p-2 rounded-lg">
                      <CategoryIcon className="w-5 h-5 text-gray-700" />
                    </div>
                    <h2 className="text-xl font-bold text-black">{category.label}</h2>
                  </div>
                  <p className="text-gray-600 text-sm mt-2 ml-10">{category.description}</p>
                </div>

                {/* Category Content */}
                <div className="p-6">
                  <div className="space-y-6">
                    {category.subcategories.map((subcategory, subIndex) => (
                      <div key={subIndex}>
                        <h3 className="text-lg font-semibold text-black mb-3">{subcategory.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{subcategory.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {subcategory.services.map((service, serviceIndex) => {
                            const ServiceIcon = service.icon;
                            return (
                              <motion.div
                                key={serviceIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: serviceIndex * 0.02 }}
                                className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors duration-200 cursor-pointer group"
                              >
                                <div className="flex items-start space-x-2">
                                  <div className="bg-white p-1.5 rounded-md group-hover:bg-black group-hover:text-white transition-all duration-200 flex-shrink-0 mt-0.5">
                                    <ServiceIcon className="w-3 h-3" />
                                  </div>
                                  <span className="text-xs font-medium text-gray-800 leading-tight">{service.name}</span>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
