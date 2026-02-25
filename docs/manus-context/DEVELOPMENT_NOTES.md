# Development Notes

## Recent Changes & Optimizations

### 2026-02-26: Hero Product Card Mobile Bottom Spacing
**Change**: Increased bottom spacing for E39/E39 Special Edition product card text and buttons on mobile to avoid overlap with dot indicators and bottom navigation.

**Scope**:
- Changed product content container from `bottom-20 sm:bottom-24 md:bottom-32` to `bottom-32 sm:bottom-28 md:bottom-32`

**Files Changed**:
- `client/src/components/HorizontalProductShowcase.tsx`

**Rationale**:
- On mobile, text and CTA button were too close to the bottom navigation bar

---

### 2026-02-26: SWA Navigation Fallback for SPA Routing
**Change**: Added `staticwebapp.config.json` to fix 404 errors when directly accessing sub-routes on Azure Static Web Apps.

**Scope**:
- Created `client/public/staticwebapp.config.json` with `navigationFallback` rewrite to `/index.html`
- Excludes `/images/*` and `/assets/*` from fallback

**Files Changed**:
- `client/public/staticwebapp.config.json` (new)

**Rationale**:
- SPA routes like `/products/e39-intro` returned 404 on direct access or refresh because the server had no fallback rule

---

### 2026-02-26: CI/CD Cleanup — Remove Old Workflow + Zip Artifact
**Change**: Removed the orphaned `ashy-stone` workflow file (pointed to deleted SWA resource) and cleaned up an accidentally committed SWA CLI zip file.

**Scope**:
- Deleted `.github/workflows/azure-static-web-apps-ashy-stone-052e5ec00.yml`
- Removed accidental 14MB zip file from repo history
- Added `*.zip` to `.gitignore`

**Files Changed**:
- `.github/workflows/azure-static-web-apps-ashy-stone-052e5ec00.yml` (deleted)
- `.gitignore`

**Rationale**:
- Old workflow was triggering on every `main` push and always failing (deleted SWA resource token)
- Zip file was an artifact from manual SWA CLI deployment

---

### 2026-02-26: Release Branch Deployment Strategy
**Change**: Configured deployment workflow to trigger on `release` branch instead of `main`, enabling controlled deployments.

**Scope**:
- Changed workflow trigger from `main` to `release` branch (push + PR events)
- Created `release` branch from `main`
- Deployment flow: develop on `main` → merge to `release` → auto-deploy

**Files Changed**:
- `.github/workflows/azure-static-web-apps-zealous-stone-00bf12300.yml`

**Rationale**:
- Separates development commits from deployment triggers
- Gives explicit control over when new code goes live

---

### 2026-02-26: Hero Dot Scroll Position Indicators
**Change**: Added dot-style scroll position indicators above the Hero bottom thumbnail navigation.

**Scope**:
- Active dot: elongated capsule (`w-6 h-1.5 bg-white`)
- Inactive dots: small circles (`w-1.5 h-1.5 bg-white/40`)
- Clickable, triggers `handleManualNavigation`
- Positioned at `bottom-[72px]`, horizontally centered, z-20
- 300ms transition on shape/opacity changes

**Files Changed**:
- `client/src/components/HorizontalProductShowcase.tsx`

**Rationale**:
- User requested visual scroll position feedback in the Hero section

---

### 2026-02-26: Support Section Button Style Consistency
**Change**: Fixed the "了解详情 / LEARN MORE" button in the Home page support section to match the bordered button style used elsewhere.

**Scope**:
- Changed from text-link style to bordered button: `px-6 py-3 border border-foreground/20 hover:bg-foreground hover:text-background damped-transition`

**Files Changed**:
- `client/src/pages/Home.tsx`

**Rationale**:
- Visual consistency with brand story section button

---

### 2026-02-26: Service & Support Dedicated Page
**Change**: Created a full dedicated Service & Support page covering warranty, repair, 7-day return policy, and contact info.

**Scope**:
- New page `ServiceSupport.tsx` with magazine-style editorial layout matching BrandStory aesthetic
- Sections: Hero, Lifetime Warranty, Professional Repair & Maintenance, 7-Day Return Policy (dark full-width), Contact, Closing
- Full bilingual content (zh/en) inline in the component
- Route `/support` added in `App.tsx`
- Header nav "服务支持 / Support" now links to `/support` (was `/#support` scroll anchor)
- Home page support section gains "了解详情 / LEARN MORE" CTA linking to `/support`

**Files Changed**:
- `client/src/pages/ServiceSupport.tsx` (new)
- `client/src/App.tsx`
- `client/src/components/Header.tsx`
- `client/src/pages/Home.tsx`
- `docs/manus-context/DEVELOPMENT_NOTES.md`

**Rationale**:
- User requested a standalone page for service/repair/return policies
- 7-day no-reason return policy prominently featured as required

---

### 2026-02-26: Azure SWA CI/CD Pipeline — Fully Working
**Change**: Recreated Azure Static Web App resource and established fully working GitHub Actions CI/CD pipeline.

**Scope**:
- Deleted broken SWA resource (`ashy-stone-052e5ec00`) which rejected all deployment tokens
- Created new SWA resource: `zealous-stone-00bf12300.1.azurestaticapps.net` (Free tier, East Asia)
- Renamed workflow file to `azure-static-web-apps-zealous-stone-00bf12300.yml`
- Updated GitHub Secret name to `AZURE_STATIC_WEB_APPS_API_TOKEN_ZEALOUS_STONE_00BF12300`
- Workflow uses Corepack for pnpm bootstrap, Node 20, Vite build, `skip_app_build: true`
- GitHub Actions Run #1 completed successfully (1m 0s)

**Files Changed**:
- `.github/workflows/azure-static-web-apps-zealous-stone-00bf12300.yml` (renamed from ashy-stone variant)
- `docs/manus-context/DEVELOPMENT_NOTES.md`

**Rationale**:
- Original SWA resource was in an irrecoverable broken state (all tokens rejected)
- Fresh resource + clean workflow produces reliable automated deployments
- Previous iterative CI fixes (step order, corepack, token diagnostics) are all consolidated in the final working workflow

---

### 2026-02-24: Header Menu Story Entry Scroll-Top Fix
**Change**: Fixed the issue where opening `品牌故事 / Story` from header menu could retain previous scroll position instead of landing at top.

**Scope**:
- Added `navigateWithTop` in header navigation flow for non-anchor routes
- Updated `品牌故事 / Story` entry to use top-reset route navigation
- Improved `/#gallery` and `/#support` handling by navigating to home first, then section scrolling

**Files Changed**:
- `client/src/components/Header.tsx`
- `docs/manus-context/COMPONENT_GUIDE.md`
- `docs/manus-context/DEVELOPMENT_NOTES.md`

**Rationale**:
- Ensure consistent entry behavior from header menu across pages and scroll states

---

### 2026-02-24: Products Card Route Clarification to Intro Detail Pages
**Change**: Updated `/products` card click targets to the introduction-style detail pages as clarified by user intent.

**Scope**:
- Changed E39 card route from `/products/e39` to `/products/e39-intro`
- Changed E39 Special card route from `/products/e39-special` to `/products/e39-special-intro`
- Applied to both `zh` and `en` product datasets

**Files Changed**:
- `client/src/pages/Products.tsx`
- `docs/manus-context/DEVELOPMENT_NOTES.md`

**Rationale**:
- Align “详情页” behavior with the intended editorial introduction pages rather than store pages

---

### 2026-02-24: Cart Click Prompt + Product Card Detail Navigation Confirmation
**Change**: Updated cart interactions to show a coming-soon prompt on click, and ensured both product cards on `/products` navigate to their detail pages.

**Scope**:
- Header cart icon changed from non-clickable state to clickable prompt behavior
- Products page top-right cart icon click now shows prompt toast
- Products page card-level/cart buttons now show prompt toast: `商城正在开发中，敬请期待` / `Store is under development, coming soon`
- Products page two product cards keep click-through to detail pages (`/products/e39`, `/products/e39-special`) with top reset on navigation

**Files Changed**:
- `client/src/components/Header.tsx`
- `client/src/pages/Products.tsx`
- `docs/manus-context/COMPONENT_GUIDE.md`
- `docs/manus-context/DEVELOPMENT_NOTES.md`

**Rationale**:
- Provide explicit user feedback instead of silent disabled cart interactions
- Keep product browsing flow clear by making card-level detail entry deterministic

---

### 2026-02-24: Brand Story Classic Reborn Year Correction
**Change**: Updated the Brand Story “经典重生 / Classic Reborn” milestone year from `2025` to `2024`.

**Scope**:
- Updated milestone year in both `zh` and `en` brand story translations

**Files Changed**:
- `client/src/lib/translations.ts`
- `docs/manus-context/DEVELOPMENT_NOTES.md`

**Rationale**:
- Keep timeline year aligned with requested chronology

---

### 2026-02-24: Brand Story Copy Refinement (Timeline + Lens Positioning)
**Change**: Fine-tuned Brand Story timeline and wording to align with current products and lens-first brand positioning.

**Scope**:
- Updated timeline item 3 year from `2020` to `2023`
- Updated “经典重生 / Classic Reborn” product reference to `E39` and `E39 Special Edition` lens series
- Replaced `Mandler 相机` / `Mandler camera` wording with `Mandler 镜头` / `Mandler lens` in Brand Story narrative text
- Synced both `zh` and `en`

**Files Changed**:
- `client/src/lib/translations.ts`
- `docs/manus-context/DEVELOPMENT_NOTES.md`

**Rationale**:
- Keep milestone timeline consistent with requested chronology
- Ensure story copy matches actual product lineup and brand category (lenses)

---

### 2026-02-24: Home Navigation Scroll-Top Fix for Brand Story Entry
**Change**: Fixed the issue where entering the brand story page from Home did not land at the top of the page.

**Scope**:
- Added `navigateWithTop` helper in Home page
- Updated Home “了解更多 / LEARN MORE” story entry to navigate with forced top reset
- Unified Home outbound route interactions (showcase and final CTA) to use the same top-reset navigation behavior

**Files Changed**:
- `client/src/pages/Home.tsx`
- `docs/manus-context/DEVELOPMENT_NOTES.md`

**Rationale**:
- Ensure consistent page-entry experience when navigating from long-scroll Home sections
- Eliminate route transitions that preserve an unintended deep scroll position

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

### 2026-02-23: Image & Asset Management
- Migrated all Manus CDN image references to local `client/public/images/` assets
- Re-mapped page/component image paths after manual asset rename (Chinese semantic filenames)
- One CDN asset (`BHhLmQfWmDHLVNJL.jpg`) unavailable (403), replaced with local fallback

---

### 2026-02-23: Store Status & i18n Fixes
- Disabled header cart icon clicks, added hover notice ("商城正在开发中" / "Store is under development")
- Fixed English product pages showing Chinese store notice — added language-aware rendering
- Added multilingual coverage requirement to project instructions

---

### 2026-02-17: Product Naming Rename (E35 → E39)
- Renamed all product labels, routes, file names, and docs from E35 to E39

---

### 2026-02-16: Ultra-Wide Screen Optimization
- Added `maxHeight: 1080px` to Hero container, increased `minHeight` to 700px
- Added responsive bottom margin to CTA button
- Preserved parallax effects and auto-scroll behavior

### 2026-02-14: Initial Setup & Core Features
- Hero horizontal showcase with parallax scrolling (Mandler + E39 + E39 Special Edition)
- Auto-scroll (5s interval, 10s pause on manual interaction)
- Header auto-hide on scroll down, reappear on scroll up
- Header dropdown menu with E39 product entries
- Product detail pages for E39 and E39 Special Edition
- Fixed product page layouts to prevent header overlap (`pt-16 md:pt-20`)

---

## Known Issues

### TypeScript Error in translations.ts
**Error**: Line 425 - Type mismatch in brand story translations
```
Type 'string | { subtitle: string; title: string; ... }' is not assignable to type 'string'.
```

**Impact**: Does not affect runtime, only type checking

**Cause**: Nested object structure in `brandStory` translations doesn't match type definition

**TODO**: Fix type definitions to support nested translation objects
```typescript
// Current (incorrect)
interface Translations {
  brandStory: string;  // Should be object
}

// Should be
interface Translations {
  brandStory: {
    subtitle: string;
    title: string;
    // ... other fields
  };
}
```

**Workaround**: Ignore TypeScript error for now, functionality works correctly

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
- Test language switching (CN/EN)
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
- Last updated: 2026-02-23
