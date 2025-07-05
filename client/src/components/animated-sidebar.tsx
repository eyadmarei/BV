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

  // Removed auto-cycle - overlay only toggles on click

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
                console.log('Sidebar clicked, toggling overlay');
                setActiveIndex(index);
                // Toggle overlay - show if hidden, hide if shown
                setShowOverlay(!showOverlay);
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

      {/* Horizontal Overlay Over Dubai Properties Header */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            className="fixed left-0 top-24 right-0 h-80 z-30 pointer-events-none overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-black/70 via-gray-800/50 to-gray-600/30 backdrop-blur-sm"
              initial={{ x: "-100%" }}
              animate={{ 
                x: "0%",
                transition: {
                  duration: 4.0,
                  ease: "easeInOut"
                }
              }}
              exit={{ x: "100%" }}
              transition={{ duration: 1.0 }}
            >
              <div className="h-full flex items-center justify-center px-8">
                <motion.div
                  className="bg-black/60 backdrop-blur-md rounded-3xl p-12 border border-white/20 shadow-2xl max-w-6xl w-full h-full"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  {/* Single Option Layout - Only Active Option */}
                  <div className="flex items-center justify-between h-full">
                    <motion.div
                      className="flex-1 px-6 h-full flex flex-col justify-center"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {/* Header */}
                      <div className="flex items-center mb-3">
                        <motion.div 
                          className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mr-4 backdrop-blur-sm border border-white/30"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                        >
                          <IconComponent className="w-5 h-5 text-white" />
                        </motion.div>
                        <div>
                          <h3 className="text-white text-2xl font-bold drop-shadow-lg">{currentOption.type}</h3>
                          <p className="text-gray-300 text-sm">{currentOption.subtitle}</p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-200 text-sm leading-relaxed mb-4">
                        {currentOption.description}
                      </p>
                      
                      {/* All Features */}
                      <div className="space-y-2 mb-4">
                        {currentOption.features.map((feature, featureIndex) => {
                          const FeatureIcon = feature.icon;
                          return (
                            <motion.div 
                              key={featureIndex}
                              className="flex items-center text-gray-200 text-sm"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.6 + featureIndex * 0.2 }}
                            >
                              <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center mr-3 backdrop-blur-sm border border-white/30">
                                <FeatureIcon className="w-3 h-3 text-white" />
                              </div>
                              <span className="font-medium drop-shadow-sm">{feature.text}</span>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                    
                    {/* Action Button */}
                    <motion.div
                      className="px-4 pointer-events-auto"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.0 }}
                    >
                      <Link href="/contact">
                        <Button className="bg-white/90 text-black hover:bg-white font-bold backdrop-blur-sm border border-white/30 shadow-lg px-4 py-2 rounded-xl text-sm">
                          Get Started
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}