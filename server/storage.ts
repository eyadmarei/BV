import { properties, services, inquiries, users, featuredStories, contactContent, partners, type Property, type Service, type Inquiry, type User, type UpsertUser, type InsertProperty, type InsertService, type InsertInquiry, type FeaturedStory, type InsertFeaturedStory, type ContactContent, type InsertContactContent, type Partner, type InsertPartner } from "@shared/schema";
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
  
  // Featured Stories
  getFeaturedStories(): Promise<FeaturedStory[]>;
  getFeaturedStory(id: number): Promise<FeaturedStory | undefined>;
  createFeaturedStory(story: InsertFeaturedStory): Promise<FeaturedStory>;
  updateFeaturedStory(id: number, story: Partial<InsertFeaturedStory>): Promise<FeaturedStory | undefined>;
  deleteFeaturedStory(id: number): Promise<boolean>;
  
  // Contact Content
  getContactContent(): Promise<ContactContent | undefined>;
  createContactContent(content: InsertContactContent): Promise<ContactContent>;
  updateContactContent(id: number, content: Partial<InsertContactContent>): Promise<ContactContent | undefined>;
  
  // Partners
  getPartners(): Promise<Partner[]>;
  getPartner(id: number): Promise<Partner | undefined>;
  getPartnerByName(name: string): Promise<Partner | undefined>;
  createPartner(partner: InsertPartner): Promise<Partner>;
  updatePartner(id: number, partner: Partial<InsertPartner>): Promise<Partner | undefined>;
  deletePartner(id: number): Promise<boolean>;
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
    return await db.select().from(inquiries).orderBy(inquiries.createdAt);
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

  // Featured Stories
  async getFeaturedStories(): Promise<FeaturedStory[]> {
    return await db.select().from(featuredStories);
  }

  async getFeaturedStory(id: number): Promise<FeaturedStory | undefined> {
    const [story] = await db.select().from(featuredStories).where(eq(featuredStories.id, id));
    return story;
  }

  async createFeaturedStory(insertStory: InsertFeaturedStory): Promise<FeaturedStory> {
    const [story] = await db
      .insert(featuredStories)
      .values(insertStory)
      .returning();
    return story;
  }

  async updateFeaturedStory(id: number, updateData: Partial<InsertFeaturedStory>): Promise<FeaturedStory | undefined> {
    const [story] = await db
      .update(featuredStories)
      .set(updateData)
      .where(eq(featuredStories.id, id))
      .returning();
    return story;
  }

  async deleteFeaturedStory(id: number): Promise<boolean> {
    const result = await db.delete(featuredStories).where(eq(featuredStories.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  // Contact Content
  async getContactContent(): Promise<ContactContent | undefined> {
    const [content] = await db.select().from(contactContent);
    return content;
  }

  async createContactContent(insertContent: InsertContactContent): Promise<ContactContent> {
    const [content] = await db
      .insert(contactContent)
      .values(insertContent)
      .returning();
    return content;
  }

  async updateContactContent(id: number, updateData: Partial<InsertContactContent>): Promise<ContactContent | undefined> {
    const [content] = await db
      .update(contactContent)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(contactContent.id, id))
      .returning();
    return content;
  }

  // Partners
  async getPartners(): Promise<Partner[]> {
    return await db.select().from(partners);
  }

  async getPartner(id: number): Promise<Partner | undefined> {
    const [partner] = await db.select().from(partners).where(eq(partners.id, id));
    return partner;
  }

  async getPartnerByName(name: string): Promise<Partner | undefined> {
    const [partner] = await db.select().from(partners).where(eq(partners.name, name));
    return partner;
  }

  async createPartner(insertPartner: InsertPartner): Promise<Partner> {
    const [partner] = await db
      .insert(partners)
      .values(insertPartner)
      .returning();
    return partner;
  }

  async updatePartner(id: number, updateData: Partial<InsertPartner>): Promise<Partner | undefined> {
    const [partner] = await db
      .update(partners)
      .set(updateData)
      .where(eq(partners.id, id))
      .returning();
    return partner;
  }

  async deletePartner(id: number): Promise<boolean> {
    const result = await db.delete(partners).where(eq(partners.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }
}

export class MemStorage implements IStorage {
  private properties: Map<number, Property>;
  private services: Map<number, Service>;
  private inquiries: Map<number, Inquiry>;
  private users: Map<number, User>;
  private featuredStories: Map<number, FeaturedStory>;
  private partners: Map<number, Partner>;
  private currentPropertyId: number;
  private currentServiceId: number;
  private currentInquiryId: number;
  private currentUserId: number;
  private currentFeaturedStoryId: number;
  private currentPartnerId: number;

  constructor() {
    this.properties = new Map();
    this.services = new Map();
    this.inquiries = new Map();
    this.users = new Map();
    this.featuredStories = new Map();
    this.partners = new Map();
    this.currentPropertyId = 1;
    this.currentServiceId = 1;
    this.currentInquiryId = 1;
    this.currentUserId = 1;
    this.currentFeaturedStoryId = 1;
    this.currentPartnerId = 1;
    
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
      featured: insertProperty.featured ?? null,
      brochureUrl: insertProperty.brochureUrl ?? null
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

  // Featured Stories - Memory Storage implementation
  async getFeaturedStories(): Promise<FeaturedStory[]> {
    return Array.from(this.featuredStories.values());
  }

  async getFeaturedStory(id: number): Promise<FeaturedStory | undefined> {
    return this.featuredStories.get(id);
  }

  async createFeaturedStory(insertStory: InsertFeaturedStory): Promise<FeaturedStory> {
    const id = this.currentFeaturedStoryId++;
    const story: FeaturedStory = {
      id,
      ...insertStory,
      featured: insertStory.featured ?? null,
      createdAt: new Date(),
      publishedAt: insertStory.publishedAt || new Date(),
    };
    this.featuredStories.set(id, story);
    return story;
  }

  async updateFeaturedStory(id: number, updateData: Partial<InsertFeaturedStory>): Promise<FeaturedStory | undefined> {
    const existing = this.featuredStories.get(id);
    if (!existing) return undefined;

    const updated: FeaturedStory = {
      ...existing,
      ...updateData,
    };
    this.featuredStories.set(id, updated);
    return updated;
  }

  async deleteFeaturedStory(id: number): Promise<boolean> {
    return this.featuredStories.delete(id);
  }

  // Contact Content - Memory Storage implementation
  private contactContentData: ContactContent | undefined;
  
  async getContactContent(): Promise<ContactContent | undefined> {
    return this.contactContentData;
  }

  async createContactContent(insertContent: InsertContactContent): Promise<ContactContent> {
    const id = 1;
    const content: ContactContent = {
      id,
      ...insertContent,
      updatedAt: new Date(),
    };
    this.contactContentData = content;
    return content;
  }

  async updateContactContent(id: number, updateData: Partial<InsertContactContent>): Promise<ContactContent | undefined> {
    if (!this.contactContentData) return undefined;
    
    const updated: ContactContent = {
      ...this.contactContentData,
      ...updateData,
      updatedAt: new Date(),
    };
    this.contactContentData = updated;
    return updated;
  }

  // Partners - Memory Storage implementation
  async getPartners(): Promise<Partner[]> {
    return Array.from(this.partners.values());
  }

  async getPartner(id: number): Promise<Partner | undefined> {
    return this.partners.get(id);
  }

  async getPartnerByName(name: string): Promise<Partner | undefined> {
    return Array.from(this.partners.values()).find(p => p.name === name);
  }

  async createPartner(insertPartner: InsertPartner): Promise<Partner> {
    const id = this.currentPartnerId++;
    const partner: Partner = {
      id,
      ...insertPartner,
      established: insertPartner.established ?? null,
      totalProperties: insertPartner.totalProperties ?? null,
      showOnHomePage: insertPartner.showOnHomePage ?? true,
      createdAt: new Date(),
    };
    this.partners.set(id, partner);
    return partner;
  }

  async updatePartner(id: number, updateData: Partial<InsertPartner>): Promise<Partner | undefined> {
    const existing = this.partners.get(id);
    if (!existing) return undefined;
    
    const updated: Partner = {
      ...existing,
      ...updateData,
    };
    this.partners.set(id, updated);
    return updated;
  }

  async deletePartner(id: number): Promise<boolean> {
    return this.partners.delete(id);
  }
}

export const storage = new DatabaseStorage();
