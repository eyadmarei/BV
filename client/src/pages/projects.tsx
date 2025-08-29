import { useState, useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { Partner } from '@shared/schema';

// Removed logo imports - now using partner logos from database only

const propertyTypes = ['All', 'Villa', 'Townhouse', 'Apartment'];

export default function Projects() {
  const [location] = useLocation();
  const [selectedPartner, setSelectedPartner] = useState('All Partners');
  const [selectedType, setSelectedType] = useState('All');
  const [partnerSearch, setPartnerSearch] = useState('');

  // Get partner filter from URL query params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const partnerParam = urlParams.get('partner');
    if (partnerParam) {
      const decodedPartner = decodeURIComponent(partnerParam);
      setSelectedPartner(decodedPartner);
    }
  }, []);

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['/api/properties']
  });

  const { data: partnersFromAPI = [], isLoading: partnersLoading } = useQuery<Partner[]>({
    queryKey: ['/api/partners']
  });

  // Combine API partners with "All Partners" option and map logos
  const partners = [
    { name: 'All Partners', logo: null, description: 'View all partner properties', established: null, totalProperties: null },
    ...partnersFromAPI // Use partners from database as-is
  ];

  // Filter partners based on search term
  const filteredPartners = partners.filter(partner => 
    partner.name.toLowerCase().includes(partnerSearch.toLowerCase()) ||
    partner.description.toLowerCase().includes(partnerSearch.toLowerCase())
  );

  // Filter properties based on selected partner and type
  const filteredProperties = (properties as any[]).filter((property: any) => {
    const typeMatch = selectedType === 'All' || property.type === selectedType.toLowerCase();
    const partnerMatch = selectedPartner === 'All Partners' || property.partner === selectedPartner;
    return typeMatch && partnerMatch;
  });


  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Partner Projects
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore exclusive properties from Dubai's leading developers and our trusted partners
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partner Filter */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-xl font-semibold text-black mb-4 md:mb-0">Filter by Partner</h2>
            
            {/* Search Input */}
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search partners..."
                value={partnerSearch}
                onChange={(e) => setPartnerSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all"
              />
            </div>
          </div>
          
          {/* Simple Partner Cards */}
          <div className="flex flex-wrap gap-3">
            {filteredPartners.map((partner) => (
              <motion.button
                key={partner.name}
                className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
                  selectedPartner === partner.name
                    ? 'bg-black text-white shadow-lg'
                    : 'bg-gray-50 hover:bg-gray-100 text-black border border-gray-200'
                }`}
                onClick={() => setSelectedPartner(partner.name)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {partner.name}
              </motion.button>
            ))}
          </div>
          
          {/* No Results Message */}
          {filteredPartners.length === 0 && partnerSearch && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <p className="text-gray-500 text-sm">
                No partners found matching "{partnerSearch}"
              </p>
              <button
                onClick={() => setPartnerSearch("")}
                className="mt-2 text-black underline hover:text-gray-700 transition-colors text-sm"
              >
                Clear search
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Property Type Filter */}
      <section className="py-6 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-lg font-semibold text-black mb-4">Property Type</h3>
          <div className="flex flex-wrap gap-3">
            {propertyTypes.map((type) => (
              <button
                key={type}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  selectedType === type
                    ? 'bg-black text-white'
                    : 'bg-white text-black border border-gray-300 hover:border-black'
                }`}
                onClick={() => setSelectedType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>


      {/* Properties Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-black">
              {selectedPartner !== 'All Partners' ? `${selectedPartner} ` : ''}
              {selectedType !== 'All' ? `${selectedType}s` : 'Properties'}
            </h3>
            <div className="text-gray-600">
              {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-xl h-80 animate-pulse"></div>
              ))}
            </div>
          ) : filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property: any, index: number) => (
                <motion.div
                  key={property.id}
                  className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <div className="h-48 bg-gray-100 relative overflow-hidden">
                    {property.imageUrl ? (
                      <img 
                        src={property.imageUrl} 
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl mb-2">
                            {property.type === 'villa' ? '🏡' : 
                             property.type === 'townhouse' ? '🏘️' : 
                             property.type === 'apartment' ? '🏢' : '🏠'}
                          </div>
                          <span className="text-gray-600 text-sm font-medium">
                            {property.type?.charAt(0).toUpperCase() + property.type?.slice(1)} Image
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                        {property.type || 'Property'}
                      </span>
                    </div>
                    {property.featured && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          ⭐ Featured
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="mb-3">
                      <h4 className="text-lg font-bold text-black mb-1 line-clamp-1">{property.title || 'Property Title'}</h4>
                      {property.partner && (
                        <div className="text-xs text-gray-500 font-medium">
                          by {property.partner}
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {property.description || 'Modern property development with premium amenities and excellent location.'}
                    </p>
                    
                    <div className="pt-3 border-t border-gray-100 space-y-3">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          📍 {property.location || 'Dubai'}
                        </span>
                        {property.price && (
                          <span className="flex items-center gap-1">
                            💰 {property.price}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Link href="/contact">
                          <button className="bg-black text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-gray-800 transition-colors flex-1">
                            Contact Us
                          </button>
                        </Link>
                        {property.brochureUrl && (
                          <a 
                            href={property.brochureUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-white border border-black text-black px-3 py-1 rounded-full text-xs font-medium hover:bg-gray-50 transition-colors flex-1 text-center"
                          >
                            Download Brochure
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🏢</div>
              <h3 className="text-xl font-semibold text-black mb-2">No Properties Found</h3>
              <p className="text-gray-600">
                No properties match your current filters. Try adjusting your selection.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}