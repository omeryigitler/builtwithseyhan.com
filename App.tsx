import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Video, Zap, Star, Linkedin, Twitter, Mail, Languages, Dumbbell, Activity, Trophy, Calendar, ClipboardCheck, Layout, TrendingUp, ChevronDown, ArrowRight, BookOpen, Check, Moon, Sun, HelpCircle, Play } from 'lucide-react';
import { Button } from './components/Button';
import { BookingModal } from './components/BookingModal';
import { VideoModal } from './components/VideoModal';
import { ServiceCard } from './components/ServiceCard';
import { CalorieCalculator } from './components/CalorieCalculator';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { Reveal } from './components/Reveal';
import { TiltCard } from './components/TiltCard';
import { CustomCursor } from './components/CustomCursor';
import { LazyImage } from './components/LazyImage';
import { CoachPhotoStack } from './components/CoachPhotoStack';
import { AdminPanel, loadCustomTestimonials, CustomTestimonial } from './components/AdminPanel';
import { Service, Testimonial } from './types';
import { content, Language } from './translations';
import { CONTACT_EMAIL, SOCIAL_URLS } from './siteConfig';

// Static parts of data structure
const STATIC_SERVICE_ICONS = {
  1: <Video size={36} strokeWidth={1.5} />,
  2: <Activity size={36} strokeWidth={1.5} />,
  3: <Dumbbell size={36} strokeWidth={1.5} />,
  4: <Trophy size={36} strokeWidth={1.5} />
};

// Icons for the Process Section
const PROCESS_ICONS = [ClipboardCheck, Layout, TrendingUp];

// Mustafa's real coaching photos — mustafa-2 (back pose) leads as hero
const COACH_PHOTOS = [
  '/images/mustafa-2.jpg',
  '/images/mustafa-1.jpg',
  '/images/mustafa-3.jpg',
  '/images/mustafa-4.jpg',
  '/images/mustafa-5.jpg',
];

// Stable Avatar URLs for the About Section
const CLIENT_AVATARS = [
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/68.jpg"
];

const SOCIAL_LINKS = [
  {
    key: 'linkedin' as const,
    href: SOCIAL_URLS.linkedin,
    icon: <Linkedin size={20} />
  },
  {
    key: 'twitter' as const,
    href: SOCIAL_URLS.twitter,
    icon: <Twitter size={20} />
  },
  {
    key: 'email' as const,
    href: SOCIAL_URLS.email,
    icon: <Mail size={20} />
  }
];

// Updated Static Data for Fitness Transformations
const STATIC_TESTIMONIAL_DATA = [
  {
    id: '1',
    // Male weight loss / muscle gain
    imageBefore: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=600&auto=format&fit=crop&grayscale', 
    imageAfter: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=600&auto=format&fit=crop&grayscale', 
  },
  {
    id: '2',
    // Female fitness / toning (Selin)
    imageBefore: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop&grayscale', 
    imageAfter: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&auto=format&fit=crop&grayscale',
  },
  {
    id: '3',
    // Male competition ready
    imageBefore: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop&grayscale', 
    imageAfter: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop&grayscale', 
  },
  {
    id: '4',
    // Male Hardgainer / Bulk
    imageBefore: 'https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?q=80&w=600&auto=format&fit=crop&grayscale', 
    imageAfter: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600&auto=format&fit=crop&grayscale', 
  },
  {
    id: '5',
    // Female Postpartum / Core
    imageBefore: 'https://images.unsplash.com/photo-1620932934088-fbdb2920e484?q=80&w=600&auto=format&fit=crop&grayscale', 
    imageAfter: 'https://images.unsplash.com/photo-1616803689943-5601631c7fec?q=80&w=600&auto=format&fit=crop&grayscale', 
  },
  {
    id: '6',
    // Male 40+ Age
    imageBefore: 'https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?q=80&w=600&auto=format&fit=crop&grayscale', 
    imageAfter: 'https://images.unsplash.com/photo-1590556409324-aa1d726e5c3c?q=80&w=600&auto=format&fit=crop&grayscale', 
  }
];

// --- Internal Helper Component: CountUp Animation ---
const CountUp: React.FC<{ end: number; duration?: number; suffix?: string }> = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          let start = 0;
          const increment = end / (duration / 16); // 60fps
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.ceil(start));
            }
          }, 16);
          
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// --- Internal Helper Component: Scroll Progress Bar ---
const ScrollProgress: React.FC = () => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        const totalScroll = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scroll = windowHeight > 0 ? totalScroll / windowHeight : 0;

        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${Math.min(Math.max(scroll, 0), 1)})`;
        }

        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1.5 z-[60] bg-transparent pointer-events-none">
      <div 
        ref={progressRef}
        className="h-full origin-left scale-x-0 bg-brand shadow-[0_2px_10px_rgba(0,0,0,0.2)] transition-transform duration-100 ease-out"
      />
    </div>
  );
};

// --- Internal Helper Component: Logo Strip ---
const LogoMarquee = () => {
    const logos = [
        // Optimum Nutrition
        <svg key="1" height="45" viewBox="0 0 100 50" fill="currentColor"><path d="M10,25 Q10,5 30,5 Q50,5 50,25 Q50,45 30,45 Q10,45 10,25 Z M55,5 L70,45 L85,5 L100,45" stroke="currentColor" strokeWidth="4" fill="none" /><text x="30" y="32" fontFamily="Arial" fontWeight="bold" fontSize="16" textAnchor="middle" stroke="none" fill="currentColor">ON</text></svg>,
        // Gatorade
        <svg key="2" height="40" viewBox="0 0 150 40" fill="currentColor"><path d="M20,10 L30,5 L30,15 L40,15 L20,35 L20,20 L5,20 Z" /><text x="50" y="28" fontFamily="Arial" fontWeight="900" fontSize="24" fontStyle="italic" letterSpacing="-1">GATORADE</text></svg>,
        // MyProtein
        <svg key="3" height="24" viewBox="0 0 140 24" fill="currentColor"><text x="0" y="20" fontFamily="Arial" fontWeight="800" fontSize="20" letterSpacing="0.5">MYPROTEIN</text></svg>,
        // MusclePharm
        <svg key="4" height="40" viewBox="0 0 180 40" fill="currentColor"><rect x="0" y="5" width="8" height="30" /><rect x="12" y="5" width="8" height="30" /><rect x="24" y="5" width="8" height="30" /><text x="40" y="28" fontFamily="Arial" fontWeight="bold" fontSize="20">MUSCLE</text><text x="125" y="28" fontFamily="Arial" fontSize="20">PHARM</text></svg>,
        // GNC
        <svg key="5" height="30" viewBox="0 0 80 30" fill="currentColor"><text x="0" y="25" fontFamily="Arial" fontWeight="900" fontSize="28">GNC</text></svg>
    ];

    return (
        <div className="relative overflow-hidden px-4 md:px-6">
            <div className="no-scrollbar flex snap-x touch-pan-x items-center gap-4 overflow-x-auto overscroll-x-contain px-2 py-2 text-gray-400 transition-colors duration-300 dark:text-gray-600 lg:hidden">
                {logos.map((logo, i) => (
                  <div key={i} className="flex h-12 min-w-[128px] shrink-0 snap-center items-center justify-center grayscale opacity-75 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:text-gray-900 dark:hover:text-white [&>svg]:max-h-full [&>svg]:max-w-full">
                    {logo}
                  </div>
                ))}
            </div>
            <div className="hidden overflow-hidden lg:block">
              <div className="flex w-max text-gray-400 transition-colors duration-300 dark:text-gray-600 lg:animate-logo-marquee motion-reduce:animate-none hover:[animation-play-state:paused]">
                {[0, 1].map((group) => (
                  <div key={group} className="flex shrink-0 items-center gap-16 pr-16">
                    {logos.map((logo, i) => (
                      <div key={`${group}-${i}`} className="flex h-12 min-w-[120px] shrink-0 items-center justify-center grayscale opacity-75 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:text-gray-900 dark:hover:text-white [&>svg]:max-h-full [&>svg]:max-w-full">
                        {logo}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            {/* Fade Edges for Dark Mode */}
            <div className="pointer-events-none absolute top-0 left-0 hidden w-24 h-full bg-gradient-to-r from-gray-50 dark:from-gray-950 to-transparent z-10 transition-colors duration-300 lg:block"></div>
            <div className="pointer-events-none absolute top-0 right-0 hidden w-24 h-full bg-gradient-to-l from-gray-50 dark:from-gray-950 to-transparent z-10 transition-colors duration-300 lg:block"></div>
        </div>
    );
};

// --- Internal Helper: Newsletter Section ---
const NewsletterSection: React.FC<{ lang: Language }> = ({ lang }) => {
    const t = content[lang].newsletter;
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(email) {
            const subject = encodeURIComponent(t.subject);
            const body = encodeURIComponent(`${t.emailLabel}: ${email}`);
            window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
            setStatus('success');
            setTimeout(() => {
                setStatus('idle');
                setEmail('');
            }, 3000);
        }
    };

    return (
        <section className="py-24 px-6 text-gray-900 dark:text-white transition-colors duration-300">
            <Reveal>
                <div className="max-w-7xl mx-auto bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-200 dark:border-gray-800 shadow-xl relative overflow-hidden p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 md:gap-24">
                    {/* Visual Mockup of E-Book */}
                    <div className="w-full md:w-1/2 flex justify-center md:justify-end relative z-10">
                        {/* Book: Light Mode -> Black, Dark Mode -> White */}
                        <div className="relative w-64 h-80 bg-gray-900 dark:bg-white rounded-r-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] transform rotate-3 hover:rotate-0 transition-transform duration-500 border-l-4 border-gray-700 dark:border-gray-200 flex flex-col justify-between p-6">
                            <div className="text-white dark:text-gray-900">
                                <p className="text-xs font-bold tracking-widest uppercase opacity-50 mb-2">Mustafa Seyhan</p>
                                <h3 className="text-3xl font-black leading-tight italic whitespace-pre-line">{t.coverTitle}</h3>
                            </div>
                            <div className="mt-auto">
                                <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                                    <BookOpen className="text-gray-900 dark:text-white" size={20} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="w-full md:w-1/2 text-center md:text-left relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-xs font-bold uppercase tracking-wider mb-6">
                            <Zap size={14} className="fill-brand text-black dark:text-brand" />
                            {t.badge}
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold dark:font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">{t.title}</h2>
                        <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto md:mx-0 font-medium">{t.subtitle}</p>
                        
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto md:mx-0">
                            <input 
                                type="email" 
                                placeholder={t.placeholder} 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="flex-1 px-5 py-3 rounded-full border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-gray-900 dark:focus:border-brand focus:ring-1 focus:ring-gray-900 dark:focus:ring-brand transition-all bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600"
                            />
                            <Button type="submit" disabled={status === 'success'} className="bg-gray-900 dark:bg-brand text-white dark:text-black hover:bg-black dark:hover:bg-brand-hover border-transparent shadow-none">
                                {status === 'success' ? <Check size={20} /> : t.button}
                            </Button>
                        </form>
                        {status === 'success' && <p className="text-green-600 dark:text-brand text-sm mt-3 font-medium animate-fade-in">{t.success}</p>}
                    </div>
                </div>
            </Reveal>
        </section>
    );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const bl = navigator.language?.toLowerCase() ?? '';
      return (tz === 'Europe/Istanbul' || bl.startsWith('tr')) ? 'tr' : 'en';
    } catch {
      return 'en';
    }
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedServiceTitle, setSelectedServiceTitle] = useState(content.en.ui.defaultServiceTitle);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [customTestimonials, setCustomTestimonials] = useState<CustomTestimonial[]>(loadCustomTestimonials);
  const logoClickCount = useRef(0);
  const logoClickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Theme State - Default to false (Light Mode)
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // State for the Process section interaction
  const [activeProcessStep, setActiveProcessStep] = useState<number | null>(null);
  const isScrolledRef = useRef(false);

  // Translation shortcut
  const t = content[lang];

  // Dynamic Navigation Configuration
  const NAV_LINKS = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.stories, href: "#testimonials" },
    { label: t.nav.faq, href: "#faq" },
  ];

  // Construct Services dynamically based on language
  const services: Service[] = [
    { id: '1', ...t.services.cards[1], icon: STATIC_SERVICE_ICONS[1] },
    { id: '2', ...t.services.cards[2], icon: STATIC_SERVICE_ICONS[2] },
    { id: '3', ...t.services.cards[3], icon: STATIC_SERVICE_ICONS[3] },
    { id: '4', ...t.services.cards[4], icon: STATIC_SERVICE_ICONS[4] },
  ];

  // Construct Testimonials dynamically based on language
  const staticTestimonials: Testimonial[] = STATIC_TESTIMONIAL_DATA.map((item, index) => ({
    ...item,
    name: t.testimonials.items[index]?.name || t.ui.clientFallback,
    timeframe: t.testimonials.items[index]?.timeframe || "",
    result: t.testimonials.items[index]?.result || "",
    quote: t.testimonials.items[index]?.quote || ""
  }));

  // Custom testimonials from admin override static ones
  const testimonials: Testimonial[] = customTestimonials.length > 0
    ? customTestimonials.map(c => ({
        id: c.id,
        name: c.name,
        timeframe: c.timeframe,
        result: c.result,
        quote: c.quote,
        imageBefore: c.imageBefore,
        imageAfter: c.imageAfter,
      }))
    : staticTestimonials;

  // Adaptive grid: 1→center, 2→side-by-side, 3→3col, 4→3+1center, 5→3+2center…
  const renderTestimonialGrid = (items: Testimonial[]) => {
    if (items.length === 0) return null;
    const fullRowCount = Math.floor(items.length / 3);
    const remainder = items.length % 3;
    const fullItems = items.slice(0, fullRowCount * 3);
    const remainderItems = items.slice(fullRowCount * 3);

    return (
      <div className="space-y-8">
        {fullRowCount > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fullItems.map((tItem, index) => renderTestimonialCard(tItem, index))}
          </div>
        )}
        {remainder > 0 && (
          <div className="flex flex-col md:flex-row justify-center gap-8">
            {remainderItems.map((tItem, i) => (
              <div key={tItem.id} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc((100%-4rem)/3)]">
                {renderTestimonialCard(tItem, fullRowCount * 3 + i)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderTestimonialCard = (tItem: Testimonial, index: number) => (
    <Reveal key={tItem.id ?? index} delay={Math.min(index, 2) * 0.1}>
      <div className="group relative bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-200 dark:border-gray-800 overflow-hidden cursor-pointer hover:border-brand dark:hover:border-brand transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(204,255,0,0.3)] hover:-translate-y-2 flex flex-col h-full transform-gpu [backface-visibility:hidden] [mask-image:radial-gradient(white,black)]">
        <div className="relative h-[400px] bg-gray-100 dark:bg-gray-800 overflow-hidden">
          <BeforeAfterSlider
            beforeImage={tItem.imageBefore}
            afterImage={tItem.imageAfter}
            alt={tItem.name}
            beforeLabel={t.testimonials.before}
            afterLabel={t.testimonials.after}
          />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 right-6">
            <h3 className="text-white font-bold text-2xl mb-1">{tItem.name}</h3>
            <div className="text-brand font-bold text-lg tracking-tight">{tItem.result}</div>
          </div>
        </div>
        <div className="p-8 flex flex-col flex-1 relative transition-colors duration-500 group-hover:bg-gray-50 dark:group-hover:bg-gray-800/50">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              <Calendar size={14} />
              <span>{tItem.timeframe}</span>
            </div>
            {tItem.quote && (
              <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed italic">
                "{tItem.quote}"
              </p>
            )}
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-brand scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
      </div>
    </Reveal>
  );

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const nextIsScrolled = window.scrollY > 20;
      if (isScrolledRef.current !== nextIsScrolled) {
        isScrolledRef.current = nextIsScrolled;
        setIsScrolled(nextIsScrolled);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Dark Mode Class on HTML element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Safe smooth scrolling function
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault(); 
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false); 
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    logoClickCount.current += 1;
    if (logoClickTimer.current) clearTimeout(logoClickTimer.current);
    if (logoClickCount.current >= 3) {
      setAdminOpen(true);
      logoClickCount.current = 0;
    } else {
      logoClickTimer.current = setTimeout(() => { logoClickCount.current = 0; }, 800);
    }
  };

  const openBooking = (title: string = t.ui.defaultServiceTitle) => {
    setSelectedServiceTitle(title);
    setBookingModalOpen(true);
  };

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'tr' : 'en');
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const shouldUseDarkNav = isScrolled || isNavHovered;

  return (
    <div id="top" className="min-h-screen overflow-x-clip bg-gray-50 dark:bg-gray-950 font-sans text-gray-900 dark:text-white selection:bg-brand selection:text-black transition-colors duration-300">
      <CustomCursor />
      <ScrollProgress />
      
      {/* --- Navigation --- */}
      <nav 
        onMouseEnter={() => setIsNavHovered(true)}
        onMouseLeave={() => setIsNavHovered(false)}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'py-4 shadow-lg' : 'py-6'
        } ${
          shouldUseDarkNav
            ? 'bg-gray-900/95 dark:bg-gray-950/90 backdrop-blur-md border-b border-gray-800 dark:border-white/10' 
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a
            href="#top"
            onClick={handleLogoClick}
            className={`text-xl font-bold tracking-tight flex items-center gap-2 cursor-pointer transition-colors ${shouldUseDarkNav ? 'text-white' : 'text-gray-900 dark:text-white'}`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-serif italic font-black transition-colors ${shouldUseDarkNav ? 'bg-white text-gray-900' : 'bg-gray-900 text-white dark:bg-white dark:text-black'}`}>M</div>
            <span>Mustafa Seyhan.</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                onClick={(e) => handleScroll(e, link.href)}
                className={`text-sm font-medium transition-colors cursor-pointer hover:text-brand dark:hover:text-brand ${shouldUseDarkNav ? 'text-gray-300' : 'text-gray-600 dark:text-gray-300'}`}
              >
                {link.label}
              </a>
            ))}
            
            <div className="flex items-center gap-2 border-l border-gray-200 dark:border-gray-800 pl-6">
                <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-full transition-colors ${shouldUseDarkNav ? 'text-gray-400 hover:bg-white/10' : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'}`}
                title={isDarkMode ? t.ui.theme.toLight : t.ui.theme.toDark}
                aria-label={isDarkMode ? t.ui.theme.toLight : t.ui.theme.toDark}
                >
                    {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                <button 
                onClick={toggleLanguage}
                aria-label={t.ui.language.label}
                className={`flex items-center gap-1 text-sm font-medium transition-colors px-3 py-1.5 rounded-full cursor-pointer ${shouldUseDarkNav ? 'text-gray-400 hover:bg-white/10' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'}`}
                >
                <Languages size={16} />
                <span className="uppercase">{lang}</span>
                </button>

                <Button size="sm" variant="primary" onClick={() => openBooking()}>{t.nav.bookBtn}</Button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`lg:hidden ${shouldUseDarkNav ? 'text-white' : 'text-gray-900 dark:text-white'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? t.ui.menu.close : t.ui.menu.open}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-gray-900 dark:bg-gray-950 pt-24 px-6 lg:hidden animate-in slide-in-from-top-10 duration-200">
          <div className="flex flex-col gap-6 text-xl font-medium text-white">
             {NAV_LINKS.map((link) => (
               <a 
                key={link.label} 
                href={link.href} 
                onClick={(e) => handleScroll(e, link.href)}
                className="hover:text-brand"
               >
                 {link.label}
               </a>
             ))}
             
             <div className="flex items-center justify-between py-4 border-y border-gray-800">
                 <button onClick={() => setIsDarkMode(!isDarkMode)} className="flex items-center gap-2 text-gray-400">
                     {isDarkMode ? <Sun size={20} /> : <Moon size={20} />} 
                     {isDarkMode ? t.ui.theme.light : t.ui.theme.dark}
                 </button>
                 <button onClick={() => { toggleLanguage(); setMobileMenuOpen(false); }} className="flex items-center gap-2 text-gray-400">
                    <Languages size={20} /> {lang === 'en' ? t.ui.language.toTurkish : t.ui.language.toEnglish}
                 </button>
             </div>
             
             <Button fullWidth size="lg" onClick={() => { setMobileMenuOpen(false); openBooking(); }}>{t.nav.bookBtn}</Button>
          </div>
        </div>
      )}

      {/* --- Hero Section --- */}
      <section className="relative overflow-hidden bg-gray-50 px-5 pb-20 pt-36 transition-colors duration-500 dark:bg-gray-950 sm:px-6 sm:pt-40 md:pb-32 md:pt-48">
        
        {/* Animated Glow Effects (Aurora Blob) - UPDATED OPACITY FOR LIGHT MODE */}
        <div className="absolute top-0 left-1/2 hidden w-full h-full max-w-7xl -z-10 -translate-x-1/2 pointer-events-none opacity-30 transition-opacity duration-500 dark:opacity-60 md:block">
           <div className="absolute top-20 left-10 w-96 h-96 bg-brand rounded-full blur-[120px] mix-blend-screen opacity-20 animate-blob"></div>
           <div className="absolute top-40 right-10 w-96 h-96 bg-blue-600 rounded-full blur-[120px] mix-blend-screen opacity-20 animate-blob" style={{ animationDelay: '2s' }}></div>
           <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-purple-600 rounded-full blur-[120px] mix-blend-screen opacity-20 animate-blob" style={{ animationDelay: '4s' }}></div>
        </div>

        <Reveal>
          <div className="max-w-5xl mx-auto text-center relative z-10">
            {/* UPDATED: Changed dark:bg-gray-900 to dark:bg-gray-950 to match Hero bg */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 shadow-sm mb-8 animate-fade-in-up transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
              </span>
              <span className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wide">{t.hero.badge}</span>
            </div>
            
            <h1 className="mb-8 whitespace-pre-line text-[2rem] font-black uppercase leading-[1.05] tracking-tight text-gray-900 transition-colors duration-300 dark:text-white dark:drop-shadow-none min-[360px]:text-4xl sm:text-5xl md:text-6xl lg:text-8xl">
              {t.hero.title}
            </h1>
            
            <p className="mx-auto mb-10 max-w-2xl text-lg font-light leading-relaxed text-gray-500 transition-colors dark:text-gray-400 sm:text-xl">
              {t.hero.subtitle}
            </p>
            
            <div className="mx-auto flex w-full max-w-xs flex-col items-center justify-center gap-4 sm:max-w-none sm:flex-row">
              <Button size="xl" className="w-full sm:w-auto" onClick={() => openBooking()}>
                {t.hero.bookBtn}
              </Button>
              <Button size="xl" variant="outline" className="w-full sm:w-auto" onClick={(e) => handleScroll(e, '#services')}>
                {t.hero.programsBtn}
              </Button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* --- Infinite Marquee Social Proof --- */}
      <section className="py-12 border-y border-gray-200 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-950 overflow-hidden transition-colors">
        <div className="max-w-7xl mx-auto">
             <LogoMarquee />
        </div>
      </section>

      {/* --- Process Section --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto bg-gray-50 dark:bg-gray-950 transition-colors duration-300 relative">
          <Reveal>
            <div className="text-center mb-16 relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-tight">{t.process.title}</h2>
                <p className="text-xl text-gray-500 dark:text-gray-400">{t.process.subtitle}</p>
            </div>
          </Reveal>

          <div className="relative grid md:grid-cols-3 gap-8">
              {/* Desktop Connecting Line */}
              <div className="absolute top-1/2 left-0 w-full h-1 hidden md:block -z-0">
                  <svg className="w-full h-20 -translate-y-10" preserveAspectRatio="none">
                      <path d="M 100,40 Q 300,80 500,40 T 900,40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10,10" className="text-gray-200 dark:text-gray-800 opacity-50" />
                  </svg>
              </div>

              {t.process.steps.map((step, index) => {
                  const IconComponent = PROCESS_ICONS[index];
                  const isActive = activeProcessStep === index;
                  const nextIndex = (index + 1) % 3;

                  return (
                      <Reveal key={index} delay={index * 0.1}>
                        <TiltCard>
                            <div 
                                className={`group relative w-full min-h-[340px] overflow-hidden rounded-[2.5rem] border bg-white transition-all duration-500 ease-out dark:bg-gray-900 md:h-[340px]
                                    ${isActive 
                                        ? 'border-brand/50 dark:border-brand/50 shadow-[0_12px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_24px_rgba(204,255,0,0.1)]' 
                                        : 'border-gray-200 dark:border-gray-800 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)]'
                                    }
                                `}
                                onMouseEnter={() => setActiveProcessStep(index)}
                                onMouseLeave={() => setActiveProcessStep(null)}
                            >
                                {/* Big Background Number */}
                                <div className={`absolute top-2 right-6 text-[8rem] font-black leading-none transition-colors duration-500 select-none z-0
                                    ${isActive ? 'text-brand/40 dark:text-brand/20' : 'text-gray-100 dark:text-gray-800'}
                                `}>
                                    {index + 1}
                                </div>

                                {/* Default Content: Icon & Title */}
                                <div className={`absolute inset-0 z-10 hidden flex-col items-center justify-center p-8 transition-all duration-500 ease-out md:flex
                                    ${isActive ? 'md:opacity-0 md:scale-90 md:-translate-y-4' : 'md:opacity-100 md:scale-100 md:translate-y-0'}
                                `}>
                                    {/* Icon Container with 4 Dots */}
                                    <div className={`relative flex items-center justify-center w-28 h-28 rounded-[1.5rem] mb-8 shadow-[inset_0_1px_4px_rgba(0,0,0,0.02)] transition-colors
                                        ${isActive 
                                            ? 'bg-brand/10 border border-brand/20' 
                                            : 'bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700'
                                        }
                                    `}>
                                        <div className="absolute top-3 left-3 w-1.5 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full" />
                                        <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full" />
                                        <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full" />
                                        <div className="absolute bottom-3 right-3 w-1.5 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full" />
                                        
                                        <IconComponent size={36} className={`transition-colors stroke-[1.5] ${isActive ? 'text-black dark:text-brand' : 'text-gray-800 dark:text-white'} `} />
                                    </div>
                                    
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center">{step.title}</h3>
                                </div>

                                {/* Hover Content: Description & Arrow */}
                                <div className={`relative z-20 flex min-h-[340px] flex-col items-center justify-center bg-white p-8 text-center transition-all duration-300 ease-out dark:bg-gray-900 md:absolute md:inset-0 md:min-h-0
                                    ${isActive ? 'md:opacity-100 md:translate-y-0 md:scale-100' : 'md:pointer-events-none md:opacity-0 md:translate-y-8 md:scale-95'}
                                `}>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 uppercase">{step.title}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8 line-clamp-5">
                                        {step.desc}
                                    </p>
                                    <div className="mt-auto">
                                      <button
                                          onClick={(e) => {
                                              e.stopPropagation();
                                              setActiveProcessStep(nextIndex);
                                          }}
                                          className="w-14 h-14 bg-brand text-black rounded-2xl flex items-center justify-center shadow-lg transform transition-transform hover:scale-110 active:scale-95"
                                      >
                                          <ArrowRight size={24} />
                                      </button>
                                    </div>
                                </div>
                            </div>
                        </TiltCard>
                      </Reveal>
                  );
              })}
          </div>
      </section>

      {/* --- About Section (CINEMATIC UPDATE) --- */}
      <section id="about" className="py-24 md:py-32 px-6 max-w-7xl mx-auto transition-colors duration-300">
        <Reveal>
          <div className="bg-white dark:bg-gray-900 rounded-[3rem] border border-gray-200 dark:border-gray-800 shadow-xl p-8 md:p-12 overflow-hidden relative">
            
            {/* Background Decoration Text */}
            <div className="absolute top-0 right-0 -mr-20 -mt-10 select-none pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
                <span className="text-[12rem] md:text-[20rem] font-strong text-black dark:text-white leading-none">{t.about.backgroundWord}</span>
            </div>

            <div className="flex flex-col md:flex-row gap-16 items-center relative z-10">
              {/* Left Side: Coach Photo Stack */}
              <div className="w-full md:w-1/2 relative pb-16 md:pb-12">
                <CoachPhotoStack
                  photos={COACH_PHOTOS}
                  name="Mustafa Seyhan"
                  badgeLabel={t.ui.coachBadge}
                />
              </div>
              
              {/* Right Side: Text Content */}
              <div className="w-full md:w-1/2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-bold uppercase tracking-wider mb-6 text-gray-600 dark:text-gray-400">
                      <Star size={12} className="text-brand fill-brand" />
                      {t.ui.coachBadge}
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8 whitespace-pre-line uppercase tracking-tight leading-[0.95]">
                      {t.about.title}
                  </h2>
                  
                  <div className="space-y-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                    <p>{t.about.p1}</p>
                    <p>{t.about.p2}</p>
                    <p>{t.about.p3}</p>
                  </div>

                  {/* Glassmorphism Stats Card */}
                  <div className="mt-10 p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-sm flex items-center justify-between gap-4">
                      <div className="flex -space-x-4">
                        {CLIENT_AVATARS.map((src, i) => (
                            <LazyImage
                              key={i}
                              className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-900 object-cover bg-gray-200 dark:bg-gray-800"
                              src={src}
                              alt={`${t.ui.clientAlt} ${i + 1}`}
                              loading="lazy"
                              decoding="async"
                            />
                        ))}
                        <div className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-900 bg-gray-900 dark:bg-white text-white dark:text-black flex items-center justify-center text-xs font-bold">
                            +1k
                        </div>
                      </div>
                      <div className="text-right">
                          <span className="block font-black text-3xl text-gray-900 dark:text-white leading-none">
                              <CountUp end={1000} suffix="+" />
                          </span>
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t.about.stats}</span>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* --- Services Section --- */}
      <section id="services" className="py-24 bg-gray-50 dark:bg-gray-950 px-6 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-tight">{t.services.title}</h2>
               <p className="text-xl text-gray-600 dark:text-gray-400">{t.services.subtitle}</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
             {services.map((service, idx) => (
                <Reveal key={service.id} delay={idx * 0.1} className="h-full">
                  {/* WRAPPED IN TILT CARD */}
                  <TiltCard className="h-full">
                      <ServiceCard 
                          service={service} 
                          onClick={() => openBooking(service.title)} 
                      />
                  </TiltCard>
                </Reveal>
             ))}
          </div>

          {/* Calorie Calculator Section */}
          <Reveal>
            <div className="max-w-5xl mx-auto">
               <CalorieCalculator lang={lang} onBookClick={() => openBooking(t.ui.nutritionPlanTitle)} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- Before/After Stories (UPDATED: Modern Grid with Glow Effect & Fix for corner glitch) --- */}
      <section id="testimonials" className="py-24 bg-gray-50 dark:bg-gray-950 transition-colors">
         <div className="max-w-7xl mx-auto px-6">
            <Reveal>
               <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                   <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-tight">{t.testimonials.title}</h2>
                      <p className="text-xl text-gray-500 dark:text-gray-400 max-w-xl">{t.testimonials.subtitle}</p>
                   </div>
               </div>
            </Reveal>

            {renderTestimonialGrid(testimonials)}

         </div>
      </section>

      {/* --- FAQ Section --- */}
      <section id="faq" className="py-24 px-6 max-w-5xl mx-auto transition-colors duration-300">
          <Reveal>
              <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-tight">{t.faq.title}</h2>
                  <p className="text-xl text-gray-500 dark:text-gray-400">{t.faq.subtitle}</p>
              </div>
              
              <div className="space-y-6">
                  {t.faq.items.map((item, index) => (
                      <Reveal key={index} delay={index * 0.05}>
                        <div
                            className={`group border rounded-[2rem] bg-white dark:bg-gray-900 overflow-hidden transition-all duration-300 cursor-pointer
                                ${openFaqIndex === index 
                                    ? 'border-brand/50 dark:border-brand/50 shadow-[0_12px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_24px_rgba(204,255,0,0.1)]' 
                                    : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-brand/30 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)]'
                                }
                            `}
                        >
                            <button
                                type="button"
                                onClick={() => toggleFaq(index)}
                                aria-expanded={openFaqIndex === index}
                                className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
                            >
                                <div className="flex items-center gap-6">
                                    {/* Tech Plate Icon Container for FAQ */}
                                    <div className={`hidden md:flex relative items-center justify-center w-16 h-16 rounded-2xl transition-colors border shadow-[inset_0_1px_4px_rgba(0,0,0,0.02)] flex-shrink-0
                                        ${openFaqIndex === index 
                                            ? 'bg-brand/10 border-brand/20 text-black dark:text-brand' 
                                            : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-400 dark:text-gray-500'
                                        }
                                    `}>
                                        <div className="absolute top-2 left-2 w-1 h-1 bg-gray-200 dark:bg-gray-600 rounded-full" />
                                        <div className="absolute top-2 right-2 w-1 h-1 bg-gray-200 dark:bg-gray-600 rounded-full" />
                                        <div className="absolute bottom-2 left-2 w-1 h-1 bg-gray-200 dark:bg-gray-600 rounded-full" />
                                        <div className="absolute bottom-2 right-2 w-1 h-1 bg-gray-200 dark:bg-gray-600 rounded-full" />
                                        <HelpCircle size={24} strokeWidth={1.5} />
                                    </div>

                                    <span className={`font-bold text-lg md:text-xl pr-8 transition-colors ${openFaqIndex === index ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-200 group-hover:text-brand-hover dark:group-hover:text-brand'}`}>
                                        {item.q}
                                    </span>
                                </div>
                                
                                <span className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-300 
                                    ${openFaqIndex === index 
                                        ? 'bg-brand text-black border-brand rotate-180' 
                                        : 'bg-transparent border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 group-hover:border-gray-400 dark:group-hover:border-gray-500'
                                    }
                                `}>
                                    <ChevronDown size={20} />
                                </span>
                            </button>
                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaqIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="p-6 md:p-8 pt-0 pl-6 md:pl-[6.5rem] text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                                    {item.a}
                                </div>
                            </div>
                        </div>
                      </Reveal>
                  ))}
              </div>
          </Reveal>
      </section>

      {/* --- NEW NEWSLETTER SECTION (Moved Up in Code but rendered here) --- */}
      <NewsletterSection lang={lang} />

      {/* --- CTA / Footer --- */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white pt-24 pb-12 px-6 border-t border-transparent dark:border-gray-900 rounded-t-[3rem] dark:rounded-none mt-12 relative overflow-hidden transition-all duration-300">
          {/* Footer Glow */}
          <div className="absolute top-0 left-1/2 hidden w-full h-full max-w-7xl -translate-x-1/2 pointer-events-none opacity-20 dark:opacity-10 md:block">
             <div className="absolute top-20 right-10 w-64 h-64 bg-brand rounded-full blur-[100px]"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
              <Reveal>
                <div className="flex flex-col md:flex-row justify-between items-center md:items-center mb-20 gap-10 text-center md:text-left">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold dark:font-black mb-6 uppercase tracking-tight dark:italic">{t.footer.title}</h2>
                        <p className="text-gray-400 text-lg max-w-md mx-auto md:mx-0">{t.footer.subtitle}</p>
                    </div>
                    <Button size="xl" className="bg-brand text-black hover:bg-white cursor-pointer shadow-lg shadow-brand/20 w-full md:w-auto" onClick={() => openBooking()}>
                        {t.footer.bookBtn}
                    </Button>
                </div>
              </Reveal>

              <hr className="border-gray-800 mb-12" />

              <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-gray-500">
                  <div className="flex items-center gap-2 text-white font-bold text-lg">
                    <div className="w-6 h-6 bg-white rounded flex items-center justify-center text-gray-900 text-xs font-serif italic">M</div>
                    Mustafa Seyhan.
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 md:gap-8">
                      {t.footer.links.map((link, i) => (
                          <a 
                            key={i} 
                            href={link.href} 
                            onClick={(e) => handleScroll(e, link.href)}
                            className="hover:text-brand transition-colors cursor-pointer"
                          >
                            {link.label}
                          </a>
                      ))}
                  </div>

                  <div className="flex gap-4">
                      {SOCIAL_LINKS.map((link) => {
                        const isExternal = !link.href.startsWith('mailto:');
                        return (
                          <a
                            key={link.key}
                            href={link.href}
                            aria-label={t.ui.social[link.key]}
                            target={isExternal ? '_blank' : undefined}
                            rel={isExternal ? 'noreferrer' : undefined}
                            className="hover:text-brand transition-colors cursor-pointer"
                          >
                            {link.icon}
                          </a>
                        );
                      })}
                  </div>
              </div>
              <div className="text-center mt-12 text-xs text-gray-700 dark:text-gray-800">
                  © {new Date().getFullYear()} {t.footer.rights}
              </div>
          </div>
      </footer>

      {/* --- Modals --- */}
      <BookingModal 
        isOpen={bookingModalOpen} 
        onClose={() => setBookingModalOpen(false)} 
        serviceTitle={selectedServiceTitle}
        lang={lang}
      />

      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        closeLabel={t.ui.videoCloseLabel}
      />

      <AdminPanel
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        testimonials={customTestimonials}
        onChange={setCustomTestimonials}
        lang={lang}
      />
    </div>
  );
};

export default App;
