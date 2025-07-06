import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingCart, TrendingUp, Search, FileText, Shield, Users } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect } from "react";

export default function AnimatedSidebar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  
  const options = [
    {
      type: "BUY",
      subtitle: "Investment Acquisition",
      description: "Complete property acquisition support with expert guidance through every step of the buying process in Dubai's dynamic real estate market.",
      icon: ShoppingCart,
      color: "from-gray-800 to-gray-900",
      features: [
        { icon: Search, text: "Property Search & Market Analysis" },
        { icon: FileText, text: "Legal Due Diligence & Documentation" },
        { icon: Shield, text: "Investment Protection & Insurance" }
      ]
    },
    {
      type: "SELL", 
      subtitle: "Investment Optimization",
      description: "Maximize your property returns with strategic selling support, market positioning, and comprehensive transaction management services.",
      icon: TrendingUp,
      color: "from-gray-700 to-black",
      features: [
        { icon: TrendingUp, text: "Market Valuation & Pricing Strategy" },
        { icon: Users, text: "Qualified Buyer Matching" },
        { icon: FileText, text: "Transaction Management & Closing" }
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % options.length);
      setShowOverlay(true);
    }, 12000);
    
    return () => clearInterval(interval);
  }, []);

  const currentOption = options[activeIndex];
  const IconComponent = currentOption.icon;

  return (
    <div className="relative">
      {/* Compact Sidebar */}
      <div className="w-20 flex flex-col space-y-4 sticky top-24 z-20">
        {options.map((option, index) => {
          const OptionIcon = option.icon;
          return (
            <motion.div
              key={option.type}
              className={`relative h-32 w-full rounded-2xl overflow-hidden cursor-pointer ${
                index === activeIndex ? 'shadow-2xl' : 'shadow-lg'
              }`}
              onClick={() => {
                console.log('Sidebar clicked, showing overlay');
                setActiveIndex(index);
                setShowOverlay(true);
              }}
              whileHover={{ scale: 1.05 }}
              animate={{ 
                scale: index === activeIndex ? 1.1 : 1,
                y: index === activeIndex ? -8 : 0
              }}
              transition={{ duration: 0.5 }}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${option.color}`}></div>
              
              {/* Highlight overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-gold/20 to-gold/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: index === activeIndex ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-4">
                <motion.div
                  className="w-8 h-8 flex items-center justify-center mb-2"
                  animate={{ 
                    rotate: index === activeIndex ? 360 : 0,
                    scale: index === activeIndex ? 1.2 : 1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <OptionIcon className="w-6 h-6 text-gold" />
                </motion.div>
                
                <motion.h3
                  className="text-white text-sm font-bold text-center"
                  animate={{ 
                    scale: index === activeIndex ? 1.1 : 1,
                    color: index === activeIndex ? "#FFD700" : "#FFFFFF"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {option.type}
                </motion.h3>
              </div>
              
              {/* Active indicator */}
              <motion.div
                className="absolute right-2 top-2 w-2 h-2 bg-gold rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: index === activeIndex ? 1 : 0,
                  opacity: index === activeIndex ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          );
        })}
        
        {/* Action Button */}
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link href="/contact">
            <Button className="w-full bg-gold text-black hover:bg-yellow-500 font-semibold text-xs py-2">
              START
            </Button>
          </Link>
        </motion.div>
      </div>


    </div>
  );
}