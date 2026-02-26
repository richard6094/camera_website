import { useLanguage } from '@/contexts/LanguageContext';
import Breadcrumb from '@/components/Breadcrumb';
import { Shield, Wrench, RotateCcw, Clock, Globe, Phone, Mail, ChevronRight } from 'lucide-react';

/**
 * Service & Support Page
 * 
 * Covers service policies, repair/maintenance, and 7-day return policy.
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
      title: '终身质保承诺',
      description: '所有 Mandler 镜头产品均享有终身有限质保服务。我们对每一支镜头的光学元件、机械结构和镀膜工艺负责到底。',
      items: [
        { title: '光学质保', desc: '镜片组件终身保修，涵盖镀膜脱落、内部起雾及光学元件分离等工艺缺陷。' },
        { title: '机械质保', desc: '对焦环、光圈叶片、卡口等机械结构保修五年，确保操控手感始终如一。' },
        { title: '电子质保', desc: '电子触点及固件系统保修三年，保障镜头与机身的稳定通信。' },
      ],
    },
    repair: {
      label: '维修服务',
      title: '专业维修与保养',
      description: '我们的维修中心配备与生产线同级的精密设备，由经验丰富的光学技师团队全程手工完成。',
      services: [
        { title: '日常保养', desc: '镜片清洁、对焦校准、光圈润滑等常规保养服务。建议每 12–18 个月进行一次专业保养。', time: '3–5 个工作日' },
        { title: '光学维修', desc: '镜片更换、镀膜修复、光学系统重新校准。使用与出厂完全一致的原装光学元件。', time: '7–14 个工作日' },
        { title: '机械维修', desc: '对焦机构调整、光圈叶片更换、卡口维修等机械结构修复与零件更换。', time: '5–10 个工作日' },
        { title: '外观修复', desc: '机身表面划痕修复、重新阳极氧化处理、铭牌更换等外观维护服务。', time: '5–7 个工作日' },
      ],
    },
    return: {
      label: '退换政策',
      title: '7 天无理由退换',
      subtitle: '我们对产品品质充满信心。自签收之日起 7 天内，您可享受无理由退换货服务。',
      conditions: {
        title: '退换条件',
        items: [
          '自签收之日起 7 个自然日内提出申请',
          '产品保持完好，未经人为损坏或改装',
          '原装包装、附件、保修卡齐全',
          '镜头无明显使用痕迹（轻微试用不影响退换）',
        ],
      },
      process: {
        title: '退换流程',
        steps: [
          { step: '01', title: '提交申请', desc: '通过官方客服邮箱或电话提交退换申请，提供订单号及原因说明。' },
          { step: '02', title: '审核确认', desc: '我们将在 1 个工作日内审核并确认您的申请，发送退货地址。' },
          { step: '03', title: '寄回商品', desc: '请妥善包装产品并寄回，退货运费由我们承担（非质量问题除外）。' },
          { step: '04', title: '退款到账', desc: '收到退回商品并验收后，3–5 个工作日内原路退款。' },
        ],
      },
      exchange: {
        title: '换货说明',
        desc: '如需更换同款或其他型号产品，我们将在收到退回商品后 1–2 个工作日内安排发货。因换货产生的差价将另行结算。',
      },
    },
    contact: {
      label: '联系我们',
      title: '随时为您服务',
      description: '如有任何疑问，我们的专业客服团队随时准备为您提供帮助。',
      phone: '+86 400-888-LENS (5367)',
      email: 'mandler_optics@163.com',
      hours: '周一至周五 9:00–18:00 · 周末及节假日 10:00–16:00',
      global: '全球服务网络覆盖 12 个国家和地区',
    },
    closing: '品质，是我们最长情的告白。',
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
      title: 'Lifetime Limited Warranty',
      description: 'All Mandler lenses are backed by a comprehensive lifetime limited warranty. We stand behind the optical elements, mechanical precision, and coating craftsmanship of every lens.',
      items: [
        { title: 'Optical Warranty', desc: 'Lifetime coverage on lens elements, including coating defects, internal fogging, and optical element separation.' },
        { title: 'Mechanical Warranty', desc: 'Five-year coverage on focus rings, aperture blades, lens mount, and all mechanical components for consistent handling.' },
        { title: 'Electronic Warranty', desc: 'Three-year coverage on electronic contacts and firmware systems, ensuring reliable lens-body communication.' },
      ],
    },
    repair: {
      label: 'REPAIR SERVICES',
      title: 'Professional Repair & Maintenance',
      description: 'Our service centers are equipped with production-grade precision instruments, and every repair is completed by hand by experienced optical technicians.',
      services: [
        { title: 'Routine Maintenance', desc: 'Lens cleaning, focus calibration, aperture lubrication, and general servicing. We recommend professional maintenance every 12–18 months.', time: '3–5 business days' },
        { title: 'Optical Repair', desc: 'Element replacement, coating restoration, and full optical recalibration using factory-original components.', time: '7–14 business days' },
        { title: 'Mechanical Repair', desc: 'Focus mechanism adjustment, aperture blade replacement, mount repair, and structural restoration.', time: '5–10 business days' },
        { title: 'Cosmetic Restoration', desc: 'Surface scratch repair, re-anodizing, nameplate replacement, and exterior refurbishment services.', time: '5–7 business days' },
      ],
    },
    return: {
      label: 'RETURN POLICY',
      title: '7-Day No-Questions-Asked Returns',
      subtitle: 'We are confident in the quality of our products. Within 7 days of delivery, you may return or exchange your purchase for any reason.',
      conditions: {
        title: 'Return Conditions',
        items: [
          'Request must be submitted within 7 calendar days of delivery',
          'Product must be in original condition, free from damage or modification',
          'All original packaging, accessories, and warranty card must be included',
          'Lens must show no significant signs of use (light testing is acceptable)',
        ],
      },
      process: {
        title: 'Return Process',
        steps: [
          { step: '01', title: 'Submit Request', desc: 'Contact us via email or phone with your order number and reason for return.' },
          { step: '02', title: 'Review & Confirm', desc: 'We will review and confirm your request within 1 business day and provide a return address.' },
          { step: '03', title: 'Ship the Product', desc: 'Pack the product securely and ship it back. Return shipping is covered by us (except for non-quality issues).' },
          { step: '04', title: 'Refund Processed', desc: 'Once received and inspected, your refund will be processed within 3–5 business days via the original payment method.' },
        ],
      },
      exchange: {
        title: 'Exchange Policy',
        desc: 'For exchanges to the same or a different model, we will arrange shipment within 1–2 business days of receiving the returned product. Any price difference will be settled accordingly.',
      },
    },
    contact: {
      label: 'CONTACT US',
      title: 'Always at Your Service',
      description: 'Our dedicated support team is ready to assist you with any questions or concerns.',
      phone: '+86 400-888-LENS (5367)',
      email: 'mandler_optics@163.com',
      hours: 'Mon–Fri 9:00–18:00 · Weekends & Holidays 10:00–16:00',
      global: 'Global service network across 12 countries and regions',
    },
    closing: 'Quality is our most enduring promise.',
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
      title: '生涯限定保証',
      description: 'すべての Mandler レンズには包括的な生涯限定保証が付きます。光学素子、機械精度、コーティング技術の品質を保証します。',
      items: [
        { title: '光学保証', desc: 'レンズ素子の生涯保証。コーティング剥離、内部曇り、光学素子の分離などの工芸欠陥をカバー。' },
        { title: '機械保証', desc: 'フォーカスリング、絞り羽根、マウントなどの機械部品を5年間保証。一貫した操作感を確保。' },
        { title: '電子保証', desc: '電子接点とファームウェアシステムを3年間保証。レンズとボディの安定した通信を確保。' },
      ],
    },
    repair: {
      label: '修理サービス',
      title: 'プロフェッショナル修理・メンテナンス',
      description: '当社のサービスセンターは生産ラインと同等の精密機器を備え、経験豊富な光学技術者が全て手作業で完成します。',
      services: [
        { title: '定期メンテナンス', desc: 'レンズクリーニング、フォーカス校正、絞り潤滑などの一般サービス。12〜18ヶ月ごとの専門メンテナンスを推奨。', time: '3〜5営業日' },
        { title: '光学修理', desc: '素子交換、コーティング修復、工場純正部品を使用した光学システムの再校正。', time: '7〜14営業日' },
        { title: '機械修理', desc: 'フォーカス機構調整、絞り羽根交換、マウント修理などの構造修復。', time: '5〜10営業日' },
        { title: '外観修復', desc: '表面傷修復、再アノダイズ処理、銘板交換などの外装メンテナンス。', time: '5〜7営業日' },
      ],
    },
    return: {
      label: '返品ポリシー',
      title: '7日間無条件返品',
      subtitle: '製品の品質に自信を持っています。お届けから7日以内であれば、理由を問わず返品・交換が可能です。',
      conditions: {
        title: '返品条件',
        items: [
          'お届けから7暦日以内に申請',
          '製品が原状を保ち、損傷や改造がないこと',
          '元のパッケージ、付属品、保証書が全て揃っていること',
          'レンズに著しい使用痕跡がないこと（軽微な試用は可）',
        ],
      },
      process: {
        title: '返品手続き',
        steps: [
          { step: '01', title: '申請提出', desc: 'メールまたは電話で注文番号と返品理由をお知らせください。' },
          { step: '02', title: '審査・確認', desc: '1営業日以内に審査・確認し、返送先をご案内します。' },
          { step: '03', title: '商品返送', desc: '製品を丁寧に梱包して返送してください。返送料は当社負担（品質問題以外の場合を除く）。' },
          { step: '04', title: '返金処理', desc: '返送品の受領・検品後、3〜5営業日以内に元のお支払い方法で返金します。' },
        ],
      },
      exchange: {
        title: '交換ポリシー',
        desc: '同一または別モデルへの交換の場合、返送品受領後1〜2営業日以内に発送します。価格差額は別途決済となります。',
      },
    },
    contact: {
      label: 'お問い合わせ',
      title: 'いつでもお客様のために',
      description: 'ご不明な点がございましたら、専任サポートチームがお手伝いいたします。',
      phone: '+86 400-888-LENS (5367)',
      email: 'mandler_optics@163.com',
      hours: '月曜〜金曜 9:00〜18:00 · 土日祝日 10:00〜16:00',
      global: '世界12の国と地域にサービスネットワークを展開',
    },
    closing: '品質とは、私たちの最も永く続く約束です。',
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

      {/* Divider */}
      <div className="container max-w-6xl mx-auto px-6">
        <div className="h-px bg-foreground/10" />
      </div>

      {/* Repair & Maintenance Section */}
      <section className="py-20 md:py-32">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 md:mb-20">
            <p className="text-xs sm:text-sm tracking-[0.3em] mb-3 sm:mb-4 text-foreground/60">
              {c.repair.label}
            </p>
            <h2 className="text-display text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight">
              {c.repair.title}
            </h2>
            <div className="w-16 h-px bg-foreground/30 mx-auto mb-8" />
            <p className="text-base sm:text-lg text-foreground/80 leading-relaxed max-w-3xl mx-auto">
              {c.repair.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {c.repair.services.map((service, i) => (
              <div
                key={i}
                className="p-8 md:p-10 border border-foreground/10 hover:border-foreground/25 transition-colors duration-300"
                style={{ borderWidth: '0.5px' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg md:text-xl font-semibold tracking-wide">{service.title}</h3>
                  <span className="flex items-center gap-1.5 text-xs text-foreground/50 tracking-wider">
                    <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
                    {service.time}
                  </span>
                </div>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Return Policy - Full Width Dark Section */}
      <section className="relative py-20 md:py-32 bg-foreground text-background">
        <div className="container max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16 md:mb-20">
            <p className="text-xs sm:text-sm tracking-[0.3em] mb-3 sm:mb-4 opacity-60">
              {c.return.label}
            </p>
            <h2 className="text-display text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight">
              {c.return.title}
            </h2>
            <div className="w-16 h-px bg-background/30 mx-auto mb-8" />
            <p className="text-base sm:text-lg leading-relaxed opacity-80 max-w-3xl mx-auto">
              {c.return.subtitle}
            </p>
          </div>

          {/* Conditions + Process Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
            {/* Return Conditions */}
            <div>
              <h3 className="text-xl md:text-2xl font-semibold mb-8 tracking-wide flex items-center gap-3">
                <RotateCcw className="w-5 h-5 opacity-70" strokeWidth={1.5} />
                {c.return.conditions.title}
              </h3>
              <ul className="space-y-5">
                {c.return.conditions.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center border border-background/30 text-xs opacity-60 mt-0.5" style={{ borderWidth: '0.5px' }}>
                      {i + 1}
                    </span>
                    <span className="text-sm sm:text-base leading-relaxed opacity-80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Return Process */}
            <div>
              <h3 className="text-xl md:text-2xl font-semibold mb-8 tracking-wide">
                {c.return.process.title}
              </h3>
              <div className="space-y-8">
                {c.return.process.steps.map((step, i) => (
                  <div key={i} className="flex gap-5">
                    <span className="flex-shrink-0 text-3xl md:text-4xl font-light opacity-25 leading-none mt-1 tabular-nums">
                      {step.step}
                    </span>
                    <div>
                      <h4 className="text-base md:text-lg font-semibold mb-1.5">{step.title}</h4>
                      <p className="text-sm sm:text-base opacity-70 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Exchange Note */}
          <div className="mt-16 md:mt-20 pt-10 border-t border-background/15">
            <h3 className="text-lg md:text-xl font-semibold mb-4 tracking-wide">{c.return.exchange.title}</h3>
            <p className="text-sm sm:text-base opacity-70 leading-relaxed max-w-4xl">{c.return.exchange.desc}</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-32">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <p className="text-xs sm:text-sm tracking-[0.3em] mb-3 sm:mb-4 text-foreground/60">
                {c.contact.label}
              </p>
              <h2 className="text-display text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight">
                {c.contact.title}
              </h2>
              <div className="w-16 h-px bg-foreground/30 mb-8" />
              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                {c.contact.description}
              </p>
            </div>
            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-center gap-5 p-6 border border-foreground/10 hover:border-foreground/25 transition-colors duration-300" style={{ borderWidth: '0.5px' }}>
                <Phone className="w-5 h-5 text-foreground/60 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-xs tracking-widest text-foreground/50 mb-1">{language === 'zh' ? '服务热线' : language === 'ja' ? 'サービスライン' : 'SERVICE LINE'}</p>
                  <p className="text-base sm:text-lg font-medium tracking-wide">{c.contact.phone}</p>
                </div>
              </div>
              {/* Email */}
              <div className="flex items-center gap-5 p-6 border border-foreground/10 hover:border-foreground/25 transition-colors duration-300" style={{ borderWidth: '0.5px' }}>
                <Mail className="w-5 h-5 text-foreground/60 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-xs tracking-widest text-foreground/50 mb-1">{language === 'zh' ? '客服邮箱' : language === 'ja' ? 'メール' : 'EMAIL'}</p>
                  <p className="text-base sm:text-lg font-medium tracking-wide">{c.contact.email}</p>
                </div>
              </div>
              {/* Hours */}
              <div className="flex items-center gap-5 p-6 border border-foreground/10 hover:border-foreground/25 transition-colors duration-300" style={{ borderWidth: '0.5px' }}>
                <Clock className="w-5 h-5 text-foreground/60 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-xs tracking-widest text-foreground/50 mb-1">{language === 'zh' ? '服务时间' : language === 'ja' ? 'サービス時間' : 'HOURS'}</p>
                  <p className="text-base sm:text-lg font-medium tracking-wide">{c.contact.hours}</p>
                </div>
              </div>
              {/* Global */}
              <div className="flex items-center gap-5 p-6 border border-foreground/10 hover:border-foreground/25 transition-colors duration-300" style={{ borderWidth: '0.5px' }}>
                <Globe className="w-5 h-5 text-foreground/60 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-xs tracking-widest text-foreground/50 mb-1">{language === 'zh' ? '服务网络' : language === 'ja' ? 'グローバルネットワーク' : 'GLOBAL NETWORK'}</p>
                  <p className="text-base sm:text-lg font-medium tracking-wide">{c.contact.global}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-20 md:py-32 border-t border-foreground/10">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <p className="text-2xl md:text-3xl lg:text-4xl text-display leading-relaxed">
            {c.closing}
          </p>
          <div className="w-24 h-px bg-foreground/30 mx-auto mt-12" />
        </div>
      </section>
    </div>
  );
}
