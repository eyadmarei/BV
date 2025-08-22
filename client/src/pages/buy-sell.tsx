import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import type { Property } from "@shared/schema";

export default function BuySell() {
  const [selectedPartner, setSelectedPartner] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  // Fetch properties from database
  const { data: properties = [], isLoading } = useQuery<Property[]>({
    queryKey: ['/api/properties'],
  });

  // Get unique partners from properties
  const partners = Array.from(new Set(properties.map(p => p.partner))).sort();

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
        
        {/* Compact Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Buy & Sell Properties
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover luxury properties in Dubai with our premium partners
          </p>
        </motion.div>

        {/* Compact Services Row */}
        <motion.div
          className="flex gap-4 justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* BUY Services */}
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm w-64">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-black/10 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M7 19h9" />
                </svg>
              </div>
              <div>
                <h3 className="text-black text-lg font-bold">BUY</h3>
                <p className="text-gray-600 text-xs">Find Your Dream Property</p>
              </div>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center text-gray-700">
                <div className="w-1 h-1 bg-black rounded-full mr-2"></div>
                <span>Legal Support</span>
              </div>
              <div className="flex items-center text-gray-700">
                <div className="w-1 h-1 bg-black rounded-full mr-2"></div>
                <span>Investment Guidance</span>
              </div>
            </div>
          </div>

          {/* SELL Services */}
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm w-64">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-black/10 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <h3 className="text-black text-lg font-bold">SELL</h3>
                <p className="text-gray-600 text-xs">Maximize Property Value</p>
              </div>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center text-gray-700">
                <div className="w-1 h-1 bg-black rounded-full mr-2"></div>
                <span>Market Analysis</span>
              </div>
              <div className="flex items-center text-gray-700">
                <div className="w-1 h-1 bg-black rounded-full mr-2"></div>
                <span>Professional Marketing</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Partner and Type Filters */}
        <motion.div
          className="bg-white rounded-lg p-4 mb-8 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold text-gray-700">Partner:</label>
              <select
                value={selectedPartner}
                onChange={(e) => setSelectedPartner(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="all">All Partners</option>
                {partners.map(partner => (
                  <option key={partner} value={partner}>{partner}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold text-gray-700">Type:</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="all">All Types</option>
                <option value="villa">Villas</option>
                <option value="townhouse">Townhouses</option>
                <option value="apartment">Apartments</option>
              </select>
            </div>

            <div className="text-sm text-gray-600">
              Showing {filteredProperties.length} properties
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
      </div>
    </div>
  );
}