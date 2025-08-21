import { properties, services, inquiries, users, type Property, type Service, type Inquiry, type User, type UpsertUser, type InsertProperty, type InsertService, type InsertInquiry } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Properties
  getProperties(): Promise<Property[]>;
  getPropertiesByType(type: string): Promise<Property[]>;
  getPropertiesByPartner(partner: string): Promise<Property[]>;
  getProperty(id: number): Promise<Property | undefined>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: number, property: Partial<InsertProperty>): Promise<Property>;
  deleteProperty(id: number): Promise<boolean>;
  
  // Services
  getServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  
  // Inquiries
  getInquiries(): Promise<Inquiry[]>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  
  // Users (for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
}

export class DatabaseStorage implements IStorage {
  // Properties
  async getProperties(): Promise<Property[]> {
    return await db.select().from(properties);
  }

  async getPropertiesByType(type: string): Promise<Property[]> {
    return await db.select().from(properties).where(eq(properties.type, type));
  }

  async getPropertiesByPartner(partner: string): Promise<Property[]> {
    return await db.select().from(properties).where(eq(properties.partner, partner));
  }

  async getProperty(id: number): Promise<Property | undefined> {
    const [property] = await db.select().from(properties).where(eq(properties.id, id));
    return property;
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const [property] = await db
      .insert(properties)
      .values(insertProperty)
      .returning();
    return property;
  }

  async updateProperty(id: number, updateData: Partial<InsertProperty>): Promise<Property> {
    const [property] = await db
      .update(properties)
      .set(updateData)
      .where(eq(properties.id, id))
      .returning();
    return property;
  }

  async deleteProperty(id: number): Promise<boolean> {
    const result = await db.delete(properties).where(eq(properties.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  // Services
  async getServices(): Promise<Service[]> {
    return await db.select().from(services);
  }

  async getService(id: number): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service;
  }

  async createService(insertService: InsertService): Promise<Service> {
    const [service] = await db
      .insert(services)
      .values(insertService)
      .returning();
    return service;
  }

  // Inquiries
  async getInquiries(): Promise<Inquiry[]> {
    return await db.select().from(inquiries);
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const [inquiry] = await db
      .insert(inquiries)
      .values(insertInquiry)
      .returning();
    return inquiry;
  }

  // Users (for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }
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
    // Sample properties organized by partner
    const sampleProperties: InsertProperty[] = [
      // Emaar Properties
      {
        title: "Montiva by Vida",
        type: "apartment",
        description: "Sophisticated apartment in the heart of Dubai Marina with stunning waterfront views and premium amenities.",
        imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        partner: "Emaar",
        price: 1500000,
        location: "Dubai Marina, Dubai",
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        featured: true
      },
      {
        title: "Baystar by VIDA",
        type: "apartment",
        description: "Luxurious waterfront apartment with panoramic views and world-class amenities by VIDA Hotels.",
        imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        partner: "Emaar",
        price: 1800000,
        location: "Dubai Marina, Dubai",
        bedrooms: 3,
        bathrooms: 3,
        area: 1600,
        featured: true
      },
      {
        title: "Selvara3",
        type: "villa",
        description: "Exclusive villa development with contemporary design and premium finishes in prestigious location.",
        imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        partner: "Emaar",
        price: 3500000,
        location: "Arabian Ranches, Dubai",
        bedrooms: 4,
        bathrooms: 5,
        area: 4200,
        featured: true
      },
      // Binghatti Properties
      {
        title: "Binghatti Avenue",
        type: "apartment",
        description: "Modern apartment complex with innovative design and luxury amenities in prime Dubai location.",
        imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        partner: "Binghatti",
        price: 950000,
        location: "Business Bay, Dubai",
        bedrooms: 1,
        bathrooms: 2,
        area: 800,
        featured: true
      },
      {
        title: "Binghatti Stars",
        type: "apartment",
        description: "Iconic tower development with distinctive architectural design and premium facilities.",
        imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        partner: "Binghatti",
        price: 1200000,
        location: "Al Jaddaf, Dubai",
        bedrooms: 2,
        bathrooms: 2,
        area: 1100,
        featured: true
      },
      // Danube Properties
      {
        title: "Danube Diamondz",
        type: "apartment",
        description: "Premium apartment development with modern amenities and strategic location advantages.",
        imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        partner: "Danube Properties",
        price: 850000,
        location: "Jumeirah Lake Towers, Dubai",
        bedrooms: 2,
        bathrooms: 2,
        area: 1000,
        featured: true
      },
      {
        title: "Danube Elitz",
        type: "apartment",
        description: "Contemporary residential tower with excellent connectivity and modern living spaces.",
        imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        partner: "Danube Properties",
        price: 750000,
        location: "Furjan, Dubai",
        bedrooms: 1,
        bathrooms: 1,
        area: 750,
        featured: false
      },
      // Tiger Properties AE
      {
        title: "Tiger Residences",
        type: "villa",
        description: "Luxury villa community with contemporary design and exclusive amenities for discerning residents.",
        imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        partner: "Tiger Properties AE",
        price: 2800000,
        location: "Dubai Land, Dubai",
        bedrooms: 4,
        bathrooms: 4,
        area: 3500,
        featured: true
      },
      // Ellington Properties
      {
        title: "Ellington House",
        type: "townhouse",
        description: "Sophisticated townhouse development with premium finishes and family-oriented community.",
        imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        partner: "Ellington Properties",
        price: 1600000,
        location: "Dubai Hills Estate, Dubai",
        bedrooms: 3,
        bathrooms: 3,
        area: 2200,
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

  async getPropertiesByPartner(partner: string): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(p => p.partner === partner);
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

  // Users (Legacy - for fallback)
  async getUser(id: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(u => u.id === id);
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const existing = Array.from(this.users.values()).find(u => u.id === userData.id);
    if (existing) {
      const updated = { 
        ...existing, 
        ...userData,
        firstName: userData.firstName || null,
        lastName: userData.lastName || null,
        email: userData.email || null,
        profileImageUrl: userData.profileImageUrl || null,
        updatedAt: new Date() 
      };
      this.users.set(parseInt(existing.id), updated);
      return updated;
    } else {
      const newUserId = this.currentUserId++;
      const newUser: User = {
        id: userData.id || newUserId.toString(),
        firstName: userData.firstName || null,
        lastName: userData.lastName || null,
        email: userData.email || null,
        profileImageUrl: userData.profileImageUrl || null,
        isAdmin: userData.isAdmin || false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.users.set(newUserId, newUser);
      return newUser;
    }
  }

  async updateProperty(id: number, updateData: Partial<InsertProperty>): Promise<Property> {
    const existing = this.properties.get(id);
    if (!existing) throw new Error('Property not found');
    const updated = { ...existing, ...updateData };
    this.properties.set(id, updated);
    return updated;
  }

  async deleteProperty(id: number): Promise<boolean> {
    return this.properties.delete(id);
  }
}

export const storage = new DatabaseStorage();
