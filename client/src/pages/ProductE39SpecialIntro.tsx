import { useLanguage } from '@/contexts/LanguageContext';
import Breadcrumb from '@/components/Breadcrumb';
import { useLocation } from 'wouter';

export default function ProductE39SpecialIntro() {
  const { language } = useLanguage();
  const [, navigate] = useLocation();

  const navigateWithTop = (path: string) => {
    navigate(path);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });
  };

  const content = language === 'zh'
    ? {
      breadcrumbTitle: 'E39 特别版介绍',
      heroLabel: 'LIMITED COLLECTION',
      heroTitle: 'E39 特别版',
      heroQuote: '匠心之作，限量典藏。将精密光学与收藏价值凝练于一支镜头。',
      introTitle: '从工具到作品的转变',
      introPara1:
        'E39 特别版并非普通配色变化，而是围绕材质、加工和装配标准的系统升级。每一枚编号都对应一次完整的手工校准流程。',
      introPara2:
        '当镜头成为创作伙伴，也成为时间的记录者。它不仅服务拍摄结果，也记录你与影像之间不断演进的关系。',
      craftLabel: 'CRAFT & MATERIAL',
      craftTitle: '黄铜与钛合金的平衡',
      craftPara1:
        '特别版采用黄铜主体与钛合金部件，兼顾机械稳定与触感温度。抛光与拉丝处理在不同光线下呈现克制而细腻的层次。',
      craftPara2:
        '升级光学结构引入非球面镜片，强化边缘解析与色差控制，使画面在高对比场景中依然保持纯净质感。',
      milestonesTitle: '典藏价值',
      milestone1Title: '独立编号',
      milestone1Desc: '每支镜头均有专属编号与证书，建立可追溯收藏身份。',
      milestone2Title: '限量发行',
      milestone2Desc: '全球限量 500 支，控制产量以保障工艺一致性与长期价值。',
      milestone3Title: '手工校准',
      milestone3Desc: '逐支完成光学与机械复核，确保每一支都达到特别版标准。',
      closing: 'E39 特别版，为创作而生，也为时间而存。',
      primaryButton: '查看商城页',
      secondaryButton: '返回首页',
    }
    : {
      breadcrumbTitle: 'E39 Special Edition Intro',
      heroLabel: 'LIMITED COLLECTION',
      heroTitle: 'E39 Special Edition',
      heroQuote: 'Crafted excellence, limited collection. Precision optics and collectible value in a single lens.',
      introTitle: 'From Tool to Object of Work',
      introPara1:
        'The E39 Special Edition is not a simple cosmetic variant. It is a full upgrade of materials, machining, and assembly standards. Each serial number corresponds to a complete hand-calibration process.',
      introPara2:
        'When a lens becomes your creative partner, it also becomes a record of time. It serves not only final images, but your evolving relationship with photography.',
      craftLabel: 'CRAFT & MATERIAL',
      craftTitle: 'Balancing Brass and Titanium',
      craftPara1:
        'The Special Edition combines a brass main body with titanium alloy parts, balancing mechanical stability and tactile warmth. Polished and brushed finishes create restrained, nuanced layers under changing light.',
      craftPara2:
        'The upgraded optical design introduces aspherical elements, improving edge rendering and chromatic control while preserving clean tonality in high-contrast scenes.',
      milestonesTitle: 'Collector Value',
      milestone1Title: 'Individual Serial',
      milestone1Desc: 'Each lens includes a unique serial and certificate for traceable identity.',
      milestone2Title: 'Limited Release',
      milestone2Desc: 'Limited to 500 units worldwide to preserve craftsmanship consistency and long-term value.',
      milestone3Title: 'Hand Calibration',
      milestone3Desc: 'Every unit receives optical and mechanical verification to meet Special Edition standards.',
      closing: 'E39 Special Edition, built for creation and preserved for time.',
      primaryButton: 'Open Store Page',
      secondaryButton: 'Back to Home',
    };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container max-w-7xl mx-auto px-6 pt-20 md:pt-24">
        <Breadcrumb
          items={[
            { label: language === 'zh' ? '首页' : 'Home', href: '/' },
            { label: language === 'zh' ? '产品' : 'Products', href: '/products' },
            { label: content.breadcrumbTitle },
          ]}
        />
      </div>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/3色镜头+相机+木质背景.jpg)',
            filter: 'brightness(0.35)',
          }}
        />
        <div className="relative z-10 container max-w-5xl mx-auto px-6 text-center text-white">
          <p className="text-sm tracking-[0.3em] mb-8 opacity-80">{content.heroLabel}</p>
          <h1 className="text-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-8 leading-tight">{content.heroTitle}</h1>
          <div className="w-24 h-px bg-white/50 mx-auto mb-8" />
          <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-90">{content.heroQuote}</p>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <h2 className="text-display text-3xl md:text-4xl mb-6 leading-tight">{content.introTitle}</h2>
              <div className="w-16 h-px bg-foreground/30 mb-8" />
            </div>
            <div className="space-y-6 text-foreground/80 leading-relaxed">
              <p className="text-lg">{content.introPara1}</p>
              <p className="text-lg">{content.introPara2}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative h-[60vh] md:h-[70vh]">
        <img src="/images/4种颜色镜头产品照-带包装.jpg" alt="E39 Special Edition detail" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </section>

      <section className="py-20 md:py-32 bg-foreground/5">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 md:gap-16">
            <div className="lg:col-span-2">
              <img src="/images/4种颜色镜头产品照-不带包装.jpg" alt="E39 Special material" className="w-full h-auto rounded-lg shadow-2xl" />
            </div>
            <div className="lg:col-span-3 flex flex-col justify-center">
              <p className="text-sm tracking-[0.3em] mb-4 text-foreground/60">{content.craftLabel}</p>
              <h2 className="text-display text-3xl md:text-4xl lg:text-5xl mb-8 leading-tight">{content.craftTitle}</h2>
              <div className="space-y-6 text-foreground/80 leading-relaxed text-lg">
                <p>{content.craftPara1}</p>
                <p>{content.craftPara2}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="container max-w-4xl mx-auto px-6">
          <h2 className="text-display text-3xl md:text-4xl text-center mb-16">{content.milestonesTitle}</h2>
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:text-right text-foreground/40 text-5xl font-light">01</div>
              <div className="md:col-span-2">
                <h3 className="text-2xl font-semibold mb-3">{content.milestone1Title}</h3>
                <p className="text-foreground/80 leading-relaxed">{content.milestone1Desc}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:text-right text-foreground/40 text-5xl font-light">02</div>
              <div className="md:col-span-2">
                <h3 className="text-2xl font-semibold mb-3">{content.milestone2Title}</h3>
                <p className="text-foreground/80 leading-relaxed">{content.milestone2Desc}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:text-right text-foreground/40 text-5xl font-light">03</div>
              <div className="md:col-span-2">
                <h3 className="text-2xl font-semibold mb-3">{content.milestone3Title}</h3>
                <p className="text-foreground/80 leading-relaxed">{content.milestone3Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <p className="text-2xl md:text-3xl lg:text-4xl text-display leading-relaxed">{content.closing}</p>
          <div className="w-24 h-px bg-foreground/30 mx-auto mt-12" />
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigateWithTop('/products/e39-special')}
              className="px-8 py-3 border border-foreground/20 text-foreground hover:bg-foreground hover:text-background transition-colors"
            >
              {content.primaryButton}
            </button>
            <button
              onClick={() => navigateWithTop('/')}
              className="px-8 py-3 border border-foreground/20 text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors"
            >
              {content.secondaryButton}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
