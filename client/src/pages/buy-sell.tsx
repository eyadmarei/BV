import { motion } from "framer-motion";

export default function BuySell() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Page Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Buy & Sell Properties
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover luxury properties in Dubai or maximize your investment value with our expert services
          </p>
        </motion.div>

        {/* Property Type Boxes */}
        <motion.div
          className="flex gap-8 justify-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Villas */}
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-lg w-80">
            <div className="text-center">
              <div className="w-16 h-16 bg-black/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-black text-xl font-bold mb-2">Villas</h3>
              <p className="text-gray-600 text-sm mb-6">Exclusive luxury villas with premium amenities and breathtaking views in prestigious locations.</p>
              <button className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors">
                View Collection
              </button>
            </div>
          </div>

          {/* Townhouses */}
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-lg w-80">
            <div className="text-center">
              <div className="w-16 h-16 bg-black/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-black text-xl font-bold mb-2">Townhouses</h3>
              <p className="text-gray-600 text-sm mb-6">Contemporary townhouses in prime locations offering the perfect blend of comfort and community.</p>
              <button className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors">
                View Collection
              </button>
            </div>
          </div>

          {/* Apartments */}
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-lg w-80">
            <div className="text-center">
              <div className="w-16 h-16 bg-black/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
              </div>
              <h3 className="text-black text-xl font-bold mb-2">Apartments</h3>
              <p className="text-gray-600 text-sm mb-6">Sophisticated apartments with modern design and world-class amenities in urban centers.</p>
              <button className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors">
                View Collection
              </button>
            </div>
          </div>
        </motion.div>

        {/* BUY/SELL Services */}
        <motion.div
          className="flex gap-8 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {/* BUY Services */}
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-lg w-96">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-black/10 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M7 19h9" />
                </svg>
              </div>
              <div>
                <h3 className="text-black text-2xl font-bold">BUY</h3>
                <p className="text-gray-600">Find Your Dream Property</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center text-black">
                <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                <span>Luxury Villas & Apartments</span>
              </div>
              <div className="flex items-center text-black">
                <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                <span>Legal Support & Documentation</span>
              </div>
              <div className="flex items-center text-black">
                <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                <span>Property Investment Guidance</span>
              </div>
              <div className="flex items-center text-black">
                <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                <span>Financing & Mortgage Support</span>
              </div>
            </div>
          </div>

          {/* SELL Services */}
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-lg w-96">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-black/10 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <h3 className="text-black text-2xl font-bold">SELL</h3>
                <p className="text-gray-600">Maximize Your Property Value</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center text-black">
                <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                <span>Market Analysis & Pricing</span>
              </div>
              <div className="flex items-center text-black">
                <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                <span>Professional Marketing</span>
              </div>
              <div className="flex items-center text-black">
                <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                <span>Property Staging & Photography</span>
              </div>
              <div className="flex items-center text-black">
                <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                <span>Negotiation & Closing Support</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}