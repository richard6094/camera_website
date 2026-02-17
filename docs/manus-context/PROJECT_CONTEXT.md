# Mandler Premium Brand Homepage - Project Context

## Project Overview

This is a premium brand homepage for **Mandler**, a fictional high-end camera lens manufacturer inspired by Leica's design philosophy and craftsmanship. The website showcases the brand's heritage, products (E39 and E39 Special Edition lenses), and commitment to optical excellence.

## Design Philosophy

### Core Principles
1. **Leica-Inspired Aesthetics** - Minimalist, elegant, and timeless design
2. **Craftsmanship Focus** - Emphasizing hand-crafted quality and artisan tradition
3. **Premium Experience** - High-end visual presentation with sophisticated interactions
4. **Photographic Heritage** - Celebrating the art and tradition of film photography

### Visual Language
- **Color Palette**: Monochromatic with subtle warm accents (see DESIGN_SYSTEM.md)
- **Typography**: Clean, readable fonts with generous spacing
- **Imagery**: Black & white photography, artisan craftsmanship, vintage cameras
- **Motion**: Smooth parallax effects, gentle transitions, auto-scrolling galleries

## Product Structure

### Current Products
1. **Mandler (Hero/Brand Story)**
   - Type: Brand introduction hero section
   - Image: Artisan hand-crafting camera
   - Tagline: "光，拥有自己的语言" (Light has its own language)
   - Description: Continuing the legendary optical designer's classic

2. **E39**
   - Type: 35mm prime lens
   - Price: ¥12,800
   - Tagline: "经典焦段，纯粹视角" (Classic focal length, pure perspective)
   - Key Features: f/1.4 aperture, 8 groups 11 elements, 320g weight
   - Stock: In stock

3. **E39 Special Edition**
   - Type: Limited edition 35mm prime lens
   - Price: ¥28,800 (original ¥32,000)
   - Tagline: "匠心之作，限量典藏" (Crafted excellence, limited collection)
   - Key Features: f/1.4 ASPH, brass + titanium body, 0.25m close focus
   - Stock: Limited (only 12 remaining)
   - Limit: 3 per customer

## Technical Stack

### Frontend
- **Framework**: React 19 + TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **Styling**: Tailwind CSS 4 + shadcn/ui components
- **Build Tool**: Vite
- **Package Manager**: pnpm

### Key Dependencies
- `lucide-react` - Icon library
- `wouter` - Client-side routing
- `@radix-ui/*` - Accessible UI primitives (via shadcn/ui)
- `sonner` - Toast notifications

### Project Structure
```
client/
├── public/           # Static assets (images, fonts)
├── src/
│   ├── components/   # Reusable UI components
│   ├── contexts/     # React contexts (Language, Cart)
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utilities and translations
│   ├── pages/        # Page components
│   ├── App.tsx       # Main app with routing
│   ├── main.tsx      # React entry point
│   └── index.css     # Global styles and design tokens
server/               # Placeholder (static-only template)
shared/               # Shared constants and types
```

## Key Features Implemented

### 1. Horizontal Hero Showcase
- **Component**: `HorizontalProductShowcase.tsx`
- **Features**:
  - Horizontal scrolling gallery with snap points
  - Parallax effects on background images
  - Auto-scroll every 5 seconds (pauses 10s on manual interaction)
  - Bottom thumbnail navigation bar
  - Gradient mask for ultra-wide screen adaptation
  - Responsive height (100vh, min 700px, max 1080px)

### 2. Header with Auto-Hide
- **Component**: `Header.tsx`
- **Features**:
  - Fixed position header
  - Auto-hides on scroll down (after 100px)
  - Reappears on scroll up
  - Always visible at page top (< 10px scroll)
  - Smooth 300ms transition
  - Responsive product menu (E39, E39 Special Edition)

### 3. Product Detail Pages
- **Pages**: `ProductE39.tsx`, `ProductE39Special.tsx`
- **Features**:
  - Image gallery with thumbnails
  - Detailed specifications table
  - Pricing and stock information
  - Quantity selector and purchase buttons
  - Product features grid
  - Back to home navigation
  - Responsive layout (pt-16 md:pt-20 to prevent header overlap)

### 4. Internationalization
- **Implementation**: `LanguageContext.tsx` + `translations.ts`
- **Languages**: Chinese (zh) and English (en)
- **Coverage**: All UI text, product descriptions, navigation

### 5. Shopping Cart (Placeholder)
- **Context**: `CartContext.tsx`
- **Status**: Structure implemented, full functionality pending
- **Features**: Add to cart, cart count display

## Design Decisions & Optimizations

### Ultra-Wide Screen Adaptation
- **Problem**: Images stretched/compressed on ultra-wide displays
- **Solution**:
  - Gradient mask on left/right edges (`linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)`)
  - Blurred background layer for edge filling
  - Max width constraint (`max-w-[177.78vh]` for 16:9 ratio)
  - Max height limit (1080px) to prevent excessive compression

### Hero CTA Button Spacing
- **Problem**: Button too close to bottom navigation on wide screens
- **Solution**: Added responsive bottom margin (`mb-20 sm:mb-24 md:mb-28`)

### Auto-Scroll Behavior
- **Implementation**:
  - Auto-scroll interval: 5 seconds
  - Manual interaction pause: 10 seconds
  - Smooth scroll with `behavior: 'smooth'`
  - Cleanup on component unmount

## Known Issues & Future Work

### TypeScript Errors
- `translations.ts` line 425: Type mismatch in brand story translations
- **Impact**: Does not affect runtime, only type checking
- **TODO**: Fix type definitions for nested translation objects

### Pending Features
1. Shopping cart functionality (add/remove items, checkout)
2. User authentication and account management
3. Product comparison feature
4. User reviews and ratings
5. Product video demonstrations
6. Advanced filtering and search

## Development Guidelines

### Code Style
- Use functional components with hooks
- Prefer `const` over `let`
- Use TypeScript for type safety
- Follow Tailwind utility-first approach
- Keep components modular and reusable

### Naming Conventions
- Components: PascalCase (e.g., `HorizontalProductShowcase`)
- Files: Match component name (e.g., `HorizontalProductShowcase.tsx`)
- CSS classes: Tailwind utilities + semantic names
- Contexts: `use` prefix for hooks (e.g., `useLanguage`)

### Best Practices
- Always add `alt` text to images
- Use semantic HTML elements
- Ensure keyboard accessibility
- Test on multiple screen sizes
- Optimize images (use CDN URLs from `manus-upload-file`)
- Avoid inline styles except for dynamic values

## Deployment

### Current Setup
- **Platform**: Manus webdev hosting
- **Domain**: Auto-generated `.manus.space` subdomain
- **CDN**: Manus CDN for static assets
- **GitHub**: Synced to `richard6094/camera_website`

### Build Process
- Development: `pnpm dev` (Vite dev server on port 3000)
- Production: Handled by Manus platform
- Checkpoints: Use `webdev_save_checkpoint` before major changes

## Contact & Resources

- **Repository**: https://github.com/richard6094/camera_website
- **Design Inspiration**: Leica Camera AG, premium lens manufacturers
- **Asset Sources**: Generated images, Unsplash, custom photography
