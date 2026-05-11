import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHeader from "../components/PageHeader";
import CTABanner from "../components/CTABanner";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  "All Programs",
  "Education",
  "Healthcare",
  "Economic Empowerment",
  "Emergency Relief",
];

const programs = [
  {
    title: "Clean Water Initiative",
    category: "Education",
    description:
      "Building sustainable water infrastructure to provide safe drinking water across East African communities.",
    beneficiaries: "340K",
    countries: "12",
    image: "/images/program-water.jpg",
  },
  {
    title: "Girls' Education Fund",
    category: "Education",
    description:
      "Comprehensive scholarships, mentorship, and safe learning environments for girls in underserved regions.",
    beneficiaries: "50K",
    countries: "23",
    image: "/images/program-education.jpg",
  },
  {
    title: "Community Health Workers",
    category: "Healthcare",
    description:
      "Training and equipping local health workers to deliver essential care in remote and rural communities.",
    beneficiaries: "12K",
    countries: "18",
    image: "/images/program-health.jpg",
  },
  {
    title: "Microenterprise Development",
    category: "Economic Empowerment",
    description:
      "Microloans and business training empowering entrepreneurs to build sustainable livelihoods.",
    beneficiaries: "85K",
    countries: "15",
    image: "/images/program-microenterprise.jpg",
  },
  {
    title: "Emergency Relief Fund",
    category: "Emergency Relief",
    description:
      "Rapid response providing food, shelter, and medical aid to communities affected by natural disasters and conflict.",
    beneficiaries: "1.2M",
    countries: "31",
    image: "/images/program-emergency.jpg",
  },
  {
    title: "Agricultural Innovation",
    category: "Economic Empowerment",
    description:
      "Modern farming techniques and crop diversification helping farming communities achieve food security.",
    beneficiaries: "200K",
    countries: "9",
    image: "/images/program-agriculture.jpg",
  },
];

export default function Programs() {
  const [activeCategory, setActiveCategory] = useState("All Programs");
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeCategory === "All Programs"
      ? programs
      : programs.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    let ctx: gsap.Context | null = null;

    // Create animations
    ctx = gsap.context(() => {
      const items = el.querySelectorAll(".program-item");
      // Set initial state
      gsap.set(items, { opacity: 1, y: 0 });
      
      // Animate in
      gsap.from(items, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, el);

    return () => {
      if (ctx) ctx.revert();
    };
  }, [activeCategory]);

  return (
    <>
      <PageHeader
        title="Our Programs"
        subtitle="Sustainable solutions creating lasting impact in communities worldwide."
      />

      {/* Category Filters */}
      <section className="bg-off-white py-20">
        <div className="section-container">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-sans-body text-[13px] font-medium px-6 py-2.5 rounded-full border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-emerald text-charcoal border-transparent"
                    : "bg-transparent text-charcoal border-charcoal/12 hover:border-charcoal/25"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Program Grid */}
      <section className="bg-off-white pb-24 md:pb-[120px]">
        <div ref={gridRef} className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filtered.map((program) => (
              <div
                key={program.title}
                className="program-item group bg-white rounded-lg overflow-hidden border border-charcoal/[0.06] hover:bg-cream transition-all duration-400"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-[45%] overflow-hidden bg-charcoal/5">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-56 md:h-full object-cover transition-transform duration-400 group-hover:scale-[1.03]"
                      style={{ aspectRatio: "16/10", minHeight: "100%" }}
                      loading="eager"
                    />
                  </div>
                  <div className="md:w-[55%] p-8 flex flex-col justify-center">
                    <span className="inline-block self-start text-[11px] font-semibold uppercase tracking-[0.08em] bg-emerald/15 text-emerald px-3 py-1 rounded-full mb-4">
                      {program.category}
                    </span>
                    <h3 className="font-serif-display text-2xl md:text-[28px] text-deep-indigo leading-tight">
                      {program.title}
                    </h3>
                    <p className="mt-3 text-base text-muted-dark leading-relaxed">
                      {program.description}
                    </p>
                    <div className="mt-6 flex gap-8">
                      <div>
                        <div className="font-serif-display text-2xl text-emerald">
                          {program.beneficiaries}
                        </div>
                        <div className="text-xs uppercase tracking-wide text-muted-dark">
                          Beneficiaries
                        </div>
                      </div>
                      <div>
                        <div className="font-serif-display text-2xl text-emerald">
                          {program.countries}
                        </div>
                        <div className="text-xs uppercase tracking-wide text-muted-dark">
                          Countries
                        </div>
                      </div>
                    </div>
                    <Link
                      to="/programs"
                      className="mt-6 inline-flex font-sans-body text-[13px] font-semibold uppercase tracking-[0.06em] text-emerald hover:underline transition-all"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        heading="Support Our Programs"
        subtext="Every contribution directly funds life-changing initiatives in communities that need it most."
      />
    </>
  );
}
