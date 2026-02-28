import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { ShoppingCart, Menu, X, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FlagIcon } from './FlagIcon';
import { toast } from 'sonner';

/**
 * Header Navigation Component
 * Design Philosophy: Leica Industrial Aesthetics × Compact Navigation
 * 
 * Features:
 * - Left corner hamburger menu
 * - Compact dropdown navigation panel with submenu support
 * - Center brand logo
 * - Right corner shopping cart
 * - Damped transitions and mechanical precision
 */

interface HeaderProps {
  cartCount?: number;
}

interface NavItem {
  label: string;
  href?: string;
  submenu?: { label: string; href: string; description: string }[];
}

export default function Header({ cartCount = 0 }: HeaderProps) {
  const [, navigate] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const cartComingSoonText = language === 'zh' ? '商城正在开发中，敬请期待' : language === 'ja' ? 'ストアは開発中です。お楽しみに' : 'Store is under development, coming soon';

  const handleCartComingSoon = () => {
    toast.info(cartComingSoonText);
  };

  // Auto-hide header on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when scrolling up or at top of page
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } 
      // Hide header when scrolling down (after 100px)
      else if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setIsVisible(false);
        setMenuOpen(false); // Close menu when hiding header
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const products = [
    {
      label: '35mm F/2',
      href: '/products/35mm-f2-intro',
      description: language === 'zh' ? '经典焦段，纯粹视角' : language === 'ja' ? 'クラシックな焦点距離、ピュアな視点' : 'Classic Focal Length, Pure Perspective',
    },
    {
      label: '35mm F/2 ' + (language === 'zh' ? '特别版' : language === 'ja' ? '特別版' : 'Special Edition'),
      href: '/products/35mm-f2-special-intro',
      description: language === 'zh' ? '匠心之作，限量典藏' : language === 'ja' ? '匠の技、限定コレクション' : 'Crafted Excellence, Limited Collection',
    },
  ];

  const navItems: NavItem[] = [
    { label: t('header.products'), submenu: products },
    { label: t('header.story'), href: '/story' },
    { label: t('header.gallery'), href: '/gallery' },
    { label: t('header.support'), href: '/support' },
  ];

  const navigateWithTop = (href: string) => {
    navigate(href);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });
  };

  const handleNavigate = (href: string) => {
    if (href.startsWith('/#')) {
      // Navigate to home first, then scroll to section
      const sectionId = href.substring(2);
      navigate('/');
      requestAnimationFrame(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        }
      });
    } else {
      navigateWithTop(href);
    }
    setMenuOpen(false);
    setActiveSubmenu(null);
  };

  const handleMenuItemClick = (item: NavItem) => {
    if (item.submenu) {
      // Toggle submenu
      setActiveSubmenu(activeSubmenu === item.label ? null : item.label);
    } else if (item.href) {
      handleNavigate(item.href);
    }
  };

  return (
    <>
      {/* Fixed Header Bar */}
      <header 
        className={`fixed left-0 right-0 z-50 bg-background/70 backdrop-blur-md border-b border-foreground/10 transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{borderBottomWidth: '0.5px', top: 0}}
      >
        <div className="flex items-center justify-between h-16 md:h-20 px-4 md:px-6 lg:px-8">
          {/* Left: Hamburger Menu */}
          <div className="flex items-center w-[120px] md:w-[140px]">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-foreground/70 hover:text-foreground damped-transition"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.5} />
              ) : (
                <Menu className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.5} />
              )}
            </button>
          </div>

          {/* Center: Brand Logo */}
          <div
            className="cursor-pointer flex-shrink-0 damped-transition hover:opacity-80"
            onClick={() => navigateWithTop('/')}
          >
            <img 
              src="/images/mandler-logo.png" 
              alt="Mandler" 
              className="h-[77px] md:h-[96px] lg:h-[115px] w-auto"
              style={{ objectFit: 'contain' }}
            />
          </div>

          {/* Right: Language Switcher & Shopping Cart */}
          <div className="flex items-center justify-end gap-2 md:gap-3 w-[120px] md:w-[140px]">
            {/* Language Switcher Dropdown */}
            <div className="relative flex-shrink-0">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center justify-center gap-1.5 px-2.5 md:px-3 py-1.5 text-foreground/70 hover:text-foreground damped-transition border border-foreground/10 hover:border-foreground/20 bg-foreground/5 hover:bg-foreground/8"
                style={{ borderWidth: '0.5px', borderRadius: '4px' }}
                title={language === 'zh' ? 'Switch Language' : language === 'ja' ? '言語切替' : '切换语言'}
              >
                <FlagIcon country={language === 'zh' ? 'cn' : language === 'ja' ? 'jp' : 'us'} className="w-5 h-3.5 rounded-[1px] overflow-hidden" />
                <span className="text-xs md:text-sm font-medium tracking-wider whitespace-nowrap">{language === 'zh' ? '中文' : language === 'ja' ? '日本語' : 'EN'}</span>
              </button>
              {langMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setLangMenuOpen(false)} />
                  <div
                    className="absolute right-0 top-full mt-1 z-50 bg-background/95 backdrop-blur-md border border-foreground/10 shadow-lg overflow-hidden"
                    style={{ borderWidth: '0.5px', minWidth: '120px', borderRadius: '8px' }}
                  >
                    <button
                      onClick={() => { setLanguage('zh'); setLangMenuOpen(false); }}
                      className={`flex items-center gap-2 w-full px-3 py-2 text-sm damped-transition ${
                        language === 'zh' ? 'text-foreground bg-foreground/5' : 'text-foreground/60 hover:text-foreground hover:bg-foreground/5'
                      }`}
                    >
                      <FlagIcon country="cn" className="w-5 h-3.5 rounded-[1px] overflow-hidden" />
                      <span>中文</span>
                    </button>
                    <button
                      onClick={() => { setLanguage('en'); setLangMenuOpen(false); }}
                      className={`flex items-center gap-2 w-full px-3 py-2 text-sm damped-transition ${
                        language === 'en' ? 'text-foreground bg-foreground/5' : 'text-foreground/60 hover:text-foreground hover:bg-foreground/5'
                      }`}
                    >
                      <FlagIcon country="us" className="w-5 h-3.5 rounded-[1px] overflow-hidden" />
                      <span>English</span>
                    </button>
                    <button
                      onClick={() => { setLanguage('ja'); setLangMenuOpen(false); }}
                      className={`flex items-center gap-2 w-full px-3 py-2 text-sm damped-transition ${
                        language === 'ja' ? 'text-foreground bg-foreground/5' : 'text-foreground/60 hover:text-foreground hover:bg-foreground/5'
                      }`}
                    >
                      <FlagIcon country="jp" className="w-5 h-3.5 rounded-[1px] overflow-hidden" />
                      <span>日本語</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Shopping Cart */}
            <button
              type="button"
              onClick={handleCartComingSoon}
              className="relative p-2 text-foreground/50 hover:text-foreground/70 damped-transition"
              title={cartComingSoonText}
              aria-label={cartComingSoonText}
            >
              <ShoppingCart className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-foreground/90 text-background text-xs flex items-center justify-center font-semibold" style={{borderRadius: '1px'}}>
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Compact Dropdown Menu */}
      {menuOpen && (
        <div className="fixed top-16 md:top-20 left-4 md:left-6 right-4 md:right-auto z-[100] md:flex md:gap-0 md:items-start">
          {/* Main Menu */}
          <div 
            className="bg-[#1a1a1a]/95 backdrop-blur-md border border-[#f5f5f5]/10 transition-all duration-500 ease-out animate-in fade-in slide-in-from-top-4"
            style={{
              minWidth: '280px',
              maxWidth: '100%',
              borderWidth: '0.5px',
            }}
          >
            <nav className="py-2">
              <ul>
                {navItems.map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => handleMenuItemClick(item)}
                      className="w-full text-left px-6 py-3 text-[#f5f5f5]/80 hover:text-[#f5f5f5] hover:bg-[#f5f5f5]/5 damped-transition border-b border-[#f5f5f5]/5 last:border-b-0 flex items-center justify-between"
                      style={{
                        borderBottomWidth: '0.5px',
                        fontSize: '0.9rem',
                        letterSpacing: '0.05em',
                      }}
                    >
                      <span>{item.label}</span>
                      {item.submenu && (
                        <ChevronRight 
                          className={`w-4 h-4 damped-transition ${activeSubmenu === item.label ? 'rotate-90 md:rotate-0' : ''}`} 
                          strokeWidth={1.5} 
                        />
                      )}
                    </button>
                    
                    {/* Mobile Submenu (Vertical) */}
                    {item.submenu && activeSubmenu === item.label && (
                      <div className="md:hidden bg-[#1a1a1a]/80 border-t border-[#f5f5f5]/5" style={{ borderTopWidth: '0.5px' }}>
                        <ul>
                          {item.submenu.map((subItem) => (
                            <li key={subItem.href}>
                              <button
                                onClick={() => handleNavigate(subItem.href)}
                                className="w-full text-left px-8 py-3 text-[#f5f5f5]/70 hover:text-[#f5f5f5] hover:bg-[#f5f5f5]/5 damped-transition border-b border-[#f5f5f5]/5 last:border-b-0"
                                style={{
                                  borderBottomWidth: '0.5px',
                                }}
                              >
                                <div className="font-medium" style={{ fontSize: '0.85rem', letterSpacing: '0.05em' }}>
                                  {subItem.label}
                                </div>
                                <div className="text-[#f5f5f5]/40 mt-0.5" style={{ fontSize: '0.75rem' }}>
                                  {subItem.description}
                                </div>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Desktop Submenu (Horizontal) */}
          {activeSubmenu === t('header.products') && (
            <div 
              className="hidden md:block bg-[#1a1a1a]/95 backdrop-blur-md border border-[#f5f5f5]/10 animate-in fade-in slide-in-from-left-2 duration-300"
              style={{
                minWidth: '320px',
                maxWidth: '380px',
                borderWidth: '0.5px',
                borderLeft: 'none',
              }}
            >
              <nav className="py-2">
                <ul>
                  {products.map((product) => (
                    <li key={product.href}>
                      <button
                        onClick={() => handleNavigate(product.href)}
                        className="w-full text-left px-6 py-4 text-[#f5f5f5]/80 hover:text-[#f5f5f5] hover:bg-[#f5f5f5]/5 damped-transition border-b border-[#f5f5f5]/5 last:border-b-0"
                        style={{
                          borderBottomWidth: '0.5px',
                        }}
                      >
                        <div className="font-medium" style={{ fontSize: '0.95rem', letterSpacing: '0.05em' }}>
                          {product.label}
                        </div>
                        <div className="text-[#f5f5f5]/50 mt-1" style={{ fontSize: '0.8rem' }}>
                          {product.description}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}
        </div>
      )}

      {/* Backdrop overlay */}
      {menuOpen && (
        <div 
          className="fixed inset-0 z-[99] bg-black/50 backdrop-blur-sm transition-all duration-500 ease-out animate-in fade-in"
          onClick={() => {
            setMenuOpen(false);
            setActiveSubmenu(null);
          }}
        />
      )}
    </>
  );
}
