import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { Instagram, Linkedin, Youtube, Phone } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CREAM, INK, SAGE, SAGE_DARK } from '../theme';
import footerImage from '../images/Landing-1.jpeg';

gsap.registerPlugin(ScrollTrigger);

export function SiteFooter() {
  const footerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  // Ensure ScrollTrigger gets refreshed when navigating between pages
  useEffect(() => {
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  useEffect(() => {
    const footer = footerRef.current;
    const content = contentRef.current;
    const image = imageRef.current;

    if (!footer || !content || !image) return;

    const isMobile = window.innerWidth < 768;
    const yParallax = isMobile ? 10 : 20; // Increased for a highly dynamic effect

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(content, { opacity: 0, y: 30 });
      gsap.set(image, { transformOrigin: 'center center' });

      // Smooth parallax: classic translateY + gentle scale
      gsap.fromTo(image, 
        { yPercent: -yParallax, scale: 1.0 },
        {
          yPercent: yParallax,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: footer,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2, // Adds buttery smooth lag for premium cinematic feel
          }
        }
      );

      // Fade in content as footer enters view
      gsap.to(content, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 85%',
        }
      });
    }, footer);

    // Handle image loads to refresh ScrollTrigger dynamically
    const handleImageLoad = () => ScrollTrigger.refresh();
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      img.addEventListener('load', handleImageLoad);
    });

    // CRITICAL: Refresh ScrollTrigger when page height changes
    const observer = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    observer.observe(document.body);

    return () => {
      ctx.revert();
      observer.disconnect();
      images.forEach((img) => {
        img.removeEventListener('load', handleImageLoad);
      });
    };
  }, []);

  return (
    <footer ref={footerRef} data-tone="light" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0f0c0a]" />
      {/* Oversized Image Container for Strong Parallax */}
      <div
        ref={imageRef}
        className="absolute left-0 right-0 w-full"
        style={{
          top: '-35%',
          bottom: '-35%',
          backgroundImage: `url(${footerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          willChange: 'transform',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(10, 8, 7, 0.18) 0%, rgba(18, 14, 12, 0.46) 42%, rgba(18, 14, 12, 0.92) 100%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-70 mix-blend-soft-light"
        style={{
          background:
            'radial-gradient(circle at 20% 18%, rgba(139,149,121,0.16), transparent 34%), radial-gradient(circle at 82% 78%, rgba(212,175,55,0.12), transparent 30%)',
        }}
      />

      <div ref={contentRef} className="relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-14 pt-24 pb-10 lg:pt-28 lg:pb-12">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr] items-start">
            <div className="max-w-[26rem]">
              <div className="font-serif tracking-[0.26em] uppercase mb-5" style={{ fontSize: '13px', color: CREAM }}>
                Ryvive <span style={{ color: SAGE }}>Roots</span>
              </div>
              <p className="max-w-[22rem]" style={{ color: 'rgba(244,239,230,0.78)', fontSize: '14px', lineHeight: 1.9 }}>
                Conscious dining, crafted with calm precision and warm hospitality.
              </p>
            </div>

            <div>
              <div className="tracking-[0.34em] uppercase mb-5" style={{ fontSize: '10px', color: SAGE }}>
                Explore
              </div>
              <ul className="space-y-3">
                {['Menu', 'Subscription', 'Story', 'Reservations'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="transition-colors"
                      style={{ color: 'rgba(244,239,230,0.78)', fontSize: '13px', letterSpacing: '0.04em' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = CREAM)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(244,239,230,0.78)')}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="tracking-[0.34em] uppercase mb-5" style={{ fontSize: '10px', color: SAGE }}>
                Contact
              </div>
              <ul className="space-y-3" style={{ color: 'rgba(244,239,230,0.78)', fontSize: '13px' }}>
                <li>+91 97656 00701</li>
                <li>hello@ryviveroots.com</li>
                <li>Dombivli, Mumbai</li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between" style={{ borderTop: '1px solid rgba(244,239,230,0.16)' }}>
            <div style={{ color: 'rgba(244,239,230,0.62)', fontSize: '10px', letterSpacing: '0.26em', textTransform: 'uppercase' }}>
              © 2026 Ryvive Roots — Mumbai
            </div>
            <div className="flex items-center gap-5">
              {[Instagram, Linkedin, Youtube, Phone].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="transition-colors"
                  style={{ color: 'rgba(244,239,230,0.68)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = CREAM)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(244,239,230,0.68)')}
                >
                  <Icon className="w-4 h-4" strokeWidth={1.3} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="relative z-10 h-12 lg:h-16"
        style={{
          background:
            'linear-gradient(180deg, rgba(15,12,10,0) 0%, rgba(15,12,10,0.44) 100%)',
        }}
      />
    </footer>
  );
}
