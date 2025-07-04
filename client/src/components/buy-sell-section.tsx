import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Search, FileText, Shield } from "lucide-react";
import { Link } from "wouter";

export default function BuySellSection() {
  const buyServices = [
    {
      icon: Search,
      title: "Property Search",
      description: "Find your perfect investment property with our expert market analysis"
    },
    {
      icon: FileText,
      title: "Legal Due Diligence",
      description: "Comprehensive legal review and documentation for secure transactions"
    },
    {
      icon: Shield,
      title: "Investment Protection",
      description: "Safeguard your investment with proper insurance and legal structures"
    }
  ];

  const sellServices = [
    {
      icon: TrendingUp,
      title: "Market Valuation",
      description: "Professional property appraisal to maximize your return on investment"
    },
    {
      icon: Search,
      title: "Buyer Matching",
      description: "Connect with qualified buyers through our extensive network"
    },
    {
      icon: FileText,
      title: "Transaction Management",
      description: "End-to-end support throughout the entire selling process"
    }
  ];

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Buy Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-gray-50 border-none h-full">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-black">BUY</h3>
                    <p className="text-gray-600">Investment Acquisition</p>
                  </div>
                </div>
                
                <div className="space-y-6 mb-8">
                  {buyServices.map((service, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                        <service.icon className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-black mb-1">{service.title}</h4>
                        <p className="text-gray-600 text-sm">{service.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <Link href="/contact">
                  <Button className="w-full bg-green-600 text-white hover:bg-green-700 font-semibold">
                    Start Buying Process
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sell Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-gray-50 border-none h-full">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <TrendingDown className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-black">SELL</h3>
                    <p className="text-gray-600">Investment Optimization</p>
                  </div>
                </div>
                
                <div className="space-y-6 mb-8">
                  {sellServices.map((service, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                        <service.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-black mb-1">{service.title}</h4>
                        <p className="text-gray-600 text-sm">{service.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <Link href="/contact">
                  <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 font-semibold">
                    Start Selling Process
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}