import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ParallaxSection from '@/components/ParallaxSection';

/**
 * Premium Brand Homepage
 * Design Philosophy: Minimalism + Cinematic Aesthetics
 * 
 * Structure:
 * 1. Hero Section - Full-screen with parallax background
 * 2. Series Navigation - Product series grid
 * 3. Brand Story - Editorial layout with image and text
 * 4. Editorial Gallery - Visual showcase with multiple images
 * 5. Content/Blog - Article cards
 * 6. Closing Statement - Brand philosophy summary
 */

export default function Home() {
  const [hoveredSeries, setHoveredSeries] = useState<number | null>(null);

  // Product series data
  const series = [
    { id: 1, name: 'Classic Series', image: '/images/series-1.jpg' },
    { id: 2, name: 'Film Collection', image: '/images/series-2.jpg' },
    { id: 3, name: 'Support Systems', image: '/images/series-3.jpg' },
    { id: 4, name: 'Optical Accessories', image: '/images/series-4.jpg' },
  ];

  // Blog/content articles
  const articles = [
    {
      id: 1,
      title: 'The Art of Precision',
      excerpt: 'Exploring the philosophy behind mechanical design and optical excellence.',
      date: 'January 2024',
    },
    {
      id: 2,
      title: 'Light and Shadow',
      excerpt: 'Understanding composition through the lens of minimalist aesthetics.',
      date: 'December 2023',
    },
    {
      id: 3,
      title: 'Timeless Craftsmanship',
      excerpt: 'How traditional engineering meets contemporary vision.',
      date: 'November 2023',
    },
  ];

  return (
    <div className="w-full bg-background text-foreground">
      {/* ===== MODULE 1: HERO SECTION ===== */}
      <ParallaxSection
        backgroundImage="/images/hero-bg.jpg"
        speed={0.35}
        className="h-screen flex items-center justify-center relative"
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Hero content */}
        <div className="relative z-20 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-display text-5xl md:text-7xl text-white mb-6 fade-in">
            Precision Redefined
          </h1>
          <p className="text-subtitle text-lg md:text-xl text-white/80 mb-12 fade-in">
            Where engineering meets vision
          </p>
          <button className="px-8 py-3 border border-white/50 text-white hover-lift transition-all duration-300 hover:border-white hover:bg-white/10 text-sm tracking-widest">
            EXPLORE
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/60" />
        </div>
      </ParallaxSection>

      {/* ===== MODULE 2: SERIES NAVIGATION ===== */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-display text-3xl md:text-4xl mb-2">Collections</h2>
            <div className="divider-line w-12 h-px bg-foreground/30" />
          </div>

          {/* Series grid - 2x2 on desktop, 1 column on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {series.map((item) => (
              <div
                key={item.id}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredSeries(item.id)}
                onMouseLeave={() => setHoveredSeries(null)}
              >
                {/* Image container with subtle hover effect */}
                <div className="relative overflow-hidden aspect-square mb-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                  />
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>

                {/* Series name */}
                <h3 className="text-subtitle text-lg tracking-wide text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                  {item.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MODULE 3: BRAND STORY ===== */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Image */}
            <div className="order-2 md:order-1">
              <img
                src="/images/brand-story.jpg"
                alt="Brand story"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Text content */}
            <div className="order-1 md:order-2">
              <h2 className="text-display text-3xl md:text-4xl mb-8">Our Philosophy</h2>

              <div className="space-y-6 text-body text-foreground/70 leading-relaxed">
                <p>
                  We believe that true craftsmanship lies in the pursuit of precision. Every lens, every mechanism, every detail is engineered with meticulous care to serve the vision of the photographer.
                </p>

                <p>
                  Our heritage spans decades of optical innovation. We honor the mechanical traditions of the past while embracing contemporary engineering standards, creating instruments that transcend time.
                </p>

                <p>
                  In an age of digital convenience, we celebrate the deliberate act of creation. Our equipment demands intention, rewarding the photographer with a deeper connection to their craft.
                </p>
              </div>

              {/* Divider */}
              <div className="divider-line w-12 h-px bg-foreground/20 my-8" />

              {/* CTA */}
              <button className="text-sm tracking-widest text-foreground/60 hover:text-foreground transition-colors duration-300">
                LEARN MORE →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MODULE 4: EDITORIAL GALLERY ===== */}
      <ParallaxSection
        backgroundImage="/images/gallery-1.jpg"
        speed={0.4}
        className="py-32 md:py-48 relative"
      >
        {/* Dark overlay for visual separation */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Gallery content - minimal text overlay */}
        <div className="relative z-10 container max-w-4xl mx-auto px-4 text-center">
          <p className="text-subtitle text-lg md:text-xl text-white/80 tracking-wide max-w-2xl mx-auto">
            Every moment captured is a testament to the precision and dedication of the photographer.
          </p>
        </div>
      </ParallaxSection>

      {/* ===== MODULE 5: CONTENT / BLOG ===== */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-display text-3xl md:text-4xl mb-2">Insights</h2>
            <div className="divider-line w-12 h-px bg-foreground/30" />
          </div>

          {/* Article grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {articles.map((article) => (
              <article
                key={article.id}
                className="group cursor-pointer hover-lift"
              >
                {/* Article header */}
                <div className="mb-6">
                  <p className="text-xs tracking-widest text-foreground/50 uppercase mb-3">
                    {article.date}
                  </p>
                  <h3 className="text-subtitle text-xl md:text-2xl text-foreground group-hover:text-foreground/80 transition-colors duration-300">
                    {article.title}
                  </h3>
                </div>

                {/* Article excerpt */}
                <p className="text-body text-foreground/60 leading-relaxed mb-6">
                  {article.excerpt}
                </p>

                {/* Read more link */}
                <button className="text-sm tracking-widest text-foreground/50 hover:text-foreground transition-colors duration-300">
                  READ →
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MODULE 6: CLOSING STATEMENT ===== */}
      <section className="py-24 md:py-32 bg-white border-t border-foreground/10">
        <div className="container max-w-3xl mx-auto px-4 text-center">
          <p className="text-display text-2xl md:text-3xl text-foreground/80 leading-relaxed">
            "In the pursuit of the perfect image, we create the perfect tools."
          </p>

          {/* Divider */}
          <div className="divider-line w-12 h-px bg-foreground/20 mx-auto my-12" />

          {/* Footer navigation */}
          <div className="flex justify-center gap-8 text-sm tracking-widest text-foreground/50">
            <button className="hover:text-foreground transition-colors duration-300">
              CONTACT
            </button>
            <span className="text-foreground/20">•</span>
            <button className="hover:text-foreground transition-colors duration-300">
              SUPPORT
            </button>
            <span className="text-foreground/20">•</span>
            <button className="hover:text-foreground transition-colors duration-300">
              ABOUT
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-foreground text-white/60 text-xs tracking-widest text-center border-t border-foreground/20">
        <p>© 2024 Premium Camera Equipment. All rights reserved.</p>
      </footer>
    </div>
  );
}
