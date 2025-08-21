import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ObjectUploader } from '../../components/ObjectUploader';
import { useAuth } from '../hooks/useAuth';
import { apiRequest } from '../lib/queryClient';
import type { Property, InsertProperty } from '@shared/schema';

export default function AdminPanel() {
  const { user, isLoading: authLoading, isAuthenticated, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<'partners' | 'projects' | 'units'>('partners');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddProjectForm, setShowAddProjectForm] = useState(false);
  const [selectedPartnerForProject, setSelectedPartnerForProject] = useState<string>('');
  const queryClient = useQueryClient();

  // Available partners from database
  const partners = [
    'Emaar',
    'Binghatti', 
    'Danube Properties',
    'Tiger Properties AE',
    'Ellington Properties'
  ];

  // Form state
  const [formData, setFormData] = useState<Partial<InsertProperty>>({
    title: '',
    type: 'apartment',
    partner: '',
    description: '',
    imageUrl: '',
    price: undefined,
    location: '',
    bedrooms: undefined,
    bathrooms: undefined,
    area: undefined,
    featured: false
  });

  // Fetch properties for admin
  const { data: properties = [], isLoading, refetch } = useQuery<Property[]>({
    queryKey: ['/api/admin/properties'],
    enabled: isAuthenticated && isAdmin,
  });

  // Create property mutation
  const createPropertyMutation = useMutation({
    mutationFn: async (data: InsertProperty) => {
      const response = await fetch('/api/admin/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create property');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/properties'] });
      queryClient.invalidateQueries({ queryKey: ['/api/properties'] });
      setShowAddProjectForm(false);
      setSelectedPartnerForProject('');
      resetForm();
    },
  });

  // Update property mutation
  const updatePropertyMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<InsertProperty> }) => {
      const response = await fetch(`/api/admin/properties/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update property');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/properties'] });
      queryClient.invalidateQueries({ queryKey: ['/api/properties'] });
      setIsEditing(false);
      setSelectedProperty(null);
    },
  });

  // Delete property mutation
  const deletePropertyMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/admin/properties/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete property');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/properties'] });
      queryClient.invalidateQueries({ queryKey: ['/api/properties'] });
      setSelectedProperty(null);
    },
  });

  const resetForm = () => {
    setFormData({
      title: '',
      type: 'apartment',
      partner: '',
      description: '',
      imageUrl: '',
      price: undefined,
      location: '',
      bedrooms: undefined,
      bathrooms: undefined,
      area: undefined,
      featured: false
    });
  };

  const handleEdit = (property: Property) => {
    setSelectedProperty(property);
    setFormData({
      title: property.title,
      type: property.type,
      partner: property.partner,
      description: property.description,
      imageUrl: property.imageUrl,
      price: property.price || undefined,
      location: property.location || '',
      bedrooms: property.bedrooms || undefined,
      bathrooms: property.bathrooms || undefined,
      area: property.area || undefined,
      featured: property.featured || false
    });
    setIsEditing(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && selectedProperty) {
      updatePropertyMutation.mutate({ id: selectedProperty.id, data: formData as InsertProperty });
    } else {
      createPropertyMutation.mutate(formData as InsertProperty);
    }
  };

  const handleImageUpload = async () => {
    try {
      const response = await fetch('/api/objects/upload', { method: 'POST' });
      const { uploadURL } = await response.json();
      return { method: 'PUT' as const, url: uploadURL };
    } catch (error) {
      console.error('Error getting upload URL:', error);
      throw error;
    }
  };

  const handleImageComplete = (result: any) => {
    if (result.successful && result.successful[0]) {
      const imageURL = result.successful[0].uploadURL;
      setFormData(prev => ({ ...prev, imageUrl: imageURL }));
    }
  };

  const startAddProject = (partner: string) => {
    setSelectedPartnerForProject(partner);
    setFormData(prev => ({ ...prev, partner }));
    setShowAddProjectForm(true);
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = '/api/login';
    }
  }, [isAuthenticated, authLoading]);

  // Show access denied if not admin
  if (!authLoading && isAuthenticated && !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You need admin privileges to access this page.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="mt-4 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome, {(user as any)?.firstName || (user as any)?.email}</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => window.location.href = '/'}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300"
              >
                Back to Website
              </button>
              <button
                onClick={() => window.location.href = '/api/logout'}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('partners')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'partners'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                🏢 Partners ({partners.length})
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'projects'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                🏗️ Projects ({(properties as Property[]).length})
              </button>
              <button
                onClick={() => setActiveTab('units')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'units'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                🏠 Units ({(properties as Property[]).reduce((sum, p) => sum + (p.bedrooms || 1), 0)})
              </button>
            </nav>
          </div>
        </div>

        {/* Partners Tab */}
        {activeTab === 'partners' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Manage Partners</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partners.map((partner) => {
                const partnerProperties = (properties as Property[]).filter(p => p.partner === partner);
                return (
                  <motion.div
                    key={partner}
                    className="bg-white rounded-lg shadow-md p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{partner}</h3>
                        <p className="text-sm text-gray-500">{partnerProperties.length} projects</p>
                      </div>
                      <div className="text-2xl">🏢</div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="text-xs text-gray-500">
                        Total Units: {partnerProperties.reduce((sum, p) => sum + (p.bedrooms || 1), 0)}
                      </div>
                      <div className="text-xs text-gray-500">
                        Avg Price: AED {partnerProperties.length > 0 ? 
                          (partnerProperties.reduce((sum, p) => sum + (p.price || 0), 0) / partnerProperties.length / 1000000).toFixed(1) + 'M' 
                          : 'N/A'}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => startAddProject(partner)}
                        className="flex-1 bg-black text-white px-3 py-2 rounded-md text-sm hover:bg-gray-800"
                      >
                        Add Project
                      </button>
                      <button
                        onClick={() => {
                          setActiveTab('projects');
                        }}
                        className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm hover:bg-gray-200"
                      >
                        View Projects
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Manage Projects</h2>
              <button
                onClick={() => setActiveTab('partners')}
                className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800"
              >
                Add New Project
              </button>
            </div>

            {/* Projects Grid - Organized by Partner */}
            <div className="space-y-8">
              {partners.map((partner) => {
                const partnerProperties = (properties as Property[]).filter((p: Property) => p.partner === partner);
                if (partnerProperties.length === 0) return null;
                
                return (
                  <div key={partner}>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{partner}</h3>
                      <span className="text-sm text-gray-500">{partnerProperties.length} projects</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {partnerProperties.map((property: Property) => (
                        <motion.div
                          key={property.id}
                          className="bg-white rounded-lg shadow-md overflow-hidden"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="h-48 bg-gray-200 relative">
                            {property.imageUrl ? (
                              <img
                                src={property.imageUrl}
                                alt={property.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                                <span className="text-gray-600 font-semibold">No Image</span>
                              </div>
                            )}
                            {property.featured && (
                              <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold">
                                ⭐ Featured
                              </div>
                            )}
                          </div>
                          
                          <div className="p-4">
                            <h4 className="font-bold text-lg mb-2">{property.title}</h4>
                            
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{property.description}</p>
                            
                            <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-3">
                              <span>Type: {property.type}</span>
                              <span>Price: {property.price ? `AED ${(property.price / 1000000).toFixed(1)}M` : 'N/A'}</span>
                              <span>Beds: {property.bedrooms || 'N/A'}</span>
                              <span>Baths: {property.bathrooms || 'N/A'}</span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEdit(property)}
                                  className="text-blue-600 hover:text-blue-800 text-sm"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm('Are you sure you want to delete this project?')) {
                                      deletePropertyMutation.mutate(property.id);
                                    }
                                  }}
                                  className="text-red-600 hover:text-red-800 text-sm"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {(properties as Property[]).length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🏗️</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Projects Found</h3>
                <p className="text-gray-500 mb-4">Start by adding your first project from the Partners tab.</p>
                <button
                  onClick={() => setActiveTab('partners')}
                  className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800"
                >
                  Go to Partners
                </button>
              </div>
            )}
          </div>
        )}

        {/* Units Tab */}
        {activeTab === 'units' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Manage Units</h2>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Units Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{(properties as Property[]).reduce((sum, p) => sum + (p.bedrooms || 1), 0)}</div>
                  <div className="text-sm text-gray-600">Total Units</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{(properties as Property[]).filter(p => p.type === 'apartment').length}</div>
                  <div className="text-sm text-gray-600">Apartments</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{(properties as Property[]).filter(p => p.type === 'villa').length}</div>
                  <div className="text-sm text-gray-600">Villas</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{(properties as Property[]).filter(p => p.type === 'townhouse').length}</div>
                  <div className="text-sm text-gray-600">Townhouses</div>
                </div>
              </div>
            </div>

            {/* Units Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partner</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beds/Baths</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {(properties as Property[]).map((property) => (
                    <tr key={property.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            {property.imageUrl ? (
                              <img className="h-10 w-10 rounded-full object-cover" src={property.imageUrl} alt="" />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                🏠
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{property.title}</div>
                            <div className="text-sm text-gray-500">{property.location}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{property.partner}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {property.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {property.bedrooms || 'N/A'} / {property.bathrooms || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {property.area ? `${property.area} sq ft` : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {property.price ? `AED ${(property.price / 1000000).toFixed(1)}M` : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEdit(property)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Are you sure you want to delete this unit?')) {
                              deletePropertyMutation.mutate(property.id);
                            }
                          }}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add Project Form Modal */}
        {showAddProjectForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold">Add New Project</h2>
                  <p className="text-gray-600">Partner: <span className="font-semibold">{selectedPartnerForProject}</span></p>
                </div>
                <button
                  onClick={() => {
                    setShowAddProjectForm(false);
                    setSelectedPartnerForProject('');
                    resetForm();
                  }}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                    <input
                      type="text"
                      value={formData.title || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="e.g., Marina Heights Tower"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="apartment">Apartment</option>
                      <option value="villa">Villa</option>
                      <option value="townhouse">Townhouse</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    rows={4}
                    placeholder="Describe the property features, location, and amenities..."
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price (AED)</label>
                    <input
                      type="number"
                      value={formData.price || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value ? parseInt(e.target.value) : undefined }))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="e.g., 1500000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={formData.location || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="e.g., Dubai Marina, Dubai"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                    <input
                      type="number"
                      value={formData.bedrooms || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, bedrooms: e.target.value ? parseInt(e.target.value) : undefined }))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="e.g., 2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                    <input
                      type="number"
                      value={formData.bathrooms || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, bathrooms: e.target.value ? parseInt(e.target.value) : undefined }))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="e.g., 2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq ft)</label>
                    <input
                      type="number"
                      value={formData.area || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value ? parseInt(e.target.value) : undefined }))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="e.g., 1200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Property Images</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <ObjectUploader
                      onGetUploadParameters={handleImageUpload}
                      onComplete={handleImageComplete}
                      maxNumberOfFiles={1}
                      maxFileSize={10485760}
                    >
                      <div className="flex flex-col items-center">
                        <div className="text-4xl mb-2">📁</div>
                        <span className="text-sm">Upload Property Image</span>
                      </div>
                    </ObjectUploader>
                    {formData.imageUrl && (
                      <div className="mt-4">
                        <img src={formData.imageUrl} alt="Preview" className="max-w-32 h-20 object-cover rounded mx-auto" />
                        <p className="text-xs text-green-600 mt-1">Image uploaded successfully</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.featured || false}
                      onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                      className="mr-3 h-4 w-4"
                    />
                    <span className="text-sm text-gray-700">Mark as Featured Property</span>
                  </label>
                </div>

                <div className="flex justify-end gap-4 pt-6 border-t">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddProjectForm(false);
                      setSelectedPartnerForProject('');
                      resetForm();
                    }}
                    className="px-6 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={createPropertyMutation.isPending}
                    className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
                  >
                    {createPropertyMutation.isPending ? 'Creating...' : 'Create Project'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Property Form Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Edit Project</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      value={formData.title || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Partner</label>
                    <select
                      value={formData.partner || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, partner: e.target.value }))}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    >
                      <option value="">Select Partner</option>
                      {partners.map(partner => (
                        <option key={partner} value={partner}>{partner}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                      <option value="apartment">Apartment</option>
                      <option value="villa">Villa</option>
                      <option value="townhouse">Townhouse</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price (AED)</label>
                    <input
                      type="number"
                      value={formData.price || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value ? parseInt(e.target.value) : undefined }))}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bedrooms</label>
                    <input
                      type="number"
                      value={formData.bedrooms || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, bedrooms: e.target.value ? parseInt(e.target.value) : undefined }))}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bathrooms</label>
                    <input
                      type="number"
                      value={formData.bathrooms || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, bathrooms: e.target.value ? parseInt(e.target.value) : undefined }))}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Area (sq ft)</label>
                    <input
                      type="number"
                      value={formData.area || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value ? parseInt(e.target.value) : undefined }))}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Image</label>
                  <ObjectUploader
                    onGetUploadParameters={handleImageUpload}
                    onComplete={handleImageComplete}
                    maxNumberOfFiles={1}
                    maxFileSize={10485760}
                  >
                    <span>📁 Upload New Image</span>
                  </ObjectUploader>
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.featured || false}
                      onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Featured Property</span>
                  </label>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setSelectedProperty(null);
                      resetForm();
                    }}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updatePropertyMutation.isPending}
                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
                  >
                    {updatePropertyMutation.isPending ? 'Updating...' : 'Update Project'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}