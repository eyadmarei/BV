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
        title: "Property Search & Legal Advice",
        description: "Expert property identification and comprehensive legal guidance to ensure secure transactions and optimal investment decisions.",
        icon: "building",
        features: ["Market analysis & property sourcing", "Legal due diligence", "Contract negotiation & review"],
        category: "property"
      },
      {
        title: "Business Setup & Residency",
        description: "Complete business formation and residency solutions for international property investors seeking long-term opportunities.",
        icon: "passport",
        features: ["Company incorporation", "Investor visa assistance", "Residency permit processing"],
        category: "business"
      },
      {
        title: "Bank Account Opening",
        description: "Streamlined banking solutions to facilitate property purchases and ongoing financial management in your investment country.",
        icon: "university",
        features: ["Local bank account setup", "International transfer services", "Investment financing options"],
        category: "banking"
      },
      {
        title: "Property Management",
        description: "Full-service property management ensuring your investment maintains its value and generates optimal returns.",
        icon: "building",
        features: ["Tenant placement & screening", "Maintenance & repairs", "Financial reporting & rent collection"],
        category: "management"
      },
      {
        title: "Investor Concierge",
        description: "Personalized concierge services providing ongoing support for all aspects of your property investment journey.",
        icon: "passport",
        features: ["24/7 investor support", "Local market insights", "Investment portfolio optimization"],
        category: "concierge"
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
