# Development Notes

## Recent Changes & Optimizations

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
**Change**: Replaced old products (M11 Monochrom, Q3 Classic, SL3 Professional) with E35 products in header dropdown menu.

**Implementation**:
```tsx
const products = [
  {
    label: 'E35',
    href: '/products/e35',
    description: language === 'zh' ? '经典焦段，纯粹视角' : 'Classic Focal Length, Pure Perspective',
  },
  {
    label: 'E35 ' + (language === 'zh' ? '特别版' : 'Special Edition'),
    href: '/products/e35-special',
    description: language === 'zh' ? '匠心之作，限量典藏' : 'Crafted Excellence, Limited Collection',
  },
];
```

**Files Changed**:
- `client/src/components/Header.tsx`

**Commit**: `2cdb2bb` - "Update Header menu: Replace old products with E35 and E35 Special Edition"

---

### 2026-02-14: Header Auto-Hide & Product Pages
**Features Added**:
1. Header auto-hide on scroll down (after 100px)
2. Header reappears on scroll up
3. Always visible at page top (< 10px scroll)
4. Product detail pages for E35 and E35 Special Edition
5. Fixed product page layouts to prevent header overlap (added `pt-16 md:pt-20`)

**Files Changed**:
- `client/src/components/Header.tsx`
- `client/src/pages/ProductE35.tsx` (new)
- `client/src/pages/ProductE35Special.tsx` (new)
- `client/src/App.tsx` (added routes)

**Commit**: `7d25a15f` - "Implemented Header auto-hide on scroll and fixed product page layouts"

---

### 2026-02-14: Hero Content Update
**Change**: Updated Hero showcase from "Mandler + 3 products" to "Mandler + E35 + E35 Special Edition"

**Implementation**:
- Mandler: Brand hero with artisan craftsmanship image
- E35: Product card with film photography image
- E35 Special Edition: Product card with tripod/equipment image

**Auto-Scroll Behavior**:
- Interval: 5 seconds
- Manual interaction pause: 10 seconds
- Smooth scroll with snap points

**Files Changed**:
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
1. Use `manus-upload-file` to upload images to CDN
2. Get CDN URL from command output
3. Use CDN URL in code (never use local paths for production)
4. Move local images to `/home/ubuntu/webdev-static-assets/`

**Example**:
```bash
manus-upload-file /path/to/image.jpg
# Output: https://files.manuscdn.com/user_upload/.../image.jpg
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
- All product images served from CDN
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
1. Verify CDN URL is correct
2. Check browser console for CORS errors
3. Ensure image file exists at CDN location

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
- Last updated: 2026-02-16
