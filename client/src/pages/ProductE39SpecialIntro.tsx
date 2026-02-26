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
      introLabel: 'SPECIAL EDITION ESSAY',
      premiumTitle: '特别版身份',
      premiumItem1Label: '材质体系',
      premiumItem1Value: '黄铜主结构 + 钛合金组件',
      premiumItem2Label: '发行策略',
      premiumItem2Value: '全球限量 500 支',
      premiumItem3Label: '校准标准',
      premiumItem3Value: '逐支手工复核与签发',
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
      milestonesLabel: 'COLLECTOR PROTOCOL',
      milestone1Title: '独立编号',
      milestone1Desc: '每支镜头均有专属编号与证书，建立可追溯收藏身份。',
      milestone2Title: '限量发行',
      milestone2Desc: '全球限量 500 支，控制产量以保障工艺一致性与长期价值。',
      milestone3Title: '手工校准',
      milestone3Desc: '逐支完成光学与机械复核，确保每一支都达到特别版标准。',
      signatureLabel: 'SIGNATURE FINISH',
      signatureTitle: '每一道工序，都是被看见的时间',
      signatureDesc:
        '特别版在装配完成后仍经历多轮细节检视：边缘过渡、刻字深浅、阻尼一致性与光学中心复核。真正的高级感，不在喧哗，而在细节始终保持克制与准确。',
      signatureNote: 'Mandler Quality Protocol · Since 1978',
      closing: 'E39 特别版，为创作而生，也为时间而存。',
      primaryButton: '查看商城页',
      secondaryButton: '返回首页',
    }
    : language === 'ja'
    ? {
      breadcrumbTitle: 'E39 特別版紹介',
      heroLabel: 'LIMITED COLLECTION',
      heroTitle: 'E39 特別版',
      heroQuote: '匠心の作、限定典蔵。精密光学とコレクション価値を一本のレンズに凝縮。',
      introLabel: 'SPECIAL EDITION ESSAY',
      premiumTitle: '特別版アイデンティティ',
      premiumItem1Label: '素材システム',
      premiumItem1Value: '真鍮主構造 + チタン合金部品',
      premiumItem2Label: '発行戦略',
      premiumItem2Value: '世界限定 500本',
      premiumItem3Label: '校正基準',
      premiumItem3Value: '一本ずつ手作業で検証・署名',
      introTitle: 'ツールから作品への転換',
      introPara1:
        'E39 特別版は単なるカラーバリエーションではなく、素材、加工、組立基準のシステム的アップグレードです。各シリアルナンバーは完全な手作業校正プロセスに対応しています。',
      introPara2:
        'レンズが創作パートナーとなるとき、それは時間の記録者にもなります。撮影結果だけでなく、あなたと影像の間の進化する関係を記録します。',
      craftLabel: 'CRAFT & MATERIAL',
      craftTitle: '真鍮とチタン合金のバランス',
      craftPara1:
        '特別版は真鍮ボディとチタン合金部品を組み合わせ、機械的安定性と触感の温かみを両立。研磨とブラシ仕上げが光の変化の中で抑制された繊細な層を生み出します。',
      craftPara2:
        'アップグレードされた光学設計は非球面レンズを導入し、エッジ描写と色差制御を強化。高コントラストシーンでもクリアなトーンを維持します。',
      milestonesTitle: 'コレクター価値',
      milestonesLabel: 'COLLECTOR PROTOCOL',
      milestone1Title: '個別シリアル',
      milestone1Desc: '各レンズに固有のシリアル番号と証明書が付属、追跡可能なコレクションアイデンティティを確立。',
      milestone2Title: '限定発行',
      milestone2Desc: '世界限定500本、工芸の一貫性と長期的価値を保証。',
      milestone3Title: '手作業校正',
      milestone3Desc: '全てのユニットが光学・機械検証を受け、特別版基準を満たします。',
      signatureLabel: 'SIGNATURE FINISH',
      signatureTitle: 'すべての工程が、見える時間となる',
      signatureDesc:
        '特別版は組立後も複数回の細部検査を経ます：エッジの移行、彫刻の深さ、ダンピングの一貫性、光学中心検証。真の高級感は派手ではなく、細部の正確さと克制にあります。',
      signatureNote: 'Mandler Quality Protocol · Since 1978',
      closing: 'E39 特別版、創作のために生まれ、時間のために存在する。',
      primaryButton: 'ストアページを見る',
      secondaryButton: 'ホームに戻る',
    }
    : {
      breadcrumbTitle: 'E39 Special Edition Intro',
      heroLabel: 'LIMITED COLLECTION',
      heroTitle: 'E39 Special Edition',
      heroQuote: 'Crafted excellence, limited collection. Precision optics and collectible value in a single lens.',
      introLabel: 'SPECIAL EDITION ESSAY',
      premiumTitle: 'Special Edition Identity',
      premiumItem1Label: 'Material System',
      premiumItem1Value: 'Brass core + titanium alloy components',
      premiumItem2Label: 'Release Strategy',
      premiumItem2Value: 'Limited to 500 units worldwide',
      premiumItem3Label: 'Calibration Standard',
      premiumItem3Value: 'Individual hand verification and sign-off',
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
      milestonesLabel: 'COLLECTOR PROTOCOL',
      milestone1Title: 'Individual Serial',
      milestone1Desc: 'Each lens includes a unique serial and certificate for traceable identity.',
      milestone2Title: 'Limited Release',
      milestone2Desc: 'Limited to 500 units worldwide to preserve craftsmanship consistency and long-term value.',
      milestone3Title: 'Hand Calibration',
      milestone3Desc: 'Every unit receives optical and mechanical verification to meet Special Edition standards.',
      signatureLabel: 'SIGNATURE FINISH',
      signatureTitle: 'Every Finishing Step Makes Time Visible',
      signatureDesc:
        'After assembly, the Special Edition still goes through multiple detail inspections: edge transitions, engraving depth, damping consistency, and optical centering verification. True luxury is not loud—it is precise and restrained in every detail.',
      signatureNote: 'Mandler Quality Protocol · Since 1978',
      closing: 'E39 Special Edition, built for creation and preserved for time.',
      primaryButton: 'Open Store Page',
      secondaryButton: 'Back to Home',
    };

  const premiumItems = [
    { label: content.premiumItem1Label, value: content.premiumItem1Value },
    { label: content.premiumItem2Label, value: content.premiumItem2Value },
    { label: content.premiumItem3Label, value: content.premiumItem3Value },
  ];

  const milestones = [
    { index: '01 / 03', title: content.milestone1Title, desc: content.milestone1Desc },
    { index: '02 / 03', title: content.milestone2Title, desc: content.milestone2Desc },
    { index: '03 / 03', title: content.milestone3Title, desc: content.milestone3Desc },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container max-w-7xl mx-auto px-6 pt-20 md:pt-24">
        <Breadcrumb
          items={[
            { label: language === 'zh' ? '首页' : language === 'ja' ? 'ホーム' : 'Home', href: '/' },
            { label: language === 'zh' ? '产品' : language === 'ja' ? '製品' : 'Products', href: '/products' },
            { label: content.breadcrumbTitle },
          ]}
        />
      </div>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/3色镜头+相机+木质背景.jpg)',
            filter: 'brightness(0.33)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20" />
        <div className="relative z-10 container max-w-5xl mx-auto px-6 text-center text-white">
          <p className="text-sm tracking-[0.3em] mb-8 opacity-80">{content.heroLabel}</p>
          <h1 className="text-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-8 leading-tight">{content.heroTitle}</h1>
          <div className="w-24 h-px bg-white/50 mx-auto mb-8" />
          <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-90">{content.heroQuote}</p>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-foreground/5">
        <div className="container max-w-6xl mx-auto px-6">
          <p className="text-sm tracking-[0.3em] mb-4 text-foreground/60">{content.introLabel}</p>
          <h2 className="text-display text-3xl md:text-4xl mb-10 leading-tight">{content.premiumTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {premiumItems.map((item) => (
              <div key={item.label} className="border border-foreground/20 p-6 space-y-3 bg-background/70">
                <p className="text-xs tracking-[0.25em] uppercase text-foreground/60">{item.label}</p>
                <p className="text-base md:text-lg">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <p className="text-sm tracking-[0.3em] mb-4 text-foreground/60">{content.craftLabel}</p>
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
          <p className="text-sm tracking-[0.3em] text-center mb-4 text-foreground/60">{content.milestonesLabel}</p>
          <h2 className="text-display text-3xl md:text-4xl text-center mb-16">{content.milestonesTitle}</h2>
          <div className="border-y border-foreground/15 divide-y divide-foreground/15">
            {milestones.map((milestone) => (
              <div key={milestone.index} className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
                <div className="md:text-right text-foreground/45 text-lg tracking-[0.2em]">{milestone.index}</div>
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-semibold mb-3">{milestone.title}</h3>
                  <p className="text-foreground/80 leading-relaxed">{milestone.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-foreground/[0.03]">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            <div className="md:col-span-3 space-y-6">
              <p className="text-sm tracking-[0.3em] text-foreground/60">{content.signatureLabel}</p>
              <p className="text-xs tracking-[0.25em] uppercase text-foreground/50 leading-relaxed">{content.signatureNote}</p>
            </div>
            <div className="md:col-span-9">
              <h2 className="text-display text-3xl md:text-4xl leading-tight mb-8">{content.signatureTitle}</h2>
              <p className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">{content.signatureDesc}</p>
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
