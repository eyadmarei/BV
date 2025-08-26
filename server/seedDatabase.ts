import { storage } from "./storage";
import type { InsertProperty, InsertService, InsertPartner } from "@shared/schema";

export async function seedDatabase() {
  try {
    // Check if data already exists
    const existingProperties = await storage.getProperties();
    if (existingProperties.length > 0) {
      console.log("Database already seeded");
      return;
    }

    console.log("Seeding database...");

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

    // Insert properties
    for (const property of sampleProperties) {
      await storage.createProperty(property);
    }

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

    // Insert services
    for (const service of sampleServices) {
      await storage.createService(service);
    }

    // Sample partners
    const samplePartners: InsertPartner[] = [
      {
        name: "Binghatti",
        logo: "/images/binghatti-logo.png",
        description: "Innovative architectural designs with distinctive lifestyle developments",
        established: "2008",
        totalProperties: 25
      },
      {
        name: "Danube Properties",
        logo: "/images/danube-logo.png",
        description: "Affordable luxury properties with modern amenities and prime locations",
        established: "1993",
        totalProperties: 30
      },
      {
        name: "Ellington Properties",
        logo: "/images/ellington-logo.png",
        description: "Contemporary design-focused developments in premium Dubai locations",
        established: "2014",
        totalProperties: 18
      },
      {
        name: "Emaar",
        logo: "/images/emaar-logo.png",
        description: "World-class developments including Dubai Mall, Burj Khalifa and luxury communities",
        established: "1997",
        totalProperties: 45
      },
      {
        name: "Iman Developers",
        logo: "/images/iman-logo.png",
        description: "Quality residential and commercial developments with modern infrastructure",
        established: "2010",
        totalProperties: 22
      },
      {
        name: "Marquis",
        logo: "/images/marquis-logo.png",
        description: "Luxury residential projects with premium finishes and exclusive amenities",
        established: "2015",
        totalProperties: 12
      },
      {
        name: "Rabdan",
        logo: "/images/rabdan-logo.png",
        description: "Sustainable and innovative property developments in key Dubai areas",
        established: "2012",
        totalProperties: 16
      },
      {
        name: "Tiger Properties AE",
        logo: "/images/tiger-logo.png",
        description: "Premium villa communities and luxury residential developments",
        established: "2011",
        totalProperties: 20
      }
    ];

    // Insert partners
    for (const partner of samplePartners) {
      await storage.createPartner(partner);
    }

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}