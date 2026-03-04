import { useState, useMemo } from 'react';
import { ChevronRight, Play, FileText } from 'lucide-react';
import { useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import HorizontalProductShowcase from '@/components/HorizontalProductShowcase';
import { ParallaxQuote } from '@/components/ParallaxQuote';
import { ScrollExpandGallery } from '@/components/ScrollExpandGallery';
import { ProductSelectionCards } from '@/components/ProductSelectionCards';
import { UserGallery } from '@/components/UserGallery';
import { ImageLightbox } from '@/components/ImageLightbox';
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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const { t, language } = useLanguage();

  // Scroll-progress refs (continuous, bidirectional — mandler.shop style)
  const storySectionRef = useScrollProgress<HTMLDivElement>();
  const gallerySectionRef = useScrollProgress<HTMLDivElement>();
  const reviewsSectionRef = useScrollProgress<HTMLDivElement>({ start: 1.15 });
  const supportSectionRef = useScrollProgress<HTMLDivElement>();
  const ctaSectionRef = useScrollProgress<HTMLDivElement>();

  const navigateWithTop = (path: string) => {
    navigate(path);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });
  };

  // Aperture animation frame sequence (36 frames, scroll-driven)
  const apertureFrames = useMemo(() =>
    Array.from({ length: 36 }, (_, i) => `/images/aperture-frames/aperture_${String(i).padStart(3, '0')}.webp`),
    []
  );

  // Gallery images for lightbox
  const galleryImages = [
    `https://mandlergallery.blob.core.windows.net/gallery/${encodeURIComponent('第1章  地域')}/${encodeURIComponent('1彩色-英国 风拂白崖，海映晴空。')}/1.webp`,
    `https://mandlergallery.blob.core.windows.net/gallery/${encodeURIComponent('第1章  地域')}/${encodeURIComponent('2彩色-新西兰 异域相遇，帧藏多元')}/3.webp`,
    `https://mandlergallery.blob.core.windows.net/gallery/${encodeURIComponent('第1章  地域')}/${encodeURIComponent('3彩色-埃及  沙漠与海相拥，烟火与古迹共生')}/2.webp`,
    `https://mandlergallery.blob.core.windows.net/gallery/${encodeURIComponent('第2章  色彩乐园')}/${encodeURIComponent('色彩乐园2  绮梦')}/1.webp`,
    `https://mandlergallery.blob.core.windows.net/gallery/${encodeURIComponent('第3章  韵律')}/7.webp`,
    `https://mandlergallery.blob.core.windows.net/gallery/${encodeURIComponent('第4章 霓虹')}/1.webp`,
    `https://mandlergallery.blob.core.windows.net/gallery/${encodeURIComponent('第5章  黑白之间')}/5.webp`,
  ];

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
      <section key="story" id="story" ref={storySectionRef} className="py-16 sm:py-20 md:py-24 lg:py-32 section-raised">
        <div className="container max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-14 md:gap-16 lg:gap-24 items-center">
            {/* Image */}
            <div className="md:order-1">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg shadow-black/15">
                <img 
                  src="/images/brand-story-heritage.jpg" 
                  alt="品牌故事"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content — fades from right, parallax-fast title + parallax-slow body */}
            <div className="md:order-2">
              <p className="sp-parallax-fast text-xs sm:text-sm tracking-widest mb-3 sm:mb-4 text-foreground/60">
                {t('story.label')}
              </p>
              <h2 className="sp-parallax-fast text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-7 md:mb-8 tracking-tight text-foreground">
                {t('story.heading')}
              </h2>
              <div className="sp-line-grow w-12 sm:w-14 md:w-16 h-px mb-6 sm:mb-7 md:mb-8 bg-foreground/20" style={{height: '0.5px'}} />
              <p className="sp-parallax-slow text-base sm:text-lg leading-relaxed text-foreground/80 mb-8">
                {t('story.content')}
              </p>
              <div className="sp-fade-up">
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
        </div>
      </section>

      {/* ===== SCROLL-EXPAND IMAGE → GALLERY → SHRINK ===== */}
      <ScrollExpandGallery
        image="/images/银色镜头挂机特写1.jpg"
        quote={t('quote.1')}
        gallerySectionId="gallery"
        bgColor="oklch(0.35 0.008 75)"
        darkGallery
      >
        {/* Gallery Section Header */}
        <div ref={gallerySectionRef}>
          <div className="sp-fade-up text-center mb-12 sm:mb-14 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 sm:mb-5">
              {t('gallery.heading')}
            </h2>
            <button
              onClick={() => navigateWithTop('/gallery')}
              className="inline-flex items-center gap-1.5 text-xs tracking-widest text-white/40 hover:text-white/70 transition-colors cursor-pointer group mb-6 sm:mb-7 md:mb-8"
            >
              <span className="border-b border-white/20 group-hover:border-white/50 pb-px transition-colors">
                {t('gallery.viewMore')}
              </span>
              <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
            </button>
            <p className="text-base sm:text-lg leading-relaxed text-white/70 max-w-3xl mx-auto">
              {t('gallery.description')}
            </p>
          </div>

          {/* User Gallery Component — real sample photos from Azure Blob Storage */}
          <UserGallery 
            images={galleryImages}
            onImageClick={(index) => {
              setLightboxIndex(index);
              setLightboxOpen(true);
            }}
          />
        </div>
      </ScrollExpandGallery>

      {/* ===== PARALLAX QUOTE 2 ===== */}
      <ParallaxQuote
        image="/images/银色镜头不挂机特写.jpg"
        quote={t('quote.2')}
      />

      {/* ===== PRODUCT SELECTION CARDS ===== */}
      <ProductSelectionCards />

      {/* ===== MEDIA REVIEWS — PRESS VOICES ===== */}
      <section ref={reviewsSectionRef} className="py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="container max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          {/* Section Header */}
          <div className="sp-fade-up text-center mb-12 sm:mb-14 md:mb-16">
            <p className="text-xs sm:text-sm tracking-widest mb-3 sm:mb-4 text-foreground/60">
              {t('home.reviews.label')}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 sm:mb-5">
              {t('home.reviews.heading')}
            </h2>
            <div className="w-12 sm:w-14 md:w-16 h-px mx-auto bg-foreground/20" style={{height: '0.5px'}} />
          </div>

          {/* Reviews Grid — staggered differential scroll */}
          <div className={`sp-stagger-children grid grid-cols-1 gap-6 md:gap-8 ${language === 'zh' ? 'md:grid-cols-3' : 'md:grid-cols-2 max-w-4xl mx-auto'}`}>
            {([
              {
                type: 'video' as const,
                platform: language === 'zh' ? 'Bilibili' : 'YouTube',
                author: language === 'zh' ? 'HEMO 林庚辰' : 'Matt Osborne',
                title: language === 'zh' ? '一分钟售空的国产手动镜头，是富士附体还是真有东西？' : 'Get the Leica Look for £254!! Mandler 35mm f2 7-Elements',
                excerpt: language === 'zh' ? '一个国产手动镜头凭什么一分钟售空？时隔多年，国产镜头终于站起来了吗？up 自费深度测评曼德勒复刻七枚玉。' : 'Can the Mandler 35mm f2 really deliver that classic Leica rendering at a fraction of the price? Full hands-on review with sample images and comparisons.',
                thumbnail: language === 'zh' ? '/images/bilibili-cover-BV115xzziEHi.jpg' : '/images/youtube-cover-VuZLgSqOxrU.jpg',
                url: language === 'zh' ? 'https://www.bilibili.com/video/BV115xzziEHi/' : 'https://youtu.be/VuZLgSqOxrU?si=PfwoMrgkAfMZLk70',
              },
              {
                type: 'video' as const,
                platform: language === 'zh' ? 'Bilibili' : 'YouTube',
                author: language === 'zh' ? '相机操作员xhs' : 'Jimmy Cheng',
                title: language === 'zh' ? '曼德勒Mandler 35mm f2国产七枚玉 买得起！徕卡M口高颜值小巧镜头' : 'Mandler 35mm f2.0 Review (compared to Leica summicron v4 KOB)',
                excerpt: language === 'zh' ? '徕卡M口高颜值小巧镜头，国产七枚玉实力几何？颜值与成像双重考验，买得起的经典复刻。' : 'A detailed comparison between the Mandler 35mm f2.0 and the Leica Summicron v4 King of Bokeh — optical performance, build quality and real-world rendering.',
                thumbnail: language === 'zh' ? '/images/bilibili-cover-BV1bydUYYEiF.jpg' : '/images/youtube-cover-QgWP0CPNnow.jpg',
                url: language === 'zh' ? 'https://www.bilibili.com/video/BV1bydUYYEiF/' : 'https://youtu.be/QgWP0CPNnow?si=lZSp38JHsA6x8I2R',
              },
              {
                type: 'video' as const,
                platform: 'Bilibili',
                author: 'Bilibili UP 主',
                title: '靓镜｜曼德勒35/F2复刻七枚玉，不完美但足够有诚意~',
                excerpt: '不完美但足够有诚意——这颗国产复刻七枚玉的购买价值在哪里？深度上手体验一探究竟。',
                thumbnail: '/images/bilibili-cover-BV16VUaBCETq.jpg',
                url: 'https://www.bilibili.com/video/BV16VUaBCETq/',
              },
            ] as const).map((item, i) => (
              <a
                key={i}
                href={item.url}
                target={item.url.startsWith('http') ? '_blank' : undefined}
                rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                onClick={(e) => { if (!item.url.startsWith('http')) { e.preventDefault(); navigateWithTop('/reviews'); } }}
                className={`group cursor-pointer flex flex-col overflow-hidden rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.16),0_4px_12px_rgba(0,0,0,0.1)] damped-transition bg-card${i === 2 ? (language === 'zh' ? ' hidden md:flex' : ' hidden') : ''}`}
              >
                {/* Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden image-hover-zoom">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Type badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs tracking-wider uppercase">
                    {item.type === 'video' ? (
                      <><Play className="w-2.5 h-2.5" fill="white" /> Video</>
                    ) : (
                      <><FileText className="w-2.5 h-2.5" /> Article</>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-3 text-xs tracking-widest text-foreground/40">
                    <span>{item.platform}</span>
                    <span className="w-3 h-px bg-foreground/15" />
                    <span>{item.author}</span>
                  </div>
                  <h3 className="text-base font-medium mb-2.5 leading-snug group-hover:text-foreground/80 transition-colors line-clamp-2 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-foreground/60 text-sm leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* View All CTA */}
          <div className="text-center mt-12 sm:mt-14">
            <button
              onClick={() => navigateWithTop('/reviews')}
              className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/20 text-foreground hover:bg-foreground hover:text-background damped-transition"
            >
              <span className="text-sm tracking-wide">{t('home.reviews.viewAll')}</span>
              <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </section>

      {/* ===== BRAND STORY MODULE 3 ===== */}
      <section key="support" id="support" ref={supportSectionRef} className="py-16 sm:py-20 md:py-24 lg:py-32 section-raised">
        <div className="container max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-14 md:gap-16 lg:gap-24 items-center">
            {/* Image */}
            <div className="md:order-1">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg shadow-black/15">
                <img 
                  src="/images/service-support.jpg" 
                  alt="服务支持"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content — parallax differential speeds */}
            <div className="md:order-2">
              <p className="sp-parallax-fast text-xs sm:text-sm tracking-widest mb-3 sm:mb-4 text-foreground/60">
                {t('support.label')}
              </p>
              <h2 className="sp-parallax-fast text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-7 md:mb-8 tracking-tight text-foreground">
                {t('support.heading')}
              </h2>
              <div className="sp-line-grow w-12 sm:w-14 md:w-16 h-px mb-6 sm:mb-7 md:mb-8 bg-foreground/20" style={{height: '0.5px'}} />
              <p className="sp-parallax-slow text-base sm:text-lg leading-relaxed text-foreground/80">
                {t('support.content')}
              </p>
              <div className="sp-fade-up">
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
        </div>
      </section>

      {/* ===== FINAL CTA SECTION ===== */}
      <section ref={ctaSectionRef} className="relative py-32 md:py-40 bg-black text-white overflow-hidden">
        <div className="relative z-10 container max-w-4xl mx-auto px-8 text-center">
          <div className="sp-parallax-fast">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight">
            {t('cta.heading')}
          </h2>
          </div>
          <div className="sp-line-grow w-24 h-px bg-white/40 mx-auto mb-8" style={{height: '0.5px'}} />
          <p className="sp-parallax-slow text-xl md:text-2xl mb-12 text-white/80 font-light">
            {t('cta.tagline')}
          </p>
          <div className="sp-fade-up">
          <button 
            onClick={() => navigateWithTop('/products')}
            className="px-10 py-4 border border-white text-white hover:bg-white hover:text-black damped-transition text-sm tracking-widest inline-flex items-center gap-2"
            style={{borderWidth: '0.5px'}}
          >
            {t('cta.button')} <ChevronRight className="w-4 h-4" />
          </button>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <Footer />

      {/* ===== LIGHTBOX (rendered at page root to escape z-index stacking contexts) ===== */}
      <ImageLightbox
        images={galleryImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
