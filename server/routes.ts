import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { ObjectStorageService, ObjectNotFoundError, objectStorageClient } from "./objectStorage";
import { setupAuth, isAuthenticated, isAdmin } from "./replitAuth";
import { seedDatabase } from "./seedDatabase";
import { insertPropertySchema, insertServiceSchema, insertInquirySchema, insertFeaturedStorySchema, insertContactContentSchema } from "@shared/schema";
import { z } from "zod";
import multer from "multer";
import path from "path";
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication - temporarily disabled to fix issues
  // await setupAuth(app);

  // Seed database if empty (only once on startup)
  try {
    await seedDatabase();
  } catch (error) {
    console.log("Database seeding skipped or failed:", error);
  }

  // Object storage service
  const objectStorageService = new ObjectStorageService();
  // Properties routes
  app.get("/api/properties", async (req, res) => {
    try {
      const properties = await storage.getProperties();
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch properties" });
    }
  });

  app.get("/api/properties/type/:type", async (req, res) => {
    try {
      const { type } = req.params;
      const properties = await storage.getPropertiesByType(type);
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch properties by type" });
    }
  });

  app.get("/api/properties/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const property = await storage.getProperty(id);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      res.json(property);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch property" });
    }
  });

  // Services routes
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  app.get("/api/services/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const service = await storage.getService(id);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });

  // Inquiry routes
  app.post("/api/inquiries", async (req, res) => {
    try {
      const validatedData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(validatedData);
      res.status(201).json(inquiry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid inquiry data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create inquiry" });
    }
  });

  // Admin route to get all inquiries (contact messages)
  app.get("/api/admin/inquiries", /* isAdmin, */ async (req, res) => {
    try {
      const inquiries = await storage.getInquiries();
      res.json(inquiries);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      res.status(500).json({ message: "Failed to fetch inquiries" });
    }
  });

  app.get("/api/inquiries", async (req, res) => {
    try {
      const inquiries = await storage.getInquiries();
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch inquiries" });
    }
  });

  // Featured Stories routes
  app.get("/api/featured-stories", async (req, res) => {
    try {
      const stories = await storage.getFeaturedStories();
      res.json(stories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured stories" });
    }
  });

  app.get("/api/featured-stories/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const story = await storage.getFeaturedStory(id);
      if (!story) {
        return res.status(404).json({ message: "Featured story not found" });
      }
      res.json(story);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured story" });
    }
  });

  app.post("/api/featured-stories", /* isAuthenticated, isAdmin, */ async (req, res) => {
    try {
      const validatedData = insertFeaturedStorySchema.parse(req.body);
      const story = await storage.createFeaturedStory(validatedData);
      res.status(201).json(story);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create featured story" });
    }
  });

  app.put("/api/featured-stories/:id", /* isAuthenticated, isAdmin, */ async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertFeaturedStorySchema.parse(req.body);
      const story = await storage.updateFeaturedStory(id, validatedData);
      if (!story) {
        return res.status(404).json({ message: "Featured story not found" });
      }
      res.json(story);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update featured story" });
    }
  });

  app.delete("/api/featured-stories/:id", /* isAuthenticated, isAdmin, */ async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteFeaturedStory(id);
      if (!success) {
        return res.status(404).json({ message: "Featured story not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete featured story" });
    }
  });

  // Auth routes
  app.get('/api/auth/user', /* isAuthenticated, */ async (req: any, res) => {
    try {
      // Mock user for testing without authentication
      const mockUser = {
        id: "test-user",
        email: "admin@test.com", 
        firstName: "Admin",
        lastName: "User",
        isAdmin: true
      };
      res.json(mockUser);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Object storage routes
  app.get("/public-objects/:filePath(*)", async (req, res) => {
    const filePath = req.params.filePath;
    try {
      const file = await objectStorageService.searchPublicObject(filePath);
      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }
      objectStorageService.downloadObject(file, res);
    } catch (error) {
      console.error("Error searching for public object:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // Local file storage setup
  const storage_multer = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/images/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });

  const upload = multer({ 
    storage: storage_multer,
    limits: {
      fileSize: 50 * 1024 * 1024 // 50MB limit
    }
  });

  // Local file upload endpoint
  app.post("/api/upload-image", /* isAuthenticated, */ upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const imageUrl = `/images/${req.file.filename}`;
      res.json({ imageUrl });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ error: "Failed to upload file" });
    }
  });

  // Serve local images
  app.get("/images/:filename", (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.join(process.cwd(), 'uploads', 'images', filename);
    
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ error: "Image not found" });
    }
    
    res.sendFile(imagePath);
  });

  // Admin routes for property management
  app.get('/api/admin/properties', /* isAuthenticated, isAdmin, */ async (req, res) => {
    try {
      const properties = await storage.getProperties();
      res.json(properties);
    } catch (error) {
      console.error('Error fetching properties:', error);
      res.status(500).json({ message: 'Failed to fetch properties' });
    }
  });

  app.post('/api/admin/properties', /* isAuthenticated, isAdmin, */ async (req, res) => {
    try {
      const validatedData = insertPropertySchema.parse(req.body);
      const property = await storage.createProperty(validatedData);
      res.status(201).json(property);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid property data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create property" });
    }
  });

  app.put('/api/admin/properties/:id', /* isAuthenticated, isAdmin, */ async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertPropertySchema.partial().parse(req.body);
      const property = await storage.updateProperty(id, validatedData);
      res.json(property);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid property data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update property" });
    }
  });

  app.delete('/api/admin/properties/:id', /* isAuthenticated, isAdmin, */ async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteProperty(id);
      if (success) {
        res.json({ message: 'Property deleted successfully' });
      } else {
        res.status(404).json({ message: 'Property not found' });
      }
    } catch (error) {
      console.error('Error deleting property:', error);
      res.status(500).json({ message: 'Failed to delete property' });
    }
  });

  app.put('/api/admin/properties/:id/image', /* isAuthenticated, isAdmin, */ async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { imageURL } = req.body;
      
      if (!imageURL) {
        return res.status(400).json({ error: 'imageURL is required' });
      }

      const normalizedPath = objectStorageService.normalizeObjectEntityPath(imageURL);
      await storage.updateProperty(id, { imageUrl: normalizedPath });
      
      res.json({ 
        message: 'Image updated successfully',
        imagePath: normalizedPath 
      });
    } catch (error) {
      console.error('Error updating property image:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Contact Content routes
  app.get('/api/contact-content', async (req, res) => {
    try {
      const content = await storage.getContactContent();
      if (!content) {
        // Return default content if none exists
        const defaultContent = {
          title: "Ready to Get Started?",
          subtitle: "Contact our expert team today",
          description: "Contact our expert team today to discuss your property and business service needs. We're here to provide personalized solutions for your success.",
          phone: "+971 XXX-XXXX",
          email: "info@bestviewproperties.com",
          address: "Dubai, United Arab Emirates",
          officeHours: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM"
        };
        return res.json(defaultContent);
      }
      res.json(content);
    } catch (error) {
      console.error('Error fetching contact content:', error);
      res.status(500).json({ message: 'Failed to fetch contact content' });
    }
  });

  app.post('/api/admin/contact-content', /* isAuthenticated, isAdmin, */ async (req, res) => {
    try {
      const validatedData = insertContactContentSchema.parse(req.body);
      const content = await storage.createContactContent(validatedData);
      res.json(content);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid contact content data", errors: error.errors });
      }
      console.error('Error creating contact content:', error);
      res.status(500).json({ message: 'Failed to create contact content' });
    }
  });

  app.put('/api/admin/contact-content/:id', /* isAuthenticated, isAdmin, */ async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertContactContentSchema.partial().parse(req.body);
      const content = await storage.updateContactContent(id, validatedData);
      if (!content) {
        return res.status(404).json({ message: 'Contact content not found' });
      }
      res.json(content);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid contact content data", errors: error.errors });
      }
      console.error('Error updating contact content:', error);
      res.status(500).json({ message: 'Failed to update contact content' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
