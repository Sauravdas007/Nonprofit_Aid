import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, Globe, DollarSign, Heart } from "lucide-react";
import PageHeader from "../components/PageHeader";
import CTABanner from "../components/CTABanner";

gsap.registerPlugin(ScrollTrigger);

/* ──────────────── Impact Dashboard ──────────────── */
const stats = [
  {
    icon: Users,
    value: 2300000,
    label: "Lives Impacted",
    description:
      "Individuals and families who have benefited from our programs since 2008.",
  },
  {
    icon: Globe,
    value: 47,
    label: "Countries Reached",
    description:
      "Operating across Africa, Asia, Latin America, and the Middle East.",
  },
  {
    icon: DollarSign,
    value: 127000000,
    label: "Funds Distributed",
    description:
      "98.2% of funds go directly to program delivery and community support.",
  },
  {
    icon: Heart,
    value: 340000,
    label: "Active Beneficiaries",
    description: "Currently enrolled in ongoing Horizon Aid programs worldwide.",
  },
];

function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return Math.round(n / 1000) + "K";
  return Math.round(n).toString();
}

function ImpactDashboard() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Animate cards in
      gsap.from(el.querySelectorAll(".stat-card"), {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          once: true,
        },
      });

      // Counter animation
      const counters = el.querySelectorAll(".counter-value");
      counters.forEach((counter, i) => {
        const target = stats[i].value;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            (counter as HTMLElement).textContent = formatNumber(obj.val);
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-off-white py-24 md:py-[120px]">
      <div className="section-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="stat-card bg-white rounded-lg p-12 border border-charcoal/[0.06] text-center"
            >
              <stat.icon size={32} className="mx-auto text-emerald mb-6" />
              <div
                className="counter-value font-serif-display text-emerald tracking-[-0.02em]"
                style={{ fontSize: "clamp(48px, 5vw, 64px)" }}
              >
                0
              </div>
              <div className="mt-2 text-sm text-muted-dark uppercase tracking-[0.06em]">
                {stat.label}
              </div>
              <p className="mt-4 text-sm text-muted-dark leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────── Annual Impact Graph ──────────────── */
const yearData = [
  { year: "2019", value: 0.8 },
  { year: "2020", value: 1.0 },
  { year: "2021", value: 1.3 },
  { year: "2022", value: 1.6 },
  { year: "2023", value: 2.0 },
  { year: "2024", value: 2.3 },
];

function AnnualGraph() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll(".bar-item"), {
        scaleY: 0,
        transformOrigin: "bottom",
        duration: 1,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-24 md:py-[120px]">
      <div className="section-container">
        <h2
          className="font-serif-display text-deep-indigo text-center"
          style={{ fontSize: "clamp(32px, 3vw, 56px)" }}
        >
          Growing Impact, Year Over Year
        </h2>
        <p className="mt-3 text-base text-muted-dark text-center">
          Total beneficiaries served since our founding.
        </p>

        <div className="mt-16 max-w-[900px] mx-auto">
          <div className="flex items-end justify-between gap-4 h-[400px]">
            {yearData.map((d) => (
              <div
                key={d.year}
                className="bar-item flex-1 flex flex-col items-center justify-end"
              >
                <span className="text-sm font-semibold text-charcoal mb-2">
                  {d.value}M
                </span>
                <div
                  className="w-full rounded-t"
                  style={{
                    height: `${(d.value / 2.5) * 100}%`,
                    background:
                      "linear-gradient(to top, #3D2277, #2ECC71)",
                    borderRadius: "4px 4px 0 0",
                  }}
                />
                <span className="text-xs text-muted-dark mt-3">
                  {d.year}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────── Geographic Reach ──────────────── */
const locations = [
  { name: "Kenya", cx: 52, cy: 55 },
  { name: "India", cx: 67, cy: 42 },
  { name: "Philippines", cx: 78, cy: 48 },
  { name: "Peru", cx: 28, cy: 60 },
  { name: "Haiti", cx: 32, cy: 40 },
  { name: "Nepal", cx: 65, cy: 40 },
];

function GeographicReach() {
  return (
    <section className="bg-deep-indigo py-24 md:py-[120px]">
      <div className="section-container text-center">
        <h2
          className="font-serif-display text-white"
          style={{ fontSize: "clamp(32px, 3vw, 56px)" }}
        >
          Where We Work
        </h2>
        <p className="mt-3 text-base text-white/60">
          Community-led programs across four continents.
        </p>

        <div className="mt-16 max-w-[1000px] mx-auto" style={{ aspectRatio: "2/1" }}>
          <svg
            viewBox="0 0 100 60"
            className="w-full h-full"
            style={{ overflow: "visible" }}
          >
            {/* Simplified world map outline */}
            <path
              d="M20 15 Q25 10 35 12 Q40 8 45 12 Q50 10 55 12 Q60 8 65 12 Q70 10 75 15 Q80 12 85 18 Q82 25 78 28 Q75 35 70 38 Q65 42 60 40 Q55 45 50 42 Q45 48 40 45 Q35 50 30 48 Q25 52 20 48 Q15 45 18 38 Q12 35 15 28 Q18 22 20 15Z"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="0.3"
            />
            {/* Africa */}
            <path
              d="M48 22 Q52 20 55 22 Q58 25 56 30 Q58 35 55 40 Q52 45 48 42 Q45 38 46 32 Q44 28 48 22Z"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="0.3"
            />
            {/* Asia */}
            <path
              d="M60 12 Q68 10 75 12 Q78 15 76 20 Q72 22 68 20 Q65 18 60 12Z"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="0.3"
            />
            {/* S. America */}
            <path
              d="M28 30 Q32 28 35 32 Q34 38 32 42 Q30 48 28 52 Q26 48 27 42 Q25 36 28 30Z"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="0.3"
            />
            {/* Pulsing dots */}
            {locations.map((loc, i) => (
              <g key={loc.name}>
                <circle
                  cx={loc.cx}
                  cy={loc.cy}
                  r="1.2"
                  fill="#2ECC71"
                  style={{
                    filter: "drop-shadow(0 0 3px rgba(46,204,113,0.5))",
                  }}
                >
                  <animate
                    attributeName="r"
                    values="1.2;1.6;1.2"
                    dur="2s"
                    repeatCount="indefinite"
                    begin={`${i * 0.3}s`}
                  />
                  <animate
                    attributeName="opacity"
                    values="0.8;0.4;0.8"
                    dur="2s"
                    repeatCount="indefinite"
                    begin={`${i * 0.3}s`}
                  />
                </circle>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}

/* ──────────────── Stories from the Field ──────────────── */
const testimonials = [
  {
    quote:
      "Horizon Aid built a well in our village. For the first time, our daughters can go to school instead of walking miles for water.",
    name: "Amina Okafor",
    role: "Village Elder, Kenya",
    image: "/images/testimonial-amina.jpg",
  },
  {
    quote:
      "The scholarship changed my life. I'm now the first person in my family to attend university, studying to become a doctor.",
    name: "Priya Sharma",
    role: "Scholarship Recipient, India",
    image: "/images/testimonial-priya.jpg",
  },
  {
    quote:
      "The health worker training saved my daughter's life. I can now help others in my community too.",
    name: "Carlos Mendez",
    role: "Community Health Worker, Peru",
    image: "/images/testimonial-carlos.jpg",
  },
];

function Stories() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll(".testimonial-card"), {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-off-white py-24 md:py-[120px]">
      <div className="section-container">
        <h2
          className="font-serif-display text-deep-indigo text-center mb-16"
          style={{ fontSize: "clamp(32px, 3vw, 56px)" }}
        >
          Stories of Change
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="testimonial-card bg-white rounded-lg p-10 border border-charcoal/[0.06]"
            >
              <div
                className="font-serif-display text-6xl text-emerald/20 leading-none"
                style={{ lineHeight: 0.5 }}
              >
                "
              </div>
              <p className="mt-4 font-serif-display text-xl text-deep-indigo leading-[1.45]">
                {t.quote}
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-cream flex-shrink-0">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <div className="text-sm font-semibold text-charcoal">
                    {t.name}
                  </div>
                  <div className="text-[13px] text-muted-dark">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────── Impact Page ──────────────── */
export default function Impact() {
  return (
    <>
      <PageHeader
        title="Our Impact"
        subtitle="Measurable change. Transparent results. Real lives transformed."
      />
      <ImpactDashboard />
      <AnnualGraph />
      <GeographicReach />
      <Stories />
      <CTABanner
        heading="Help Us Reach Further"
        subtext="Your support expands our reach to communities waiting for help."
      />
    </>
  );
}
