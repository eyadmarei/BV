roject Architecture Overview
🏗️ Tech Stack
Frontend (React + TypeScript)
Framework: React 18 with TypeScript
Routing: Wouter for client-side navigation
Styling: Tailwind CSS with shadcn/ui components
State Management: TanStack Query (React Query) for server state
Forms: react-hook-form with Zod validation
Build Tool: Vite (fast dev server & bundler)
Backend (Node.js + Express)
Runtime: Node.js with Express.js
Language: TypeScript with ES modules
Database: PostgreSQL (Neon-hosted)
ORM: Drizzle ORM with Drizzle Kit for migrations
Image Storage: Cloudflare Images API (permanent storage)
Session Management: Express session with PostgreSQL store
📂 File Structure
├── client/               # Frontend React app
│   ├── src/
│   │   ├── pages/       # Page components (Home, Admin, Partners, etc.)
│   │   ├── components/  # Reusable UI components
│   │   └── lib/         # Utilities, queryClient
│
├── server/              # Backend Express app
│   ├── index.ts         # Server entry point
│   ├── routes.ts        # API endpoints
│   ├── storage.ts       # Database interface (IStorage)
│   ├── cloudflareImages.ts  # Cloudflare Images integration
│   └── replitAuth.ts    # Authentication logic
│
├── shared/              # Shared between frontend & backend
│   └── schema.ts        # Database models + Zod schemas
│
└── uploads/             # Local fallback storage (temporary)
    └── images/
🔄 Data Flow Architecture
1. Client Request Flow
User Action → React Component → TanStack Query → API Endpoint → Storage Layer → Database
2. Image Upload Flow
User Upload → LocalImageUploader → /api/upload-image → Cloudflare Images API → Permanent URL
3. Database Schema (PostgreSQL)
Core Tables:

properties - Real estate listings (villas, townhouses, apartments)
partners - Developer partners (Binghatti, SAMANA, etc.)
services - Business services offered
inquiries - Customer contact form submissions
featured_stories - Featured content/news
contact_content - Site contact information
🎯 Key Design Patterns
1. Storage Interface Pattern
// Single interface (IStorage) abstracts all database operations
interface IStorage {
  getProperties(): Promise<Property[]>
  createProperty(data): Promise<Property>
  updateProperty(id, data): Promise<Property>
  // ... etc
}
2. Schema-First Approach
All data models are defined in shared/schema.ts using Drizzle ORM:

Frontend & backend share the same types
Automatic Zod validation schemas from Drizzle models
Type safety across the entire stack
3. Image Storage Strategy
Primary: Cloudflare Images (permanent, CDN-backed)
Fallback: Local filesystem (temporary, for development)
Smart Detection: System checks if Cloudflare is available
🔐 Authentication
Replit Auth integration (currently disabled for development)
Session-based authentication with PostgreSQL store
Admin panel protected by isAuthenticated middleware
📡 API Endpoints
Public APIs:
GET /api/properties - All properties
GET /api/properties/type/:type - Properties by type
GET /api/partners - All partners
GET /api/services - All services
POST /api/inquiries - Submit inquiry
Admin APIs:
GET /api/admin/properties - Manage properties
PUT /api/admin/properties/:id - Update property
POST /api/admin/partners - Create partner
POST /api/upload-image - Upload to Cloudflare Images
🚀 Deployment Architecture
Development:
npm run dev → tsx server/index.ts → Express + Vite dev server on port 5000
Production Build:
npm run build → 
  1. Vite builds React app → dist/public/
  2. esbuild bundles Express → dist/index.js
  3. npm start → runs dist/index.js
Image Storage:
Cloudflare Images: Permanent, survives all deployments
Database: PostgreSQL (Neon), persistent across deployments
Static Assets: Served from dist/public/
✨ Key Features
Full-Stack TypeScript - Type safety from database to UI
Cloudflare Images - Permanent image storage with CDN
Admin Dashboard - Manage properties, partners, services
Responsive Design - Mobile-first with Tailwind CSS
Real-time Updates - TanStack Query cache management
Form Validation - Zod schemas for all inputs
Your current setup:

✅ Cloudflare Images working (11bQr6FDe1XojoXYWD5GtA)
✅ PostgreSQL database connected
✅ React + Express on single port (5000)
✅ Hot reload enabled for development
