import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import { Home, Building, Settings, Calculator, Briefcase } from "lucide-react";
import type { Service } from "@shared/schema";

const serviceCategories = [
  {
    id: "property-transactions",
    label: "Property Transactions",
    icon: Home,
    subcategories: [
      {
        title: "Buying Properties",
        description: "Comprehensive property acquisition services covering all types of real estate investments with expert guidance.",
        services: ["Residential", "Commercial", "Off-Plan", "Consultancy"]
      },
      {
        title: "Selling Properties", 
        description: "Professional property sales services ensuring optimal market value and smooth transaction processes.",
        services: ["Residential", "Commercial", "Off-Plan", "Consultancy"]
      }
    ]
  },
  {
    id: "property-management",
    label: "Property Management",
    icon: Settings,
    subcategories: [
      {
        title: "Property Management Supervision",
        description: "Complete property oversight services with free consultations across all management aspects.",
        services: ["Property Management Free Consultation", "Property Evaluation Free Consultation", "Inspection and Snagging Services", "Industrial Services", "Relocation Services", "Specialized Consultation", "Commercial Property", "Interior Design & Project Execution", "Conveyancing"]
      }
    ]
  },
  {
    id: "financing",
    label: "Financing Solutions",
    icon: Calculator,
    subcategories: [
      {
        title: "Mortgage Advisory",
        description: "Expert mortgage guidance and financing solutions for all property investment scenarios.",
        services: ["Residential Mortgages", "Commercial Mortgages", "Non-Resident Mortgages", "Financing for Under Construction Properties", "Mortgage Financing", "Shariah Financing Solutions"]
      }
    ]
  },
  {
    id: "business-support",
    label: "Business Support",
    icon: Briefcase,
    subcategories: [
      {
        title: "Business and Investment Support",
        description: "Comprehensive business setup and investment assistance including immigration services for property investors.",
        services: ["Business Set Up", "Financial Services", "Immigration Service Assistance (Golden Visa)"]
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
        <div className="bg-white rounded-lg shadow-sm mb-8 overflow-hidden">
          <div className="flex flex-wrap border-b border-gray-200">
            {serviceCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors duration-200 border-b-2 ${
                    activeTab === category.id
                      ? 'border-black text-black bg-gray-50'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          {activeCategory?.subcategories.map((subcategory, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h3 className="text-2xl font-bold text-black mb-4">{subcategory.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{subcategory.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subcategory.services.map((service, serviceIndex) => (
                  <motion.div
                    key={serviceIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: serviceIndex * 0.05 }}
                    className="bg-gray-50 rounded-lg p-4 hover:bg-gold/10 transition-colors duration-200 cursor-pointer group"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-black rounded-full group-hover:bg-gold transition-colors duration-200"></div>
                      <span className="text-sm font-medium text-gray-800">{service}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
