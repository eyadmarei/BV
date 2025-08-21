import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ObjectUploader } from '../../components/ObjectUploader';
import { useAuth } from '../hooks/useAuth';
import { apiRequest } from '../lib/queryClient';
import type { Property, InsertProperty } from '@shared/schema';

export default function AdminPanel() {
  const { user, isLoading: authLoading, isAuthenticated, isAdmin } = useAuth();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<string>('');
  const [workflowStep, setWorkflowStep] = useState<'partner' | 'property'>('partner');
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
      setShowWorkflow(false);
      setWorkflowStep('partner');
      setSelectedPartner('');
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

  const startAddProperty = () => {
    setShowWorkflow(true);
    setWorkflowStep('partner');
    setSelectedPartner('');
    resetForm();
  };

  const selectPartner = (partner: string) => {
    setSelectedPartner(partner);
    setFormData(prev => ({ ...prev, partner }));
    setWorkflowStep('property');
  };

  const goBackToPartnerSelection = () => {
    setWorkflowStep('partner');
    setSelectedPartner('');
  };

  const cancelWorkflow = () => {
    setShowWorkflow(false);
    setWorkflowStep('partner');
    setSelectedPartner('');
    resetForm();
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
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-gray-600">Welcome, {(user as any)?.firstName || (user as any)?.email}</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={startAddProperty}
                className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800"
              >
                Add Property
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
        
        {/* Add Property Workflow */}
        {showWorkflow && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              
              {/* Step 1: Partner Selection */}
              {workflowStep === 'partner' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Step 1: Select Partner</h2>
                    <button
                      onClick={cancelWorkflow}
                      className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <p className="text-gray-600 mb-6">Choose the developer/partner for the new property:</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {partners.map((partner) => (
                      <motion.button
                        key={partner}
                        onClick={() => selectPartner(partner)}
                        className="p-6 border-2 border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-all text-left"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="text-lg font-semibold text-gray-900 mb-2">{partner}</div>
                        <div className="text-sm text-gray-500">
                          {(properties as Property[]).filter(p => p.partner === partner).length} properties
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Property Form */}
              {workflowStep === 'property' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-2xl font-bold">Step 2: Add Property</h2>
                      <p className="text-gray-600">Adding property for: <span className="font-semibold">{selectedPartner}</span></p>
                    </div>
                    <button
                      onClick={cancelWorkflow}
                      className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="mb-4">
                    <button
                      onClick={goBackToPartnerSelection}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      ← Change Partner
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Property Title</label>
                        <input
                          type="text"
                          value={formData.title}
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
                        onClick={goBackToPartnerSelection}
                        className="px-6 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={createPropertyMutation.isPending}
                        className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
                      >
                        {createPropertyMutation.isPending ? 'Creating...' : 'Create Property'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Edit Property Form */}
        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Edit Property</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Partner</label>
                    <select
                      value={formData.partner}
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
                    {updatePropertyMutation.isPending ? 'Updating...' : 'Update'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Properties Grid - Organized by Partner */}
        <div className="space-y-8">
          {partners.map((partner) => {
            const partnerProperties = (properties as Property[]).filter((p: Property) => p.partner === partner);
            if (partnerProperties.length === 0) return null;
            
            return (
              <div key={partner}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{partner}</h3>
                  <span className="text-sm text-gray-500">{partnerProperties.length} properties</span>
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
                      </div>
                      
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-lg">{property.title}</h4>
                          {property.featured && (
                            <span className="text-yellow-600 text-xs">⭐ Featured</span>
                          )}
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{property.description}</p>
                        
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
                                if (confirm('Are you sure you want to delete this property?')) {
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
            <div className="text-gray-400 text-6xl mb-4">🏢</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Properties Found</h3>
            <p className="text-gray-500 mb-4">Get started by adding your first property.</p>
            <button
              onClick={startAddProperty}
              className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800"
            >
              Add Property
            </button>
          </div>
        )}
      </div>
    </div>
  );
}