import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';

// Import partner logos
import binghatiLogo from '@assets/binghate_1754074726263.png';
import danubeLogo from '@assets/danube_1754074726264.png';
import ellingtonLogo from '@assets/download_1754074726265.png';
import emaarLogo from '@assets/emar_1754074726266.png';
import imanLogo from '@assets/iman_1754074726267.png';
import marquisLogo from '@assets/mareques_1754074726267.png';
import rabdanLogo from '@assets/Rabdan_1754074726268.png';
import tigerLogo from '@assets/tiger_1754074726270.png';

const partners = [
  { name: 'All Partners', logo: null },
  { name: 'Binghatti', logo: binghatiLogo },
  { name: 'Danube Properties', logo: danubeLogo },
  { name: 'Ellington Properties', logo: ellingtonLogo },
  { name: 'Emaar', logo: emaarLogo },
  { name: 'Iman Developers', logo: imanLogo },
  { name: 'Marquis', logo: marquisLogo },
  { name: 'Rabdan Developments', logo: rabdanLogo },
  { name: 'Tiger Properties AE', logo: tigerLogo },
];

const propertyTypes = ['All', 'Villa', 'Townhouse', 'Apartment'];

export default function Projects() {
  const [location] = useLocation();
  const [selectedPartner, setSelectedPartner] = useState('All Partners');
  const [selectedType, setSelectedType] = useState('All');

  // Get partner filter from URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.split('?')[1] || '');
    const partnerParam = params.get('partner');
    if (partnerParam) {
      setSelectedPartner(partnerParam);
    }
  }, [location]);

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['/api/properties']
  });

  // Filter properties based on selected partner and type
  const filteredProperties = (properties as any[]).filter((property: any) => {
    const typeMatch = selectedType === 'All' || property.type === selectedType.toLowerCase();
    // For now, we'll show all properties since we don't have partner-specific data yet
    // In future, you can add partner field to properties and filter by it
    return typeMatch;
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
          <h2 className="text-xl font-semibold text-black mb-6">Filter by Partner</h2>
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
            {partners.map((partner) => (
              <motion.button
                key={partner.name}
                className={`flex flex-col items-center p-4 rounded-xl transition-all duration-300 ${
                  selectedPartner === partner.name
                    ? 'bg-black text-white shadow-lg'
                    : 'bg-gray-50 hover:bg-gray-100 text-black'
                }`}
                onClick={() => setSelectedPartner(partner.name)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {partner.logo ? (
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="h-12 w-auto object-contain mb-2"
                  />
                ) : (
                  <div className="h-12 w-12 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                    <span className="text-xs font-bold">ALL</span>
                  </div>
                )}
                <span className="text-xs font-medium text-center">{partner.name}</span>
              </motion.button>
            ))}
          </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property: any, index: number) => (
                <motion.div
                  key={property.id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="h-48 bg-gray-200 relative overflow-hidden">
                    {property.image ? (
                      <img 
                        src={property.image} 
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                        <span className="text-gray-600 font-semibold">Property Image</span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-medium capitalize">
                        {property.type}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-black mb-2">{property.title}</h4>
                    <p className="text-gray-600 mb-4">{property.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-black">{property.price}</span>
                      <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                        View Details
                      </button>
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