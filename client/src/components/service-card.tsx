import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Building, FileText, CreditCard, Check, Users, UserCheck } from "lucide-react";
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
};

export default function ServiceCard({ service, delay = 0 }: ServiceCardProps) {
  const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Building;

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
