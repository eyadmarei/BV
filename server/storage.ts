import { 
  properties, services, inquiries, users, projects, releases, phases, milestones,
  type Property, type Service, type Inquiry, type User, 
  type Project, type Release, type Phase, type Milestone,
  type InsertProperty, type InsertService, type InsertInquiry, type InsertUser,
  type InsertProject, type InsertRelease, type InsertPhase, type InsertMilestone
} from "@shared/schema";

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

  // PM Tools - Projects
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;

  // PM Tools - Releases
  getReleases(projectId?: number): Promise<Release[]>;
  getRelease(id: number): Promise<Release | undefined>;
  createRelease(release: InsertRelease): Promise<Release>;

  // PM Tools - Phases
  getPhases(releaseId?: number): Promise<Phase[]>;
  getPhase(id: number): Promise<Phase | undefined>;
  createPhase(phase: InsertPhase): Promise<Phase>;
  updatePhase(id: number, updates: Partial<Phase>): Promise<Phase>;

  // PM Tools - Milestones
  getMilestones(releaseId?: number): Promise<Milestone[]>;
  getMilestone(id: number): Promise<Milestone | undefined>;
  createMilestone(milestone: InsertMilestone): Promise<Milestone>;
  updateMilestone(id: number, updates: Partial<Milestone>): Promise<Milestone>;
}

export class MemStorage implements IStorage {
  private properties: Map<number, Property>;
  private services: Map<number, Service>;
  private inquiries: Map<number, Inquiry>;
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private releases: Map<number, Release>;
  private phases: Map<number, Phase>;
  private milestones: Map<number, Milestone>;
  private currentPropertyId: number;
  private currentServiceId: number;
  private currentInquiryId: number;
  private currentUserId: number;
  private currentProjectId: number;
  private currentReleaseId: number;
  private currentPhaseId: number;
  private currentMilestoneId: number;

  constructor() {
    this.properties = new Map();
    this.services = new Map();
    this.inquiries = new Map();
    this.users = new Map();
    this.projects = new Map();
    this.releases = new Map();
    this.phases = new Map();
    this.milestones = new Map();
    this.currentPropertyId = 1;
    this.currentServiceId = 1;
    this.currentInquiryId = 1;
    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.currentReleaseId = 1;
    this.currentPhaseId = 1;
    this.currentMilestoneId = 1;
    
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

    // Sample PM Tools data
    this.initializePMToolsData().catch(console.error);
  }

  private async initializePMToolsData() {
    // Create a sample project
    const project = await this.createProject({
      title: "Order Management Release Plan",
      description: "Complete order management system development project",
      totalBudget: 20000,
      status: "active"
    });

    // Create releases
    const releases = [
      { title: "R1 - Customer & Orders", theme: "Start with the Customer", order: 1 },
      { title: "R2 - Internal Workflow", theme: "Track & Approve Orders", order: 2 },
      { title: "R3 - Warehouse Fulfillment", theme: "Approval to Delivery", order: 3 },
      { title: "R4 - Integration & Enhancements", theme: "Connect & Finalize", order: 4 }
    ];

    const phaseNames = ["Setup", "Preparation", "Development", "Demo & Review", "Refinement", "UAT & MVP"];
    
    for (let releaseIndex = 0; releaseIndex < releases.length; releaseIndex++) {
      const releaseData = releases[releaseIndex];
      const release = await this.createRelease({
        projectId: project.id,
        ...releaseData
      });

      // Create phases for each release
      for (let phaseIndex = 0; phaseIndex < phaseNames.length; phaseIndex++) {
        const phaseName = phaseNames[phaseIndex];
        await this.createPhase({
          releaseId: release.id,
          name: phaseName,
          week: phaseIndex,
          status: "pending",
          isDemo: phaseName === "Demo & Review",
          isMvp: phaseName === "UAT & MVP"
        });
      }

      // Create milestones for each release
      await this.createMilestone({
        releaseId: release.id,
        title: `Milestone ${releaseIndex * 2 + 1}`,
        description: "Kickoff & Invoice",
        amount: 1500,
        type: "kickoff",
        isPaid: false
      });

      await this.createMilestone({
        releaseId: release.id,
        title: `Milestone ${releaseIndex * 2 + 2}`,
        description: "Acceptance Testing & Finalization Complete",
        amount: 3500,
        type: "completion",
        isPaid: false
      });
    }
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

  // PM Tools - Projects
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = { 
      id,
      title: insertProject.title,
      description: insertProject.description ?? null,
      startDate: insertProject.startDate ?? new Date(),
      endDate: insertProject.endDate ?? null,
      status: insertProject.status ?? "active",
      totalBudget: insertProject.totalBudget ?? null
    };
    this.projects.set(id, project);
    return project;
  }

  // PM Tools - Releases
  async getReleases(projectId?: number): Promise<Release[]> {
    const releases = Array.from(this.releases.values());
    return projectId ? releases.filter(r => r.projectId === projectId) : releases;
  }

  async getRelease(id: number): Promise<Release | undefined> {
    return this.releases.get(id);
  }

  async createRelease(insertRelease: InsertRelease): Promise<Release> {
    const id = this.currentReleaseId++;
    const release: Release = { 
      id,
      title: insertRelease.title,
      projectId: insertRelease.projectId ?? null,
      theme: insertRelease.theme ?? null,
      order: insertRelease.order ?? 1
    };
    this.releases.set(id, release);
    return release;
  }

  // PM Tools - Phases
  async getPhases(releaseId?: number): Promise<Phase[]> {
    const phases = Array.from(this.phases.values());
    return releaseId ? phases.filter(p => p.releaseId === releaseId) : phases;
  }

  async getPhase(id: number): Promise<Phase | undefined> {
    return this.phases.get(id);
  }

  async createPhase(insertPhase: InsertPhase): Promise<Phase> {
    const id = this.currentPhaseId++;
    const phase: Phase = { 
      id,
      name: insertPhase.name,
      week: insertPhase.week,
      status: insertPhase.status ?? "pending",
      releaseId: insertPhase.releaseId ?? null,
      isDemo: insertPhase.isDemo ?? null,
      isMvp: insertPhase.isMvp ?? null
    };
    this.phases.set(id, phase);
    return phase;
  }

  async updatePhase(id: number, updates: Partial<Phase>): Promise<Phase> {
    const phase = this.phases.get(id);
    if (!phase) {
      throw new Error(`Phase with id ${id} not found`);
    }
    const updatedPhase = { ...phase, ...updates };
    this.phases.set(id, updatedPhase);
    return updatedPhase;
  }

  // PM Tools - Milestones
  async getMilestones(releaseId?: number): Promise<Milestone[]> {
    const milestones = Array.from(this.milestones.values());
    return releaseId ? milestones.filter(m => m.releaseId === releaseId) : milestones;
  }

  async getMilestone(id: number): Promise<Milestone | undefined> {
    return this.milestones.get(id);
  }

  async createMilestone(insertMilestone: InsertMilestone): Promise<Milestone> {
    const id = this.currentMilestoneId++;
    const milestone: Milestone = { 
      ...insertMilestone,
      id,
      releaseId: insertMilestone.releaseId ?? null,
      description: insertMilestone.description ?? null,
      isPaid: insertMilestone.isPaid ?? null,
      dueDate: insertMilestone.dueDate ?? null
    };
    this.milestones.set(id, milestone);
    return milestone;
  }

  async updateMilestone(id: number, updates: Partial<Milestone>): Promise<Milestone> {
    const milestone = this.milestones.get(id);
    if (!milestone) {
      throw new Error(`Milestone with id ${id} not found`);
    }
    const updatedMilestone = { ...milestone, ...updates };
    this.milestones.set(id, updatedMilestone);
    return updatedMilestone;
  }
}

export const storage = new MemStorage();
