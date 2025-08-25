import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { LocalImageUploader } from '../components/LocalImageUploader';
import { useAuth } from '../hooks/useAuth';
import { apiRequest } from '../lib/queryClient';
import type { Property, InsertProperty, FeaturedStory, InsertFeaturedStory, ContactContent, InsertContactContent, Inquiry } from '@shared/schema';

// Helper function to handle image URLs (now local images)
const convertImageUrl = (url: string): string => {
  if (!url) return url;
  
  // Local images should work as-is
  return url;
};

export default function AdminPanel() {
  const { user, isLoading: authLoading, isAuthenticated, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<'partners' | 'projects' | 'units' | 'stories' | 'contact' | 'inbox' | 'social'>('partners');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddProjectForm, setShowAddProjectForm] = useState(false);
  const [selectedPartnerForProject, setSelectedPartnerForProject] = useState<string>('');
  const [showAddStoryForm, setShowAddStoryForm] = useState(false);
  const [selectedStory, setSelectedStory] = useState<FeaturedStory | null>(null);
  const [isEditingStory, setIsEditingStory] = useState(false);
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
    featured: false,
    brochureUrl: ''
  });

  // Featured story form state
  const [storyFormData, setStoryFormData] = useState<Partial<InsertFeaturedStory>>({
    title: '',
    content: '',
    imageUrl: '',
    featured: false,
    publishedAt: new Date()
  });

  // Contact content form state
  const [contactFormData, setContactFormData] = useState<Partial<InsertContactContent>>({
    title: '',
    subtitle: '',
    description: '',
    phone: '',
    email: '',
    address: '',
    officeHours: ''
  });

  // Fetch properties for admin
  const { data: properties = [], isLoading, refetch } = useQuery<Property[]>({
    queryKey: ['/api/admin/properties'],
    enabled: isAuthenticated && isAdmin,
  });

  // Fetch featured stories for admin
  const { data: featuredStories = [], isLoading: isLoadingStories, refetch: refetchStories } = useQuery<FeaturedStory[]>({
    queryKey: ['/api/featured-stories'],
    enabled: isAuthenticated && isAdmin,
  });

  // Fetch contact content for admin
  const { data: contactContent, isLoading: isLoadingContact, refetch: refetchContact } = useQuery<ContactContent>({
    queryKey: ['/api/contact-content'],
    enabled: isAuthenticated && isAdmin,
  });

  // Fetch inquiries (contact messages)
  const { data: inquiries = [], isLoading: isLoadingInquiries } = useQuery<Inquiry[]>({
    queryKey: ['/api/admin/inquiries'],
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

  // Featured stories mutations
  const createStoryMutation = useMutation({
    mutationFn: async (data: InsertFeaturedStory) => {
      const response = await fetch('/api/featured-stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create featured story');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/featured-stories'] });
      setShowAddStoryForm(false);
      resetStoryForm();
    },
  });

  const updateStoryMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<InsertFeaturedStory> }) => {
      const response = await fetch(`/api/featured-stories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update featured story');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/featured-stories'] });
      setIsEditingStory(false);
      setSelectedStory(null);
      setShowAddStoryForm(false);
      resetStoryForm();
    },
  });

  const deleteStoryMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/featured-stories/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete featured story');
      return null; // DELETE returns 204 with no content
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/featured-stories'] });
      setSelectedStory(null);
      setIsEditingStory(false);
      setShowAddStoryForm(false);
      resetStoryForm();
    },
  });

  // Contact content mutations
  const createContactMutation = useMutation({
    mutationFn: async (data: InsertContactContent) => {
      const response = await fetch('/api/admin/contact-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create contact content');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contact-content'] });
      setContactFormData({
        title: '',
        subtitle: '',
        description: '',
        phone: '',
        email: '',
        address: '',
        officeHours: ''
      });
    },
  });

  const updateContactMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<InsertContactContent> }) => {
      const response = await fetch(`/api/admin/contact-content/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update contact content');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contact-content'] });
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
      featured: false,
      brochureUrl: ''
    });
  };

  const resetStoryForm = () => {
    setStoryFormData({
      title: '',
      content: '',
      imageUrl: '',
      featured: false,
      publishedAt: new Date()
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
      featured: property.featured || false,
      brochureUrl: property.brochureUrl || ''
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


  const startAddProject = (partner: string) => {
    setSelectedPartnerForProject(partner);
    setFormData(prev => ({ ...prev, partner }));
    setShowAddProjectForm(true);
  };

  const handleEditStory = (story: FeaturedStory) => {
    setSelectedStory(story);
    setStoryFormData({
      title: story.title,
      content: story.content,
      imageUrl: story.imageUrl,
      featured: story.featured || false,
      publishedAt: story.publishedAt || undefined
    });
    setIsEditingStory(true);
  };

  const handleStorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Story form data:', storyFormData);
    
    // Validate required fields
    if (!storyFormData.title?.trim()) {
      alert('Please enter a story title');
      return;
    }
    if (!storyFormData.content?.trim()) {
      alert('Please enter story content');
      return;
    }
    if (!storyFormData.imageUrl?.trim()) {
      alert('Please upload a story image');
      return;
    }
    
    // Prepare data with proper date handling
    const submitData = {
      title: storyFormData.title.trim(),
      content: storyFormData.content.trim(),
      imageUrl: storyFormData.imageUrl.trim(),
      featured: storyFormData.featured || false
    };
    
    console.log('Submitting story data:', submitData);
    
    if (isEditingStory && selectedStory) {
      updateStoryMutation.mutate({ id: selectedStory.id, data: submitData as InsertFeaturedStory });
    } else {
      createStoryMutation.mutate(submitData as InsertFeaturedStory);
    }
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
              <button
                onClick={() => setActiveTab('stories')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'stories'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                📰 Stories ({featuredStories.length})
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'contact'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                📞 Contact Content
              </button>
              <button
                onClick={() => setActiveTab('inbox')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'inbox'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                📬 Inbox ({inquiries.length})
              </button>
              <button
                onClick={() => setActiveTab('social')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'social'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                📱 Social Media
              </button>
            </nav>
          </div>
        </div>

        {/* Partners Tab */}
        {activeTab === 'partners' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Manage Partners</h2>
              <button
                onClick={() => {/* Add partner functionality can be added here */}}
                className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800"
              >
                Add Partner
              </button>
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
                        onClick={() => {
                          setActiveTab('projects');
                        }}
                        className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm hover:bg-gray-200"
                      >
                        View Projects
                      </button>
                      <button
                        onClick={() => {/* Edit partner functionality */}}
                        className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700"
                      >
                        Edit Partner
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
              <div className="flex gap-3">
                <select
                  value={selectedPartnerForProject}
                  onChange={(e) => setSelectedPartnerForProject(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="">Select Partner</option>
                  {partners.map(partner => (
                    <option key={partner} value={partner}>{partner}</option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    if (selectedPartnerForProject) {
                      setFormData(prev => ({ ...prev, partner: selectedPartnerForProject }));
                      setShowAddProjectForm(true);
                    } else {
                      alert('Please select a partner first');
                    }
                  }}
                  className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800"
                >
                  Add New Project
                </button>
              </div>
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
                                src={convertImageUrl(property.imageUrl)}
                                alt={property.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  target.parentElement!.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center"><span class="text-gray-600 font-semibold">Image Error</span></div>';
                                }}
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
                <p className="text-gray-500 mb-4">Start by adding your first project using the "Add New Project" button above.</p>
              </div>
            )}
          </div>
        )}

        {/* Units Tab */}
        {activeTab === 'units' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Manage Units</h2>
              <div className="flex gap-3">
                <select
                  value={selectedPartnerForProject}
                  onChange={(e) => setSelectedPartnerForProject(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="">Select Partner</option>
                  {partners.map(partner => (
                    <option key={partner} value={partner}>{partner}</option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    if (selectedPartnerForProject) {
                      setFormData(prev => ({ ...prev, partner: selectedPartnerForProject }));
                      setShowAddProjectForm(true);
                    } else {
                      alert('Please select a partner first');
                    }
                  }}
                  className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800"
                >
                  Add Unit
                </button>
              </div>
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
                              <img 
                                className="h-10 w-10 rounded-full object-cover" 
                                src={convertImageUrl(property.imageUrl)} 
                                alt=""
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  target.parentElement!.innerHTML = '<div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">🏠</div>';
                                }}
                              />
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
              
              {(properties as Property[]).length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🏠</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No Units Found</h3>
                  <p className="text-gray-500 mb-4">Start by adding your first unit using the "Add Unit" button above.</p>
                </div>
              )}
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
                  <LocalImageUploader
                    onImageSelected={(imageUrl) => setFormData(prev => ({ ...prev, imageUrl }))}
                    className="w-full"
                  >
                    <div className="flex flex-col items-center">
                      <div className="text-4xl mb-2">📁</div>
                      <span className="text-sm">Upload Property Image</span>
                    </div>
                  </LocalImageUploader>
                  {formData.imageUrl && (
                    <div className="mt-4">
                      <img src={convertImageUrl(formData.imageUrl)} alt="Preview" className="max-w-32 h-20 object-cover rounded mx-auto" />
                      <p className="text-xs text-green-600 mt-1">Image uploaded successfully</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brochure URL</label>
                  <input
                    type="url"
                    value={formData.brochureUrl || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, brochureUrl: e.target.value }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="e.g., https://example.com/brochure.pdf"
                  />
                  <p className="text-xs text-gray-500 mt-1">URL to download property brochure or voucher</p>
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
                  <LocalImageUploader
                    onImageSelected={(imageUrl) => setFormData(prev => ({ ...prev, imageUrl }))}
                    className="w-full"
                  >
                    📁 Upload New Image
                  </LocalImageUploader>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Brochure URL</label>
                  <input
                    type="url"
                    value={formData.brochureUrl || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, brochureUrl: e.target.value }))}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="e.g., https://example.com/brochure.pdf"
                  />
                  <p className="text-xs text-gray-500 mt-1">URL to download property brochure or voucher</p>
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

        {/* Stories Tab */}
        {activeTab === 'stories' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Featured Stories Management</h2>
              <button
                onClick={() => setShowAddStoryForm(true)}
                className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800"
              >
                Add Story
              </button>
            </div>

            {/* Stories List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {featuredStories.map((story) => (
                <motion.div
                  key={story.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {story.imageUrl && (
                    <img
                      src={convertImageUrl(story.imageUrl)}
                      alt={story.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{story.title}</h3>
                      {story.featured && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full ml-2">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{story.content}</p>
                    <div className="text-xs text-gray-500 mb-4">
                      Published: {story.publishedAt ? new Date(story.publishedAt).toLocaleDateString() : 'Not published'}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditStory(story)}
                        className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm hover:bg-gray-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteStoryMutation.mutate(story.id)}
                        className="bg-red-100 text-red-700 px-3 py-2 rounded-md text-sm hover:bg-red-200"
                        disabled={deleteStoryMutation.isPending}
                      >
                        {deleteStoryMutation.isPending ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Add/Edit Story Form */}
            {(showAddStoryForm || isEditingStory) && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {isEditingStory ? 'Edit Story' : 'Add New Story'}
                </h3>
                <form onSubmit={handleStorySubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      value={storyFormData.title || ''}
                      onChange={(e) => setStoryFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="Enter story title..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Content</label>
                    <textarea
                      value={storyFormData.content || ''}
                      onChange={(e) => setStoryFormData(prev => ({ ...prev, content: e.target.value }))}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      rows={6}
                      placeholder="Enter story content..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Story Image</label>
                    <LocalImageUploader
                      onImageSelected={(imageUrl) => setStoryFormData(prev => ({ ...prev, imageUrl }))}
                      className="w-full"
                    >
                      📁 Upload Story Image
                    </LocalImageUploader>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Published Date</label>
                    <input
                      type="date"
                      value={storyFormData.publishedAt ? new Date(storyFormData.publishedAt).toISOString().split('T')[0] : ''}
                      onChange={(e) => setStoryFormData(prev => ({ ...prev, publishedAt: new Date(e.target.value) }))}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={storyFormData.featured || false}
                        onChange={(e) => setStoryFormData(prev => ({ ...prev, featured: e.target.checked }))}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Featured Story</span>
                    </label>
                  </div>

                  <div className="flex justify-end gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditingStory(false);
                        setShowAddStoryForm(false);
                        setSelectedStory(null);
                        resetStoryForm();
                      }}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={createStoryMutation.isPending || updateStoryMutation.isPending}
                      className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
                    >
                      {isEditingStory 
                        ? (updateStoryMutation.isPending ? 'Updating...' : 'Update Story')
                        : (createStoryMutation.isPending ? 'Creating...' : 'Create Story')
                      }
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* Contact Content Tab */}
        {activeTab === 'contact' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Manage Contact Content</h2>
            </div>

            {isLoadingContact ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading contact content...</p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (contactContent?.id) {
                    updateContactMutation.mutate({
                      id: contactContent.id,
                      data: contactFormData
                    });
                  } else {
                    createContactMutation.mutate(contactFormData as InsertContactContent);
                  }
                }} className="space-y-4">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={contactFormData.title || contactContent?.title || ''}
                        onChange={(e) => setContactFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Ready to Get Started?"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                      <input
                        type="text"
                        value={contactFormData.subtitle || contactContent?.subtitle || ''}
                        onChange={(e) => setContactFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Contact our expert team today"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={contactFormData.description || contactContent?.description || ''}
                      onChange={(e) => setContactFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="Contact our expert team today to discuss your property and business service needs..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="text"
                        value={contactFormData.phone || contactContent?.phone || ''}
                        onChange={(e) => setContactFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="+971 XXX-XXXX"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={contactFormData.email || contactContent?.email || ''}
                        onChange={(e) => setContactFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="info@bestviewproperties.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input
                        type="text"
                        value={contactFormData.address || contactContent?.address || ''}
                        onChange={(e) => setContactFormData(prev => ({ ...prev, address: e.target.value }))}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Dubai, United Arab Emirates"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Office Hours</label>
                      <input
                        type="text"
                        value={contactFormData.officeHours || contactContent?.officeHours || ''}
                        onChange={(e) => setContactFormData(prev => ({ ...prev, officeHours: e.target.value }))}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Mon-Fri: 9AM-6PM, Sat: 10AM-4PM"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 pt-4 border-t">
                    <button
                      type="button"
                      onClick={() => {
                        setContactFormData({
                          title: '',
                          subtitle: '',
                          description: '',
                          phone: '',
                          email: '',
                          address: '',
                          officeHours: ''
                        });
                      }}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      disabled={createContactMutation.isPending || updateContactMutation.isPending}
                      className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
                    >
                      {contactContent 
                        ? (updateContactMutation.isPending ? 'Updating...' : 'Update Contact Info')
                        : (createContactMutation.isPending ? 'Creating...' : 'Create Contact Info')
                      }
                    </button>
                  </div>
                </form>

                {/* Preview Section */}
                <div className="mt-8 pt-6 border-t">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Preview</h4>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h5 className="text-lg font-semibold text-gray-900 mb-2">
                      {contactFormData.title || contactContent?.title || 'Ready to Get Started?'}
                    </h5>
                    <p className="text-gray-600 mb-4">
                      {contactFormData.subtitle || contactContent?.subtitle || 'Contact our expert team today'}
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      {contactFormData.description || contactContent?.description || 'Contact our expert team today to discuss your property and business service needs...'}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong>📞 Phone:</strong> {contactFormData.phone || contactContent?.phone || '+971 XXX-XXXX'}
                      </div>
                      <div>
                        <strong>✉️ Email:</strong> {contactFormData.email || contactContent?.email || 'info@bestviewproperties.com'}
                      </div>
                      <div>
                        <strong>📍 Address:</strong> {contactFormData.address || contactContent?.address || 'Dubai, United Arab Emirates'}
                      </div>
                      <div>
                        <strong>🕒 Hours:</strong> {contactFormData.officeHours || contactContent?.officeHours || 'Mon-Fri: 9AM-6PM, Sat: 10AM-4PM'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Inbox Tab */}
        {activeTab === 'inbox' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Contact Messages Inbox</h2>
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                {inquiries.length} messages
              </span>
            </div>

            {isLoadingInquiries ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading messages...</p>
                </div>
              </div>
            ) : inquiries.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">📭</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No messages yet</h3>
                  <p className="text-gray-600">Contact form submissions from users will appear here.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inquiry) => (
                  <div key={inquiry.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {inquiry.firstName} {inquiry.lastName}
                        </h3>
                        <p className="text-sm text-gray-500">{inquiry.email}</p>
                        {inquiry.phone && (
                          <p className="text-sm text-gray-500">{inquiry.phone}</p>
                        )}
                      </div>
                      <div className="text-right">
                        {inquiry.service && (
                          <span className="bg-black text-white px-2 py-1 rounded text-xs">
                            {inquiry.service}
                          </span>
                        )}
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(inquiry.createdAt || '').toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Message:</h4>
                      <p className="text-gray-900 whitespace-pre-wrap">{inquiry.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'social' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Social Media Settings</h2>
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                Connect your accounts
              </span>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="space-y-6">
                {/* Instagram Account Linking */}
                <div className="border-b border-gray-200 pb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Instagram Business Account</h3>
                      <p className="text-sm text-gray-500">Connect your Instagram account to showcase properties</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Instagram Username
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          @
                        </span>
                        <input
                          type="text"
                          placeholder="your_instagram_handle"
                          className="flex-1 rounded-none rounded-r-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Instagram Business Token (Optional)
                      </label>
                      <input
                        type="password"
                        placeholder="Enter your Instagram API token"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Optional: For advanced features like posting automation
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="autoPost"
                        className="rounded border-gray-300 text-black focus:ring-black"
                      />
                      <label htmlFor="autoPost" className="text-sm text-gray-700">
                        Auto-post new properties to Instagram
                      </label>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
                        Connect Instagram
                      </button>
                      <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">
                        Test Connection
                      </button>
                    </div>
                  </div>
                </div>

                {/* Future social media platforms */}
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">🔗</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">More platforms coming soon</h3>
                  <p className="text-gray-600">Facebook, LinkedIn, and TikTok integration in development</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}