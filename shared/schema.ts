import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(), // 'villa', 'townhouse', 'apartment'
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  price: integer("price"),
  location: text("location"),
  bedrooms: integer("bedrooms"),
  bathrooms: integer("bathrooms"),
  area: integer("area"), // in sq ft
  featured: boolean("featured").default(false),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  features: text("features").array(),
  category: text("category").notNull(), // 'business', 'visa', 'banking'
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  service: text("service"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  createdAt: true,
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type Property = typeof properties.$inferSelect;
export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

// PM Tools Schema
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  startDate: timestamp("start_date").defaultNow(),
  endDate: timestamp("end_date"),
  status: text("status").notNull().default("active"), // 'active', 'completed', 'on-hold'
  totalBudget: integer("total_budget"),
});

export const releases = pgTable("releases", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id),
  title: text("title").notNull(),
  theme: text("theme"),
  order: integer("order").notNull().default(1),
});

export const phases = pgTable("phases", {
  id: serial("id").primaryKey(),
  releaseId: integer("release_id").references(() => releases.id),
  name: text("name").notNull(),
  week: integer("week").notNull(),
  status: text("status").notNull().default("pending"), // 'pending', 'in-progress', 'completed'
  isDemo: boolean("is_demo").default(false),
  isMvp: boolean("is_mvp").default(false),
});

export const milestones = pgTable("milestones", {
  id: serial("id").primaryKey(),
  releaseId: integer("release_id").references(() => releases.id),
  title: text("title").notNull(),
  description: text("description"),
  amount: integer("amount").notNull(),
  type: text("type").notNull(), // 'kickoff', 'completion'
  isPaid: boolean("is_paid").default(false),
  dueDate: timestamp("due_date"),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
});

export const insertReleaseSchema = createInsertSchema(releases).omit({
  id: true,
});

export const insertPhaseSchema = createInsertSchema(phases).omit({
  id: true,
});

export const insertMilestoneSchema = createInsertSchema(milestones).omit({
  id: true,
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Release = typeof releases.$inferSelect;
export type InsertRelease = z.infer<typeof insertReleaseSchema>;
export type Phase = typeof phases.$inferSelect;
export type InsertPhase = z.infer<typeof insertPhaseSchema>;
export type Milestone = typeof milestones.$inferSelect;
export type InsertMilestone = z.infer<typeof insertMilestoneSchema>;
