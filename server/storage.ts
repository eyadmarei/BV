import { properties, services, inquiries, users, type Property, type Service, type Inquiry, type User, type InsertProperty, type InsertService, type InsertInquiry, type InsertUser } from "@shared/schema";

export interface IStorage {
  // Properties
  getProperties(): Promise<Property[]>;
  getPropertiesByType(type: string): Promise<Property[]>;
  getProperty(id: number): Promise<Property | undefined>;
  createProperty(property: InsertProperty): Promise<Property>;
  
  // Services
  getServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  
  // Inquiries
  getInquiries(): Promise<Inquiry[]>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class MemStorage implements IStorage {
  private properties: Map<number, Property>;
  private services: Map<number, Service>;
  private inquiries: Map<number, Inquiry>;
  private users: Map<number, User>;
  private currentPropertyId: number;
  private currentServiceId: number;
  private currentInquiryId: number;
  private currentUserId: number;

  constructor() {
    this.properties = new Map();
    this.services = new Map();
    this.inquiries = new Map();
    this.users = new Map();
    this.currentPropertyId = 1;
    this.currentServiceId = 1;
    this.currentInquiryId = 1;
    this.currentUserId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Sample properties
    const sampleProperties: InsertProperty[] = [
      {
        title: "Modern Luxury Villa",
        type: "villa",
        description: "Exclusive luxury villa with premium amenities and breathtaking views in prestigious location.",
        imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        price: 2500000,
        location: "Beverly Hills, CA",
        bedrooms: 5,
        bathrooms: 6,
        area: 8500,
        featured: true
      },
      {
        title: "Contemporary Townhouse",
        type: "townhouse",
        description: "Contemporary townhouse in prime location offering the perfect blend of privacy and community.",
        imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        price: 1200000,
        location: "Manhattan, NY",
        bedrooms: 3,
        bathrooms: 3,
        area: 3200,
        featured: true
      },
      {
        title: "Sophisticated Apartment",
        type: "apartment",
        description: "Sophisticated apartment with modern design and world-class amenities in urban center.",
        imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        price: 850000,
        location: "Miami, FL",
        bedrooms: 2,
        bathrooms: 2,
        area: 1800,
        featured: true
      }
    ];

    sampleProperties.forEach(prop => this.createProperty(prop));

    // Sample services
    const sampleServices: InsertService[] = [
      {
        title: "Buying Properties",
        description: "Comprehensive property acquisition services covering all types of real estate investments with expert guidance.",
        icon: "home",
        features: ["Residential", "Commercial", "Off-Plan", "Consultancy"],
        category: "buying"
      },
      {
        title: "Selling Properties",
        description: "Professional property sales services ensuring optimal market value and smooth transaction processes.",
        icon: "building",
        features: ["Residential", "Commercial", "Off-Plan", "Consultancy"],
        category: "selling"
      },
      {
        title: "Property Management Supervision",
        description: "Complete property oversight services with free consultations across all management aspects.",
        icon: "settings",
        features: ["Property Management Free Consultation", "Property Evaluation Free Consultation", "Mortgage Advisory", "Inspection and Snagging Services", "Industrial Services", "Relocation Services", "Specialized Consultation", "Commercial Property", "Interior Design & Project Execution", "Conveyancing"],
        category: "management"
      },
      {
        title: "Mortgage Advisory",
        description: "Expert mortgage guidance and financing solutions for all property investment scenarios.",
        icon: "calculator",
        features: ["Residential Mortgages", "Commercial Mortgages", "Non-Resident Mortgages", "Financing for Under Construction Properties", "Mortgage Financing", "Shariah Financing Solutions"],
        category: "mortgage"
      },
      {
        title: "Business and Investment Support",
        description: "Comprehensive business setup and investment assistance including immigration services for property investors.",
        icon: "briefcase",
        features: ["Business Set Up", "Financial Services", "Immigration Service Assistance (Golden Visa)"],
        category: "business"
      }
    ];

    sampleServices.forEach(service => this.createService(service));
  }

  // Properties
  async getProperties(): Promise<Property[]> {
    return Array.from(this.properties.values());
  }

  async getPropertiesByType(type: string): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(p => p.type === type);
  }

  async getProperty(id: number): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const id = this.currentPropertyId++;
    const property: Property = { 
      ...insertProperty, 
      id,
      price: insertProperty.price ?? null,
      location: insertProperty.location ?? null,
      bedrooms: insertProperty.bedrooms ?? null,
      bathrooms: insertProperty.bathrooms ?? null,
      area: insertProperty.area ?? null,
      featured: insertProperty.featured ?? null
    };
    this.properties.set(id, property);
    return property;
  }

  // Services
  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getService(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = this.currentServiceId++;
    const service: Service = { 
      ...insertService, 
      id,
      features: insertService.features ?? null
    };
    this.services.set(id, service);
    return service;
  }

  // Inquiries
  async getInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values());
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.currentInquiryId++;
    const inquiry: Inquiry = { 
      ...insertInquiry, 
      id,
      phone: insertInquiry.phone ?? null,
      service: insertInquiry.service ?? null,
      createdAt: new Date()
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
}

export const storage = new MemStorage();
