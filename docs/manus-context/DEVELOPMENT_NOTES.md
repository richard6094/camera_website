# Development Notes

## Recent Changes & Optimizations

### 2026-02-27: Product Naming — Remove "7-element" Suffix
**Summary**: Removed "7-element" suffix from all product display names. Products now display as "35mm F/2" (standard) and "35mm F/2 特别版/特別版/Special Edition" (special). Also fixed `heroEdition` content key in ProductE39SpecialIntro.tsx so the edition label renders on a separate line in the hero section.

**Files Changed**:
- `client/src/components/Header.tsx` — nav labels
- `client/src/components/ProductSelectionCards.tsx` — card names
- `client/src/pages/Home.tsx` — showcase names
- `client/src/pages/Products.tsx` — product listing names (zh/en/ja)
- `client/src/pages/ProductE39.tsx` — h1 title, alt tags
- `client/src/pages/ProductE39Special.tsx` — alt tags, package list
- `client/src/pages/ProductE39Intro.tsx` — breadcrumb, heroTitle, inline paragraphs, alt tags
- `client/src/pages/ProductE39SpecialIntro.tsx` — split heroTitle/heroEdition keys, breadcrumb, inline paragraphs
- `client/src/lib/translations.ts` — timeline4Desc

**Rationale**: User decided "7-element" suffix didn't look good and requested removal.

---

### 2026-02-27: E39 Product Introduction Page — Content Expansion
**Summary**: Significantly expanded `ProductE39Intro.tsx` with detailed product information covering optical structure, aperture characteristics, craftsmanship, optical performance data, and additional usage scenarios. All content trilingual (zh/en/ja).

**Scope**:
- Replaced existing "Optical Design" section with new **Legendary Optical Architecture** section: 7E/5G Double Gaussian design, purple-gold multi-layer coating, spec mini-cards (construction, design type, coating)
- Added **Aperture Highlight** parallax quote section with cinematic background image
- Added **F2 Large Aperture** section: two-column layout comparing wide-open (F2.0) vs stopped-down (F4–F8) characteristics
- Added **Full-Metal Craftsmanship** section: crescent focus ring, 10-blade circular aperture, mechanical damping, reversed image/text layout
- Added **Optical Performance Data** section: 4-card grid (field curvature, distortion < ±0.5%, aperture blades, max aperture)
- Expanded **Usage Scenes** from 3 to 4: street documentary, environmental portrait, travel documentary, video/motion
- Added full-bleed image divider using `银色镜头不挂机特写.jpg`
- Updated product specs throughout from f/1.4 to F2.0, from 8组11片 to 7片5组, from 320g to 34mm compact length
- Updated closing statement to reflect new positioning
- Refactored scenes/perfStats into mapped arrays for cleaner JSX

**Files Changed**:
- `client/src/pages/ProductE39Intro.tsx` (full rewrite, ~221 → ~350 lines)

**Rationale**: User provided detailed E39 lens specifications and requested richer editorial content aligned with the existing magazine-style design language.

---

### 2026-02-27: Japanese Language Support (Trilingual)
**Summary**: Added full Japanese (日本語) language support, expanding the site from bilingual (zh/en) to trilingual (zh/en/ja).

**Scope**:
- Updated `LanguageContext.tsx`: Language type `'zh' | 'en'` → `'zh' | 'en' | 'ja'`, localStorage validation includes `ja`
- Added complete Japanese translation block (~200 keys) to `translations.ts` covering all sections: header, hero, products, brand story, parallax quotes, gallery, support, CTA, footer, product details (M11/Q3/SL3), lightbox
- Fixed `getTranslation` return type cast to resolve pre-existing TS2322 error
- Updated language switcher in `Header.tsx`: 3-option dropdown (🇨🇳中文/🇺🇸English/🇯🇵日本語)
- Updated all hardcoded ternary expressions across 10+ files to include `ja` branch
- Added Japanese content blocks to: `ProductE39Intro.tsx`, `ProductE39SpecialIntro.tsx`, `ServiceSupport.tsx`, `ProductE39.tsx`, `ProductE39Special.tsx`
- Updated breadcrumbs in all pages: ホーム/製品/ブランドストーリー/サービス・サポート etc.
- Japanese pricing: ¥278,000 (E39) / ¥628,000 (E39 Special)

**Files Changed**:
- `client/src/contexts/LanguageContext.tsx`
- `client/src/lib/translations.ts`
- `client/src/components/Header.tsx`
- `client/src/components/ProductSelectionCards.tsx`
- `client/src/pages/Home.tsx`
- `client/src/pages/Products.tsx`
- `client/src/pages/BrandStory.tsx`
- `client/src/pages/ProductDetail.tsx`
- `client/src/pages/ProductE39.tsx`
- `client/src/pages/ProductE39Intro.tsx`
- `client/src/pages/ProductE39Special.tsx`
- `client/src/pages/ProductE39SpecialIntro.tsx`
- `client/src/pages/ServiceSupport.tsx`

---

### 2026-02-26: Products Page Duplicate Header Removed
**Change**: Removed the Products page's own local `<header>` which duplicated the global `Header` component and became visible after the global header auto-hid on scroll.

**Scope**:
- Removed local sticky `<header>` block (page title, home button, cart icon)
- Changed `<main>` padding from `py-16 md:py-24` to `pt-28 md:pt-32 pb-16 md:pb-24` to account for global header height
- Cleaned up unused imports (`useCart`, `itemCount`, `cartComingSoonText`)

**Files Changed**:
- `client/src/pages/Products.tsx`

---

### 2026-02-26: Azure SWA Deployment & CI/CD Pipeline
**Summary**: Established fully working Azure SWA deployment pipeline from scratch, including SPA routing fix and release-branch strategy.

**Scope**:
- Deleted broken SWA resource (`ashy-stone-052e5ec00`), created new one: `zealous-stone-00bf12300.1.azurestaticapps.net` (Free tier, East Asia)
- Workflow: Corepack + pnpm, Node 20, Vite build, `skip_app_build: true`
- Trigger changed from `main` to `release` branch (push + PR); flow: develop on `main` → merge to `release` → auto-deploy
- Removed orphaned `ashy-stone` workflow + accidental 14MB zip artifact; added `*.zip` to `.gitignore`
- Added `client/public/staticwebapp.config.json` with `navigationFallback` rewrite to `/index.html` (fixes SPA 404 on direct sub-route access)

**Files Changed**:
- `.github/workflows/azure-static-web-apps-zealous-stone-00bf12300.yml`
- `client/public/staticwebapp.config.json` (new)
- `.gitignore`

---

### 2026-02-26: Hero Section UI Enhancements
**Summary**: Added dot-style scroll indicators and fixed mobile product card bottom spacing in the Hero showcase.

**Scope**:
- Dot indicators: active capsule (`w-6 h-1.5 bg-white`) / inactive circles (`w-1.5 h-1.5 bg-white/40`), clickable, `bottom-[72px]`, 300ms transition
- Mobile spacing: product content container changed from `bottom-20 sm:bottom-24 md:bottom-32` to `bottom-32 sm:bottom-28 md:bottom-32` to avoid overlap with dots and bottom nav

**Files Changed**:
- `client/src/components/HorizontalProductShowcase.tsx`

---

### 2026-02-26: Service & Support Dedicated Page
**Summary**: Created a full `/support` page and unified Home support section button style.

**Scope**:
- New page `ServiceSupport.tsx`: magazine-style editorial layout (Hero, Lifetime Warranty, Repair & Maintenance, 7-Day Return Policy dark section, Contact, Closing); full zh/en bilingual content
- Route `/support` added; Header nav "服务支持 / Support" updated from `/#support` scroll anchor to `/support`
- Home support section: added "了解详情 / LEARN MORE" CTA linking to `/support`; button restyled to bordered `px-6 py-3 border border-foreground/20` for consistency

**Files Changed**:
- `client/src/pages/ServiceSupport.tsx` (new)
- `client/src/App.tsx`
- `client/src/components/Header.tsx`
- `client/src/pages/Home.tsx`

---

### 2026-02-24: Navigation & Scroll-Top Fixes
**Summary**: Fixed multiple routing/navigation issues where pages landed at wrong scroll positions, and clarified product card click targets.

**Scope**:
- Added `navigateWithTop` helper in Header and Home for forced scroll-top on route entry
- Header: Story entry now uses top-reset navigation; `/#gallery` and `/#support` navigate to home first then scroll
- Home: "LEARN MORE" story entry + showcase CTAs unified with top-reset behavior
- Products page: card click targets changed from `/products/e3- Products page: card click targets changed from `/match editorial intro intent

**Files Changed**:
- `client/src/components/Header.tsx`
- `client/src/pages/Home.tsx`
- `client/src/pages/Products.tsx`

---

### 2026-02-24: Cart Click Prompt + Product Card Detail Navigation
**Summary**: Replaced silent disabled cart with clickable coming-soon prompt, ensured product card detail navigation.

**Scope**:
- Header & Products page cart icons now show toast on click (store under development notice)
- Products page card-leve- Products page card-leve- Products page card-leve- Products page card-leve- Products page card-leve- Products page ca*Files Changed**:
- `client/src/components/Header.tsx`
- `client/src/pages/Products.tsx`

---

### 2026-02-24: Brand Story Copy & Timeline Corrections
**Summary**: Corrected Brand Story milestone years and updated wording to lens-first positioning.

**Scope**:
- "Classic Reborn" year: `2025` → `2024`; Timeline item 3 year: `2020` → `2023`
- Product reference updated to `E39` and `E39 Special Edition` lens series
- Replaced camera wording with lens throughout Brand Story
- Synced both `zh` and `en`

**Files Changed**:
- `client/src/lib/translations.ts`

---

## Consolidated Historical Changes

### 2026-02-24: E39 Special Intro Page — Iterative Design Refinements
Multiple rounds of styling and layout adjustments to the E39 Special Edition intro page:
- Signature section: boundary shifted to tonal contrast, typography unified with page system, meta text readability improved, switched to open horizontal layout
- Typography scale aligned with design system (`md:text-5xl` → `md:text-4xl`)
- Leica-magazine editorial style pass for overall aesthetic
- Layout consistency refinement with protocol markers (`01 / 03` style)
- Removed edition number element from hero
- Premium differentiation upgrade (materials, finish, limited-edition identity badge)
- Files: `client/src/pages/ProductE39SpecialIntro.tsx`

---

### 2026-02-24: Products Page & Card Entry Updates
- Products page realigned to E39 range only with full zh/en bilingual support
- Added E39 Special Edition card entry on homepage `ProductSelectionCards`
- Intro page CTA navigation forced scroll-to-top on route change
- Created editorial product introduction pages for E39 and E39 Special Edition (`/products/e39-intro`, `/products/e39-special-intro`)
- Header and homepage showcase click targets updated to intro pages
- Files: `Products.tsx`, `ProductSelectionCards.tsx`, `ProductE39Intro.tsx`, `ProductE39SpecialIntro.tsx`, `App.tsx`, `Header.tsx`, `Home.tsx`

---

### 2026-02-24: Home Hero Background Update
- Updated Mandler hero background to manually prepared cover asset in `Home.tsx`

---

### 2026-02-14 to 2026-02-23: Initial Build & Foundational Features
- **2026-02-14**: Initial setup — Hero horizontal showcase with parallax, auto-scroll, header auto-hide, product detail pages (E39 / E39 Special Edition), fixed header overlap
- **2026-02-16**: Ultra-wide screen optimization — `maxHeight: 1080px` on Hero, responsive CTA spacing
- **2026-02-17**: Product rename E35 → E39 across all files, routes, and docs
- **2026-02-23**: Migrated CDN images to local `client/public/images/`, fixed store status i18n (disabled cart + multilingual notice), added language coverage requirement


---

## Known Issues

### TypeScript Error in translations.ts
**Status**: ✅ Fixed (2026-02-27) — Added `as string` cast in `getTranslation` return.

---

## Development Workflow

### Local Development
```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Creating Checkpoints
Use `webdev_save_checkpoint` before major changes:
```
Description: Brief summary of changes
- Feature 1
- Feature 2
- Bug fixes
```

### Syncing to GitHub
After checkpoint, sync to `richard6094/camera_website`:
```bash
cd /home/ubuntu/camera_website
rm -rf *
cp -r /home/ubuntu/premium-brand-homepage/{client,server,shared,package.json,pnpm-lock.yaml,tsconfig.json,vite.config.ts,.gitignore} .
git add -A
git commit -m "Descriptive commit message"
git push origin main
```

---

## Asset Management

### Image Upload Process
1. Prepare image assets and place them in `client/public/images/`
2. Use stable file naming (prefer descriptive names or source basename)
3. Reference images in code via `/images/<filename>`
4. Keep originals in an archival folder if needed

**Example**:
```bash
cp /path/to/image.jpg client/public/images/hero-cover.jpg
# Use in code: /images/hero-cover.jpg
```

### Image Optimization
- Use WebP format when possible
- Provide fallbacks for older browsers
- Lazy load below-the-fold images
- Use responsive images with `srcset`

---

## Performance Considerations

### Hero Section
- Max height limit (1080px) prevents excessive image loading
- Gradient mask reduces visual artifacts on ultra-wide screens
- Parallax effect uses `transform` (GPU-accelerated)
- Auto-scroll uses `setInterval` with cleanup

### Header
- Fixed positioning with `transform` for smooth hide/show
- Passive scroll listener for better performance
- Menu auto-closes when header hides

### Images
- Product images are served as local static assets from `client/public/images`
- Lazy loading for gallery images
- Object-fit: cover for consistent aspect ratios

---

## Browser Compatibility

### Tested Browsers
- Chrome/Edge 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅

### Known Issues
- Safari: Gradient mask may have slight rendering differences
- Firefox: Parallax effect may be less smooth on lower-end devices

### Polyfills Needed
- None (modern browsers only)

---

## Accessibility Checklist

### Implemented
✅ Semantic HTML elements  
✅ Alt text for all images  
✅ Keyboard navigation  
✅ Focus indicators  
✅ ARIA labels for icons  
✅ Color contrast (WCAG AA)  

### TODO
⬜ Screen reader testing  
⬜ High contrast mode support  
⬜ Reduced motion preference  
⬜ Skip to content link  

---

## Security Considerations

### Current Implementation
- No user authentication (static site)
- No sensitive data storage
- No API keys in client code
- CDN URLs are public (intentional)

### Future Considerations
- If adding user accounts: Use secure authentication (OAuth)
- If adding payment: Use Stripe integration (PCI compliant)
- If adding backend: Implement CSRF protection

---

## Testing Strategy

### Manual Testing
- Test on multiple screen sizes (mobile, tablet, desktop, ultra-wide)
- Test all interactive elements (buttons, links, forms)
- Test language switching (ZH/EN/JA)
- Test navigation (header menu, breadcrumbs, back buttons)

### Browser Testing
- Chrome DevTools device emulation
- Real device testing (iOS, Android)
- Cross-browser testing (Chrome, Firefox, Safari)

### Accessibility Testing
- Keyboard-only navigation
- Screen reader testing (NVDA, VoiceOver)
- Color contrast checker
- Focus indicator visibility

---

## Deployment

### Manus Platform
- Automatic deployment on checkpoint creation
- CDN for static assets
- Custom domain support (`.manus.space`)
- SSL/TLS enabled by default

### GitHub Repository
- Manual sync required (not automatic)
- Repository: `richard6094/camera_website`
- Branch: `main`

---

## Future Enhancements

### High Priority
1. **Shopping Cart Functionality**
   - Add/remove items
   - Quantity adjustment
   - Checkout flow
   - Order confirmation

2. **Product Comparison**
   - Side-by-side spec comparison
   - Highlight differences
   - Add to comparison button

3. **User Reviews**
   - Star ratings
   - Written reviews
   - Photo uploads
   - Verified purchase badges

### Medium Priority
1. **Search & Filtering**
   - Product search
   - Filter by price, focal length, aperture
   - Sort options

2. **Wishlist**
   - Save products for later
   - Share wishlist

3. **Newsletter Signup**
   - Email collection
   - Promotional emails

### Low Priority
1. **360° Product Views**
   - Interactive product rotation
   - Zoom functionality

2. **Video Demonstrations**
   - Product intro videos
   - Tutorial videos

3. **Blog/News Section**
   - Product announcements
   - Photography tips
   - Brand stories

---

## Code Quality

### Linting
- ESLint configured (via Vite)
- Prettier for code formatting (optional)

### Type Safety
- TypeScript strict mode enabled
- Prop types defined for all components
- Context types defined

### Code Organization
- Components in `client/src/components/`
- Pages in `client/src/pages/`
- Utilities in `client/src/lib/`
- Contexts in `client/src/contexts/`

---

## Troubleshooting

### Dev Server Won't Start
1. Check if port 3000 is already in use
2. Delete `node_modules` and reinstall: `pnpm install`
3. Clear Vite cache: `rm -rf node_modules/.vite`

### Images Not Loading
1. Verify image path starts with `/images/`
2. Check file exists in `client/public/images/`
3. Check browser console for 404 path errors

### TypeScript Errors
1. Check `tsconfig.json` configuration
2. Restart TypeScript server in IDE
3. Run `pnpm build` to see all errors

### Header Not Hiding on Scroll
1. Check scroll event listener is attached
2. Verify scroll position calculation
3. Check CSS transition is not disabled

---

## Contact & Support

For questions or issues:
- GitHub Issues: `richard6094/camera_website`
- Project maintained by: Manus AI Agent
- Last updated: 2026-02-27
