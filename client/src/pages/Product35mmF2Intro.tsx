import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Breadcrumb from '@/components/Breadcrumb';
import { ImageLightbox } from '@/components/ImageLightbox';
import { useLocation } from 'wouter';

export default function Product35mmF2Intro() {
  const { language } = useLanguage();
  const [, navigate] = useLocation();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const apertureSamples = [
    '/images/35mmF2-sample-images/35mmF2-F2.jpg',
    '/images/35mmF2-sample-images/35mmF2-F4-8.jpg',
    '/images/银色镜头不挂机特写.jpg',
  ];

  const navigateWithTop = (path: string) => {
    navigate(path);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });
  };

  const content = language === 'zh'
    ? {
      breadcrumbTitle: '35mm F/2 产品介绍',
      heroLabel: 'PRODUCT ESSAY',
      heroTitle: '35mm F/2',
      heroQuote: '经典焦段，纯粹视角。为街头与日常而生的 35mm 叙事镜头。',

      introTitle: '一种与世界保持适当距离的方式',
      introPara1:
        '35mm F/2 以 35mm 为核心，将环境与人物自然地编织在同一画面。它继承经典双高斯光学设计的精髓，并融入现代优化，是观察现实最克制、也最诚实的焦段。',
      introPara2:
        '从光学结构到对焦手感，每一处细节都服务于"快速、准确、稳定"的拍摄节奏。你抬起相机的瞬间，构图与表达几乎同时完成。',

      opticalLabel: 'OPTICAL HERITAGE',
      opticalTitle: '传奇光学结构',
      opticalSubtitle: '7 片 5 组双高斯设计',
      opticalPara1:
        '35mm F/2 采用经典双高斯（Double Gaussian）光学结构，7 片镜片分布于 5 组中，在继承传统设计精髓的同时融入现代光学优化。紫金黄多层镀膜有效抑制眩光与鬼影，在逆光与复杂光源环境下依然保持干净的画面表现。',
      opticalPara2:
        '这一结构天生具备出色的中心锐度与自然的焦外过渡。双高斯的对称式布局使场曲得到良好控制，即使在最大光圈下也能维持画面边缘的可用细节。',
      opticalSpec1Label: '光学结构',
      opticalSpec1Value: '7 片 5 组',
      opticalSpec2Label: '设计类型',
      opticalSpec2Value: '双高斯',
      opticalSpec3Label: '镀膜工艺',
      opticalSpec3Value: '紫金黄多层镀膜',

      apertureLabel: 'APERTURE CHARACTER',
      apertureTitle: 'F2 大光圈的临场表现',
      aperturePara1:
        '全开 F2.0 时，35mm F/2 展现出独特的影像个性——中心区域锐度优秀，边缘柔化自然渐进，二线性散景被有效抑制。光斑圆润，过渡柔和，适合在杂乱场景中自然分离主体与背景。',
      aperturePara2:
        '收小至 F4–F8 后，画面进入全域锐利状态，中心与边缘的分辨率差异显著缩小。整体对比度与色彩饱和度提升，适用于风光与建筑等需要全画面一致性的创作场景。',
      apertureHighlight: '全开时的柔润，收缩后的锐利——一支镜头，两种性格。',

      craftLabel: 'CRAFTSMANSHIP',
      craftTitle: '全金属机械工艺',
      craftPara1:
        '月牙形对焦环经多轮阻尼校准，以恰到好处的阻力实现顺滑、精确的手动对焦操控，兼顾快速街拍与细致微调。整体镜身采用全金属结构，在 34mm 的紧凑长度内实现坚固与轻量的平衡。',
      craftPara2:
        '10 叶片圆形光圈在各级光圈下始终保持近圆形的光斑形状，令焦外虚化自然柔美，是营造画面氛围的关键设计。每一次拨动光圈环，都能感受到精密齿轮的咬合与反馈。',

      perfTitle: '光学性能数据',
      perfStat1Label: '场曲控制',
      perfStat1Value: '优秀',
      perfStat1Desc: '双高斯对称结构天然抑制场曲，平面主体拍摄表现优异。',
      perfStat2Label: '畸变控制',
      perfStat2Value: '< \u00b10.5%',
      perfStat2Desc: '近乎无畸变的画面表现，建筑与直线场景无需后期校正。',
      perfStat3Label: '光圈叶片',
      perfStat3Value: '10 片',
      perfStat3Desc: '圆形光圈设计，各级光圈下保持自然圆润光斑。',
      perfStat4Label: '最大光圈',
      perfStat4Value: 'F2.0',
      perfStat4Desc: '大光圈配合双高斯结构，日常与弱光环境均可从容应对。',

      chartsTitle: '光学测试图表',
      chartsIntro: '以下图表展示 35mm F/2 在不同光圈下的实际光学表现，包括场曲与畸变特性以及各光圈下的 MTF（调制传递函数）曲线，以量化数据呈现镜头的分辨率与对比度表现。',
      chartFCTitle: '场曲与畸变',
      chartFCDesc: '双高斯对称结构有效控制场曲，畸变低于 ±0.5%，直线几何还原精准。',
      chartMTF2Title: 'MTF @ F/2.0（全开）',
      chartMTF2Desc: '全开光圈下中心锐度优秀，边缘柔化自然渐进，呈现经典双高斯镜头的成像个性。',
      chartMTF28Title: 'MTF @ F/2.8',
      chartMTF28Desc: '收至 F/2.8，中心与边缘分辨率均显著提升，画面整体对比度增强。',
      chartMTF56Title: 'MTF @ F/5.6',
      chartMTF56Desc: '最佳光学光圈，全画面达到高度一致的锐利表现，适合风光与建筑创作。',

      scenesTitle: '使用场景',
      scene1Title: '人文街拍',
      scene1Desc: '35mm 视角保留充足的环境信息，同时自然凝聚人物与动作。F2 光圈在弱光巷道中保持可用快门速度，不打扰、不犹豫。',
      scene2Title: '环境人像',
      scene2Desc: '既不过度压缩空间，也不失去背景叙事。全开时柔美的焦外将人物从环境中分离，同时保留场景的故事性。',
      scene3Title: '旅行纪实',
      scene3Desc: '紧凑体积与全金属质感让它成为旅途中的可靠伙伴。一支镜头覆盖街景、美食、建筑与人文，减少器材焦虑。',
      scene4Title: '视频拍摄',
      scene4Desc: '顺滑的手动对焦阻尼适合拉焦操作，10 叶片圆形光圈在视频中呈现电影级焦外，呼吸效应控制在可接受范围内。',

      closing:
        '35mm F/2 不是一支炫技之作，而是一支愿意陪你长期创作、日常携带的镜头。经典光学结构与现代工艺的交汇，让每一次按下快门都值得信赖。',
      primaryButton: '查看商城页',
      secondaryButton: '返回首页',
    }
    : language === 'ja'
    ? {
      breadcrumbTitle: '35mm F/2 製品紹介',
      heroLabel: 'PRODUCT ESSAY',
      heroTitle: '35mm F/2',
      heroQuote: 'クラシックな焦点距離、ピュアな視点。ストリートと日常のための35mmナラティブレンズ。',

      introTitle: '世界との適切な距離を保つ方法',
      introPara1:
        '35mm F/2は35mmを核として、環境と人物を一つの画面に自然に織り込みます。伝統的なダブルガウス光学設計の系譜を受け継ぎ、現代の最適化により磨き上げられた、現実を観察する最も誠実な視点です。',
      introPara2:
        '光学構造からフォーカスの手触りまで、すべてのディテールが「速く、正確に、安定して」という撮影リズムに応えます。カメラを構えた瞬間、構図と表現がひとつになります。',

      opticalLabel: 'OPTICAL HERITAGE',
      opticalTitle: '伝説の光学構造',
      opticalSubtitle: '7枚5群 ダブルガウス設計',
      opticalPara1:
        '35mm F/2はクラシックなダブルガウス（Double Gaussian）光学構成を採用し、7枚のレンズを5群に配置。伝統的な設計の精髄を継承しながら、現代の光学最適化を融合しています。紫金黄マルチコーティングがフレアとゴーストを効果的に抑制し、逆光や複雑な光源環境でもクリーンな描写を維持します。',
      opticalPara2:
        'この構造は本質的に優れた中心解像力と自然なボケの遷移を備えています。ダブルガウスの対称配置により像面湾曲が良好に制御され、最大開放でも画面周辺に実用的なディテールを保ちます。',
      opticalSpec1Label: '光学構成',
      opticalSpec1Value: '7枚5群',
      opticalSpec2Label: '設計タイプ',
      opticalSpec2Value: 'ダブルガウス',
      opticalSpec3Label: 'コーティング',
      opticalSpec3Value: '紫金黄マルチコート',

      apertureLabel: 'APERTURE CHARACTER',
      apertureTitle: 'F2大口径の実写性能',
      aperturePara1:
        '開放F2.0では、35mm F/2は独特の描写個性を見せます——中心部の解像力は優秀で、周辺に向かって自然にソフトになり、二線ボケは効果的に抑制されています。点光源は丸く滑らかに描写され、雑多な背景から主体を自然に分離するのに最適です。',
      aperturePara2:
        'F4〜F8に絞ると、画面全域がシャープな状態に入り、中心と周辺の解像力差が著しく縮小します。全体的なコントラストと彩度が向上し、風景や建築など画面全体の均一性が求められるシーンに適しています。',
      apertureHighlight: '開放のやわらかさ、絞った時のシャープさ——一本で二つの個性。',

      craftLabel: 'CRAFTSMANSHIP',
      craftTitle: 'フルメタル精密工芸',
      craftPara1:
        '月牙型フォーカスリングは複数回のダンピング調整を経て、適度な抵抗感でスムーズかつ精確なマニュアルフォーカスを実現。速写的なストリート撮影にも、慎重な微調整にも対応します。全金属鏡筒は34mmのコンパクトな全長で剛性と軽量性のバランスを達成しています。',
      craftPara2:
        '10枚羽根の円形絞りは、すべてのF値でほぼ真円の点光源ボケを維持し、自然で柔らかなボケ味を生み出します——画像の雰囲気を形作る重要なデザイン要素です。絞りリングを操作するたびに、精密な歯車の噛み合いとフィードバックを感じることができます。',

      perfTitle: '光学性能データ',
      perfStat1Label: '像面湾曲制御',
      perfStat1Value: '優秀',
      perfStat1Desc: '対称型ダブルガウス構造が像面湾曲を自然に抑制、平面被写体の撮影に優れた性能を発揮。',
      perfStat2Label: '歪曲収差',
      perfStat2Value: '< \u00b10.5%',
      perfStat2Desc: 'ほぼ無歪曲の描写で、建築やインテリアの直線を後処理なしで忠実に再現。',
      perfStat3Label: '絞り羽根',
      perfStat3Value: '10枚',
      perfStat3Desc: '円形絞り設計により、すべてのF値で自然な丸ボケを維持。',
      perfStat4Label: '最大口径',
      perfStat4Value: 'F2.0',
      perfStat4Desc: 'ダブルガウス設計との組み合わせで、日常から低照度まで余裕を持って対応。',

      chartsTitle: '光学テストチャート',
      chartsIntro: '以下のチャートは、35mm F/2の各絞り値における実際の光学性能を示しています。像面湾曲・歪曲収差特性および各絞りでのMTF（変調伝達関数）曲線により、解像力とコントラスト性能を定量的に表現しています。',
      chartFCTitle: '像面湾曲と歪曲収差',
      chartFCDesc: 'ダブルガウス対称構造が像面湾曲を効果的に制御。歪曲は±0.5%以下で、直線の幾何学的再現が正確です。',
      chartMTF2Title: 'MTF @ F/2.0（開放）',
      chartMTF2Desc: '開放時は中心部の解像力が優秀で、周辺に向かって自然にソフト化——クラシックなダブルガウスレンズの描写個性。',
      chartMTF28Title: 'MTF @ F/2.8',
      chartMTF28Desc: 'F/2.8に絞ると中心・周辺ともに解像力が顕著に向上し、画面全体のコントラストが強化されます。',
      chartMTF56Title: 'MTF @ F/5.6',
      chartMTF56Desc: '最適光学絞り。画面全域で高度に均一なシャープネスを達成し、風景や建築撮影に最適です。',

      scenesTitle: '使用シーン',
      scene1Title: 'ヒューマンストリート',
      scene1Desc: '35mmの画角は豊かな環境情報を保持しながら、被写体と瞬間に自然に注目を集めます。F2の開放値は薄暗い路地でも実用的なシャッター速度を確保——控えめに、躊躇なく。',
      scene2Title: '環境ポートレート',
      scene2Desc: '空間を過度に圧縮せず、背景の物語性を失わない。開放時のやわらかなボケが被写体を環境から穏やかに分離しながら、シーンのストーリーを保ちます。',
      scene3Title: '旅行ドキュメンタリー',
      scene3Desc: 'コンパクトなサイズとフルメタル構造で信頼できる旅の相棒に。一本で街並み、食事、建築、人物をカバーし、機材への不安を軽減します。',
      scene4Title: '動画撮影',
      scene4Desc: 'スムーズなMFダンピングはフォーカス送りに最適。10枚羽根の円形絞りが動画でシネマティックなボケを演出。フォーカスブリージングは許容範囲内に制御されています。',

      closing:
        '35mm F/2は技術の誇示ではなく、長期的な創作と日常の携帯に寄り添うレンズです。クラシックな光学設計と現代の精密工芸が交わる場所で、すべてのシャッターが信頼に値するものになります。',
      primaryButton: 'ストアページを見る',
      secondaryButton: 'ホームに戻る',
    }
    : {
      breadcrumbTitle: '35mm F/2 Introduction',
      heroLabel: 'PRODUCT ESSAY',
      heroTitle: '35mm F/2',
      heroQuote: 'Classic focal length, pure perspective. A 35mm narrative lens built for streets and everyday life.',

      introTitle: 'A Balanced Distance from the World',
      introPara1:
        'Centered around 35mm, the 35mm F/2 weaves people and environment into one coherent frame. Built upon the time-tested Double Gaussian optical heritage and refined with modern optimization, it delivers an honest perspective for observing reality.',
      introPara2:
        'From optical structure to focus feel, every detail is engineered for a fast, precise, and steady shooting rhythm. The moment you raise the camera, framing and expression happen as one.',

      opticalLabel: 'OPTICAL HERITAGE',
      opticalTitle: 'Legendary Optical Architecture',
      opticalSubtitle: '7 Elements in 5 Groups \u2014 Double Gaussian Design',
      opticalPara1:
        'The 35mm F/2 employs the classic Double Gaussian optical configuration, with 7 elements arranged in 5 groups. While honoring the traditional design lineage, modern optical optimization ensures peak performance. The signature purple-gold multi-layer coating effectively suppresses flare and ghosting, maintaining clean image rendering even in backlit and complex lighting conditions.',
      opticalPara2:
        'This architecture inherently delivers excellent center sharpness with naturally smooth bokeh transitions. The symmetrical Double Gaussian layout controls field curvature effectively, preserving usable edge detail even at maximum aperture.',
      opticalSpec1Label: 'Construction',
      opticalSpec1Value: '7E / 5G',
      opticalSpec2Label: 'Design Type',
      opticalSpec2Value: 'Double Gaussian',
      opticalSpec3Label: 'Coating',
      opticalSpec3Value: 'Purple-Gold Multi-Layer',

      apertureLabel: 'APERTURE CHARACTER',
      apertureTitle: 'The F2 Aperture in Practice',
      aperturePara1:
        'Wide open at F2.0, the 35mm F/2 reveals a distinctive imaging character \u2014 excellent center sharpness with naturally gradual edge softening, and effectively suppressed onion-ring bokeh. Specular highlights render smooth and round, ideal for naturally separating the subject from busy backgrounds.',
      aperturePara2:
        'Stopped down to F4\u2013F8, the image enters a state of across-the-frame sharpness, with the center-to-edge resolution gap narrowing significantly. Overall contrast and color saturation increase, well-suited for landscape and architectural work demanding full-frame consistency.',
      apertureHighlight: 'Soft and smooth wide open, razor-sharp stopped down \u2014 one lens, two personalities.',

      craftLabel: 'CRAFTSMANSHIP',
      craftTitle: 'Full-Metal Mechanical Precision',
      craftPara1:
        'The crescent-shaped focus ring is calibrated through multiple rounds of damping adjustment, delivering smooth and precise manual focus control with just the right resistance \u2014 equally suited for rapid street shooting and careful fine-tuning. The all-metal barrel achieves a balance of rigidity and lightness within a compact 34mm length.',
      craftPara2:
        'The 10-blade circular aperture maintains near-perfectly round specular highlights across all f-stops, producing naturally soft and pleasing bokeh \u2014 a key design element for shaping image atmosphere. Each click of the aperture ring delivers the precise tactile feedback of finely machined gearing.',

      perfTitle: 'Optical Performance Data',
      perfStat1Label: 'Field Curvature',
      perfStat1Value: 'Excellent',
      perfStat1Desc: 'Symmetrical Double Gaussian architecture naturally suppresses field curvature, excelling in flat-subject reproduction.',
      perfStat2Label: 'Distortion',
      perfStat2Value: '< \u00b10.5%',
      perfStat2Desc: 'Near-zero distortion preserves straight lines in architecture and interiors without post-processing correction.',
      perfStat3Label: 'Aperture Blades',
      perfStat3Value: '10',
      perfStat3Desc: 'Circular aperture design maintains naturally round bokeh highlights across all f-stops.',
      perfStat4Label: 'Max Aperture',
      perfStat4Value: 'F2.0',
      perfStat4Desc: 'Large aperture paired with Double Gaussian design handles both everyday and low-light scenarios with ease.',

      chartsTitle: 'Optical Test Charts',
      chartsIntro: 'The charts below illustrate the real-world optical performance of the 35mm F/2 across apertures, including field curvature & distortion characteristics and MTF (Modulation Transfer Function) curves at each f-stop — quantifying resolution and contrast performance.',
      chartFCTitle: 'Field Curvature & Distortion',
      chartFCDesc: 'The symmetrical Double Gaussian design effectively controls field curvature, with distortion below ±0.5% for precise straight-line geometry.',
      chartMTF2Title: 'MTF @ F/2.0 (Wide Open)',
      chartMTF2Desc: 'Excellent center sharpness with naturally gradual edge softening — the signature rendering character of a classic Double Gaussian lens.',
      chartMTF28Title: 'MTF @ F/2.8',
      chartMTF28Desc: 'Stopped down to F/2.8, both center and edge resolution improve significantly with enhanced overall contrast.',
      chartMTF56Title: 'MTF @ F/5.6',
      chartMTF56Desc: 'Optimal optical aperture — achieving highly uniform sharpness across the entire frame, ideal for landscape and architectural work.',

      scenesTitle: 'Field Scenarios',
      scene1Title: 'Street Documentary',
      scene1Desc: 'The 35mm perspective preserves rich environmental context while naturally drawing attention to subjects and moments. The F2 aperture maintains usable shutter speeds in dim alleyways \u2014 unobtrusive and decisive.',
      scene2Title: 'Environmental Portrait',
      scene2Desc: 'Neither overly compressing space nor losing background narrative. The soft wide-open bokeh gently separates the subject from the environment while preserving the scene\u0027s story.',
      scene3Title: 'Travel Documentary',
      scene3Desc: 'Its compact size and full-metal build make it a reliable travel companion. One lens covers street scenes, food, architecture, and human interest \u2014 reducing gear anxiety.',
      scene4Title: 'Video / Motion',
      scene4Desc: 'Smooth manual focus damping suits pull-focus operation, while the 10-blade circular aperture delivers cinematic bokeh in video. Focus breathing is controlled within acceptable limits.',

      closing:
        'The 35mm F/2 is not a technical showpiece but a lens designed for long-term creative companionship and everyday carry. Where classic optical design meets modern craftsmanship, every shutter press becomes an act of trust.',
      primaryButton: 'Open Store Page',
      secondaryButton: 'Back to Home',
    };

  const perfStats = [
    { label: content.perfStat1Label, value: content.perfStat1Value, desc: content.perfStat1Desc },
    { label: content.perfStat2Label, value: content.perfStat2Value, desc: content.perfStat2Desc },
    { label: content.perfStat3Label, value: content.perfStat3Value, desc: content.perfStat3Desc },
    { label: content.perfStat4Label, value: content.perfStat4Value, desc: content.perfStat4Desc },
  ];

  const scenes = [
    { num: '01', title: content.scene1Title, desc: content.scene1Desc },
    { num: '02', title: content.scene2Title, desc: content.scene2Desc },
    { num: '03', title: content.scene3Title, desc: content.scene3Desc },
    { num: '04', title: content.scene4Title, desc: content.scene4Desc },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container max-w-7xl mx-auto px-6 pt-20 md:pt-24">
        <Breadcrumb
          items={[
            { label: language === 'zh' ? '首页' : language === 'ja' ? 'ホーム' : 'Home', href: '/' },
            { label: language === 'zh' ? '产品系列' : language === 'ja' ? '製品シリーズ' : 'Products', href: '/products' },
            { label: content.breadcrumbTitle },
          ]}
        />
      </div>

      {/* ── Hero ── */}
      <section className="relative flex items-center justify-center overflow-hidden" style={{ height: '85vh' }}>
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

      {/* ── Intro (two-column) ── */}
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

      {/* ── Full-bleed image ── */}
      <section className="relative h-[60vh] md:h-[70vh]">
        <img src="/images/银色镜头挂机特写1.jpg" alt="35mm F/2 detail" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
      </section>

      {/* ── Legendary Optical Structure ── */}
      <section className="py-20 md:py-32 bg-foreground/5">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 md:gap-16">
            <div className="lg:col-span-2">
              <img
                src="/images/银色镜头挂机特写2-正面.jpg"
                alt="35mm F/2 front element"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
            <div className="lg:col-span-3 flex flex-col justify-center">
              <p className="text-sm tracking-[0.3em] mb-4 text-foreground/60">{content.opticalLabel}</p>
              <h2 className="text-display text-3xl md:text-4xl lg:text-5xl mb-3 leading-tight">{content.opticalTitle}</h2>
              <p className="text-lg text-foreground/50 mb-8">{content.opticalSubtitle}</p>
              <div className="space-y-6 text-foreground/80 leading-relaxed text-lg">
                <p>{content.opticalPara1}</p>
                <p>{content.opticalPara2}</p>
              </div>

              {/* Spec mini-cards */}
              <div className="grid grid-cols-3 gap-4 mt-10">
                {[
                  { label: content.opticalSpec1Label, value: content.opticalSpec1Value },
                  { label: content.opticalSpec2Label, value: content.opticalSpec2Value },
                  { label: content.opticalSpec3Label, value: content.opticalSpec3Value },
                ].map((s) => (
                  <div key={s.label} className="border border-foreground/10 rounded-lg p-4 text-center">
                    <p className="text-xs tracking-widest text-foreground/50 mb-2 uppercase">{s.label}</p>
                    <p className="text-lg font-semibold">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Aperture Highlight (parallax quote) ── */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/两种颜色镜头+遮光罩特写.jpg)',
            filter: 'brightness(0.3)',
          }}
        />
        <div className="relative z-10 container max-w-4xl mx-auto px-6 text-center text-white">
          <p className="text-2xl md:text-3xl lg:text-4xl text-display leading-relaxed italic opacity-95">
            "{content.apertureHighlight}"
          </p>
        </div>
      </section>

      {/* ── F2 Large Aperture ── */}
      <section className="py-20 md:py-32">
        <div className="container max-w-6xl mx-auto px-6">
          <p className="text-sm tracking-[0.3em] mb-4 text-foreground/60 text-center">{content.apertureLabel}</p>
          <h2 className="text-display text-3xl md:text-4xl lg:text-5xl text-center mb-16 leading-tight">{content.apertureTitle}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* Wide open */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-px h-full bg-foreground/15 hidden md:block" />
              <p className="text-xs tracking-[0.2em] text-foreground/40 mb-3 uppercase">F2.0 Wide Open</p>
              <div className="w-10 h-px bg-foreground/20 mb-6" />
              <p className="text-foreground/80 leading-relaxed text-lg mb-8">{content.aperturePara1}</p>
              <img
                src="/images/35mmF2-sample-images/35mmF2-F2.jpg"
                alt="F2.0 wide open sample – bokeh"
                className="w-full h-auto shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }}
              />
            </div>
            {/* Stopped down */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-px h-full bg-foreground/15 hidden md:block" />
              <p className="text-xs tracking-[0.2em] text-foreground/40 mb-3 uppercase">F4 – F8 Stopped Down</p>
              <div className="w-10 h-px bg-foreground/20 mb-6" />
              <p className="text-foreground/80 leading-relaxed text-lg mb-8">{content.aperturePara2}</p>
              <img
                src="/images/35mmF2-sample-images/35mmF2-F4-8.jpg"
                alt="F4–F8 stopped down sample – cityscape"
                className="w-full h-auto shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => { setLightboxIndex(1); setLightboxOpen(true); }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Full-bleed divider ── */}
      <section className="relative h-[50vh] md:h-[60vh]">
        <img
          src="/images/银色镜头套装.jpg"
          alt="35mm F/2 lens kit"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/30" />
      </section>

      {/* ── Full-Metal Craftsmanship ── */}
      <section className="py-20 md:py-32 bg-foreground/5">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 md:gap-16">
            <div className="lg:col-span-3 flex flex-col justify-center order-1 lg:order-1">
              <p className="text-sm tracking-[0.3em] mb-4 text-foreground/60">{content.craftLabel}</p>
              <h2 className="text-display text-3xl md:text-4xl lg:text-5xl mb-8 leading-tight">{content.craftTitle}</h2>
              <div className="space-y-6 text-foreground/80 leading-relaxed text-lg">
                <p>{content.craftPara1}</p>
                <p>{content.craftPara2}</p>
              </div>
            </div>
            <div className="lg:col-span-2 order-2 lg:order-2">
              <img
                src="/images/银色镜头不挂机特写.jpg"
                alt="35mm F/2 lens body"
                className="w-full h-auto rounded-lg shadow-2xl cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => { setLightboxIndex(2); setLightboxOpen(true); }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Performance Data Grid ── */}
      <section className="py-20 md:py-32">
        <div className="container max-w-5xl mx-auto px-6">
          <h2 className="text-display text-3xl md:text-4xl text-center mb-16">{content.perfTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {perfStats.map((s) => (
              <div
                key={s.label}
                className="border border-foreground/10 rounded-xl p-6 md:p-8 hover:border-foreground/25 transition-colors"
              >
                <p className="text-xs tracking-widest text-foreground/50 mb-3 uppercase">{s.label}</p>
                <p className="text-3xl md:text-4xl font-bold mb-4">{s.value}</p>
                <p className="text-foreground/60 leading-relaxed text-sm">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* ── Optical Charts ── */}
          <div className="mt-20">
            <h3 className="text-display text-2xl md:text-3xl text-center mb-4">{content.chartsTitle}</h3>
            <p className="text-foreground/60 text-center max-w-3xl mx-auto mb-12 leading-relaxed">{content.chartsIntro}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: content.chartFCTitle, desc: content.chartFCDesc, src: `/images/optical-charts/field-curvature-distortion-${language === 'zh' ? 'zh' : 'en'}.jpg` },
                { title: content.chartMTF2Title, desc: content.chartMTF2Desc, src: `/images/optical-charts/mtf-f2-${language === 'zh' ? 'zh' : 'en'}.jpg` },
                { title: content.chartMTF28Title, desc: content.chartMTF28Desc, src: `/images/optical-charts/mtf-f2.8-${language === 'zh' ? 'zh' : 'en'}.jpg` },
                { title: content.chartMTF56Title, desc: content.chartMTF56Desc, src: `/images/optical-charts/mtf-f5.6-${language === 'zh' ? 'zh' : 'en'}.jpg` },
              ].map((chart) => (
                <div key={chart.title} className="border border-foreground/10 rounded-xl overflow-hidden hover:border-foreground/25 transition-colors">
                  <img src={chart.src} alt={chart.title} className="w-full h-auto" />
                  <div className="p-5">
                    <h4 className="text-lg font-semibold mb-2">{chart.title}</h4>
                    <p className="text-foreground/60 text-sm leading-relaxed">{chart.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Usage Scenes ── */}
      <section className="py-20 md:py-32 bg-foreground/5">
        <div className="container max-w-4xl mx-auto px-6">
          <h2 className="text-display text-3xl md:text-4xl text-center mb-16">{content.scenesTitle}</h2>
          <div className="space-y-12">
            {scenes.map((s) => (
              <div key={s.num} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:text-right text-foreground/40 text-5xl font-light">{s.num}</div>
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-semibold mb-3">{s.title}</h3>
                  <p className="text-foreground/80 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing + CTA ── */}
      <section className="py-20 md:py-32">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <p className="text-2xl md:text-3xl lg:text-4xl text-display leading-relaxed">{content.closing}</p>
          <div className="w-24 h-px bg-foreground/30 mx-auto mt-12" />
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigateWithTop('/products/35mm-f2')}
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
      <ImageLightbox
        images={apertureSamples}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
