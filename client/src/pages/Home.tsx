import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import HorizontalProductShowcase from '@/components/HorizontalProductShowcase';
import { ParallaxQuote } from '@/components/ParallaxQuote';
import { ProductSelectionCards } from '@/components/ProductSelectionCards';
import { UserGallery } from '@/components/UserGallery';
import Footer from '@/components/Footer';

/**
 * Mandler Lens - Leica-Inspired Design
 * Design Philosophy: 
 * - Unified horizontal scrolling showcase (Hero + Products)
 * - Parallax effects on all cards
 * - Large hero images with minimal text overlay
 * - Full-width sections with ample whitespace
 * - Precision typography and restrained interactions
 */

export default function Home() {
  const [, navigate] = useLocation();
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const { t, language } = useLanguage();

  // Scroll reveal refs
  const storyImageRef = useScrollReveal<HTMLDivElement>({ animation: 'clip-reveal', duration: 1200 });
  const storyContentRef = useScrollReveal<HTMLDivElement>({ animation: 'fade-left', delay: 150 });
  const storyLineRef = useScrollReveal<HTMLDivElement>({ animation: 'line-grow', delay: 350 });
  const galleryHeaderRef = useScrollReveal<HTMLDivElement>({ animation: 'fade-up' });
  const supportImageRef = useScrollReveal<HTMLDivElement>({ animation: 'clip-reveal-left', duration: 1200 });
  const supportContentRef = useScrollReveal<HTMLDivElement>({ animation: 'fade-right', delay: 150 });
  const supportLineRef = useScrollReveal<HTMLDivElement>({ animation: 'line-grow', delay: 350 });
  const ctaRef = useScrollReveal<HTMLDivElement>({ animation: 'fade-up', delay: 100 });
  const ctaLineRef = useScrollReveal<HTMLDivElement>({ animation: 'line-grow', delay: 0 });

  const navigateWithTop = (path: string) => {
    navigate(path);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });
  };

  // Unified showcase items - Hero + Products
  const showcaseItems = [
    {
      id: 'hero',
      type: 'hero' as const,
      name: 'Mandler',
      title: 'Mandler',
      subtitle: t('hero.tagline'),
      description: t('hero.description'),
      image: '/images/AI-generated-images/封面.jpg',
    },
    {
      id: '35mm-f2',
      type: 'product' as const,
      name: '35mm F/2',
      tagline: language === 'zh' ? '经典焦段，纯粹视角' : language === 'ja' ? 'クラシックな焦点距離、ピュアなビジョン' : 'Classic Focal Length, Pure Vision',
      productDescription: language === 'zh' ? '35mm 定焦镜头，街头摄影的理想伴侣。轻巧便携，成像锐利，捕捉生活中每一个真实瞬间。' : language === 'ja' ? '35mm単焦点レンズ、ストリートフォトの理想的なパートナー。コンパクトで携帯性に優れ、シャープな描写で日常のあらゆる真実の瞬間を捕らえます。' : '35mm prime lens, the ideal companion for street photography. Compact and portable, with sharp imaging to capture every authentic moment in life.',
      image: '/images/银色镜头+相机+暖色背景.jpg',
    },
  ];

  // Brand story sections
  const storyModules = [
    {
      id: 'story',
      title: '品牌故事',
      titleEn: 'OUR STORY',
      content: 'Every Mandler lens represents decades of engineering excellence and artistic vision. We believe that the best tools are those that disappear into the background, allowing you to focus on what truly matters: capturing the moment.',
      image: '/images/brand-story-workshop.jpg',
    },
    {
      id: 'innovation',
      title: '技术创新',
      titleEn: 'INNOVATION',
      content: 'From the finest optical glass to precision-engineered mechanics, every component is selected and tested to ensure your lens performs flawlessly, shot after shot, year after year.',
      image: '/images/两种颜色镜头+遮光罩特写.jpg',
    },
    {
      id: 'support',
      title: '服务支持',
      titleEn: 'SUPPORT',
      content: 'Our commitment extends beyond the purchase. With lifetime support, expert maintenance, and a global network of service centers, your Mandler lens is built to last generations.',
      image: '/images/银色镜头+相机+包装盒.jpg',
    },
  ];

  return (
    <div className="w-full text-foreground">
      {/* ===== UNIFIED HORIZONTAL SHOWCASE - HERO + PRODUCTS ===== */}
      <HorizontalProductShowcase
        items={showcaseItems}
        onItemClick={(itemId) => {
          if (itemId === 'hero') {
            navigateWithTop('/products');
          } else if (itemId === '35mm-f2') {
            navigateWithTop('/products/35mm-f2-intro');
          }
        }}
        videoLoaded={videoLoaded}
        videoProgress={videoProgress}
        onVideoLoadProgress={(progress) => {
          setVideoProgress(progress);
          if (progress >= 100) setVideoLoaded(true);
        }}
      />

      {/* ===== BRAND STORY MODULE 1 ===== */}
      <section key="story" id="story" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-background section-raised">
        <div className="container max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-14 md:gap-16 lg:gap-24 items-center">
            {/* Image */}
            <div className="md:order-1">
              <div ref={storyImageRef} className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08)] image-hover-zoom">
                <img 
                  src="/images/brand-story-heritage.jpg" 
                  alt="品牌故事"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div ref={storyContentRef} className="md:order-2">
              <p className="text-xs sm:text-sm tracking-widest mb-3 sm:mb-4 text-foreground/60">
                {t('story.label')}
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-7 md:mb-8 tracking-tight text-foreground">
                {t('story.heading')}
              </h2>
              <div ref={storyLineRef} className="w-12 sm:w-14 md:w-16 h-px mb-6 sm:mb-7 md:mb-8 bg-foreground/20" style={{height: '0.5px'}} />
              <p className="text-base sm:text-lg leading-relaxed text-foreground/80 mb-8">
                {t('story.content')}
              </p>
              <button
                onClick={() => navigateWithTop('/story')}
                className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/20 text-foreground hover:bg-foreground hover:text-background damped-transition"
              >
                <span className="text-sm tracking-wide">{language === 'zh' ? '了解更多' : language === 'ja' ? '詳しく見る' : 'LEARN MORE'}</span>
                <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PARALLAX QUOTE 1 ===== */}
      <ParallaxQuote
        image="/images/银色镜头挂机特写1.jpg"
        quote={t('quote.1')}
        topBg="var(--background)"
        bottomBg="var(--surface-alt)"
      />

      {/* ===== USER GALLERY - SAMPLE PHOTOS ===== */}
      <section key="gallery" id="gallery" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-surface-alt section-raised">
        <div className="container max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          {/* Section Header */}
          <div ref={galleryHeaderRef} className="text-center mb-12 sm:mb-14 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 sm:mb-5">
              {t('gallery.heading')}
            </h2>
            <button
              onClick={() => navigateWithTop('/gallery')}
              className="inline-flex items-center gap-1.5 text-xs tracking-widest text-foreground/40 hover:text-foreground/70 transition-colors cursor-pointer group mb-6 sm:mb-7 md:mb-8"
            >
              <span className="border-b border-foreground/20 group-hover:border-foreground/50 pb-px transition-colors">
                {t('gallery.viewMore')}
              </span>
              <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
            </button>
            <p className="text-base sm:text-lg leading-relaxed text-foreground/80 max-w-3xl mx-auto">
              {t('gallery.description')}
            </p>
          </div>

          {/* User Gallery Component — real sample photos from Azure Blob Storage */}
          <UserGallery 
            images={[
              `https://mandlergallery.blob.core.windows.net/gallery/${encodeURIComponent('第1章  地域')}/${encodeURIComponent('1彩色-英国 风拂白崖，海映晴空。')}/1.webp`,
              `https://mandlergallery.blob.core.windows.net/gallery/${encodeURIComponent('第1章  地域')}/${encodeURIComponent('2彩色-新西兰 异域相遇，帧藏多元')}/3.webp`,
              `https://mandlergallery.blob.core.windows.net/gallery/${encodeURIComponent('第1章  地域')}/${encodeURIComponent('3彩色-埃及  沙漠与海相拥，烟火与古迹共生')}/2.webp`,
              `https://mandlergallery.blob.core.windows.net/gallery/${encodeURIComponent('第2章  色彩乐园')}/${encodeURIComponent('色彩乐园2  绮梦')}/1.webp`,
              `https://mandlergallery.blob.core.windows.net/gallery/${encodeURIComponent('第3章  韵律')}/7.webp`,
              `https://mandlergallery.blob.core.windows.net/gallery/${encodeURIComponent('第4章 霓虹')}/1.webp`,
              `https://mandlergallery.blob.core.windows.net/gallery/${encodeURIComponent('第5章  黑白之间')}/5.webp`,
            ]}
          />
        </div>
      </section>

      {/* ===== PARALLAX QUOTE 2 ===== */}
      <ParallaxQuote
        image="/images/银色镜头不挂机特写.jpg"
        quote={t('quote.2')}
        topBg="var(--surface-alt)"
        bottomBg="var(--surface-alt)"
      />

      {/* ===== PRODUCT SELECTION CARDS ===== */}
      <ProductSelectionCards />

      {/* ===== BRAND STORY MODULE 3 ===== */}
      <section key="support" id="support" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-background section-raised">
        <div className="container max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-14 md:gap-16 lg:gap-24 items-center">
            {/* Image */}
            <div className="md:order-1">
              <div ref={supportImageRef} className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08)] image-hover-zoom">
                <img 
                  src="/images/service-support.jpg" 
                  alt="服务支持"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div ref={supportContentRef} className="md:order-2">
              <p className="text-xs sm:text-sm tracking-widest mb-3 sm:mb-4 text-foreground/60">
                {t('support.label')}
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-7 md:mb-8 tracking-tight text-foreground">
                {t('support.heading')}
              </h2>
              <div ref={supportLineRef} className="w-12 sm:w-14 md:w-16 h-px mb-6 sm:mb-7 md:mb-8 bg-foreground/20" style={{height: '0.5px'}} />
              <p className="text-base sm:text-lg leading-relaxed text-foreground/80">
                {t('support.content')}
              </p>
              <button
                onClick={() => navigateWithTop('/support')}
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 border border-foreground/20 text-foreground hover:bg-foreground hover:text-background damped-transition"
              >
                <span className="text-sm tracking-wide">{language === 'zh' ? '了解详情' : language === 'ja' ? '詳細を見る' : 'LEARN MORE'}</span>
                <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA SECTION ===== */}
      <section className="relative py-32 md:py-40 bg-black text-white overflow-hidden">
        <div className="relative z-10 container max-w-4xl mx-auto px-8 text-center">
          <div ref={ctaRef}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight">
            {t('cta.heading')}
          </h2>
          </div>
          <div ref={ctaLineRef} className="w-24 h-px bg-white/40 mx-auto mb-8" style={{height: '0.5px'}} />
          <p className="text-xl md:text-2xl mb-12 text-white/80 font-light">
            {t('cta.tagline')}
          </p>
          <button 
            onClick={() => navigateWithTop('/products')}
            className="px-10 py-4 border border-white text-white hover:bg-white hover:text-black damped-transition text-sm tracking-widest inline-flex items-center gap-2"
            style={{borderWidth: '0.5px'}}
          >
            {t('cta.button')} <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <Footer />
    </div>
  );
}
