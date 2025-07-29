import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Building, FileText, CreditCard, Check, Users, UserCheck, Home, Settings, Calculator, Briefcase, Shield, Search, Wrench, Factory, Truck, MessageSquare, Store, Palette, Scale } from "lucide-react";
import type { Service } from "@shared/schema";

interface ServiceCardProps {
  service: Service;
  delay?: number;
}

const iconMap = {
  building: Building,
  passport: FileText,
  university: CreditCard,
  management: Users,
  concierge: UserCheck,
  home: Home,
  settings: Settings,
  calculator: Calculator,
  briefcase: Briefcase,
};

const managementServiceIcons = {
  "Property Management Free Consultation": Shield,
  "Property Evaluation Free Consultation": Search,
  "Mortgage Advisory": Calculator,
  "Inspection and Snagging Services": Wrench,
  "Industrial Services": Factory,
  "Relocation Services": Truck,
  "Specialized Consultation": MessageSquare,
  "Commercial Property": Store,
  "Interior Design & Project Execution": Palette,
  "Conveyancing": Scale,
};

export default function ServiceCard({ service, delay = 0 }: ServiceCardProps) {
  const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Building;
  const isManagementService = service.title === "Property Management Supervision";

  if (isManagementService) {
    return (
      <motion.div
        className="service-card bg-white p-4 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl h-80 flex flex-col"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        whileHover={{ y: -3 }}
      >
        <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-3">
          <IconComponent className="w-6 h-6 gold" />
        </div>
        <h3 className="text-lg font-bold text-black mb-2">{service.title}</h3>
        <p className="text-gray-600 mb-3 leading-relaxed text-sm">
          {service.description}
        </p>
        <div className="grid grid-cols-2 gap-2 mb-4 flex-grow">
          {service.features?.map((feature, index) => {
            const ServiceIcon = managementServiceIcons[feature as keyof typeof managementServiceIcons] || Settings;
            return (
              <motion.div
                key={index}
                className="bg-gray-50 p-2 rounded-lg flex flex-col items-center text-center hover:bg-gold/10 transition-colors duration-200 cursor-pointer group"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: delay + (index * 0.1) }}
              >
                <motion.div
                  className="w-6 h-6 gold mb-1 group-hover:scale-110 transition-transform duration-200"
                  whileHover={{ 
                    scale: 1.2,
                    rotate: [0, -10, 10, 0],
                    filter: "brightness(1.2)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ServiceIcon className="w-full h-full" />
                </motion.div>
                <span className="text-xs text-gray-700 leading-tight">{feature}</span>
              </motion.div>
            );
          })}
        </div>
        <Button className="w-full bg-gray-900 text-white hover:bg-black font-semibold text-sm py-2 mt-auto">
          Learn More
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="service-card bg-white p-4 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl h-80 flex flex-col"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -3 }}
    >
      <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-3">
        <IconComponent className="w-6 h-6 gold" />
      </div>
      <h3 className="text-lg font-bold text-black mb-2">{service.title}</h3>
      <p className="text-gray-600 mb-3 leading-relaxed text-sm">
        {service.description}
      </p>
      <ul className="space-y-1 mb-4 text-xs text-gray-600 flex-grow">
        {service.features?.map((feature, index) => (
          <li key={index} className="flex items-center space-x-2">
            <Check className="w-3 h-3 gold" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button className="w-full bg-gray-900 text-white hover:bg-black font-semibold text-sm py-2 mt-auto">
        Learn More
      </Button>
    </motion.div>
  );
}
