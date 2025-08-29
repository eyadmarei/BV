import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Link } from "wouter";
import type { Partner } from "@shared/schema";

// Removed hardcoded logoMap - now using logos from database only

export default function Partners() {
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch partners from API
  const { data: partnersFromAPI = [], isLoading } = useQuery<Partner[]>({
    queryKey: ['/api/partners'],
  });

  // Use partners from database as-is
  const partners = partnersFromAPI;

  // Filter partners based on search
  const filteredPartners = partners.filter(partner => 
    partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading partners...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Partners</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Partnering with Dubai's most prestigious developers to bring you exceptional real estate opportunities
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          className="max-w-md mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search partners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all"
            />
          </div>
        </motion.div>

        {/* Partners Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {filteredPartners.map((partner, index) => (
            <motion.div
              key={partner.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
            >
              {/* Logo Section */}
              <div className="h-32 bg-gray-50 flex items-center justify-center p-4">
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-500 font-semibold text-sm">
                      {partner.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-2">{partner.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{partner.description}</p>
                
                {/* Partner Info */}
                <div className="space-y-2 mb-4">
                  {partner.established && (
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Established:</span>
                      <span className="font-medium">{partner.established}</span>
                    </div>
                  )}
                  {partner.totalProperties && (
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Properties:</span>
                      <span className="font-medium">{partner.totalProperties}+</span>
                    </div>
                  )}
                </div>

                {/* View Properties Button */}
                <Link href={`/projects?partner=${encodeURIComponent(partner.name)}`}>
                  <button className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium">
                    View Properties
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredPartners.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-500 text-lg">No partners found matching your search.</p>
          </motion.div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-black text-white py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Invest?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Explore premium properties from Dubai's top developers
            </p>
            <Link href="/projects">
              <button className="bg-white text-black px-8 py-3 rounded-md hover:bg-gray-100 transition-colors font-semibold">
                Browse All Properties
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}