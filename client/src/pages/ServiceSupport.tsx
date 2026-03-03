import { useLanguage } from '@/contexts/LanguageContext';
import Breadcrumb from '@/components/Breadcrumb';
import { Shield, Wrench, Globe } from 'lucide-react';

/**
 * Service & Support Page
 * 
 * Covers warranty policy based on official warranty card.
 * Design: Magazine-style editorial layout matching BrandStory aesthetic.
 */

const content = {
  zh: {
    breadcrumb: '服务支持',
    hero: {
      label: '服务承诺',
      title: '与您同行',
      subtitle: '每一支 Mandler 镜头，都承载着我们对品质的承诺。从购买的那一刻起，我们的服务团队将始终伴随您左右。',
    },
    warranty: {
      label: '品质保证',
      title: '12 个月官方保修',
      description: '所有 Mandler 镜头产品自购买日起，提供 12 个月官方免费保修服务。我们对每一支镜头的材料与工艺品质负责。',
      items: [
        { title: '保修期限', desc: '自购买日起 12 个月内，凭购买凭证享受官方免费保修服务。' },
        { title: '保修范围', desc: '仅针对产品本身因材料缺陷、工艺问题导致的故障（如镜片脱膜、对焦异常、光圈调节异常等），提供免费维修或更换零部件服务。保修范围外项目需按成本支付维修费用。' },
        { title: '不保修范围', desc: '人为损坏（如摔落、碰撞、进水、镜片划伤、私自拆解改装）；正常使用产生的损耗（如镜头盖磨损）；非品牌官方维修点维修过的产品。' },
      ],
    },
  },
  en: {
    breadcrumb: 'Service & Support',
    hero: {
      label: 'OUR COMMITMENT',
      title: 'By Your Side',
      subtitle: 'Every Mandler lens carries our unwavering commitment to quality. From the moment of purchase, our service team stands behind every product we create.',
    },
    warranty: {
      label: 'QUALITY ASSURANCE',
      title: '12-Month Official Warranty',
      description: 'All Mandler lenses come with a 12-month official warranty from the date of purchase. We stand behind the materials and craftsmanship of every lens we produce.',
      items: [
        { title: 'Warranty Period', desc: '12 months of complimentary official warranty service from the date of purchase, with valid proof of purchase.' },
        { title: 'Coverage Scope', desc: 'Covers defects in materials and craftsmanship (e.g., coating delamination, focus anomalies, aperture irregularities). Free repair or replacement of parts is provided. Out-of-warranty issues are subject to repair fees at cost.' },
        { title: 'Exclusions', desc: 'Accidental damage (drops, impacts, water damage, lens scratches, unauthorized disassembly or modification); normal wear and tear (e.g., lens cap abrasion); products serviced by unauthorized repair centers.' },
      ],
    },
  },
  ja: {
    breadcrumb: 'サービス・サポート',
    hero: {
      label: 'サービスの約束',
      title: 'お客様とともに',
      subtitle: 'すべての Mandler レンズは、品質への揺るぎないコミットメントを搼えています。ご購入の瞬間から、私たちのサービスチームが常にお客様のそばに寄り添います。',
    },
    warranty: {
      label: '品質保証',
      title: '12ヶ月公式保証',
      description: 'すべての Mandler レンズには、ご購入日から12ヶ月間の公式無料保証サービスが付きます。素材と工芸品質に責任を持ちます。',
      items: [
        { title: '保証期間', desc: 'ご購入日から12ヶ月間、購入証明書をご提示いただくことで公式無料保証サービスをご利用いただけます。' },
        { title: '保証範囲', desc: '製品自体の素材欠陥・工芸上の問題による故障（コーティング剥離、フォーカス異常、絞り調整異常など）に対して、無料修理または部品交換サービスを提供します。保証範囲外は実費での修理となります。' },
        { title: '保証対象外', desc: '人為的損傷（落下、衝撃、浸水、レンズの傷、無許可の分解・改造）；通常使用による消耗（レンズキャップの摩耗など）；正規サービス拠点以外で修理された製品。' },
      ],
    },
  },
};

export default function ServiceSupport() {
  const { language } = useLanguage();
  const c = content[language];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Breadcrumb */}
      <div className="container max-w-7xl mx-auto px-6 pt-20 md:pt-24">
        <Breadcrumb
          items={[
            { label: language === 'zh' ? '首页' : language === 'ja' ? 'ホーム' : 'Home', href: '/' },
            { label: c.breadcrumb },
          ]}
        />
      </div>

      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/service-support.jpg)',
            filter: 'brightness(0.35)',
          }}
        />
        <div className="relative z-10 container max-w-4xl mx-auto px-6 text-center text-white">
          <p className="text-xs sm:text-sm tracking-[0.3em] mb-6 sm:mb-8 opacity-80">
            {c.hero.label}
          </p>
          <h1 className="text-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 sm:mb-8 leading-tight">
            {c.hero.title}
          </h1>
          <div className="w-20 h-px bg-white/50 mx-auto mb-6 sm:mb-8" />
          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed opacity-90">
            {c.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Warranty Section */}
      <section className="py-20 md:py-32">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
            <div>
              <p className="text-xs sm:text-sm tracking-[0.3em] mb-3 sm:mb-4 text-foreground/60">
                {c.warranty.label}
              </p>
              <h2 className="text-display text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight">
                {c.warranty.title}
              </h2>
              <div className="w-16 h-px bg-foreground/30 mb-8" />
              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                {c.warranty.description}
              </p>
            </div>
            <div className="space-y-8">
              {c.warranty.items.map((item, i) => (
                <div key={i} className="flex gap-5">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-foreground/20" style={{ borderWidth: '0.5px' }}>
                    {i === 0 && <Shield className="w-5 h-5 text-foreground/70" strokeWidth={1.5} />}
                    {i === 1 && <Wrench className="w-5 h-5 text-foreground/70" strokeWidth={1.5} />}
                    {i === 2 && <Globe className="w-5 h-5 text-foreground/70" strokeWidth={1.5} />}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 tracking-wide">{item.title}</h3>
                    <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
