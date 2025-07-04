import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Building, FileText, CreditCard, Check } from "lucide-react";
import type { Service } from "@shared/schema";

interface ServiceCardProps {
  service: Service;
  delay?: number;
}

const iconMap = {
  building: Building,
  passport: FileText,
  university: CreditCard,
};

export default function ServiceCard({ service, delay = 0 }: ServiceCardProps) {
  const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Building;

  return (
    <motion.div
      className="service-card bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5 }}
    >
      <div className="w-16 h-16 bg-gold/10 rounded-lg flex items-center justify-center mb-6">
        <IconComponent className="w-8 h-8 gold" />
      </div>
      <h3 className="text-xl font-bold text-black mb-4">{service.title}</h3>
      <p className="text-gray-600 mb-6 leading-relaxed">
        {service.description}
      </p>
      <ul className="space-y-2 mb-6 text-sm text-gray-600">
        {service.features?.map((feature, index) => (
          <li key={index} className="flex items-center space-x-2">
            <Check className="w-4 h-4 gold" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button className="w-full bg-gray-900 text-white hover:bg-black font-semibold">
        Learn More
      </Button>
    </motion.div>
  );
}
