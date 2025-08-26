import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Eye, Phone, MessageCircle, Calendar } from "lucide-react";
import type { Property, Partner } from "@shared/schema";

const serviceCategories = [
  { id: 1, label: "Property Transactions", description: "Buy & Sell Services" },
  { id: 2, label: "Property Management", description: "Professional Oversight" },
  { id: 3, label: "Mortgage Advisory", description: "Financing Solutions" },
  { id: 4, label: "Legal Services", description: "Business Setup" }
];

export default function BuySell() {
  const [activeMainTab, setActiveMainTab] = useState<'buy' | 'sell'>('buy');
  const [activeSubTab, setActiveSubTab] = useState<'partners' | 'services'>('partners');
  const [selectedPartner, setSelectedPartner] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  // Fetch data
  const { data: properties = [], isLoading: propertiesLoading } = useQuery<Property[]>({
    queryKey: ['/api/properties'],
  });

  const { data: partnersData = [], isLoading: partnersLoading } = useQuery<Partner[]>({
    queryKey: ['/api/partners'],
  });

  // Get unique partners from properties for dropdown
  const uniquePartners = Array.from(new Set(properties.map(p => p.partner))).sort();
  
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
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Buy & Sell Properties
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover luxury properties in Dubai or maximize your investment value with our expert services
          </p>
        </motion.div>

        {/* Main Sliding Tabs - Similar to Reference Image */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex justify-center mb-8">
            <div className="bg-gray-200 rounded-full p-1 inline-flex">
              <button
                onClick={() => setActiveMainTab('buy')}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeMainTab === 'buy'
                    ? 'bg-black text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Buy Properties
              </button>
              <button
                onClick={() => setActiveMainTab('sell')}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeMainTab === 'sell'
                    ? 'bg-black text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Sell Properties
              </button>
            </div>
          </div>

          {/* Sub Tabs - Like Reference Image */}
          {activeMainTab === 'buy' && (
            <div className="flex justify-center">
              <div className="bg-white rounded-full p-1 inline-flex shadow-sm border">
                <button
                  onClick={() => setActiveSubTab('partners')}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeSubTab === 'partners'
                      ? 'bg-black text-white'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Premium Partners
                </button>
                <button
                  onClick={() => setActiveSubTab('services')}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeSubTab === 'services'
                      ? 'bg-black text-white'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Our Services
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {activeMainTab === 'buy' && activeSubTab === 'partners' && (
            <div>
              {/* Property Type Filter Cards */}
              <div className="mb-8">
                <div className="flex justify-center">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
                    
                    {/* Villas */}
                    <div 
                      className={`cursor-pointer transition-all duration-300 rounded-lg p-4 border text-center ${
                        selectedType === 'villa' 
                          ? 'border-black border-2' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onClick={() => setSelectedType(selectedType === 'villa' ? 'all' : 'villa')}
                      style={{
                        background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
                        minHeight: '120px'
                      }}
                    >
                      <div className="w-8 h-8 rounded-lg mx-auto mb-3 flex items-center justify-center bg-black/10">
                        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-lg mb-2 text-black">Villas</h3>
                      <p className="text-xs mb-3 text-gray-600">Luxury estates with premium amenities</p>
                      <div className="text-xs px-3 py-1 rounded-full inline-block bg-black/10 text-gray-700">
                        {selectedType === 'villa' ? 'Selected' : 'Click to filter'}
                      </div>
                    </div>

                    {/* Townhouses */}
                    <div 
                      className={`cursor-pointer transition-all duration-300 rounded-lg p-4 border text-center ${
                        selectedType === 'townhouse' 
                          ? 'border-black border-2' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onClick={() => setSelectedType(selectedType === 'townhouse' ? 'all' : 'townhouse')}
                      style={{
                        background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
                        minHeight: '120px'
                      }}
                    >
                      <div className="w-8 h-8 rounded-lg mx-auto mb-3 flex items-center justify-center bg-black/10">
                        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-lg mb-2 text-black">Townhouses</h3>
                      <p className="text-xs mb-3 text-gray-600">Modern comfort in communities</p>
                      <div className="text-xs px-3 py-1 rounded-full inline-block bg-black/10 text-gray-700">
                        {selectedType === 'townhouse' ? 'Selected' : 'Click to filter'}
                      </div>
                    </div>

                    {/* Apartments */}
                    <div 
                      className={`cursor-pointer transition-all duration-300 rounded-lg p-4 border text-center ${
                        selectedType === 'apartment' 
                          ? 'border-black border-2' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onClick={() => setSelectedType(selectedType === 'apartment' ? 'all' : 'apartment')}
                      style={{
                        background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
                        minHeight: '120px'
                      }}
                    >
                      <div className="w-8 h-8 rounded-lg mx-auto mb-3 flex items-center justify-center bg-black/10">
                        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-lg mb-2 text-black">Apartments</h3>
                      <p className="text-xs mb-3 text-gray-600">Urban living with city views</p>
                      <div className="text-xs px-3 py-1 rounded-full inline-block bg-black/10 text-gray-700">
                        {selectedType === 'apartment' ? 'Selected' : 'Click to filter'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Partner Filter */}
              <div className="bg-white rounded-lg p-4 mb-8 shadow-sm">
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
              </div>

              {/* Properties Display */}
              {propertiesLoading ? (
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
                              
                              <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-gray-600 font-medium">{property.partner}</span>
                                </div>
                                <div className="flex gap-1.5">
                                  <Link
                                    href="/contact"
                                    className="bg-black text-white px-2.5 py-1 rounded-full text-[11px] font-medium hover:bg-gray-800 transition-colors text-center"
                                  >
                                    Book Consultation
                                  </Link>
                                  {property.brochureUrl && (
                                    <a 
                                      href={property.brochureUrl} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="bg-white border border-black text-black px-2.5 py-1 rounded-full text-[11px] font-medium hover:bg-gray-50 transition-colors text-center"
                                    >
                                      Download Brochure
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {filteredProperties.length === 0 && !propertiesLoading && (
                    <div className="text-center py-12">
                      <div className="text-gray-400 text-6xl mb-4">🏗️</div>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">No Properties Found</h3>
                      <p className="text-gray-500">Try adjusting your filters to see more properties.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeMainTab === 'buy' && activeSubTab === 'services' && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-black mb-4">Our Services</h2>
                <p className="text-gray-600">Comprehensive real estate services for buyers</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {serviceCategories.map((category) => (
                  <Link key={category.id} href="/services">
                    <div className="p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-300 cursor-pointer hover:shadow-md">
                      <h3 className="font-semibold text-lg mb-2 text-black">{category.label}</h3>
                      <p className="text-gray-600 text-sm">{category.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {activeMainTab === 'sell' && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-black mb-4">Sell Your Property</h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                  Maximize your property value with our expert guidance and comprehensive selling services. 
                  Let us help you get the best return on your investment.
                </p>
              </div>

              {/* Book Consultation Feature */}
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  
                  {/* Phone Consultation */}
                  <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-all">
                    <div className="bg-black/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-8 h-8 text-black" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Phone Consultation</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Get immediate expert advice over the phone
                    </p>
                    <Link href="/contact">
                      <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors">
                        Call Now
                      </button>
                    </Link>
                  </div>

                  {/* Video Call */}
                  <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-all">
                    <div className="bg-black/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="w-8 h-8 text-black" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Video Consultation</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Schedule a detailed video call with our experts
                    </p>
                    <Link href="/contact">
                      <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors">
                        Schedule Call
                      </button>
                    </Link>
                  </div>

                  {/* In-Person Meeting */}
                  <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-all">
                    <div className="bg-black/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-8 h-8 text-black" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">In-Person Meeting</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Meet with our team at your property or our office
                    </p>
                    <Link href="/contact">
                      <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors">
                        Book Meeting
                      </button>
                    </Link>
                  </div>

                </div>

                {/* Why Choose Us */}
                <div className="bg-gray-50 rounded-lg p-8">
                  <h3 className="text-xl font-bold text-center mb-6">Why Choose Best View Properties?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 w-6 h-6 rounded-full flex items-center justify-center mt-1">
                        <span className="text-green-600 text-sm">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Market Expertise</h4>
                        <p className="text-gray-600 text-sm">Deep knowledge of Dubai's property market trends</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 w-6 h-6 rounded-full flex items-center justify-center mt-1">
                        <span className="text-green-600 text-sm">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Premium Network</h4>
                        <p className="text-gray-600 text-sm">Access to high-value buyers and investors</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 w-6 h-6 rounded-full flex items-center justify-center mt-1">
                        <span className="text-green-600 text-sm">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Professional Marketing</h4>
                        <p className="text-gray-600 text-sm">High-quality photography and targeted marketing</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 w-6 h-6 rounded-full flex items-center justify-center mt-1">
                        <span className="text-green-600 text-sm">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">End-to-End Support</h4>
                        <p className="text-gray-600 text-sm">Complete assistance from valuation to closing</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}