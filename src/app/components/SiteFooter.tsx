import { Instagram, Linkedin, Youtube, Phone } from 'lucide-react';
import { CREAM, INK, SAGE_DARK } from '../theme';

export function SiteFooter() {
  return (
    <footer
  data-tone="light"
  className="relative overflow-hidden pt-36 pb-16"
  style={{
    background: CREAM,
  }}
>
      <div className="max-w-[1400px] mx-auto px-8 lg:px-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2 md:col-span-1">
            <div className="font-serif tracking-[0.22em] uppercase mb-6" style={{ fontSize: '14px', color: INK }}>
              Ryvive <span style={{ color: SAGE_DARK }}>Roots</span>
            </div>
            <p style={{ fontSize: '12px', color: 'rgba(42,37,32,0.6)', fontStyle: 'italic' }}>Live · Relive · Believe</p>
          </div>

          {[
            { title: 'Visit', items: ['Menu', 'Subscription', 'Locations', 'Reservations'] },
            { title: 'About', items: ['Our Story', 'Journal', 'Press', 'Careers'] },
            { title: 'Contact', items: ['+91 97656 00701', 'hello@ryviveroots.com', 'Dombivli, Mumbai'] },
          ].map((col) => (
            <div key={col.title}>
              <div className="tracking-[0.32em] uppercase mb-6" style={{ fontSize: '10px', color: SAGE_DARK }}>{col.title}</div>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="transition-colors" style={{ fontSize: '13px', color: 'rgba(42,37,32,0.65)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = INK)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(42,37,32,0.65)')}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6" style={{ borderTop: '1px solid rgba(42,37,32,0.15)' }}>
          <div className="tracking-[0.22em] uppercase" style={{ fontSize: '10px', color: 'rgba(42,37,32,0.55)' }}>
            © 2026 Ryvive Roots — Mumbai
          </div>
          <div className="flex items-center gap-5">
            {[Instagram, Linkedin, Youtube, Phone].map((Icon, i) => (
              <a key={i} href="#" className="transition-colors" style={{ color: 'rgba(42,37,32,0.55)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = SAGE_DARK)}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(42,37,32,0.55)')}>
                <Icon className="w-4 h-4" strokeWidth={1.2} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
