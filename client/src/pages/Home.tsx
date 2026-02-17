import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import HorizontalProductShowcase from '@/components/HorizontalProductShowcase';
import { ParallaxQuote } from '@/components/ParallaxQuote';
import { ProductSelectionCards } from '@/components/ProductSelectionCards';
import { UserGallery } from '@/components/UserGallery';
import Footer from '@/components/Footer';

/**
 * Premium Brand Homepage - Leica-Inspired Design
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

  // Unified showcase items - Hero + Products
  const showcaseItems = [
    {
      id: 'hero',
      type: 'hero' as const,
      name: 'Mandler',
      title: 'Mandler',
      subtitle: t('hero.tagline'),
      description: t('hero.description'),
      image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663314029101/RUCXspLnsSdMKWPE.jpg',
    },
    {
      id: 'e39',
      type: 'product' as const,
      name: 'E39',
      tagline: language === 'zh' ? '经典焦段，纯粹视角' : 'Classic Focal Length, Pure Vision',
      productDescription: language === 'zh' ? '35mm 定焦镜头，街头摄影的理想伴侣。轻巧便携，成像锐利，捕捉生活中每一个真实瞬间。' : '35mm prime lens, the ideal companion for street photography. Compact and portable, with sharp imaging to capture every authentic moment in life.',
      image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663314029101/KbkaOzYHAtTpuzfQ.jpg',
    },
    {
      id: 'e39-special',
      type: 'product' as const,
      name: language === 'zh' ? 'E39 特别版' : 'E39 Special Edition',
      tagline: language === 'zh' ? '匠心之作，限量典藏' : 'Masterpiece, Limited Collection',
      productDescription: language === 'zh' ? '精选材质，手工打磨。每一支镜头都经过严格的光学校准，呈现无与伦比的成像品质。限量发售，独一无二。' : 'Premium materials, hand-polished. Each lens undergoes rigorous optical calibration for unparalleled imaging quality. Limited edition, one of a kind.',
      image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663314029101/dbkHWzIemGfChxZS.jpg',
    },
  ];

  // Brand story sections
  const storyModules = [
    {
      id: 'story',
      title: '品牌故事',
      titleEn: 'OUR STORY',
      content: 'Every mandler camera represents decades of engineering excellence and artistic vision. We believe that the best tools are those that disappear into the background, allowing you to focus on what truly matters: capturing the moment.',
      image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663314029101/RUCXspLnsSdMKWPE.jpg',
    },
    {
      id: 'innovation',
      title: '技术创新',
      titleEn: 'INNOVATION',
      content: 'From the finest optical glass to precision-engineered mechanics, every component is selected and tested to ensure your camera performs flawlessly, shot after shot, year after year.',
      image: '/images/product-1.jpg',
    },
    {
      id: 'support',
      title: '服务支持',
      titleEn: 'SUPPORT',
      content: 'Our commitment extends beyond the purchase. With lifetime support, expert maintenance, and a global network of service centers, your mandler camera is built to last generations.',
      image: '/images/product-2.jpg',
    },
  ];

  return (
    <div className="w-full text-foreground">
      {/* ===== UNIFIED HORIZONTAL SHOWCASE - HERO + PRODUCTS ===== */}
      <HorizontalProductShowcase
        items={showcaseItems}
        onItemClick={(itemId) => {
          if (itemId === 'hero') {
            navigate('/products');
          } else {
            navigate(`/products/${itemId}`);
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
      <section key="story" id="story" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-background">
        <div className="container max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-14 md:gap-16 lg:gap-24 items-center">
            {/* Image */}
            <div className="md:order-1">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663314029101/RUCXspLnsSdMKWPE.jpg" 
                  alt="品牌故事"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="md:order-2">
              <p className="text-xs sm:text-sm tracking-widest mb-3 sm:mb-4 text-foreground/60">
                {t('story.label')}
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-7 md:mb-8 tracking-tight text-foreground">
                {t('story.heading')}
              </h2>
              <div className="w-12 sm:w-14 md:w-16 h-px mb-6 sm:mb-7 md:mb-8 bg-foreground/20" style={{height: '0.5px'}} />
              <p className="text-base sm:text-lg leading-relaxed text-foreground/80 mb-8">
                {t('story.content')}
              </p>
              <button
                onClick={() => navigate('/story')}
                className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/20 text-foreground hover:bg-foreground hover:text-background damped-transition"
              >
                <span className="text-sm tracking-wide">{language === 'zh' ? '了解更多' : 'LEARN MORE'}</span>
                <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PARALLAX QUOTE 1 ===== */}
      <ParallaxQuote
        image="https://files.manuscdn.com/user_upload_by_module/session_file/310519663314029101/KbAigLQEvYhVIhbQ.jpg"
        quote={t('quote.1')}
      />

      {/* ===== USER GALLERY - SAMPLE PHOTOS ===== */}
      <section key="gallery" id="gallery" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-background">
        <div className="container max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-14 md:mb-16">
            <p className="text-xs sm:text-sm tracking-widest mb-3 sm:mb-4 text-foreground/60">
              {t('gallery.label')}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-7 md:mb-8 tracking-tight text-foreground">
              {t('gallery.heading')}
            </h2>
            <div className="w-12 sm:w-14 md:w-16 h-px mx-auto mb-6 sm:mb-7 md:mb-8 bg-foreground/20" style={{height: '0.5px'}} />
            <p className="text-base sm:text-lg leading-relaxed text-foreground/80 max-w-3xl mx-auto">
              {t('gallery.description')}
            </p>
          </div>

          {/* User Gallery Component */}
          <UserGallery 
            images={[
              '/images/sample-1.jpg',
              '/images/sample-2.jpg',
              '/images/sample-3.jpg',
              '/images/sample-4.jpg',
              '/images/sample-5.jpg',
            ]}
          />
        </div>
      </section>

      {/* ===== PARALLAX QUOTE 2 ===== */}
      <ParallaxQuote
        image="https://files.manuscdn.com/user_upload_by_module/session_file/310519663314029101/dOLtfxwBscxxxMgu.jpg"
        quote={t('quote.2')}
      />

      {/* ===== PRODUCT SELECTION CARDS ===== */}
      <ProductSelectionCards />

      {/* ===== BRAND STORY MODULE 3 ===== */}
      <section key="support" id="support" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-background">
        <div className="container max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-14 md:gap-16 lg:gap-24 items-center">
            {/* Image */}
            <div className="md:order-1">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src="/images/service-support.jpg" 
                  alt="服务支持"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="md:order-2">
              <p className="text-xs sm:text-sm tracking-widest mb-3 sm:mb-4 text-foreground/60">
                {t('support.label')}
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-7 md:mb-8 tracking-tight text-foreground">
                {t('support.heading')}
              </h2>
              <div className="w-12 sm:w-14 md:w-16 h-px mb-6 sm:mb-7 md:mb-8 bg-foreground/20" style={{height: '0.5px'}} />
              <p className="text-base sm:text-lg leading-relaxed text-foreground/80">
                {t('support.content')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA SECTION ===== */}
      <section className="relative py-32 md:py-40 bg-black text-white overflow-hidden">
        <div className="relative z-10 container max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight">
            {t('cta.heading')}
          </h2>
          <div className="w-24 h-px bg-white/40 mx-auto mb-8" style={{height: '0.5px'}} />
          <p className="text-xl md:text-2xl mb-12 text-white/80 font-light">
            {t('cta.tagline')}
          </p>
          <button 
            onClick={() => navigate('/products')}
            className="px-10 py-4 border border-background text-background hover:bg-background/10 damped-transition text-sm tracking-widest inline-flex items-center gap-2"
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
