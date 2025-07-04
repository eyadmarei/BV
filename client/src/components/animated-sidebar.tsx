import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingCart, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect } from "react";

export default function AnimatedSidebar() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const options = [
    {
      type: "BUY",
      icon: ShoppingCart,
      color: "from-gray-800 to-gray-900"
    },
    {
      type: "SELL", 
      icon: TrendingUp,
      color: "from-gray-700 to-black"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % options.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-20 flex flex-col space-y-4 sticky top-24">
      {options.map((option, index) => (
        <motion.div
          key={option.type}
          className={`relative h-32 w-full rounded-2xl overflow-hidden cursor-pointer ${
            index === activeIndex ? 'shadow-2xl' : 'shadow-lg'
          }`}
          onClick={() => setActiveIndex(index)}
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
              <option.icon className="w-6 h-6 text-gold" />
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
      ))}
      
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
  );
}