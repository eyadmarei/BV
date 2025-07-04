import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-sm font-semibold tracking-wide uppercase gold">
            Exclusive
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-black mt-4 mb-6">
            LUXURY<br/>
            <span className="text-charcoal">PROPERTIES</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover exceptional properties and comprehensive business services with our premium real estate and corporate solutions.
          </p>
          <div className="mt-8">
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <span>TOMEN FRIEDMAN | CA DRE# 01750117</span>
              <span>•</span>
              <span>ISIDORA FRIEDMAN | CA DRE# 01937864</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
