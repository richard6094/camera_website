# Mandler Design System

## Design Philosophy

The Mandler brand embodies the intersection of **optical precision** and **artisan craftsmanship**. Our design system reflects this through minimalist aesthetics, monochromatic color schemes, and attention to detail inspired by legendary camera manufacturers like Leica.

## Color Palette

### Primary Colors (Defined in `client/src/index.css`)

The color system uses CSS custom properties for theming. Current theme: **Dark mode** with light accents.

```css
--background: 0 0% 7%;           /* #121212 - Deep charcoal */
--foreground: 0 0% 98%;          /* #FAFAFA - Off-white */
--card: 0 0% 10%;                /* #1A1A1A - Card background */
--card-foreground: 0 0% 98%;     /* #FAFAFA - Card text */
--popover: 0 0% 10%;             /* #1A1A1A - Popover background */
--popover-foreground: 0 0% 98%;  /* #FAFAFA - Popover text */
--primary: 0 0% 98%;             /* #FAFAFA - Primary accent */
--primary-foreground: 0 0% 9%;   /* #171717 - Primary text */
--secondary: 0 0% 14.9%;         /* #262626 - Secondary background */
--secondary-foreground: 0 0% 98%; /* #FAFAFA - Secondary text */
--muted: 0 0% 14.9%;             /* #262626 - Muted background */
--muted-foreground: 0 0% 63.9%;  /* #A3A3A3 - Muted text */
--accent: 0 0% 14.9%;            /* #262626 - Accent background */
--accent-foreground: 0 0% 98%;   /* #FAFAFA - Accent text */
--destructive: 0 62.8% 30.6%;    /* #7C2D12 - Error/destructive */
--destructive-foreground: 0 0% 98%; /* #FAFAFA - Error text */
--border: 0 0% 14.9%;            /* #262626 - Border color */
--input: 0 0% 14.9%;             /* #262626 - Input border */
--ring: 0 0% 83.1%;              /* #D4D4D4 - Focus ring */
```

### Brand Accent Color

**Warm Orange** (`#E85D04` / `hsl(22, 96%, 46%)`) - Used sparingly for:
- Mandler logo
- Call-to-action highlights
- Limited edition badges
- Interactive hover states

### Semantic Colors

| Purpose | Color | Usage |
|---------|-------|-------|
| Success | Green (`#22C55E`) | Stock availability, confirmation |
| Warning | Amber (`#F59E0B`) | Low stock alerts |
| Error | Red (`#DC2626`) | Out of stock, form errors |
| Info | Blue (`#3B82F6`) | Informational messages |

## Typography

### Font Families

**Primary Font**: System font stack for optimal performance and native feel
```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

**Display Font** (for Mandler logo): Custom script font with elegant curves

### Type Scale

| Element | Size (Mobile) | Size (Desktop) | Weight | Line Height |
|---------|---------------|----------------|--------|-------------|
| H1 (Hero Title) | 2.5rem (40px) | 4rem (64px) | 700 | 1.1 |
| H2 (Section Title) | 2rem (32px) | 3rem (48px) | 600 | 1.2 |
| H3 (Card Title) | 1.5rem (24px) | 2rem (32px) | 600 | 1.3 |
| H4 (Subsection) | 1.25rem (20px) | 1.5rem (24px) | 600 | 1.4 |
| Body Large | 1.125rem (18px) | 1.25rem (20px) | 400 | 1.6 |
| Body | 1rem (16px) | 1rem (16px) | 400 | 1.6 |
| Body Small | 0.875rem (14px) | 0.875rem (14px) | 400 | 1.5 |
| Caption | 0.75rem (12px) | 0.75rem (12px) | 400 | 1.4 |

### Font Weights
- **Light** (300): Subtle descriptions, secondary text
- **Regular** (400): Body text, paragraphs
- **Medium** (500): Emphasized text
- **Semibold** (600): Headings, labels
- **Bold** (700): Hero titles, strong emphasis

## Spacing System

Using Tailwind's default spacing scale (0.25rem increments):

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 0.25rem (4px) | Tight spacing, icon gaps |
| `space-2` | 0.5rem (8px) | Small gaps, inline elements |
| `space-3` | 0.75rem (12px) | Default gap |
| `space-4` | 1rem (16px) | Standard spacing |
| `space-6` | 1.5rem (24px) | Section spacing |
| `space-8` | 2rem (32px) | Large gaps |
| `space-12` | 3rem (48px) | Section padding |
| `space-16` | 4rem (64px) | Major section spacing |
| `space-20` | 5rem (80px) | Hero spacing |
| `space-24` | 6rem (96px) | Extra large spacing |

### Responsive Spacing Pattern
```
mb-8 sm:mb-10 md:mb-12
```
Mobile (8) → Tablet (10) → Desktop (12)

## Layout & Grid

### Container Widths
- **Mobile**: Full width with 1rem (16px) padding
- **Tablet**: Full width with 2rem (32px) padding
- **Desktop**: Max-width 1280px (80rem) with 4rem (64px) padding
- **Ultra-wide**: Max-width 1536px (96rem)

### Breakpoints (Tailwind defaults)
```css
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Small desktops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large desktops */
```

### Grid System
- **Product Cards**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- **Feature Grid**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- **Spec Table**: Two-column layout with labels and values

## Components

### Buttons

#### Primary Button (CTA)
```jsx
<button className="px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 border border-white text-white hover:bg-white/10 damped-transition text-xs sm:text-sm tracking-widest">
  探索系列
</button>
```
- Border: 0.5px solid white
- Hover: 10% white overlay
- Transition: Custom `damped-transition` class
- Letter spacing: `tracking-widest`

#### Secondary Button
```jsx
<button className="px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
  发现更多
</button>
```

#### Outline Button
```jsx
<button className="px-6 py-3 border border-border hover:bg-accent transition-colors">
  了解更多
</button>
```

### Cards

#### Product Card
```jsx
<div className="group relative aspect-square overflow-hidden bg-card rounded-lg border border-border hover:border-primary/50 transition-all">
  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
    {/* Content */}
  </div>
</div>
```

#### Feature Card
```jsx
<div className="p-6 bg-card border border-border rounded-lg">
  <h3 className="text-lg font-semibold mb-2">Title</h3>
  <p className="text-muted-foreground">Description</p>
</div>
```

### Images

#### Hero Image with Gradient Mask
```jsx
<div className="relative w-full h-full max-w-[177.78vh]"
  style={{
    maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
  }}>
  <img src={src} className="w-full h-full object-cover" />
</div>
```

#### Product Image
```jsx
<img 
  src={src} 
  alt="Product" 
  className="w-full h-full object-cover"
  style={{ filter: 'brightness(0.6)' }}
/>
```

### Navigation

#### Bottom Thumbnail Navigation
```jsx
<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent py-4 z-20">
  <div className="flex justify-center gap-8">
    <button className="text-white/70 hover:text-white transition-colors pb-2 border-b-2 border-transparent hover:border-white">
      Item Name
    </button>
  </div>
</div>
```

## Effects & Animations

### Parallax Effect
```jsx
<div style={{
  transform: `translateX(${parallaxOffset}px)`,
  willChange: 'transform',
  transition: 'transform 0.1s ease-out',
}}>
  {/* Content */}
</div>
```

### Hover Scale
```css
.group-hover:scale-105 transition-transform duration-500
```

### Fade In
```css
.animate-fadeIn {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### Damped Transition (Custom)
```css
.damped-transition {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Accessibility

### Focus States
All interactive elements must have visible focus indicators:
```css
focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
```

### Color Contrast
- Text on background: Minimum 4.5:1 ratio (WCAG AA)
- Large text (18px+): Minimum 3:1 ratio
- Interactive elements: Minimum 3:1 ratio

### Keyboard Navigation
- All interactive elements accessible via Tab
- Escape key closes modals and dropdowns
- Enter/Space activates buttons and links

## Responsive Design Principles

### Mobile-First Approach
Start with mobile layout, progressively enhance for larger screens:
```jsx
<div className="flex flex-col md:flex-row gap-4 md:gap-8">
```

### Breakpoint Strategy
- **Mobile** (< 640px): Single column, stacked layout
- **Tablet** (640px - 1024px): Two columns, condensed spacing
- **Desktop** (1024px+): Multi-column, generous spacing
- **Ultra-wide** (1536px+): Max-width constraints, centered content

### Image Optimization
- Use responsive images with `srcset`
- Lazy load below-the-fold images
- Serve WebP with fallbacks
- Use CDN URLs from `manus-upload-file`

## Best Practices

### Do's
✅ Use semantic HTML elements (`<header>`, `<nav>`, `<main>`, `<article>`)  
✅ Provide alt text for all images  
✅ Test on multiple screen sizes and devices  
✅ Use Tailwind utilities over custom CSS  
✅ Keep components small and focused  
✅ Follow established spacing patterns  

### Don'ts
❌ Use inline styles except for dynamic values  
❌ Hardcode colors (use CSS variables)  
❌ Create deeply nested components  
❌ Ignore keyboard accessibility  
❌ Use generic alt text like "image" or "photo"  
❌ Mix design tokens (e.g., `space-4` and `16px` in same context)  
