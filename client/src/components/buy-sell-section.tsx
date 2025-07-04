import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Link } from "wouter";

export default function BuySellSection() {

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-black mb-4">Buy & Sell with Confidence</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Whether you're acquiring your dream property or maximizing your investment returns, 
            we provide expert guidance every step of the way.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Buy Section */}
          <motion.div
            className="property-card bg-white rounded-2xl overflow-hidden shadow-lg group relative h-80"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ y: -8 }}
          >
            <div className="relative h-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-wood/90 to-charcoal/90"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center mr-3">
                    <TrendingUp className="w-6 h-6 gold" />
                  </div>
                  <div>
                    <h3 className="text-white text-2xl font-bold">BUY</h3>
                    <p className="text-white/90 text-sm">Investment Acquisition</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-white/90 text-sm">
                    <div className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></div>
                    <span>Property Search & Analysis</span>
                  </div>
                  <div className="flex items-center text-white/90 text-sm">
                    <div className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></div>
                    <span>Legal Due Diligence</span>
                  </div>
                  <div className="flex items-center text-white/90 text-sm">
                    <div className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></div>
                    <span>Investment Protection</span>
                  </div>
                </div>
                
                <Link href="/contact">
                  <Button className="bg-gold text-black hover:bg-yellow-500 font-semibold">
                    Start Buying Process
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Sell Section */}
          <motion.div
            className="property-card bg-white rounded-2xl overflow-hidden shadow-lg group relative h-80"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ y: -8 }}
          >
            <div className="relative h-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-charcoal/90 to-black/90"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center mr-3">
                    <TrendingDown className="w-6 h-6 gold" />
                  </div>
                  <div>
                    <h3 className="text-white text-2xl font-bold">SELL</h3>
                    <p className="text-white/90 text-sm">Investment Optimization</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-white/90 text-sm">
                    <div className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></div>
                    <span>Market Valuation</span>
                  </div>
                  <div className="flex items-center text-white/90 text-sm">
                    <div className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></div>
                    <span>Buyer Matching</span>
                  </div>
                  <div className="flex items-center text-white/90 text-sm">
                    <div className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></div>
                    <span>Transaction Management</span>
                  </div>
                </div>
                
                <Link href="/contact">
                  <Button className="bg-gold text-black hover:bg-yellow-500 font-semibold">
                    Start Selling Process
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}