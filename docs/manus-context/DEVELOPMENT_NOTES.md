# Development Notes

## Recent Changes & Optimizations

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

### 2026-02-24: Signature Section Boundary Shifted to Tonal Contrast
**Change**: Replaced line-based boundary treatment in the `SIGNATURE FINISH` section with subtle tonal separation.

**Scope**:
- Removed section top/bottom border divider (`border-y border-foreground/15`)
- Introduced low-contrast background layer (`bg-foreground/[0.03]`) to define section boundary
- Removed inner horizontal accent line under signature description to avoid explicit split-line feeling

**Files Changed**:
- `client/src/pages/ProductE39SpecialIntro.tsx`
- `docs/manus-context/DEVELOPMENT_NOTES.md`

**Rationale**:
- Align with requested visual direction: boundary should be communicated by slight color difference rather than dividing lines
- Keep Leica-like restrained editorial continuity across adjacent sections

---

### 2026-02-24: Signature Section Typography Unified With Page System
**Change**: Unified the `SIGNATURE FINISH` block typography and section rhythm to match the established editorial style used across the rest of the page.

**Scope**:
- Aligned signature label and protocol note styles to the same label token pattern used in other sections
- Aligned signature title style to section-heading pattern (`text-display`, shared scale/weight behavior)
- Adjusted desktop vertical padding from `md:py-24` to `md:py-32` for consistent section cadence

**Files Changed**:
- `client/src/pages/ProductE39SpecialIntro.tsx`
- `docs/manus-context/DEVELOPMENT_NOTES.md`

**Rationale**:
- Ensure local typography and overall section rhythm no longer feel detached from surrounding modules
- Preserve Leica-style restraint while improving whole-page consistency

---

### 2026-02-24: Signature Meta Text Readability Tweak
**Change**: Fine-tuned only the left meta text lines in `SIGNATURE FINISH` section for better readability and less aggressive letter spacing.

**Scope**:
- Increased legibility of `SIGNATURE FINISH` label and protocol text
- Reduced excessive tracking and raised text contrast opacity
- Kept layout/grid structure unchanged (text-only adjustment)

**Files Changed**:
- `client/src/pages/ProductE39SpecialIntro.tsx`
- `docs/manus-context/DEVELOPMENT_NOTES.md`

**Rationale**:
- Improve editorial readability while preserving Leica-style restrained aesthetics

---

### 2026-02-24: E39 Special Intro Typography Scale Alignment
**Change**: Reduced oversized heading scale in the `SIGNATURE FINISH` section to keep typography consistent with the page-wide editorial rhythm.

**Scope**:
- Adjusted signature section title from `md:text-5xl` to `md:text-4xl`

**Files Changed**:
- `client/src/pages/ProductE39SpecialIntro.tsx`
- `docs/manus-context/DEVELOPMENT_NOTES.md`

**Rationale**:
- Maintain a coherent type hierarchy and avoid abrupt font-size jumps across sections

---

### 2026-02-24: Signature Section Switched to Open Horizontal Layout
**Change**: Replaced the centered closed-border signature block in `E39 Special Edition` intro page with an open editorial layout.

**Scope**:
- Removed boxed centered panel (`border + centered stack`)
- Added open `border-y` section with left meta column + right content column
- Kept existing bilingual content and section hierarchy unchanged

**Files Changed**:
- `client/src/pages/ProductE39SpecialIntro.tsx`
- `docs/manus-context/DEVELOPMENT_NOTES.md`

**Rationale**:
- Match the page-wide horizontal rhythm and avoid isolated closed visual blocks
- Better align with Leica-like magazine editorial composition

---

### 2026-02-24: E39 Special Intro Leica-Magazine Style Pass
**Change**: Applied a Leica-editorial visual pass to `E39 Special Edition` intro page for cleaner and more consistent layout language.

**Scope**:
- Reduced high-contrast visual noise and unified section rhythm
- Added consistent editorial labels and spacing cadence across key sections
- Refactored premium identity and milestone blocks into structured repeatable layouts
- Replaced cinematic signature background block with restrained bordered editorial panel
- Added subtle detail line (`Mandler Quality Protocol · Since 1978`) as a minimal “clever touch”

**Files Changed**:
- `client/src/pages/ProductE39SpecialIntro.tsx`
- `docs/manus-context/DEVELOPMENT_NOTES.md`

**Rationale**:
- Improve readability and hierarchy in long-form product storytelling
- Align visual tone with Leica-like magazine aesthetics: restrained, ordered, detail-first

---

### 2026-02-24: E39 Special Intro Layout Consistency Refinement
**Change**: Refined E39 Special Edition introduction page to improve visual consistency and reading rhythm while keeping a premium identity.

**Scope**:
- Unified section cadence (headings, spacing, container rhythm) across major blocks
- Normalized premium identity section styling to align with overall page language
- Added subtle premium detail treatment in milestone section (`01 / 03` style protocol markers)
- Kept bilingual parity (`zh` / `en`) for all newly adjusted labels and text

**Files Changed**:
- `client/src/pages/ProductE39SpecialIntro.tsx`
- `docs/manus-context/DEVELOPMENT_NOTES.md`

**Rationale**:
- Reduce visual fragmentation and improve narrative flow
- Preserve high-end tone with restrained, detail-driven “small clever touches”

---

### 2026-02-24: Removed Edition Number Element from E39 Special Intro
**Change**: Removed the `限量编号 / Edition Number` element from the E39 Special Edition introduction page hero section.

**Scope**:
- Deleted edition-number copy fields (`editionLabel`, `editionValue`) in both `zh` and `en`
- Removed corresponding hero badge UI block
- Cleaned up now-unused `Award` icon import

**Files Changed**:
- `client/src/pages/ProductE39SpecialIntro.tsx`
- `docs/manus-context/DEVELOPMENT_NOTES.md`

**Rationale**:
- Align page presentation with current content direction by removing explicit serial-number style display

---

### 2026-02-24: E39 Special Intro Premium Differentiation Upgrade
**Change**: Enhanced `E39 Special Edition` introduction page to look and feel more premium than the standard E39 intro page.

**Scope**:
- Added a limited-edition identity badge in hero section (`Edition Number`)
- Added a dedicated premium identity band with three high-end attributes:
   - material system
   - release strategy
   - calibration standard
- Added a signature finishing section with stronger cinematic treatment
- Kept bilingual parity (`zh` / `en`) for all newly added content

**Files Changed**:
- `client/src/pages/ProductE39SpecialIntro.tsx`
- `docs/manus-context/DEVELOPMENT_NOTES.md`

**Rationale**:
- Strengthen visual and narrative hierarchy between standard and special edition product intros
- Better communicate the collectible and craftsmanship positioning of the special edition

---

### 2026-02-24: Products Page Realignment (E39 only) + Full zh/en Support
**Change**: Refactored `/products` page to match actual catalog (only E39 and E39 Special Edition) and implemented complete Chinese/English UI copy switching.

**Scope**:
- Removed legacy placeholder catalog items and kept only two real products: `E39` and `E39 Special Edition`
- Added bilingual text handling for all user-facing content on this page:
   - page title, home button, filter title and category labels
   - quick preview / add-to-cart actions and toast text
   - stock labels, specifications title, results count text
   - modal close label and related UI strings
- Updated product card click targets to corresponding actual product detail routes

**Files Changed**:
- `client/src/pages/Products.tsx`
- `docs/manus-context/DEVELOPMENT_NOTES.md`

**Rationale**:
- Keep product listing consistent with current business scope
- Eliminate language mismatch and ensure parity across `zh` and `en`

---

### 2026-02-24: Added E39 Special Card Entry + Intro CTA Scroll Reset
**Change**: Added E39 Special Edition card entry on homepage product selection cards, and fixed intro-page CTA navigation to always land at page top.

**Scope**:
- Added a second available product card in `ProductSelectionCards` for `E39 Special Edition`
- Kept multilingual naming for card labels (`zh` / `en`)
- Updated intro pages' CTA navigation (`查看商城页` / `Open Store Page`) to force scroll position reset to top after route change

**Files Changed**:
- `client/src/components/ProductSelectionCards.tsx`
- `client/src/pages/ProductE39Intro.tsx`
- `client/src/pages/ProductE39SpecialIntro.tsx`
- `docs/manus-context/COMPONENT_GUIDE.md`
- `docs/manus-context/DEVELOPMENT_NOTES.md`

**Rationale**:
- Ensure both intro pages are reachable from homepage card area
- Remove confusing behavior where users landed at the bottom after CTA navigation

---

### 2026-02-24: Added Editorial Product Introduction Pages (E39 / E39 Special Edition)
**Change**: Added two brand-story-style product introduction pages, separate from existing commerce product pages.

**Scope**:
- Created non-commerce narrative page for E39
- Created non-commerce narrative page for E39 Special Edition
- Added dedicated routes:
   - `/products/e39-intro`
   - `/products/e39-special-intro`
- Updated key entry points to new introduction pages:
   - Header product menu links
   - Homepage horizontal showcase product click behavior
   - Product selection card link for E39
- Kept original store-style product pages (`/products/e39`, `/products/e39-special`) unchanged for shopping flow

**Files Changed**:
- `client/src/pages/ProductE39Intro.tsx` (new)
- `client/src/pages/ProductE39SpecialIntro.tsx` (new)
- `client/src/App.tsx`
- `client/src/components/Header.tsx`
- `client/src/pages/Home.tsx`
- `client/src/components/ProductSelectionCards.tsx`
- `docs/manus-context/PROJECT_CONTEXT.md`
- `docs/manus-context/COMPONENT_GUIDE.md`
- `docs/manus-context/DEVELOPMENT_NOTES.md`

**Rationale**:
- Distinguish product storytelling experience from shopping conversion pages
- Keep Leica-inspired editorial tone consistent with `BrandStory` visual language

---

### 2026-02-24: Home Hero Mandler Background Updated to Cover Image
**Change**: Replaced the Mandler hero background image with the manually prepared cover asset.

**Scope**:
- Updated only the Mandler hero item image source in homepage showcase

**Files Changed**:
- `client/src/pages/Home.tsx`
- `docs/manus-context/DEVELOPMENT_NOTES.md`

**Rationale**:
- Align hero visual with latest approved cover image provided in local assets

---

### 2026-02-23: Image Reference Remapping After Manual Asset Rename
**Change**: Re-mapped page/component image references to the new manually renamed local image assets (Chinese semantic filenames), and replaced broken legacy paths.

**Scope**:
- Updated home showcase, quote backgrounds, and story module images
- Updated E39 and E39 Special product gallery image sets
- Updated legacy product detail page gallery sets
- Updated products listing card images and brand story heritage image
- Updated product selection card image for E39

**Files Changed**:
- `client/src/pages/Home.tsx`
- `client/src/pages/ProductE39.tsx`
- `client/src/pages/ProductE39Special.tsx`
- `client/src/pages/ProductDetail.tsx`
- `client/src/pages/Products.tsx`
- `client/src/pages/BrandStory.tsx`
- `client/src/components/ProductSelectionCards.tsx`
- `docs/manus-context/DEVELOPMENT_NOTES.md`

**Rationale**:
- Ensure all runtime image paths align with current local filenames after manual rename
- Prevent broken image loading due to stale legacy filenames
- Improve semantic fit of image content to each page section

---

### 2026-02-23: Top-Right Cart Disabled + Hover Notice
**Change**: Disabled top-right shopping cart actions on homepage and page headers, and added hover notice indicating store development status.

**Scope**:
- Global header cart icon is now non-clickable
- Products page local header cart icon is now non-clickable
- Added hover title notice text for both `zh` and `en`:
   - `商城正在开发中`
   - `Store is under development`

**Files Changed**:
- `client/src/components/Header.tsx`
- `client/src/pages/Products.tsx`
- `docs/manus-context/COMPONENT_GUIDE.md`
- `docs/manus-context/DEVELOPMENT_NOTES.md`

**Rationale**:
- Keep UI consistent with current store status while preventing inactive cart navigation
- Provide clear user feedback on hover without adding extra visual noise

---

### 2026-02-23: i18n Hotfix for Store Notice + Instruction Update
**Change**: Fixed English product pages showing Chinese store notice text, and added an explicit multilingual coverage requirement in project instruction.

**Scope**:
- Replaced hardcoded Chinese store notice with language-aware rendering on product detail pages
- Added English notice text: `Our online store is in preparation. Stay tuned!`
- Updated instruction rules to require checking/updating all supported languages (`zh`/`en`) for user-facing changes

**Files Changed**:
- `client/src/pages/ProductE39.tsx`
# Development Notes

## Recent Changes & Optimizations

### 2026-02-23: Manus CDN Image Localization (CDN → local public assets)
**Change**: Migrated all runtime image references from `https://files.manuscdn.com/...` to local static assets under `client/public/images`, and updated code to use `/images/*` paths.

**Scope**:
- Scanned all `client/src/**` Manus CDN references and localized them
- Downloaded accessible CDN assets to `client/public/images` with original filenames
- Updated all affected pages/components to local `/images/*` references
- Verified no remaining Manus CDN runtime references in source code

**Exception Handling**:
- `BHhLmQfWmDHLVNJL.jpg` returned `403` from CDN and could not be fetched from terminal
- Replaced this single reference with local fallback image `/images/hero-bg.jpg` in `ProductSelectionCards`

**Files Changed**:
- `client/src/pages/Home.tsx`
- `client/src/pages/ProductE39.tsx`
- `client/src/pages/ProductE39Special.tsx`
- `client/src/pages/ProductDetail.tsx`
- `client/src/pages/Products.tsx`
- `client/src/pages/BrandStory.tsx`
- `client/src/components/ProductSelectionCards.tsx`
- `docs/manus-context/PROJECT_CONTEXT.md`
- `docs/manus-context/DEVELOPMENT_NOTES.md`
- `docs/manus-context/DESIGN_SYSTEM.md`
- `docs/manus-context/COMPONENT_GUIDE.md`

---

### 2026-02-17: Product Naming Rename (E35 → E39)
**Change**: Renamed all product naming and related slugs from E35 to E39 across app code and Manus context documentation.

**Scope**:
- Updated UI product labels to `E39` / `E39 Special Edition`
- Updated routes and links from `/products/e35*` to `/products/e39*`
- Renamed page files and component identifiers:
    - `ProductE35.tsx` → `ProductE39.tsx`
    - `ProductE35Special.tsx` → `ProductE39Special.tsx`
- Synchronized docs under `docs/manus-context/`

**Files Changed**:
- `client/src/App.tsx`
- `client/src/components/Header.tsx`
- `client/src/components/ProductSelectionCards.tsx`
- `client/src/pages/Home.tsx`
- `client/src/pages/ProductE39.tsx` (renamed from `ProductE35.tsx`)
- `client/src/pages/ProductE39Special.tsx` (renamed from `ProductE35Special.tsx`)
- `docs/manus-context/PROJECT_CONTEXT.md`
- `docs/manus-context/DEVELOPMENT_NOTES.md`
- `docs/manus-context/COMPONENT_GUIDE.md`

---

### 2026-02-16: Ultra-Wide Screen Optimization
**Problem**: On ultra-wide displays, Hero images were stretched/compressed and CTA button was too close to bottom navigation.

**Solution**:
- Added `maxHeight: '1080px'` to Hero container to prevent excessive vertical compression
- Increased `minHeight` from 600px to 700px for better image display
- Added responsive bottom margin to CTA button: `mb-20 sm:mb-24 md:mb-28`
- Maintained gradient mask for left/right edge transitions
- Preserved parallax effects and auto-scroll behavior

**Files Changed**:
- `client/src/components/HorizontalProductShowcase.tsx`

**Commit**: `84fd34c` - "Optimize Hero layout for ultra-wide screens"

---

### 2026-02-14: Header Menu Product Update
**Change**: Replaced old products (M11 Monochrom, Q3 Classic, SL3 Professional) with E39 products in header dropdown menu.

**Implementation**:
```tsx
const products = [
   {
    label: 'E39',
    href: '/products/e39',
      description: language === 'zh' ? '经典焦段，纯粹视角' : 'Classic Focal Length, Pure Perspective',
   },
   {
    label: 'E39 ' + (language === 'zh' ? '特别版' : 'Special Edition'),
    href: '/products/e39-special',
      description: language === 'zh' ? '匠心之作，限量典藏' : 'Crafted Excellence, Limited Collection',
   },
];
```

**Files Changed**:
- `client/src/components/Header.tsx`

**Commit**: `2cdb2bb` - "Update Header menu: Replace old products with E39 and E39 Special Edition"

---

### 2026-02-14: Header Auto-Hide & Product Pages
**Features Added**:
1. Header auto-hide on scroll down (after 100px)
2. Header reappears on scroll up
3. Always visible at page top (< 10px scroll)
4. Product detail pages for E39 and E39 Special Edition
5. Fixed product page layouts to prevent header overlap (added `pt-16 md:pt-20`)

**Files Changed**:
- `client/src/components/Header.tsx`
- `client/src/pages/ProductE39.tsx` (new)
- `client/src/pages/ProductE39Special.tsx` (new)
- `client/src/App.tsx` (added routes)

**Commit**: `7d25a15f` - "Implemented Header auto-hide on scroll and fixed product page layouts"

---

### 2026-02-14: Hero Content Update
**Change**: Updated Hero showcase from "Mandler + 3 products" to "Mandler + E39 + E39 Special Edition"

**Implementation**:
- Mandler: Brand hero with artisan craftsmanship image
- E39: Product card with film photography image
- E39 Special Edition: Product card with tripod/equipment image

**Auto-Scroll Behavior**:
- Interval: 5 seconds
- Manual interaction pause: 10 seconds
- Smooth scroll with snap points

**Files Changed**:
- `client/src/pages/Home.tsx`
- `client/src/components/HorizontalProductShowcase.tsx`

**Commit**: `f13e0f59` - "Update Hero content and optimize auto-scroll"

---
- `client/src/pages/Home.tsx`
- `client/src/components/HorizontalProductShowcase.tsx`

**Commit**: `f13e0f59` - "Update Hero content and optimize auto-scroll"

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
