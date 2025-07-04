import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingCart, TrendingUp, Search, FileText, Shield, Users, ArrowUp, ArrowDown } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect } from "react";

export default function AnimatedSidebar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const options = [
    {
      type: "BUY",
      subtitle: "Investment Acquisition",
      gradient: "from-gray-800 to-gray-900",
      icon: ShoppingCart,
      features: [
        { icon: Search, text: "Property Search & Analysis" },
        { icon: FileText, text: "Legal Due Diligence" },
        { icon: Shield, text: "Investment Protection" }
      ]
    },
    {
      type: "SELL",
      subtitle: "Investment Optimization", 
      gradient: "from-gray-700 to-black",
      icon: TrendingUp,
      features: [
        { icon: TrendingUp, text: "Market Valuation" },
        { icon: Users, text: "Buyer Matching" },
        { icon: FileText, text: "Transaction Management" }
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % options.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  const currentOption = options[currentIndex];

  return (
    <div className="w-80 relative">
      <motion.div
        className="property-card bg-white rounded-2xl overflow-hidden shadow-lg group relative h-80 sticky top-24"
        whileHover={{ y: -8 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="relative h-full overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${currentOption.gradient}`}></div>
            <div className="p-6 relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <motion.div 
                      className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center mr-4"
                      whileHover={{ scale: 1.1, rotate: currentIndex === 0 ? 5 : -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <currentOption.icon className="w-6 h-6 gold" />
                    </motion.div>
                    <div>
                      <h3 className="text-white text-2xl font-bold">{currentOption.type}</h3>
                      <p className="text-gray-300 text-sm">{currentOption.subtitle}</p>
                    </div>
                  </div>
                  
                  {/* Navigation indicators */}
                  <div className="flex flex-col space-y-1">
                    <motion.button
                      onClick={() => setCurrentIndex((prev) => (prev - 1 + options.length) % options.length)}
                      className="w-6 h-6 bg-gold/20 rounded flex items-center justify-center hover:bg-gold/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ArrowUp className="w-3 h-3 gold" />
                    </motion.button>
                    <motion.button
                      onClick={() => setCurrentIndex((prev) => (prev + 1) % options.length)}
                      className="w-6 h-6 bg-gold/20 rounded flex items-center justify-center hover:bg-gold/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ArrowDown className="w-3 h-3 gold" />
                    </motion.button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {currentOption.features.map((feature, index) => (
                    <motion.div 
                      key={`${currentIndex}-${index}`}
                      className="flex items-center text-gray-300 text-sm"
                      initial={{ opacity: 0, x: currentIndex === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <feature.icon className="w-4 h-4 mr-3 gold" />
                      <span>{feature.text}</span>
                    </motion.div>
                  ))}
                </div>
                
                {/* Progress indicator */}
                <div className="flex justify-center mt-4 space-x-2">
                  {options.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentIndex ? 'bg-gold' : 'bg-gold/30'
                      }`}
                      animate={{ scale: index === currentIndex ? 1.2 : 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </div>
              </div>
              
              <Link href="/contact">
                <Button className="w-full bg-gold text-black hover:bg-yellow-500 font-semibold mt-4">
                  Start {currentOption.type === "BUY" ? "Buying" : "Selling"} Process
                </Button>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}