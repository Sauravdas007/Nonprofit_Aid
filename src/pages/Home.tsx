import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroCanvas from "../components/HeroCanvas";
import CTABanner from "../components/CTABanner";
import SectionLabel from "../components/SectionLabel";
import TestimonialsCarousel from "../components/TestimonialsCarousel";

gsap.registerPlugin(ScrollTrigger);

/* ──────────────── Hero ──────────────── */
function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center bg-deep-indigo overflow-hidden">
      <HeroCanvas />
      <div className="section-container relative z-10 py-20">
        <div className="max-w-[640px]">
          <SectionLabel text="International Nonprofit Organization" />
          <h1
            className="mt-6 font-serif-display text-white leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: "clamp(48px, 5vw, 96px)" }}
          >
            Every Connection
            <br />
            Changes <span className="text-emerald">Everything</span>
          </h1>
          <p className="mt-8 text-xl text-white/75 max-w-[540px] leading-relaxed">
            We bridge compassion and action across 47 countries, creating
            sustainable change through education, health, and economic
            empowerment.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link to="/donate" className="btn-primary">
              Donate Now
            </Link>
            <Link to="/programs" className="btn-secondary">
              Our Programs
            </Link>
          </div>
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <ChevronDown
          size={24}
          className="text-white/40 animate-bounce-gentle"
        />
      </div>
    </section>
  );
}

/* ──────────────── Mission ──────────────── */
function Mission() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll(".mission-animate"), {
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
    <section
      id="mission"
      ref={sectionRef}
      className="bg-off-white py-24 md:py-[120px]"
    >
      <div className="section-container max-w-[800px] mx-auto text-center">
        <div className="mission-animate">
          <SectionLabel text="Our Mission" />
        </div>
        <p
          ref={textRef}
          className="mission-animate mt-10 font-serif-display text-deep-indigo leading-[1.35]"
          style={{ fontSize: "clamp(28px, 3vw, 40px)" }}
        >
          We believe that lasting change begins with a single act of compassion.
          Since 2008, Horizon Aid has partnered with communities to deliver
          education, healthcare, and economic opportunity where they're needed
          most.
        </p>
        <div className="mission-animate mt-12 flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {[
            { value: "47", label: "Countries" },
            { value: "2.3M", label: "Lives Impacted" },
            { value: "$127M", label: "Funds Distributed" },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-8 md:gap-16">
              <div className="text-center">
                <div className="font-serif-display text-5xl text-emerald">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-dark">{stat.label}</div>
              </div>
              {i < 2 && (
                <div className="hidden md:block w-px h-10 bg-charcoal/10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────── Featured Programs ──────────────── */
const programs = [
  {
    title: "Clean Water Initiative",
    category: "Education",
    description:
      "Bringing safe drinking water to communities across East Africa through sustainable infrastructure.",
    image: "/images/program-water.jpg",
  },
  {
    title: "Girls' Education Fund",
    category: "Education",
    description:
      "Scholarships and mentorship programs empowering 50,000 girls to complete their education.",
    image: "/images/program-education.jpg",
  },
  {
    title: "Community Health Workers",
    category: "Healthcare",
    description:
      "Training local health workers to provide essential care in remote villages.",
    image: "/images/program-health.jpg",
  },
];

function FeaturedPrograms() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll(".program-card"), {
        y: 40,
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
    <section ref={sectionRef} className="bg-deep-indigo py-24 md:py-[120px]">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h2
            className="font-serif-display text-white"
            style={{ fontSize: "clamp(36px, 3.5vw, 64px)" }}
          >
            Programs That Transform
          </h2>
          <Link
            to="/programs"
            className="font-sans-body text-[13px] font-medium uppercase tracking-[0.06em] text-emerald hover:underline transition-all"
          >
            View All Programs
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {programs.map((program) => (
            <div
              key={program.title}
              className="program-card group relative rounded-lg overflow-hidden cursor-pointer"
              style={{ aspectRatio: "4/5" }}
            >
              <img
                src={program.image}
                alt={program.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-105"
                loading="lazy"
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(46,26,94,0.9) 0%, rgba(46,26,94,0.3) 50%, transparent 100%)",
                }}
              />
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.08em] bg-emerald/15 text-emerald px-3 py-1 rounded-full mb-3">
                  {program.category}
                </span>
                <h3 className="font-serif-display text-2xl text-white leading-tight">
                  {program.title}
                </h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed line-clamp-2">
                  {program.description}
                </p>
              </div>
              {/* Hover lift */}
              <div className="absolute inset-0 transition-all duration-400 group-hover:-translate-y-1 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] rounded-lg pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────── Impact Story ──────────────── */
function ImpactStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    if (isMobile) return;
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const inner = el.querySelector(".horizontal-inner") as HTMLElement;
      if (!inner) return;

      gsap.to(inner, {
        x: () => -(inner.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          pin: true,
          scrub: 1,
          end: () => "+=" + (inner.scrollWidth - window.innerWidth),
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, [isMobile]);

  // Mobile: vertical stack
  if (isMobile) {
    return (
      <section className="bg-off-white py-24">
        <div className="section-container space-y-16">
          {/* Panel 1 */}
          <div className="text-center">
            <div
              className="font-serif-display text-emerald"
              style={{ fontSize: "clamp(64px, 12vw, 180px)" }}
            >
              2.3M
            </div>
            <p className="mt-2 text-lg text-muted-dark">
              Lives touched through our programs
            </p>
          </div>
          <img
            src="/images/impact-community-children.jpg"
            alt="Community"
            className="w-full rounded-lg object-cover"
            style={{ aspectRatio: "3/2" }}
            loading="lazy"
          />

          {/* Panel 2 */}
          <div
            className="relative rounded-lg overflow-hidden py-20 px-8"
            style={{
              backgroundImage: "url(/images/hero-water-initiative.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-deep-indigo/50" />
            <div className="relative z-10 text-center">
              <p
                className="font-serif-display text-white leading-tight"
                style={{ fontSize: "clamp(24px, 3.5vw, 40px)" }}
              >
                "Horizon Aid didn't just build a school — they gave our children
                a future."
              </p>
              <p className="mt-6 text-sm text-white/70">
                — Maria Santos, Community Leader, Philippines
              </p>
            </div>
          </div>

          {/* Panel 3 */}
          <div className="grid grid-cols-1 gap-8">
            <img
              src="/images/impact-classroom.jpg"
              alt="Classroom"
              className="w-full rounded-lg object-cover"
              style={{ aspectRatio: "16/10" }}
              loading="lazy"
            />
            <div className="space-y-8 text-center">
              {[
                { value: "340K", label: "Water Access" },
                { value: "50K", label: "Girls Educated" },
                { value: "12K", label: "Health Workers Trained" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-serif-display text-5xl text-emerald">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-muted-dark uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Desktop: horizontal scroll
  return (
    <section ref={sectionRef} className="bg-off-white overflow-hidden">
      <div
        className="horizontal-inner flex"
        style={{ width: "300vw", willChange: "transform" }}
      >
        {/* Panel 1 */}
        <div className="w-screen h-screen flex-shrink-0 flex">
          <div className="w-1/2 flex flex-col items-center justify-center px-16">
            <div
              className="font-serif-display text-emerald"
              style={{ fontSize: "clamp(64px, 12vw, 180px)" }}
            >
              2.3M
            </div>
            <p className="mt-4 text-lg text-muted-dark text-center">
              Lives touched through our programs
            </p>
          </div>
          <div className="w-1/2 p-8">
            <img
              src="/images/impact-community-children.jpg"
              alt="Community"
              className="w-full h-full object-cover rounded-lg"
              loading="lazy"
            />
          </div>
        </div>

        {/* Panel 2 */}
        <div className="w-screen h-screen flex-shrink-0 relative">
          <img
            src="/images/hero-water-initiative.jpg"
            alt="Water initiative"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-deep-indigo/50" />
          <div className="absolute inset-0 flex items-center justify-center px-16">
            <div className="max-w-[700px] text-center">
              <p
                className="font-serif-display text-white leading-tight"
                style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
              >
                "Horizon Aid didn't just build a school — they gave our children
                a future."
              </p>
              <p className="mt-6 text-sm text-white/70">
                — Maria Santos, Community Leader, Philippines
              </p>
            </div>
          </div>
        </div>

        {/* Panel 3 */}
        <div className="w-screen h-screen flex-shrink-0 flex">
          <div className="w-1/2 p-8">
            <img
              src="/images/impact-classroom.jpg"
              alt="Classroom"
              className="w-full h-full object-cover rounded-lg"
              loading="lazy"
            />
          </div>
          <div className="w-1/2 flex flex-col items-center justify-center gap-12 px-16">
            {[
              { value: "340K", label: "Water Access" },
              { value: "50K", label: "Girls Educated" },
              { value: "12K", label: "Health Workers Trained" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-serif-display text-6xl text-emerald">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-dark uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────── Home Page ──────────────── */
export default function Home() {
  return (
    <>
      <Hero />
      <Mission />
      <FeaturedPrograms />
      <ImpactStory />
      <TestimonialsCarousel />
      <CTABanner
        heading="Be Part of the Change"
        subtext="Your donation creates ripples of impact across communities worldwide. 100% of public donations fund our programs."
      />
    </>
  );
}
