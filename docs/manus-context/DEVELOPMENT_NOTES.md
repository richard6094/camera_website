# Development Notes

## Recent Changes & Optimizations

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
