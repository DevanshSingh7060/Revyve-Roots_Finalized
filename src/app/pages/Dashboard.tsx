import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { LayoutDashboard, Calendar, Package, MapPin, User, LogOut, Leaf, TrendingUp, Wallet, Clock } from 'lucide-react';
import { CREAM, CREAM_2, DARK, INK, SAGE, SAGE_DARK } from '../theme';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', key: 'overview' },
  { icon: Calendar, label: 'My Subscriptions', key: 'subs' },
  { icon: Package, label: 'Orders History', key: 'orders' },
  { icon: MapPin, label: 'Addresses', key: 'addresses' },
  { icon: User, label: 'Profile Settings', key: 'profile' },
];

const metrics = [
  { icon: Leaf, label: 'Active Plan', value: 'Balance', sub: 'Renews 28 May' },
  { icon: TrendingUp, label: 'Meals Delivered', value: '42', sub: 'This quarter' },
  { icon: Clock, label: 'Next Delivery', value: 'Tomorrow', sub: '8:00 – 9:00 AM' },
  { icon: Wallet, label: 'Total Saved', value: '₹6,480', sub: 'vs à la carte' },
];

const upcoming = [
  { date: 'Wed, 13 May', meal: 'Heirloom Grain Bowl', slot: '8:00 – 9:00 AM' },
  { date: 'Thu, 14 May', meal: 'Saffron Almond Milk + Sourdough Avocado', slot: '8:00 – 9:00 AM' },
  { date: 'Fri, 15 May', meal: 'Forest Açaí + Beetroot Tikki', slot: '8:00 – 9:00 AM' },
];

const orders = [
  { id: 'RR-2298', date: '10 May 2026', items: 'Balance — Week 6', total: '₹3,124', status: 'Delivered' },
  { id: 'RR-2271', date: '03 May 2026', items: 'Balance — Week 5', total: '₹3,124', status: 'Delivered' },
  { id: 'RR-2243', date: '26 Apr 2026', items: 'Balance — Week 4', total: '₹3,124', status: 'Delivered' },
];

function ProgressRing({ value, max }: { value: number; max: number }) {
  const r = 38;
  const c = 2 * Math.PI * r;
  const pct = value / max;
  return (
    <div className="relative" style={{ width: '96px', height: '96px' }}>
      <svg width="96" height="96" viewBox="0 0 96 96">
        <circle cx="48" cy="48" r={r} stroke="rgba(244,239,230,0.15)" strokeWidth="2" fill="none" />
        <circle
          cx="48" cy="48" r={r}
          stroke={SAGE} strokeWidth="2" fill="none"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
          strokeLinecap="round"
          transform="rotate(-90 48 48)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-serif" style={{ fontSize: '24px', color: CREAM, fontWeight: 300, lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: '9px', letterSpacing: '0.28em', color: 'rgba(244,239,230,0.55)', textTransform: 'uppercase', marginTop: '3px' }}>left</div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [active, setActive] = useState('overview');

  return (
    <div className="min-h-screen" style={{ background: CREAM_2 }}>
      <div className="flex pt-[72px] min-h-screen">
        {/* SIDEBAR */}
        <aside className="hidden lg:block w-[260px] sticky top-[72px] self-start" style={{ background: CREAM, borderRight: `1px solid rgba(42,37,32,0.1)`, height: 'calc(100vh - 72px)' }}>
          <div className="p-8">
            <div className="tracking-[0.42em] uppercase mb-3" style={{ fontSize: '10px', color: SAGE_DARK }}>— Member</div>
            <div className="font-serif mb-1" style={{ fontSize: '20px', color: INK, fontWeight: 400 }}>Ananya R.</div>
            <div style={{ fontSize: '12px', color: 'rgba(42,37,32,0.6)' }}>ananya@ryvive.in</div>
          </div>

          <nav className="px-4 space-y-1">
            {navItems.map((n) => {
              const Icon = n.icon;
              const isActive = active === n.key;
              return (
                <button key={n.key} onClick={() => setActive(n.key)}
                  className="w-full flex items-center gap-4 px-5 py-3.5 transition-all duration-200 text-left"
                  style={{
                    background: isActive ? INK : 'transparent',
                    color: isActive ? CREAM : INK,
                    fontSize: '12px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    borderRadius: '1px',
                  }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = CREAM_2; }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                >
                  <Icon size={16} strokeWidth={1.4} />
                  {n.label}
                </button>
              );
            })}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-6" style={{ borderTop: `1px solid rgba(42,37,32,0.08)` }}>
            <Link to="/login" className="w-full flex items-center gap-3 px-5 py-3"
              style={{ fontSize: '11px', color: 'rgba(42,37,32,0.65)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              <LogOut size={14} strokeWidth={1.4} /> Sign Out
            </Link>
          </div>
        </aside>

        {/* MAIN */}
        <main className="flex-1 px-6 lg:px-14 py-12 lg:py-16">
          <div className="max-w-[1200px] mx-auto">
            {/* WELCOME */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
              className="mb-12 p-8 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
              style={{ background: DARK, borderRadius: '2px' }}
            >
              <div>
                <div className="tracking-[0.42em] uppercase mb-5" style={{ fontSize: '10px', color: SAGE }}>— Good Morning</div>
                <h1 className="font-serif mb-3" style={{ fontSize: 'clamp(30px, 3.6vw, 44px)', color: CREAM, fontWeight: 300, lineHeight: 1.1 }}>
                  Welcome back, <em style={{ fontStyle: 'italic', color: SAGE }}>Ananya.</em>
                </h1>
                <p style={{ fontSize: '13px', color: 'rgba(244,239,230,0.6)', lineHeight: 1.8, maxWidth: '440px' }}>
                  Balance Plan • 18 meals remaining in your current cycle.
                </p>
              </div>
              <ProgressRing value={18} max={30} />
            </motion.div>

            {/* METRICS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
              {metrics.map((m, i) => {
                const Icon = m.icon;
                return (
                  <motion.div key={m.label}
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.6 }}
                    className="p-6 lg:p-7 transition-all duration-300"
                    style={{ background: CREAM, border: `1px solid rgba(42,37,32,0.08)` }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(42,37,32,0.06)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <Icon size={20} strokeWidth={1.3} color={SAGE_DARK} />
                    <div className="tracking-[0.28em] uppercase mt-5 mb-2" style={{ fontSize: '10px', color: 'rgba(42,37,32,0.55)' }}>{m.label}</div>
                    <div className="font-serif" style={{ fontSize: '26px', color: INK, fontWeight: 400, lineHeight: 1.1 }}>{m.value}</div>
                    <div className="mt-1.5" style={{ fontSize: '11px', color: 'rgba(42,37,32,0.55)' }}>{m.sub}</div>
                  </motion.div>
                );
              })}
            </div>

            <div className="grid lg:grid-cols-3 gap-5 mb-12">
              {/* CURRENT SUB */}
              <div className="lg:col-span-1 p-8" style={{ background: CREAM, border: `1px solid rgba(42,37,32,0.08)` }}>
                <div className="tracking-[0.32em] uppercase mb-5" style={{ fontSize: '10px', color: SAGE_DARK }}>— Current Subscription</div>
                <h3 className="font-serif mb-2" style={{ fontSize: '28px', color: INK, fontWeight: 300 }}>
                  Balance <em style={{ fontStyle: 'italic' }}>Plan</em>
                </h3>
                <p style={{ fontSize: '12px', color: 'rgba(42,37,32,0.6)', lineHeight: 1.7 }}>30 meals per month, weekday delivery.</p>

                <div className="mt-6 space-y-3" style={{ fontSize: '12px', color: 'rgba(42,37,32,0.7)' }}>
                  <div className="flex justify-between"><span>Started</span><span style={{ color: INK }}>15 Mar 2026</span></div>
                  <div className="flex justify-between"><span>Renews</span><span style={{ color: INK }}>28 May 2026</span></div>
                  <div className="flex justify-between"><span>Billing</span><span style={{ color: INK }}>₹12,499 / mo</span></div>
                </div>

                <button className="mt-7 w-full px-6 py-3 tracking-[0.22em] uppercase transition-all duration-300"
                  style={{ fontSize: '11px', border: `1px solid ${INK}`, color: INK, background: 'transparent', borderRadius: '1px' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = INK; e.currentTarget.style.color = CREAM; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = INK; }}>
                  Manage Plan
                </button>
              </div>

              {/* UPCOMING */}
              <div className="lg:col-span-2 p-8" style={{ background: CREAM, border: `1px solid rgba(42,37,32,0.08)` }}>
                <div className="flex items-baseline justify-between mb-6">
                  <div className="tracking-[0.32em] uppercase" style={{ fontSize: '10px', color: SAGE_DARK }}>— Upcoming Deliveries</div>
                  <a href="#" style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: SAGE_DARK, borderBottom: `1px solid ${SAGE_DARK}` }}>View Calendar</a>
                </div>

                <ul className="space-y-5">
                  {upcoming.map((u) => (
                    <li key={u.date} className="flex items-center justify-between gap-4 pb-5"
                      style={{ borderBottom: `1px solid rgba(42,37,32,0.1)` }}>
                      <div className="flex items-center gap-5">
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: CREAM_2, display: 'grid', placeItems: 'center', color: SAGE_DARK }}>
                          <Calendar size={16} strokeWidth={1.4} />
                        </div>
                        <div>
                          <div className="font-serif" style={{ fontSize: '15px', color: INK, fontWeight: 400 }}>{u.meal}</div>
                          <div className="mt-1" style={{ fontSize: '11px', color: 'rgba(42,37,32,0.6)', letterSpacing: '0.08em' }}>
                            {u.date} • {u.slot}
                          </div>
                        </div>
                      </div>
                      <a href="#" style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: SAGE_DARK }}>Skip</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ORDERS */}
            <div className="p-8" style={{ background: CREAM, border: `1px solid rgba(42,37,32,0.08)` }}>
              <div className="flex items-baseline justify-between mb-7">
                <div className="tracking-[0.32em] uppercase" style={{ fontSize: '10px', color: SAGE_DARK }}>— Recent Orders</div>
                <a href="#" style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: SAGE_DARK, borderBottom: `1px solid ${SAGE_DARK}` }}>View All</a>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full" style={{ fontSize: '13px' }}>
                  <thead>
                    <tr style={{ color: 'rgba(42,37,32,0.55)', fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase' }}>
                      <th className="text-left py-3" style={{ fontWeight: 400 }}>Order</th>
                      <th className="text-left py-3" style={{ fontWeight: 400 }}>Date</th>
                      <th className="text-left py-3" style={{ fontWeight: 400 }}>Items</th>
                      <th className="text-left py-3" style={{ fontWeight: 400 }}>Total</th>
                      <th className="text-left py-3" style={{ fontWeight: 400 }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id} style={{ borderTop: `1px solid rgba(42,37,32,0.08)`, color: INK }}>
                        <td className="py-5 font-serif" style={{ fontWeight: 400 }}>{o.id}</td>
                        <td className="py-5" style={{ color: 'rgba(42,37,32,0.7)' }}>{o.date}</td>
                        <td className="py-5" style={{ color: 'rgba(42,37,32,0.7)' }}>{o.items}</td>
                        <td className="py-5">{o.total}</td>
                        <td className="py-5">
                          <span className="inline-flex items-center gap-2 px-3 py-1"
                            style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: SAGE_DARK, border: `1px solid ${SAGE_DARK}`, borderRadius: '1px' }}>
                            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: SAGE_DARK, display: 'inline-block' }} />
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
