# Mandler Lens - Project Context

## Project Overview

This is the official website for **Mandler Lens**, a high-end camera lens manufacturer inspired by Leica's design philosophy and craftsmanship. The website showcases the brand's heritage, products (E39 and E39 Special Edition lenses), and commitment to optical excellence.

## Design Philosophy

### Core Principles
1. **Leica-Inspired Aesthetics** - Minimalist, elegant, and timeless design
2. **Craftsmanship Focus** - Emphasizing hand-crafted quality and artisan tradition
3. **Premium Experience** - High-end visual presentation with sophisticated interactions
4. **Photographic Heritage** - Celebrating the art and tradition of film photography

### Visual Language
- **Color Palette**: Monochromatic with subtle warm accents (see DESIGN_SYSTEM.md)
- **Typography**: Clean, readable fonts with generous spacing
- **Imagery**: Product photography, artisan craftsmanship, AI-generated cover art
- **Motion**: Smooth parallax effects, gentle transitions, auto-scrolling galleries

## Product Structure

### Current Products
1. **Mandler (Hero/Brand Story)**
   - Type: Brand introduction hero section
   - Image: AI-generated cover (`/images/AI-generated-images/封面.jpg`)
   - Tagline: "光，拥有自己的语言" (Light has its own language)
   - Description: Continuing the legendary optical designer's classic

2. **35mm F/2** (internal code: E39)
   - Type: 35mm prime lens
   - Display Name: "35mm F/2"
   - Pricing: ¥12,800 (CNY) / ¥278,000 (JPY) / $1,899 (USD)
   - Tagline: "经典焦段，纯粹视角" (Classic focal length, pure perspective)
   - Detail Page Specs: f/1.4 aperture, 8 groups 11 elements, 11 aperture blades, 0.3m MFD, 52mm filter, 320g, M mount
   - Intro Page Narrative: F2.0, 7E/5G Double Gaussian, purple-gold multi-layer coating, 10-blade aperture, 34mm compact length
   - Stock: In stock
   - Routes: `/products/35mm-f2` (store), `/products/35mm-f2-intro` (editorial)

3. **35mm F/2 特别版 / Special Edition** (internal code: E39 Special)
   - Type: Limited edition 35mm prime lens
   - Display Name: "35mm F/2 特别版" (zh) / "35mm F/2 特別版" (ja) / "35mm F/2 Special Edition" (en)
   - Pricing: ¥28,800 (orig ¥32,000 CNY) / ¥628,000 (orig ¥698,000 JPY) / $4,299 (orig $4,799 USD)
   - Tagline: "匠心之作，限量典藏" (Crafted excellence, limited collection)
   - Key Features: f/1.4 ASPH, 9 groups 12 elements (2 aspherical), brass + titanium body, 0.25m close focus, 340g, M mount
   - Stock: Limited (only 12 remaining), globally limited to 500 units
   - Limit: 3 per customer
   - Routes: `/products/35mm-f2-special` (store), `/products/35mm-f2-special-intro` (editorial)

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
  - Fixed position header with hamburger menu (left), brand logo (center), cart icon (right)
  - Auto-hides on scroll down (after 100px)
  - Reappears on scroll up
  - Always visible at page top (< 10px scroll)
  - Smooth 300ms transition
  - Compact dropdown navigation panel with submenu support
  - Responsive product menu (35mm F/2, 35mm F/2 Special Edition)
  - Trilingual language switcher (🇨🇳中文 / 🇺🇸English / 🇯🇵日本語)
  - Cart icon shows coming-soon toast notification

### 3. Product Detail Pages
- **Pages**: `Product35mmF2.tsx`, `Product35mmF2Special.tsx`
- **Features**:
  - Image gallery with thumbnails
  - Detailed specifications table
  - Pricing and stock information
  - Quantity selector and purchase buttons
  - Product features grid
  - Back to home navigation
  - Responsive layout (pt-16 md:pt-20 to prevent header overlap)

### 3.1 Product Introduction Pages (Editorial Style)
- **Pages**: `Product35mmF2Intro.tsx`, `Product35mmF2SpecialIntro.tsx`
- **Features**:
  - Brand-story-like full-screen hero with cinematic imagery
  - Two-column editorial narrative sections
  - Full-bleed image transitions and parallax pull-quote dividers
  - Non-commerce storytelling focused on product philosophy and craftsmanship
  - Route separation from store pages to keep presentation and shopping flows distinct
  - **E39 Intro expanded sections**: Legendary Optical Architecture (7E/5G Double Gaussian, spec mini-cards), F2 Aperture Character (wide-open vs stopped-down comparison), Full-Metal Craftsmanship (crescent focus ring, 10-blade aperture), Optical Performance Data (4-card grid), 4 usage scenarios

### 4. Internationalization
- **Implementation**: `LanguageContext.tsx` + `translations.ts`
- **Languages**: Chinese (zh), English (en), and Japanese (ja)
- **Coverage**: All UI text, product descriptions, navigation, breadcrumbs, pricing (CNY/JPY/USD)
- **Language Switcher**: Dropdown in Header with flag emoji labels
- **Inline Content**: Product intro pages contain full trilingual editorial content inline (not via translation keys)

### 5. Shopping Cart (Placeholder)
- **Context**: `CartContext.tsx`
- **Status**: Structure implemented, full functionality pending
- **Features**: Add to cart, cart count display

### 6. Service & Support Page
- **Page**: `ServiceSupport.tsx`
- **Route**: `/support`
- **Features**:
  - Full-screen hero with service commitment messaging
  - Lifetime limited warranty details (optical, mechanical, electronic)
  - Professional repair & maintenance service cards with turnaround times
  - 7-day no-reason return/exchange policy (dark full-width section)
  - Contact information (phone, email, hours, global network)
  - Trilingual (zh/en/ja) inline content
  - "了解详情 / LEARN MORE" CTA from Home page support section

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
- ~~`translations.ts` type mismatch~~ — Fixed (2026-02-27, `as string` cast)

### Spec Inconsistency (E39)
- **Detail page** (`Product35mmF2.tsx`) shows f/1.4, 8 groups 11 elements, 320g
- **Intro page** (`Product35mmF2Intro.tsx`) references F2.0, 7E/5G Double Gaussian, 34mm compact length
- These two pages intentionally serve different purposes (store vs editorial) but spec numbers diverge — may need alignment

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
- Optimize images and keep runtime references in `client/public/images` (`/images/*` paths)
- Avoid inline styles except for dynamic values

## Routing

### All Routes (defined in `App.tsx`)
| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Home` | Landing page with hero showcase |
| `/story` | `BrandStory` | Brand story page |
| `/products` | `Products` | Product listing page |
| `/products/35mm-f2-intro` | `Product35mmF2Intro` | 35mm F/2 editorial intro |
| `/products/35mm-f2-special-intro` | `Product35mmF2SpecialIntro` | 35mm F/2 Special editorial intro |
| `/products/35mm-f2` | `Product35mmF2` | 35mm F/2 store/detail page |
| `/products/35mm-f2-special` | `Product35mmF2Special` | 35mm F/2 Special store/detail page |
| `/products/:id` | `ProductDetail` | Generic product detail |
| `/support` | `ServiceSupport` | Service & support page |
| `/cart` | `Cart` | Shopping cart (placeholder) |
| `/checkout` | `Checkout` | Checkout (placeholder) |
| `/404` | `NotFound` | 404 page |

## Deployment

### Current Setup
- **Platform**: Azure Static Web Apps (SWA)
- **Resource**: `zealous-stone-00bf12300`
- **Default URL**: `https://zealous-stone-00bf12300.1.azurestaticapps.net`
- **Custom Domain**: `www.mandler-optics.com`
- **GitHub**: `richard6094/camera_website`

### CI/CD Pipeline
- **Workflow**: `.github/workflows/azure-static-web-apps-zealous-stone-00bf12300.yml`
- **Trigger**: Push to `release` branch (or PR against `release`)
- **Process**:
  1. Checkout code
  2. Setup Node 20 + pnpm 10.4.1 (via corepack)
  3. `pnpm install --frozen-lockfile`
  4. `pnpm exec vite build` → outputs to `dist/public`
  5. Azure SWA deploy action uploads `dist/public` (skip_app_build: true)
- **Secret**: `AZURE_STATIC_WEB_APPS_API_TOKEN_ZEALOUS_STONE_00BF12300`

### Deployment Workflow
1. Develop on `main` branch
2. Commit and push to `origin/main`
3. `git checkout release && git merge main -m "Merge main into release" && git push origin release`
4. GitHub Actions automatically builds and deploys to Azure SWA
5. Switch back: `git checkout main`

### Build Process
- Development: `pnpm dev` (Vite dev server)
- Production build: `pnpm exec vite build` (outputs to `dist/public`)
- Type check: `npx tsc --noEmit`

## Contact & Resources

- **Repository**: https://github.com/richard6094/camera_website
- **Live Site**: https://www.mandler-optics.com
- **Design Inspiration**: Leica Camera AG, premium lens manufacturers
- **Asset Sources**: Local static assets in `client/public/images`
