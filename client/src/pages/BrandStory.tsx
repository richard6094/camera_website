import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import Breadcrumb from '@/components/Breadcrumb';

/**
 * Brand Story Page
 * Design Philosophy: Magazine-style editorial layout with high-end aesthetics
 * 
 * Features:
 * - Hero section with large typography
 * - Multi-column text layout
 * - Full-bleed images
 * - Pull quotes and callouts
 * - Timeline section
 * - Philosophy statements
 */

export default function BrandStory() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Breadcrumb Navigation */}
      <div className="container max-w-7xl mx-auto px-6 pt-20 md:pt-24">
        <Breadcrumb 
          items={[
            { label: language === 'zh' ? '首页' : language === 'ja' ? 'ホーム' : 'Home', href: '/' },
            { label: language === 'zh' ? '品牌故事' : language === 'ja' ? 'ブランドストーリー' : 'Our Story' }
          ]}
        />
      </div>

      {/* Hero Section - Magazine Cover Style */}
      <section className="relative flex items-center justify-center overflow-hidden bg-black" style={{ height: '85vh' }}>
        <img
          src="/images/3色镜头+相机+不同角度.jpg"
          alt="Mandler lenses"
          className="absolute inset-0 w-full h-full object-contain"
          style={{ filter: 'brightness(0.4)' }}
        />
        <div className="relative z-10 container max-w-5xl mx-auto px-6 text-center text-white">
          <p className="text-sm tracking-[0.3em] mb-8 opacity-80">
            {t.brandStory.subtitle}
          </p>
          <h1 className="text-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-8 leading-tight">
            {t.brandStory.title}
          </h1>
          <div className="w-24 h-px bg-white/50 mx-auto mb-8" />
          <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-90">
            {t.brandStory.heroQuote}
          </p>
        </div>
      </section>

      {/* Introduction - Two Column Layout */}
      <section className="py-20 md:py-32">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <h2 className="text-display text-3xl md:text-4xl mb-6 leading-tight">
                {t.brandStory.introTitle}
              </h2>
              <div className="w-16 h-px bg-foreground/30 mb-8" />
            </div>
            <div className="space-y-6 text-foreground/80 leading-relaxed">
              <p className="text-lg">
                {t.brandStory.introPara1}
              </p>
              <p className="text-lg">
                {t.brandStory.introPara2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Full-Width Image */}
      <section className="relative h-[60vh] md:h-[70vh]">
        <img
          src="/images/brand-story-factory.jpg"
          alt="Manufacturing excellence"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
      </section>

      {/* Heritage Section */}
      <section className="py-20 md:py-32 bg-foreground/5">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 md:gap-16">
            {/* Left Column - Image */}
            <div className="lg:col-span-2">
              <img
                src="/images/4种颜色镜头产品照-不带包装.jpg"
                alt="Mandler lenses"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>

            {/* Right Column - Content */}
            <div className="lg:col-span-3 flex flex-col justify-center">
              <p className="text-sm tracking-[0.3em] mb-4 text-foreground/60">
                {t.brandStory.heritageLabel}
              </p>
              <h2 className="text-display text-3xl md:text-4xl lg:text-5xl mb-8 leading-tight">
                {t.brandStory.heritageTitle}
              </h2>
              <div className="space-y-6 text-foreground/80 leading-relaxed text-lg">
                <p>{t.brandStory.heritagePara1}</p>
                <p>{t.brandStory.heritagePara2}</p>
              </div>

              {/* Pull Quote */}
              <blockquote className="mt-12 pl-8 border-l-2 border-foreground/30">
                <p className="text-2xl md:text-3xl text-display italic leading-relaxed">
                  "{t.brandStory.heritageQuote}"
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section - Full Width with Image Background */}
      <section className="relative py-32 md:py-40">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/brand-story-vintage.jpg)',
            filter: 'brightness(0.3)',
          }}
        />
        <div className="relative z-10 container max-w-4xl mx-auto px-6 text-center text-white">
          <p className="text-sm tracking-[0.3em] mb-8 opacity-80">
            {t.brandStory.philosophyLabel}
          </p>
          <h2 className="text-display text-4xl md:text-5xl lg:text-6xl mb-12 leading-tight">
            {t.brandStory.philosophyTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
            <div>
              <h3 className="text-xl font-semibold mb-4 tracking-wide">
                {t.brandStory.value1Title}
              </h3>
              <p className="text-white/80 leading-relaxed">
                {t.brandStory.value1Desc}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 tracking-wide">
                {t.brandStory.value2Title}
              </h3>
              <p className="text-white/80 leading-relaxed">
                {t.brandStory.value2Desc}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 tracking-wide">
                {t.brandStory.value3Title}
              </h3>
              <p className="text-white/80 leading-relaxed">
                {t.brandStory.value3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-20 md:py-32">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <p className="text-2xl md:text-3xl lg:text-4xl text-display leading-relaxed">
            {t.brandStory.closingStatement}
          </p>
          <div className="w-24 h-px bg-foreground/30 mx-auto mt-12" />
        </div>
      </section>
    </div>
  );
}
