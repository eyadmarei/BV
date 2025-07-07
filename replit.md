# Real Estate and Business Services Platform

## Overview

This is a full-stack web application built for a luxury real estate and business services company. The platform showcases properties (villas, townhouses, apartments) and offers comprehensive business services including company formation, visa assistance, and banking solutions. The application follows a modern tech stack with React frontend, Express.js backend, and PostgreSQL database using Drizzle ORM.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query for server state management
- **Animations**: Framer Motion for smooth animations and transitions
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API design
- **Middleware**: Custom logging, JSON parsing, and error handling
- **Development Server**: Vite integration for seamless development experience

### Database Architecture
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with TypeScript-first approach
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Connection**: Neon Database serverless PostgreSQL
- **Schema Location**: Shared schema definitions in `/shared/schema.ts`

## Key Components

### Data Models
1. **Properties**: Real estate listings with type categorization (villa, townhouse, apartment)
2. **Services**: Business services with features and categories
3. **Inquiries**: Customer contact form submissions
4. **Users**: Basic user management system

### Frontend Components
- **Navigation**: Fixed header with mobile-responsive menu
- **Hero Section**: Animated landing section with company branding
- **Property Cards**: Interactive property showcases with animations
- **Service Cards**: Business service presentations with feature lists
- **Contact Forms**: Customer inquiry submission with validation

### API Endpoints
- `GET /api/properties` - Fetch all properties
- `GET /api/properties/type/:type` - Fetch properties by type
- `GET /api/properties/:id` - Fetch single property
- `GET /api/services` - Fetch all services
- `POST /api/inquiries` - Submit customer inquiry

## Data Flow

1. **Client Requests**: React components use TanStack Query to fetch data from API endpoints
2. **API Processing**: Express.js routes handle requests and interact with storage layer
3. **Data Storage**: Storage interface abstracts database operations (currently using in-memory storage for development)
4. **Response Handling**: API responses are cached and managed by TanStack Query
5. **UI Updates**: React components automatically re-render when data changes

The application uses a layered architecture where:
- Frontend components consume data through React Query hooks
- API routes validate requests and delegate to storage layer
- Storage layer handles data persistence and retrieval
- Shared schema ensures type safety across frontend and backend

## External Dependencies

### Core Dependencies
- **Database**: `@neondatabase/serverless` for PostgreSQL connection
- **ORM**: `drizzle-orm` and `drizzle-zod` for database operations and validation
- **UI Framework**: Extensive Radix UI component collection
- **State Management**: `@tanstack/react-query` for server state
- **Styling**: `tailwindcss` with utility classes
- **Animations**: `framer-motion` for smooth transitions
- **Forms**: `react-hook-form` with `@hookform/resolvers` for validation

### Development Tools
- **Build**: Vite with React plugin and TypeScript support
- **Linting**: TypeScript compiler for type checking
- **Development**: Hot module replacement and error overlay
- **Replit Integration**: Custom plugins for Replit environment

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite compiles React application to static assets in `dist/public`
2. **Backend Build**: esbuild bundles Express server to `dist/index.js`
3. **Database Setup**: Drizzle migrations ensure schema is up-to-date

### Environment Configuration
- **Development**: Uses `tsx` for TypeScript execution with hot reload
- **Production**: Compiled JavaScript bundle with Node.js runtime
- **Database**: Environment variable `DATABASE_URL` for PostgreSQL connection

### Deployment Commands
- `npm run dev` - Development server with hot reload
- `npm run build` - Production build for both frontend and backend
- `npm run start` - Production server startup
- `npm run db:push` - Database schema synchronization

The application is designed for easy deployment on platforms supporting Node.js with PostgreSQL databases, with specific optimizations for Replit environment.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

- July 04, 2025: Initial project setup with property showcase and business services
- July 04, 2025: Updated homepage layout - removed hero messaging, moved property cards to top as "Dubai Properties" section
- July 04, 2025: Added dedicated Buy/Sell section with vertical navigation and detailed service offerings
- July 04, 2025: Updated services to focus on property investment: Property Search & Legal Advice, Business Setup & Residency, Bank Account Opening, Property Management, Investor Concierge
- July 04, 2025: Fixed navigation warnings by replacing nested anchor tags with span elements
- July 06, 2025: Added hero video background with overlay boxes for property types and BUY/SELL services
- July 06, 2025: Created dedicated Buy & Sell page with detailed property information and services
- July 06, 2025: Repositioned video to ensure full text visibility, removed animated sidebar component
- July 06, 2025: Final layout: Hero video with transparent overlay boxes + separate detailed Buy/Sell page
- July 07, 2025: Replaced "PRESTIGE" text logo with Best View Properties L.L.C company logo in navigation header

## User Preferences

- Prefers "Dubai Properties" over "Global Projects" 
- Wants property investment focus with confidence messaging
- Likes black and white theme with gold accents
- Wants property cards (Villas, Townhouses, Apartments) as the main hero section
- Prefers Buy/Sell section with detailed vertical service navigation