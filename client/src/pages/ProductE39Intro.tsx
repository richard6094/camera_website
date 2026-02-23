import { useLanguage } from '@/contexts/LanguageContext';
import Breadcrumb from '@/components/Breadcrumb';
import { useLocation } from 'wouter';

export default function ProductE39Intro() {
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
      breadcrumbTitle: 'E39 产品介绍',
      heroLabel: 'PRODUCT ESSAY',
      heroTitle: 'E39',
      heroQuote: '经典焦段，纯粹视角。为街头与日常而生的 35mm 叙事镜头。',
      introTitle: '一种与世界保持适当距离的方式',
      introPara1:
        'E39 以 35mm 为核心，将环境与人物自然地编织在同一画面。它既不过度侵入，也不会让情绪疏离，是观察现实最克制、也最诚实的焦段。',
      introPara2:
        '从光学结构到对焦手感，每一处细节都服务于“快速、准确、稳定”的拍摄节奏。你抬起相机的瞬间，构图与表达几乎同时完成。',
      designLabel: 'OPTICAL DESIGN',
      designTitle: '为真实场景而调校',
      designPara1:
        'f/1.4 大光圈不仅用于夜晚，也用于在复杂背景中建立明确视觉主次。高对比边缘仍保持自然过渡，让画面在锐度与氛围间取得平衡。',
      designPara2:
        '紧凑镜身与 320g 重量降低长时间携带负担，机械阻尼经过多轮校准，确保在快节奏街拍中依然获得稳定手感。',
      scenesTitle: '使用场景',
      scene1Title: '街头纪实',
      scene1Desc: '保留环境信息，同时突出人物关系与动作瞬间。',
      scene2Title: '旅行日常',
      scene2Desc: '一支镜头覆盖多数拍摄需求，减少更换负担。',
      scene3Title: '弱光叙事',
      scene3Desc: '在夜色与室内光源中保持可用快门与细节层次。',
      closing:
        'E39 不是夸张的技术展示，而是一支愿意陪你长期创作的镜头。',
      primaryButton: '查看商城页',
      secondaryButton: '返回首页',
    }
    : {
      breadcrumbTitle: 'E39 Introduction',
      heroLabel: 'PRODUCT ESSAY',
      heroTitle: 'E39',
      heroQuote: 'Classic focal length, pure perspective. A 35mm narrative lens built for streets and everyday life.',
      introTitle: 'A Balanced Distance from the World',
      introPara1:
        'Centered around 35mm, E39 weaves people and environment into one coherent frame. It is neither intrusive nor detached, making it one of the most honest perspectives for observing reality.',
      introPara2:
        'From optical layout to focus feel, every detail is tuned for a fast, precise, and steady shooting rhythm. The moment you raise the camera, framing and expression happen together.',
      designLabel: 'OPTICAL DESIGN',
      designTitle: 'Tuned for Real-World Scenes',
      designPara1:
        'The f/1.4 aperture is not only for low light. It also helps establish visual hierarchy in complex backgrounds. High-contrast edges remain natural, balancing sharpness with atmosphere.',
      designPara2:
        'A compact body and 320g weight reduce fatigue over long days. Focus damping is calibrated for stable handling, even in fast-paced street shooting.',
      scenesTitle: 'Field Scenarios',
      scene1Title: 'Street Documentary',
      scene1Desc: 'Keep context while highlighting human relationships and decisive moments.',
      scene2Title: 'Travel Everyday',
      scene2Desc: 'One lens for most needs, with less switching overhead.',
      scene3Title: 'Low-Light Narratives',
      scene3Desc: 'Maintain practical shutter speed and tonal detail in night and indoor scenes.',
      closing:
        'E39 is not an exaggerated tech statement, but a lens designed to stay with your long-term work.',
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
            backgroundImage: 'url(/images/银色镜头+相机+暖色背景.jpg)',
            filter: 'brightness(0.38)',
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
        <img src="/images/银色镜头挂机特写1.jpg" alt="E39 detail" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </section>

      <section className="py-20 md:py-32 bg-foreground/5">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 md:gap-16">
            <div className="lg:col-span-2">
              <img src="/images/银色镜头套装.jpg" alt="E39 optics" className="w-full h-auto rounded-lg shadow-2xl" />
            </div>
            <div className="lg:col-span-3 flex flex-col justify-center">
              <p className="text-sm tracking-[0.3em] mb-4 text-foreground/60">{content.designLabel}</p>
              <h2 className="text-display text-3xl md:text-4xl lg:text-5xl mb-8 leading-tight">{content.designTitle}</h2>
              <div className="space-y-6 text-foreground/80 leading-relaxed text-lg">
                <p>{content.designPara1}</p>
                <p>{content.designPara2}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="container max-w-4xl mx-auto px-6">
          <h2 className="text-display text-3xl md:text-4xl text-center mb-16">{content.scenesTitle}</h2>
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:text-right text-foreground/40 text-5xl font-light">01</div>
              <div className="md:col-span-2">
                <h3 className="text-2xl font-semibold mb-3">{content.scene1Title}</h3>
                <p className="text-foreground/80 leading-relaxed">{content.scene1Desc}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:text-right text-foreground/40 text-5xl font-light">02</div>
              <div className="md:col-span-2">
                <h3 className="text-2xl font-semibold mb-3">{content.scene2Title}</h3>
                <p className="text-foreground/80 leading-relaxed">{content.scene2Desc}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:text-right text-foreground/40 text-5xl font-light">03</div>
              <div className="md:col-span-2">
                <h3 className="text-2xl font-semibold mb-3">{content.scene3Title}</h3>
                <p className="text-foreground/80 leading-relaxed">{content.scene3Desc}</p>
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
              onClick={() => navigateWithTop('/products/e39')}
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
