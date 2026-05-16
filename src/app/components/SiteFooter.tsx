import { useEffect, useRef } from 'react';
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

  useEffect(() => {
    const footer = footerRef.current;
    const content = contentRef.current;
    const image = imageRef.current;

    if (!footer || !content || !image) return;

    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const parallaxDistance = isMobile ? 52 : 180;
    const initialLift = isMobile ? -18 : -64;
    const depthScale = isMobile ? 1.06 : 1.08;

    const ctx = gsap.context(() => {
      gsap.set(content, { opacity: 0, y: 28 });
      gsap.set(image, {
        scale: 1.04,
        y: initialLift,
        transformOrigin: 'center center',
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%',
          end: 'bottom top',
          scrub: isMobile ? 1.35 : 1.05,
          anticipatePin: 1,
        },
      });

      tl.to(image, {
        y: parallaxDistance,
        scale: depthScale,
        ease: 'none',
      }, 0);

      tl.to(image, {
        y: parallaxDistance * 1.08,
        scale: isMobile ? 1.065 : 1.09,
        ease: 'none',
      }, 0.52);

      tl.to(content, {
        opacity: 1,
        y: 0,
        duration: 0.72,
        ease: 'power2.out',
      }, 0.12);
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} data-tone="light" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0f0c0a]" />
      <div
        ref={imageRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${footerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          transform: 'translate3d(0, 0, 0)',
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
