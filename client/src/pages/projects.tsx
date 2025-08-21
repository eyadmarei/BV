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
  { name: 'All Partners', logo: null, description: 'View all partner properties', established: null, totalProperties: null },
  { name: 'Binghatti', logo: binghatiLogo, description: 'Innovative architectural designs with distinctive lifestyle developments', established: '2008', totalProperties: 25 },
  { name: 'Danube Properties', logo: danubeLogo, description: 'Affordable luxury properties with modern amenities and prime locations', established: '1993', totalProperties: 18 },
  { name: 'Ellington Properties', logo: ellingtonLogo, description: 'Contemporary design-focused developments in premium Dubai locations', established: '2014', totalProperties: 12 },
  { name: 'Emaar', logo: emaarLogo, description: 'World-class developments including Dubai Mall, Burj Khalifa and luxury communities', established: '1997', totalProperties: 45 },
  { name: 'Iman Developers', logo: imanLogo, description: 'Quality residential and commercial developments with modern infrastructure', established: '2010', totalProperties: 8 },
  { name: 'Marquis', logo: marquisLogo, description: 'Luxury residential projects with premium finishes and exclusive amenities', established: '2015', totalProperties: 6 },
  { name: 'Rabdan Developments', logo: rabdanLogo, description: 'Sustainable and innovative property developments in key Dubai areas', established: '2016', totalProperties: 10 },
  { name: 'Tiger Properties AE', logo: tigerLogo, description: 'Premium villa communities and luxury residential developments', established: '2012', totalProperties: 15 },
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

      {/* Partner Details Section */}
      {selectedPartner !== 'All Partners' && (
        <section className="py-8 bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="bg-white rounded-xl p-8 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center mb-6">
                <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mr-6">
                  {partners.find(p => p.name === selectedPartner)?.logo ? (
                    <img 
                      src={partners.find(p => p.name === selectedPartner)?.logo || ''} 
                      alt={selectedPartner}
                      className="h-12 w-auto object-contain"
                    />
                  ) : (
                    <span className="text-gray-600 font-bold text-xl">{selectedPartner.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-black mb-2">{selectedPartner}</h2>
                  <p className="text-gray-600 text-lg">
                    {partners.find(p => p.name === selectedPartner)?.description}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-black">
                    {partners.find(p => p.name === selectedPartner)?.established || 'N/A'}
                  </div>
                  <div className="text-gray-600 text-sm font-medium">Established</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-black">
                    {partners.find(p => p.name === selectedPartner)?.totalProperties || 0}+
                  </div>
                  <div className="text-gray-600 text-sm font-medium">Total Projects</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-black">
                    {filteredProperties.length}
                  </div>
                  <div className="text-gray-600 text-sm font-medium">Available Properties</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

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
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xl font-bold text-black">{property.title}</h4>
                      {property.partner && (
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-medium">
                          {property.partner}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-6 line-clamp-3">{property.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        {property.price && (
                          <span className="text-xl font-bold text-black">
                            AED {(property.price / 1000000).toFixed(1)}M
                          </span>
                        )}
                        {property.featured && (
                          <div className="text-xs text-yellow-600 font-medium mt-1">⭐ Featured</div>
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