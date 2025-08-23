import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Eye } from "lucide-react";
import type { Property } from "@shared/schema";
import binghatiLogo from "@assets/binghate_1754074726263.png";
import danubeLogo from "@assets/danube_1754074726264.png";
import ellingtonLogo from "@assets/download_1754074726265.png";
import emaarLogo from "@assets/emar_1754074726266.png";
import imanLogo from "@assets/iman_1754074726267.png";
import marquisLogo from "@assets/mareques_1754074726267.png";
import rabdanLogo from "@assets/Rabdan_1754074726268.png";
import tigerLogo from "@assets/tiger_1754074726270.png";

const partners = [
  { name: "Binghatti", logo: binghatiLogo, description: "Luxury Developments" },
  { name: "Danube Properties", logo: danubeLogo, description: "Premium Locations" },
  { name: "Ellington Properties", logo: ellingtonLogo, description: "Modern Design" },
  { name: "Emaar", logo: emaarLogo, description: "Iconic Projects" },
  { name: "Iman Developers", logo: imanLogo, description: "Quality Living" },
  { name: "Marquis", logo: marquisLogo, description: "Elite Properties" },
  { name: "Rabdan", logo: rabdanLogo, description: "Contemporary Style" },
  { name: "Tiger Properties AE", logo: tigerLogo, description: "Investment Focus" }
];

export default function BuySell() {
  const [selectedPartner, setSelectedPartner] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [partnerStyle, setPartnerStyle] = useState('fancy'); // 'fancy' or 'black'
  const [partnerFilter, setPartnerFilter] = useState("");

  // Fetch properties from database
  const { data: properties = [], isLoading } = useQuery<Property[]>({
    queryKey: ['/api/properties'],
  });

  // Get unique partners from properties for dropdown
  const uniquePartners = Array.from(new Set(properties.map(p => p.partner))).sort();
  
  // Filter partners based on search term
  const filteredPartners = partners.filter(partner => 
    partner.name.toLowerCase().includes(partnerFilter.toLowerCase()) ||
    partner.description.toLowerCase().includes(partnerFilter.toLowerCase())
  );

  // Filter properties based on selected filters
  const filteredProperties = properties.filter(property => {
    const matchesPartner = selectedPartner === 'all' || property.partner === selectedPartner;
    const matchesType = selectedType === 'all' || property.type === selectedType;
    return matchesPartner && matchesType;
  });

  // Group properties by partner for display
  const groupedProperties = filteredProperties.reduce((acc, property) => {
    if (!acc[property.partner]) {
      acc[property.partner] = [];
    }
    acc[property.partner].push(property);
    return acc;
  }, {} as Record<string, Property[]>);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Page Header */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Buy & Sell Properties
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover luxury properties in Dubai or maximize your investment value
          </p>
        </motion.div>

        {/* Simple BUY/SELL Header */}
        <motion.div
          className="flex gap-8 justify-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-center">
            <h3 className="text-xl font-bold text-black mb-1">BUY</h3>
            <p className="text-sm text-gray-600">Find Your Dream Property</p>
          </div>
          <div className="w-px h-12 bg-gray-300"></div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-black mb-1">SELL</h3>
            <p className="text-sm text-gray-600">Maximize Your Property Value</p>
          </div>
        </motion.div>

        {/* Property Type Filter Cards */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
              
              {/* Villas */}
              <div 
                className={`cursor-pointer transition-all duration-300 rounded-xl p-8 border-2 text-center ${
                  selectedType === 'villa' 
                    ? 'transform scale-105 border-black shadow-xl' 
                    : 'hover:scale-102 border-gray-300 hover:border-gray-400 shadow-lg hover:shadow-xl'
                }`}
                onClick={() => setSelectedType(selectedType === 'villa' ? 'all' : 'villa')}
                style={{
                  background: selectedType === 'villa' 
                    ? 'linear-gradient(145deg, #000000, #333333)' 
                    : 'linear-gradient(145deg, #ffffff, #f8f9fa)',
                  minHeight: '160px'
                }}
              >
                <div className={`w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center ${
                  selectedType === 'villa' ? 'bg-white/20' : 'bg-black/10'
                }`}>
                  <svg className={`w-7 h-7 ${selectedType === 'villa' ? 'text-white' : 'text-black'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className={`font-bold text-xl mb-2 ${selectedType === 'villa' ? 'text-white' : 'text-black'}`}>Villas</h3>
                <p className={`text-sm mb-4 ${selectedType === 'villa' ? 'text-white/80' : 'text-gray-600'}`}>Luxury estates with premium amenities</p>
                <div className={`text-xs px-3 py-1 rounded-full inline-block ${
                  selectedType === 'villa' 
                    ? 'bg-white/20 text-white' 
                    : 'bg-black/10 text-gray-700'
                }`}>
                  {selectedType === 'villa' ? 'Selected' : 'Click to filter'}
                </div>
              </div>

              {/* Townhouses */}
              <div 
                className={`cursor-pointer transition-all duration-300 rounded-xl p-8 border-2 text-center ${
                  selectedType === 'townhouse' 
                    ? 'transform scale-105 border-black shadow-xl' 
                    : 'hover:scale-102 border-gray-300 hover:border-gray-400 shadow-lg hover:shadow-xl'
                }`}
                onClick={() => setSelectedType(selectedType === 'townhouse' ? 'all' : 'townhouse')}
                style={{
                  background: selectedType === 'townhouse' 
                    ? 'linear-gradient(145deg, #000000, #333333)' 
                    : 'linear-gradient(145deg, #ffffff, #f8f9fa)',
                  minHeight: '160px'
                }}
              >
                <div className={`w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center ${
                  selectedType === 'townhouse' ? 'bg-white/20' : 'bg-black/10'
                }`}>
                  <svg className={`w-7 h-7 ${selectedType === 'townhouse' ? 'text-white' : 'text-black'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className={`font-bold text-xl mb-2 ${selectedType === 'townhouse' ? 'text-white' : 'text-black'}`}>Townhouses</h3>
                <p className={`text-sm mb-4 ${selectedType === 'townhouse' ? 'text-white/80' : 'text-gray-600'}`}>Modern comfort in communities</p>
                <div className={`text-xs px-3 py-1 rounded-full inline-block ${
                  selectedType === 'townhouse' 
                    ? 'bg-white/20 text-white' 
                    : 'bg-black/10 text-gray-700'
                }`}>
                  {selectedType === 'townhouse' ? 'Selected' : 'Click to filter'}
                </div>
              </div>

              {/* Apartments */}
              <div 
                className={`cursor-pointer transition-all duration-300 rounded-xl p-8 border-2 text-center ${
                  selectedType === 'apartment' 
                    ? 'transform scale-105 border-black shadow-xl' 
                    : 'hover:scale-102 border-gray-300 hover:border-gray-400 shadow-lg hover:shadow-xl'
                }`}
                onClick={() => setSelectedType(selectedType === 'apartment' ? 'all' : 'apartment')}
                style={{
                  background: selectedType === 'apartment' 
                    ? 'linear-gradient(145deg, #000000, #333333)' 
                    : 'linear-gradient(145deg, #ffffff, #f8f9fa)',
                  minHeight: '160px'
                }}
              >
                <div className={`w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center ${
                  selectedType === 'apartment' ? 'bg-white/20' : 'bg-black/10'
                }`}>
                  <svg className={`w-7 h-7 ${selectedType === 'apartment' ? 'text-white' : 'text-black'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                  </svg>
                </div>
                <h3 className={`font-bold text-xl mb-2 ${selectedType === 'apartment' ? 'text-white' : 'text-black'}`}>Apartments</h3>
                <p className={`text-sm mb-4 ${selectedType === 'apartment' ? 'text-white/80' : 'text-gray-600'}`}>Urban living with city views</p>
                <div className={`text-xs px-3 py-1 rounded-full inline-block ${
                  selectedType === 'apartment' 
                    ? 'bg-white/20 text-white' 
                    : 'bg-black/10 text-gray-700'
                }`}>
                  {selectedType === 'apartment' ? 'Selected' : 'Click to filter'}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Partner Filter */}
        <motion.div
          className="bg-white rounded-lg p-4 mb-8 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold text-gray-700">Filter by Partner:</label>
              <select
                value={selectedPartner}
                onChange={(e) => setSelectedPartner(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="all">All Partners</option>
                {uniquePartners.map(partner => (
                  <option key={partner} value={partner}>{partner}</option>
                ))}
              </select>
            </div>

            <div className="text-sm text-gray-600">
              Showing {filteredProperties.length} properties
              {selectedType !== 'all' && ` • ${selectedType}s only`}
              {selectedPartner !== 'all' && ` • ${selectedPartner} only`}
            </div>
          </div>
        </motion.div>

        {/* Properties Display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedProperties).map(([partner, partnerProperties]) => (
                <div key={partner}>
                  <div className="flex items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900">{partner}</h2>
                    <div className="ml-3 bg-gray-100 px-2 py-1 rounded-full text-sm text-gray-600">
                      {partnerProperties.length} units
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {partnerProperties.map((property) => (
                      <div key={property.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="h-48 bg-gray-200 rounded-t-lg relative overflow-hidden">
                          {property.imageUrl ? (
                            <img
                              src={property.imageUrl}
                              alt={property.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgMTIwQzEwNS41MjMgMTIwIDExMCAxMTUuNTIzIDExMCAxMTBTMTA1LjUyMyAxMDAgMTAwIDEwMFM5MCAxMDQuNDc3IDkwIDExMFM5NC40NzcgMTIwIDEwMCAxMjBaIiBmaWxsPSIjOUNBM0FGII8+CjxwYXRoIGQ9Ik04MCA4MFYxNDBIMTIwVjgwSDgwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
                              }}
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full bg-gray-100">
                              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                          <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium capitalize">
                            {property.type}
                          </div>
                          {property.price && (
                            <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-bold text-black">
                              AED {(property.price / 1000000).toFixed(1)}M
                            </div>
                          )}
                        </div>
                        
                        <div className="p-4">
                          <h3 className="font-bold text-lg mb-1">{property.title}</h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{property.description}</p>
                          
                          <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                            <span>{property.location || 'Dubai'}</span>
                            {property.bedrooms && property.bathrooms && (
                              <span>{property.bedrooms} bed • {property.bathrooms} bath</span>
                            )}
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600 font-medium">{property.partner}</span>
                            <button className="bg-black text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-gray-800 transition-colors">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              {filteredProperties.length === 0 && !isLoading && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🏗️</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No Properties Found</h3>
                  <p className="text-gray-500">Try adjusting your filters to see more properties.</p>
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Partners Section */}
        <motion.div
          className="mt-16 py-8 bg-white rounded-lg border border-gray-200"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-black mb-2">Our Premium Partners</h2>
            <p className="text-gray-600">Leading developers trusted by Best View Properties</p>
          </div>

          {/* Style Toggle for Partners */}
          <div className="flex justify-end mb-4 px-6">
            <button
              onClick={() => setPartnerStyle(partnerStyle === 'fancy' ? 'black' : 'fancy')}
              className="opacity-20 hover:opacity-40 transition-opacity p-1"
              title="Toggle style"
            >
              <Eye className="w-3 h-3 text-gray-500" />
            </button>
          </div>

          {/* Partner Search */}
          <div className="px-6 mb-6">
            <div className="flex justify-center">
              <input
                type="text"
                placeholder="Search partners..."
                value={partnerFilter}
                onChange={(e) => setPartnerFilter(e.target.value)}
                className="w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
              />
            </div>
          </div>

          {/* Partners Content */}
          <div className="px-6">
            {partnerStyle === 'fancy' ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
                {filteredPartners.map((partner) => (
                  <div key={partner.name} className="flex flex-col items-center">
                    <div 
                      className="relative rounded-lg p-4 overflow-hidden flex items-center justify-center h-32 w-full"
                      style={{
                        background: 'linear-gradient(160deg, #fefefe, #faf9f7 30%, #f5f4f2 70%, #f0efed)',
                        boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.9), inset 0 -1px 3px rgba(0,0,0,0.05), 0 6px 25px rgba(0,0,0,0.08), 0 0 20px rgba(255,248,220,0.8)',
                        transition: 'transform .18s ease, outline-color .18s ease, box-shadow .18s ease',
                        border: '1px solid rgba(255,255,255,0.4)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = 'inset 0 2px 8px rgba(255,255,255,1), inset 0 -1px 4px rgba(0,0,0,0.08), 0 12px 35px rgba(0,0,0,0.12), 0 0 30px rgba(255,248,220,1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0px)';
                        e.currentTarget.style.boxShadow = 'inset 0 2px 6px rgba(255,255,255,0.9), inset 0 -1px 3px rgba(0,0,0,0.05), 0 6px 25px rgba(0,0,0,0.08), 0 0 20px rgba(255,248,220,0.8)';
                      }}
                    >
                      <img 
                        src={partner.logo} 
                        alt={`${partner.name} logo`}
                        style={{
                          maxWidth: '90%',
                          maxHeight: '90%',
                          filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.5))'
                        }}
                      />
                    </div>
                    <div className="font-semibold text-xs mt-2" style={{ letterSpacing: '.1px', color: '#6b7280' }}>
                      {partner.name}
                    </div>
                    <button 
                      onClick={() => setSelectedPartner(partner.name)}
                      className="mt-1 text-xs cursor-pointer transition-all hover:opacity-90 px-3 py-1 rounded-full"
                      style={{ 
                        background: '#ffffff',
                        color: '#000000',
                        fontSize: '10px',
                        letterSpacing: '.1px',
                        fontWeight: '400',
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                    >
                      View Properties
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 bg-gray-700 rounded-lg p-6">
                {filteredPartners.map((partner) => (
                  <div 
                    key={partner.name}
                    className="bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-all hover:bg-black/60"
                  >
                    <div className="text-center">
                      <div className="h-20 flex items-center justify-center mb-3">
                        <img 
                          src={partner.logo} 
                          alt={`${partner.name} logo`}
                          className="max-w-full max-h-full object-contain"
                          style={{ filter: 'brightness(0) invert(1)' }}
                        />
                      </div>
                      <h3 className="text-white font-bold text-xs mb-1">{partner.name}</h3>
                      <p className="text-gray-300 text-xs mb-3">{partner.description}</p>
                      <button 
                        onClick={() => setSelectedPartner(partner.name)}
                        className="bg-white text-black px-3 py-1 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors"
                      >
                        View Properties
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}