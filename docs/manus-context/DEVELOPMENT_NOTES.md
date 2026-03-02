# Development Notes

## Recent Changes & Optimizations

### 2026-03-02: Product Intro Optical Performance — Replace Stat Cards with Data Charts
**Summary**: Integrated newly provided optical performance charts into `35mm F/2` intro page. Replaced the former 4-card text stats grid with a 4-chart image grid, with language-aware assets (`zh` uses Chinese charts; `en` and `ja` use English charts).

**Files Changed**:
- `client/src/pages/Product35mmF2Intro.tsx` — Replaced `perfStats` card rendering with `perfCharts` image rendering; added language-aware chart source mapping and localized alt text
- `client/public/images/35mmF2-performance/` (new assets) — Added 8 chart files (`zh` + `en`, 4 each)

**Rationale**: User provided updated optical performance chart data and requested to use them in the product page optical performance section. Visual charts are more accurate and authoritative than summarized text cards.

---

### 2026-03-01: Global Button Rounded Corners
**Summary**: Changed global `--radius` design token from `0px` to `6px`, giving all buttons and UI components subtle rounded corners. Removed inline `borderRadius` workarounds from product page buttons.

**Files Changed**:
- `client/src/index.css` — `--radius: 0px` → `--radius: 6px` (yields `rounded-md`=4px, `rounded-lg`=6px)
- `client/src/pages/Product35mmF2.tsx` — Removed inline `borderRadius: '6px'` from quantity selector and purchase buttons, using Tailwind `rounded-md`/`rounded-l-md`/`rounded-r-md` classes instead
- `client/src/pages/Product35mmF2Special.tsx` — Same cleanup as above

**Rationale**: User requested subtle rounded corners on all buttons. Updating the design token is cleaner than per-button inline styles.

---

### 2026-03-01: Homepage UserGallery — Real Sample Photos & Full Uncropped Display
**Summary**: Replaced placeholder sample images in homepage UserGallery carousel with 7 real landscape photos from Azure Blob Storage (WebP), spanning chapters 1–5. Changed display from fixed-height `object-cover` (cropped) to natural aspect ratio `h-auto` (full uncropped) layout.

**Files Changed**:
- `client/src/pages/Home.tsx` — Replaced `/images/sample-*.jpg` placeholders with 7 Azure Blob Storage gallery URLs (landscape images from Geography, Color, Rhythm, Neon, Monochrome chapters)
- `client/src/components/UserGallery.tsx` — Removed fixed container heights (`h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px]`), removed `h-full` from flex/slides, changed image from `object-cover` to `w-full h-auto` for natural proportions

**Rationale**: User requested (1) real gallery photos instead of placeholders, (2) landscape-only images displayed at full size without cropping.

---

### 2026-02-28: Gallery Page & Azure Blob Storage Integration
**Summary**: Created dedicated `/gallery` page displaying 131 user sample photos from Azure Blob Storage, organized by 6 chapters. Added "查看更多" (View More) link to homepage gallery section heading. Updated header navigation to link to `/gallery` instead of homepage anchor `/#gallery`.

**Scope**:
- **Gallery page** (`Gallery.tsx`): Hierarchical navigation — chapter tabs (sticky) + section sub-tabs; displays one section at a time with masonry grid; prev/next navigation with position indicator; lightbox scoped to current section; trilingual chapter/section titles with subtitles
- **Homepage "View More"**: Positioned inline to the right of the "用户样片" heading with subtle underline + chevron, matching editorial design language
- **Header nav**: Gallery link changed from `/#gallery` anchor to `/gallery` route

**Files Changed**:
- `client/src/pages/Gallery.tsx` (new) — Section-at-a-time gallery with chapter/section tab navigation, masonry columns, lightbox, prev/next, position counter
- `client/src/App.tsx` — Added Gallery import and `/gallery` route
- `client/src/pages/Home.tsx` — Moved "View More" to right of heading with design-forward inline style
- `client/src/components/Header.tsx` — Changed gallery nav link from `/#gallery` to `/gallery`
- `client/src/lib/translations.ts` — Added `gallery.viewMore` key in zh/en/ja

**Rationale**: User uploaded 131 sample photos (~749MB) to Azure Blob Storage and requested a dedicated gallery page accessible from homepage. User requested (1) "查看更多" at heading right with design feel, (2) show one section at a time rather than all images at once.

---

### 2026-02-28: Shop Page Carousel, UserGallery Enhancements & UI Refinements
**Summary**: Major overhaul of product shop pages and homepage UserGallery. Replaced thumbnail grids with horizontal-slide carousels, added lightbox, auto-scroll, position-based drag logic, and various UI refinements.

**Scope**:
- **Shop Page Carousel** (Product35mmF2.tsx, Product35mmF2Special.tsx): Replaced thumbnail grid with `translateX`-based horizontal slide carousel; 4s auto-play interval with dot indicators; mouse/touch drag support with position-based switching (right→left half = next, left→right half = prev); `hasDragged` ref (5px threshold) distinguishes click from drag; removed `aspect-square` constraint, using `object-contain` + `h-auto` for full image display
- **Lightbox on Shop Pages**: Added click-to-enlarge `ImageLightbox` on main product image; auto-play pauses when lightbox is open
- **Product Introduction Links**: Added "查看产品介绍 / View Introduction / 製品紹介を見る" link buttons between description and purchase section, linking to respective intro pages
- **Button Rounded Corners**: Added inline `borderRadius: '6px'` to quantity selector, add-to-cart, and buy-now buttons (workaround for `--radius: 0px` global CSS)
- **UserGallery Enhancements**: Applied same position-based drag logic; added 4s auto-scroll with pause on hover/drag/lightbox; removed `hover:opacity-90` from images; circular wrap-around for drag (last→first, first→last)
- **FlagIcon Component** (new): SVG-based flag icons for language switcher (replaces emoji flags for cross-platform consistency)
- **Header Language Switcher**: Updated to use FlagIcon component
- **Aperture Sample Images** (new): Added `35mmF2-F2.jpg` and `35mmF2-F4-8.jpg` for intro page aperture comparison section
- **Copilot Instructions**: Added mandatory pre-read context, documentation sync rules, consolidation policy, pre-commit checklist

**Files Changed**:
- `client/src/pages/Product35mmF2.tsx` — carousel, lightbox, intro link, button corners, drag logic
- `client/src/pages/Product35mmF2Special.tsx` — same as above + limited edition badge overlay
- `client/src/pages/Product35mmF2Intro.tsx` — aperture sample images section, breadcrumb updates
- `client/src/pages/Product35mmF2SpecialIntro.tsx` — breadcrumb label fix
- `client/src/components/UserGallery.tsx` — position-based drag, auto-scroll, hover removal, circular wrap
- `client/src/components/FlagIcon.tsx` (new) — SVG flag icon component
- `client/src/components/Header.tsx` — FlagIcon integration, language switcher styling
- `client/src/pages/Products.tsx` — breadcrumb label unification
- `client/public/images/35mmF2-sample-images/` (new) — aperture comparison images
- `.github/copilot-instructions.md` — documentation workflow rules

**Rationale**: User requested iterative UI improvements to match magazine-style editorial design: richer product browsing (carousel + lightbox), smoother interactions (drag + auto-scroll), and visual polish.

---

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

## Consolidated Historical Changes

### 2026-02-26: Deployment, UI Enhancements & Page Additions
- **Azure SWA Deployment**: New resource `zealous-stone-00bf12300`, CI/CD on `release` branch, SPA routing fix (`navigationFallback`), cleanup of orphaned workflows
- **Hero Section UI**: Dot-style scroll indicators (active capsule/inactive circles), mobile spacing fix for product cards
- **Service & Support Page**: New `/support` page with magazine-style editorial layout, full zh/en content; Header nav updated from anchor to route
- **Products Page**: Removed duplicate local header, adjusted padding for global header

### 2026-02-24: Navigation, Cart, Brand Story & Product Pages
- **Navigation & Scroll-Top Fixes**: `navigateWithTop` helper for forced scroll-top on route entry; Header/Home link targets unified
- **Cart Click Prompt**: Replaced disabled cart with clickable coming-soon toast notification
- **Brand Story Corrections**: Timeline years corrected (2025→2024, 2020→2023), lens-first wording
- **Products Page & Card Entry**: Realigned to E39 range, added E39 Special card, editorial intro pages created (`/products/e39-intro`, `/products/e39-special-intro`)
- Files: `Header.tsx`, `Home.tsx`, `Products.tsx`, `ProductSelectionCards.tsx`, `ProductE39Intro.tsx`, `ProductE39SpecialIntro.tsx`, `App.tsx`, `translations.ts`

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
- Last updated: 2026-02-28
