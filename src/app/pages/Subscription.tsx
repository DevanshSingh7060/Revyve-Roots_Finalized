import { useState, type CSSProperties } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ArrowRight, ArrowLeft, CreditCard } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import SubscriptionHeader from "../images/Subscription-1.JPG";
import { CREAM, CREAM_2, DARK, DARK_2, INK, SAGE, SAGE_DARK } from '../theme';

type Plan = {
  key: string;
  name: string;
  tagline: string;
  meals: string;
  price: number;
  features: string[];
  popular?: boolean;
};

const plans: Plan[] = [
  { key: 'essentials', name: 'Essentials', tagline: 'A gentle introduction.', meals: '14 meals weekly', price: 8999,
    features: ['Two meals daily', 'Seasonal menu', 'Concierge support'] },
  { key: 'balance', name: 'Balance', tagline: 'Our most chosen plan.', meals: '21 meals weekly', price: 12499, popular: true,
    features: ['Three meals daily', 'Priority chef access', 'Cold-pressed elixirs', 'Personal nutritionist'] },
  { key: 'complete', name: 'Complete', tagline: 'A devoted ritual.', meals: '28 meals weekly', price: 15999,
    features: ['Four meals daily', 'Bespoke menu design', 'Private tastings', 'Wellness consultations'] },
];

const steps = [
  { n: 1, label: 'Plan Selection' },
  { n: 2, label: 'Your Information' },
  { n: 3, label: 'Card Selection' },
  { n: 4, label: 'Billing & Shipping' },
  { n: 5, label: 'Review' },
];

const cards = [
  { key: 'amex', label: 'Amex Platinum', last: '4821' },
  { key: 'visa', label: 'Visa Infinite', last: '9012' },
  { key: 'new', label: 'Add new card', last: '' },
];

const inputStyle: CSSProperties = {
  width: '100%', background: 'transparent', border: 'none',
  borderBottom: `1px solid rgba(42,37,32,0.25)`, padding: '14px 2px',
  fontSize: '15px', color: INK, outline: 'none', fontFamily: 'inherit',
};
const labelStyle: CSSProperties = {
  fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', color: SAGE_DARK, marginBottom: '4px',
};

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Subscription() {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState('balance');
  const [selectedCard, setSelectedCard] = useState('amex');
  const [info, setInfo] = useState({ name: '', email: '', phone: '' });
  const [bill, setBill] = useState({ address: '', city: '', pincode: '' });

  const current = plans.find((p) => p.key === selectedPlan)!;

  const next = () => setStep((s) => Math.min(5, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div style={{ background: CREAM }} className="min-h-screen">
      {/* HERO — DARK with overlay image */}
      
      <section className="relative min-h-[68vh] flex items-center overflow-hidden" style={{ background: DARK }}>
        <div className="absolute inset-0">
        <ImageWithFallback
  src={SubscriptionHeader}
  alt="Subscription Header"
  style={{
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  }}
/>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(20,17,15,0.55) 0%, rgba(20,17,15,0.55) 50%, rgba(20,17,15,0.96) 100%)' }} />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-14 w-full pt-32 lg:pt-40 pb-16 lg:pb-24 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease }}>
            <div className="tracking-[0.42em] uppercase mb-8" style={{ fontSize: '10px', color: SAGE }}>— Membership</div>
            <h1 className="font-serif mx-auto" style={{ fontSize: 'clamp(40px, 6.4vw, 86px)', lineHeight: 1.02, color: CREAM, fontWeight: 300, letterSpacing: '-0.015em', maxWidth: '900px' }}>
              A daily ritual,<br />
              <em style={{ fontStyle: 'italic', color: SAGE }}>delivered.</em>
            </h1>
            <p className="mx-auto mt-8" style={{ fontSize: '15px', lineHeight: 1.85, color: 'rgba(244,239,230,0.7)', maxWidth: '520px' }}>
              Choose the nourishment plan that fits your lifestyle.
            </p>
          </motion.div>
        </div>
      </section>
      

      {/* MAIN SPLIT */}
      <section data-tone="light" className="px-5 sm:px-8 lg:px-14 pt-10 lg:pt-16 pb-20 lg:pb-32">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[34%_1fr] gap-10 lg:gap-16">
          {/* LEFT — vertical step rail (mobile + desktop) */}
          <aside
  className="
    fixed top-[72px] left-0 right-0 z-50
    px-4 py-2
    lg:sticky lg:top-[100px] lg:px-0 lg:py-0
    lg:left-auto lg:right-auto
    self-start
  "
>
            <div
 className="px-3 py-2 lg:p-8"
  style={{
    background: 'rgba(244,239,230,0.94)',
    backdropFilter: 'blur(14px)',
    borderBottom: '1px solid rgba(42,37,32,0.08)',
    borderRadius: window.innerWidth >= 1024 ? '2px' : '18px',
  }}
>
              <div className="tracking-[0.42em] uppercase mb-8" style={{ fontSize: '10px', color: SAGE_DARK }}>— Your Journey</div>
              <ol className="flex items-center justify-between lg:block lg:space-y-7">
                {steps.map((s) => {
                  const isDone = step > s.n;
                  const isActive = step === s.n;
                  return (
                    <li
  key={s.n}
  className="
    flex flex-col items-center text-center
    lg:flex-row lg:text-left
    gap-1 lg:gap-5
    flex-1
  "
>
                      <motion.div
                        animate={{ scale: isActive ? 1.05 : 1 }}
                        transition={{ duration: 0.4 }}
                        className="flex-shrink-0 flex items-center justify-center font-serif"
                        style={{
                          width: window.innerWidth >= 1024 ? '40px' : '28px',
height: window.innerWidth >= 1024 ? '40px' : '28px', borderRadius: '50%',
                          border: `1px solid ${isDone || isActive ? INK : 'rgba(42,37,32,0.18)'}`,
                          background: isDone || isActive ? INK : 'transparent',
                          color: isDone || isActive ? CREAM : 'rgba(42,37,32,0.55)',
                          fontSize: window.innerWidth >= 1024 ? '14px' : '10px',
                        }}
                      >
                        {isDone ? <Check size={16} strokeWidth={1.5} /> : s.n}
                      </motion.div>
                      <div>
                        <div>
  <div
    className="hidden lg:block tracking-[0.22em] uppercase"
    style={{
      fontSize: '10px',
      color: isActive ? INK : 'rgba(42,37,32,0.45)',
    }}
  >
    Step {s.n}
  </div>

  <div
    className="hidden lg:block"
    style={{
      fontSize: '14px',
      color: isActive ? INK : 'rgba(42,37,32,0.55)',
      marginTop: '4px',
    }}
  >
    {s.label}
  </div>

  {isActive && (
    <motion.div
      layoutId="step-pulse"
      className="mt-1.5 hidden lg:block"
      style={{
        width: '24px',
        height: '1px',
        background: SAGE_DARK,
      }}
    />
  )}
</div>
</div>

                    </li>
                  );
                })}
              </ol>

              <div className="font-serif" style={{ fontSize: '24px', color: INK, fontWeight: 300 }}>{current.name}</div>
              <div style={{ fontSize: '12px', color: 'rgba(42,37,32,0.6)', marginTop: '4px' }}>
                ₹{current.price.toLocaleString('en-IN')} / month
              </div>
            </div>
          </aside>

          {/* RIGHT — main panel */}
          <main className="min-h-[460px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.55, ease }}
              >
                {step === 1 && <PlanStep selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />}
                {step === 2 && <InfoStep info={info} setInfo={setInfo} />}
                {step === 3 && <CardStep selectedCard={selectedCard} setSelectedCard={setSelectedCard} />}
                {step === 4 && <BillingStep bill={bill} setBill={setBill} />}
                {step === 5 && <ReviewStep plan={current} info={info} bill={bill} card={cards.find(c => c.key === selectedCard)!} />}
              </motion.div>
            </AnimatePresence>

            {/* NAV */}
            <div className="mt-12 lg:mt-16 flex items-center justify-between gap-4">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={back}
                disabled={step === 1}
                className="flex items-center gap-3 px-5 py-3.5 tracking-[0.22em] uppercase transition-all duration-300"
                style={{
                  fontSize: '11px', color: step === 1 ? 'rgba(42,37,32,0.3)' : INK,
                  border: `1px solid ${step === 1 ? 'rgba(42,37,32,0.15)' : 'rgba(42,37,32,0.4)'}`,
                  background: 'transparent', borderRadius: '1px',
                  cursor: step === 1 ? 'not-allowed' : 'pointer',
                }}
              >
                <ArrowLeft size={14} strokeWidth={1.4} /> Back
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.02 }}
                onClick={step === 5 ? () => alert('Membership confirmed') : next}
                className="flex items-center gap-3 px-7 sm:px-9 py-3.5 tracking-[0.22em] uppercase transition-all duration-300"
                style={{ fontSize: '11px', background: INK, color: CREAM, border: `1px solid ${INK}`, borderRadius: '1px' }}
              >
                {step === 5 ? 'Confirm Membership' : 'Continue'} <ArrowRight size={14} strokeWidth={1.4} />
              </motion.button>
            </div>
          </main>
        </div>
      </section>

      <section
  className="px-8 lg:px-14 py-28"
  style={{
    background: CREAM,
  }}
  data-tone="light"
>
  <div className="max-w-[1400px] mx-auto">
    <div className="text-center mb-20">
      <p
        className="uppercase tracking-[0.28em] mb-5"
        style={{
          color: SAGE_DARK,
          fontSize: '11px',
        }}
      >
        How It Works
      </p>

      <h2
        className="font-serif"
        style={{
          color: INK,
          fontSize: '72px',
          lineHeight: '0.95',
        }}
      >
        Simple steps to eat
        <br />
        better every day
      </h2>
    </div>

    <div className="grid lg:grid-cols-[320px_1fr] gap-16 pt-24 lg:pt-0">
      {[
        {
          number: '01',
          title: 'Choose Your Plan',
          desc: 'Select from Silver, Gold, or Platinum nourishment rituals curated for your lifestyle.',
        },
        {
          number: '02',
          title: 'Schedule Delivery',
          desc: 'Choose your preferred delivery cadence for effortless morning or evening nourishment.',
        },
        {
          number: '03',
          title: 'Receive Daily',
          desc: 'Freshly prepared wellness meals arrive daily with seamless concierge-style delivery.',
        },
      ].map((item, index) => (
        <div
          key={index}
          className="relative pt-10"
          style={{
            borderTop: `1px solid rgba(42,37,32,0.12)`,
          }}
        >
          <div
            className="mb-8 font-serif"
            style={{
              fontSize: '54px',
              color: 'rgba(42,37,32,0.12)',
              lineHeight: '1',
            }}
          >
            {item.number}
          </div>

          <h3
            className="font-serif mb-5"
            style={{
              color: INK,
              fontSize: '34px',
            }}
          >
            {item.title}
          </h3>

          <p
            style={{
              color: 'rgba(42,37,32,0.72)',
              fontSize: '17px',
              lineHeight: '1.9',
            }}
          >
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
      {/* CLOSING */}
      <section className="py-16 lg:py-24 text-center" style={{ background: DARK_2 }}>
        <div className="max-w-[680px] mx-auto px-6">
          <p style={{ fontSize: '13px', color: 'rgba(244,239,230,0.55)', lineHeight: 1.85, letterSpacing: '0.04em' }}>
            Pause or cancel any cycle. Memberships renew quietly each month — no contracts, only care.
          </p>
        </div>
      </section>
    </div>
  );
}

/* — Step 1 — */
function PlanStep({ selectedPlan, setSelectedPlan }: { selectedPlan: string; setSelectedPlan: (k: string) => void }) {
  return (
    <div>
      <h2 className="font-serif mb-3" style={{ fontSize: 'clamp(28px, 3.4vw, 40px)', color: INK, fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.01em' }}>
        Select your <em style={{ fontStyle: 'italic' }}>plan.</em>
      </h2>
      <p className="mb-10" style={{ fontSize: '14px', color: 'rgba(42,37,32,0.65)', lineHeight: 1.8 }}>
        Choose the nourishment plan that fits your lifestyle.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 pt-6">
        {plans.map((p, i) => {
          const isSel = selectedPlan === p.key;
          return (
            <motion.button
              key={p.key}
              type="button"
              onClick={() => setSelectedPlan(p.key)}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: isSel ? -8 : 0,
                scale: isSel ? 1.03 : 1,
              }}
              transition={{ delay: i * 0.08, duration: 0.55, ease }}
              whileTap={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(42,37,32,0.15)' }}
              whileHover={!isSel ? { y: -4, scale: 1.02 } : undefined}
              className="relative p-8 lg:p-10 text-left flex flex-col min-h-[440px]"
              style={{
                background: isSel ? INK : CREAM_2,
                color: isSel ? CREAM : INK,
                border: `1.5px solid ${isSel ? SAGE : (p.popular ? SAGE_DARK : 'rgba(42,37,32,0.1)')}`,
                borderRadius: '3px',
                boxShadow: isSel
                  ? '0 30px 60px -20px rgba(42,37,32,0.3), 0 0 0 4px rgba(139,149,121,0.15)'
                  : '0 4px 20px -8px rgba(42,37,32,0.06)',
                transformOrigin: 'center bottom',
              }}
            >
              {p.popular && (
                <div className="absolute -top-3.5 left-8 px-4 py-1.5 tracking-[0.3em] uppercase z-10"
                  style={{ fontSize: '9px', background: SAGE, color: DARK_2, borderRadius: '2px', fontWeight: 500 }}>
                  Most Popular
                </div>
              )}
              <div className="tracking-[0.35em] uppercase mb-5" style={{ fontSize: '10px', color: isSel ? SAGE : SAGE_DARK }}>
                Plan
              </div>
              <div className="font-serif mb-2" style={{ fontSize: '32px', fontWeight: 300, lineHeight: 1.1 }}>{p.name}</div>
              <div style={{ fontSize: '14px', color: isSel ? 'rgba(244,239,230,0.7)' : 'rgba(42,37,32,0.6)', fontStyle: 'italic', marginBottom: '32px' }}>
                {p.tagline}
              </div>

              <div className="pb-8 mb-8" style={{ borderBottom: `1px solid ${isSel ? 'rgba(244,239,230,0.15)' : 'rgba(42,37,32,0.12)'}` }}>
                <div className="flex items-baseline gap-2">
                  <span style={{ fontSize: '14px', opacity: 0.55 }}>₹</span>
                  <span className="font-serif" style={{ fontSize: '44px', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1 }}>
                    {p.price.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="tracking-[0.24em] uppercase mt-3" style={{ fontSize: '11px', opacity: 0.65 }}>
                  / month · {p.meals}
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-4" style={{ fontSize: '14px', lineHeight: 1.6, opacity: 0.9 }}>
                    <Check size={16} strokeWidth={1.5} style={{ color: isSel ? SAGE : SAGE_DARK, marginTop: '2px', flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>

              <motion.div className="tracking-[0.28em] uppercase text-center py-4 transition-all w-full"
                whileTap={{ scale: 0.96 }}
                style={{
                  fontSize: '11px',
                  background: isSel ? SAGE : 'transparent',
                  color: isSel ? DARK_2 : INK,
                  border: `1px solid ${isSel ? SAGE : 'rgba(42,37,32,0.4)'}`,
                  borderRadius: '2px',
                }}>
                {isSel ? 'Selected' : 'Select Plan'}
              </motion.div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* — Step 2 — */
function InfoStep({ info, setInfo }: { info: { name: string; email: string; phone: string }; setInfo: (i: any) => void }) {
  return (
    <div>
      <h2 className="font-serif mb-3" style={{ fontSize: 'clamp(28px, 3.4vw, 40px)', color: INK, fontWeight: 300, lineHeight: 1.1 }}>
        Your <em style={{ fontStyle: 'italic' }}>information.</em>
      </h2>
      <p className="mb-10" style={{ fontSize: '14px', color: 'rgba(42,37,32,0.65)', lineHeight: 1.8 }}>
        So we know who to take care of.
      </p>
      <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
        <div className="sm:col-span-2">
          <div style={labelStyle}>Full Name</div>
          <input value={info.name} onChange={(e) => setInfo({ ...info, name: e.target.value })} style={inputStyle} />
        </div>
        <div>
          <div style={labelStyle}>Email</div>
          <input type="email" value={info.email} onChange={(e) => setInfo({ ...info, email: e.target.value })} style={inputStyle} />
        </div>
        <div>
          <div style={labelStyle}>Phone</div>
          <input value={info.phone} onChange={(e) => setInfo({ ...info, phone: e.target.value })} style={inputStyle} />
        </div>
      </div>
    </div>
  );
}

/* — Step 3 — */
function CardStep({ selectedCard, setSelectedCard }: { selectedCard: string; setSelectedCard: (k: string) => void }) {
  return (
    <div>
      <h2 className="font-serif mb-3" style={{ fontSize: 'clamp(28px, 3.4vw, 40px)', color: INK, fontWeight: 300, lineHeight: 1.1 }}>
        Choose a <em style={{ fontStyle: 'italic' }}>card.</em>
      </h2>
      <p className="mb-10" style={{ fontSize: '14px', color: 'rgba(42,37,32,0.65)', lineHeight: 1.8 }}>
        Select a saved card or add a new one.
      </p>
      <div className="space-y-4">
        {cards.map((c, i) => {
          const isSel = selectedCard === c.key;
          return (
            <motion.button
              key={c.key} type="button" onClick={() => setSelectedCard(c.key)}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease }}
              whileTap={{ scale: 0.99 }}
              className="w-full flex items-center justify-between gap-5 p-6 transition-all duration-300 text-left"
              style={{
                background: isSel ? INK : CREAM_2, color: isSel ? CREAM : INK,
                border: `1px solid ${isSel ? INK : 'rgba(42,37,32,0.12)'}`,
                borderRadius: '2px',
              }}>
              <div className="flex items-center gap-5">
                <CreditCard size={22} strokeWidth={1.3} style={{ color: isSel ? SAGE : SAGE_DARK }} />
                <div>
                  <div className="font-serif" style={{ fontSize: '18px', fontWeight: 400 }}>{c.label}</div>
                  {c.last && <div className="mt-1" style={{ fontSize: '12px', opacity: 0.6, letterSpacing: '0.18em' }}>•••• {c.last}</div>}
                </div>
              </div>
              <div className="flex-shrink-0 flex items-center justify-center"
                style={{ width: '24px', height: '24px', borderRadius: '50%', border: `1px solid ${isSel ? SAGE : 'rgba(42,37,32,0.3)'}`, background: isSel ? SAGE : 'transparent' }}>
                {isSel && <Check size={14} strokeWidth={2} color={DARK_2} />}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* — Step 4 — */
function BillingStep({ bill, setBill }: { bill: { address: string; city: string; pincode: string }; setBill: (b: any) => void }) {
  return (
    <div>
      <h2 className="font-serif mb-3" style={{ fontSize: 'clamp(28px, 3.4vw, 40px)', color: INK, fontWeight: 300, lineHeight: 1.1 }}>
        Billing & <em style={{ fontStyle: 'italic' }}>shipping.</em>
      </h2>
      <p className="mb-10" style={{ fontSize: '14px', color: 'rgba(42,37,32,0.65)', lineHeight: 1.8 }}>
        Where shall we send your daily ritual?
      </p>
      <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
        <div className="sm:col-span-2">
          <div style={labelStyle}>Address</div>
          <input value={bill.address} onChange={(e) => setBill({ ...bill, address: e.target.value })} style={inputStyle} />
        </div>
        <div>
          <div style={labelStyle}>City</div>
          <input value={bill.city} onChange={(e) => setBill({ ...bill, city: e.target.value })} style={inputStyle} />
        </div>
        <div>
          <div style={labelStyle}>Pincode</div>
          <input value={bill.pincode} onChange={(e) => setBill({ ...bill, pincode: e.target.value })} style={inputStyle} />
        </div>
      </div>
    </div>
  );
}

/* — Step 5 — */
function ReviewStep({ plan, info, bill, card }: { plan: Plan; info: any; bill: any; card: any }) {
  const Row = ({ label, value }: { label: string; value: string }) => (
    <div className="flex items-baseline justify-between py-4 gap-4" style={{ borderBottom: '1px solid rgba(42,37,32,0.1)' }}>
      <div className="tracking-[0.22em] uppercase flex-shrink-0" style={{ fontSize: '10px', color: SAGE_DARK }}>{label}</div>
      <div className="text-right" style={{ fontSize: '13px', color: INK }}>{value || '—'}</div>
    </div>
  );
  return (
    <div>
      <h2 className="font-serif mb-3" style={{ fontSize: 'clamp(28px, 3.4vw, 40px)', color: INK, fontWeight: 300, lineHeight: 1.1 }}>
        Review your <em style={{ fontStyle: 'italic' }}>order.</em>
      </h2>
      <p className="mb-10" style={{ fontSize: '14px', color: 'rgba(42,37,32,0.65)', lineHeight: 1.8 }}>
        A final glance before we begin.
      </p>
      <div className="p-7 lg:p-9" style={{ background: CREAM_2, borderRadius: '2px', border: '1px solid rgba(42,37,32,0.08)' }}>
        <Row label="Plan" value={`${plan.name} — ${plan.meals}`} />
        <Row label="Name" value={info.name} />
        <Row label="Email" value={info.email} />
        <Row label="Phone" value={info.phone} />
        <Row label="Card" value={card.label + (card.last ? ` •••• ${card.last}` : '')} />
        <Row label="Address" value={[bill.address, bill.city, bill.pincode].filter(Boolean).join(', ')} />
        <div className="flex items-baseline justify-between pt-6 mt-2">
          <div className="tracking-[0.32em] uppercase" style={{ fontSize: '11px', color: INK }}>Total / Month</div>
          <div className="font-serif" style={{ fontSize: '34px', color: INK, fontWeight: 300 }}>
            ₹{plan.price.toLocaleString('en-IN')}
          </div>
        </div>
      </div>
    </div>
  );
}
