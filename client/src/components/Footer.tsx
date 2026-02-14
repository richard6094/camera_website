import { useLocation } from 'wouter';
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Footer Component
 * Design Philosophy: Leica Industrial Aesthetics × Minimalist Footer
 * 
 * Features:
 * - Brand introduction
 * - Contact information (phone, email, address)
 * - Social media links (Instagram, Facebook, YouTube)
 * - Quick navigation links
 * - Copyright information
 */

export default function Footer() {
  const [, navigate] = useLocation();
  const { t } = useLanguage();

  const handleNavigate = (href: string) => {
    if (href.startsWith('/#')) {
      // Scroll to section
      const sectionId = href.substring(2);
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      navigate('/');
    } else {
      navigate(href);
    }
  };

  const quickLinks = [
    { label: t('header.products'), href: '/products' },
    { label: t('header.story'), href: '/#story' },
    { label: t('header.gallery'), href: '/#gallery' },
    { label: t('header.support'), href: '/#support' },
  ];

  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
    { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
    { icon: Youtube, label: 'YouTube', href: 'https://youtube.com' },
  ];

  return (
    <footer className="bg-foreground text-background border-t border-background/10" style={{ borderTopWidth: '0.5px' }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-14 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 md:gap-14 lg:gap-16">
          {/* Brand Introduction */}
          <div className="lg:col-span-2">
            <img 
              src="/images/mandler-logo.png" 
              alt="Mandler" 
              className="w-auto mb-5 sm:mb-6"
              style={{ objectFit: 'contain', height: '50px', filter: 'brightness(0) invert(1)' }}
            />
            <style>{`
              @media (min-width: 640px) {
                footer img[alt="Mandler"] {
                  height: 55px !important;
                }
              }
              @media (min-width: 768px) {
                footer img[alt="Mandler"] {
                  height: 60px !important;
                }
              }
            `}</style>
            <p className="text-background/70 text-sm leading-relaxed mb-5 sm:mb-6 max-w-md">
              {t('footer.about.description')}
            </p>
            <p className="text-background/50 text-xs tracking-wider">
              {t('footer.about.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-background text-sm font-semibold tracking-widest mb-5 sm:mb-6 uppercase">{t('footer.quick.title')}</h3>
            <ul className="space-y-2.5 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavigate(link.href)}
                    className="text-background/70 hover:text-background text-sm damped-transition"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-background text-sm font-semibold tracking-widest mb-5 sm:mb-6 uppercase">{t('footer.contact.title')}</h3>
            <ul className="space-y-3.5 sm:space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-background/70 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-background/50 text-xs">{t('footer.contact.phone')}</p>
                  <p className="text-background/70 text-sm">+86 400-888-9999</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-background/70 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <a 
                  href="mailto:info@mandler.com" 
                  className="text-background/70 hover:text-background text-sm damped-transition"
                >
                  info@mandler.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-background/70 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-background/50 text-xs mb-1">{t('footer.contact.address')}</p>
                  <p className="text-background/70 text-sm">
                    {t('footer.contact.address.line1')}<br />
                    {t('footer.contact.address.line2')}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-10 sm:mt-12 pt-7 sm:pt-8 border-t border-background/10" style={{ borderTopWidth: '0.5px' }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-5 sm:gap-6">
            <div className="flex items-center gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/70 hover:text-background damped-transition"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" strokeWidth={1.5} />
                </a>
              ))}
            </div>
            <p className="text-background/50 text-xs tracking-wider">
              © {new Date().getFullYear()} Mandler. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
