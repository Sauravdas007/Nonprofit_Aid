import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, TrendingUp, Shield, Users } from "lucide-react";
import PageHeader from "../components/PageHeader";
import CTABanner from "../components/CTABanner";
import SectionLabel from "../components/SectionLabel";
import { ImageGallery, GalleryImage } from "../components/ImageGallery";

gsap.registerPlugin(ScrollTrigger);

/* ──────────────── Our Story ──────────────── */
function OurStory() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll(".story-animate"), {
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
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left - Text */}
          <div className="lg:w-[55%]">
            <div className="story-animate">
              <SectionLabel text="Our Story" />
            </div>
            <h2
              className="story-animate mt-5 font-serif-display text-deep-indigo leading-[1.25]"
              style={{ fontSize: "clamp(28px, 2.5vw, 40px)" }}
            >
              Founded on the belief that everyone deserves opportunity.
            </h2>
            <div className="story-animate mt-6 space-y-4 text-base text-muted-dark leading-[1.7]">
              <p>
                Horizon Aid was founded in 2008 by a group of development
                professionals who saw that traditional aid models often created
                dependency rather than sustainability.
              </p>
              <p>
                We pioneered a community-led approach, partnering with local
                leaders to design programs that reflect each community's unique
                needs, culture, and aspirations.
              </p>
              <p>
                Today, we operate in 47 countries with a network of over 12,000
                local staff and volunteers, all united by a shared vision of
                dignified, sustainable development.
              </p>
            </div>
          </div>

          {/* Right - Images */}
          <div className="lg:w-[45%] flex flex-col gap-4">
            <ImageGallery
              images={[
                { src: "/images/about-team.jpg", alt: "Horizon Aid team" },
                { src: "/images/about-fieldwork-1.jpg", alt: "Community meeting" },
                { src: "/images/about-fieldwork-2.jpg", alt: "Water reservoir construction" },
              ]}
            >
              <div className="space-y-4">
                <div className="story-animate">
                  <GalleryImage
                    src="/images/about-team.jpg"
                    alt="Horizon Aid team"
                    index={0}
                    className="w-full"
                    style={{ aspectRatio: "4/3" }}
                  />
                </div>
                <div className="story-animate grid grid-cols-2 gap-4">
                  <GalleryImage
                    src="/images/about-fieldwork-1.jpg"
                    alt="Community meeting"
                    index={1}
                    style={{ aspectRatio: "3/2" }}
                  />
                  <GalleryImage
                    src="/images/about-fieldwork-2.jpg"
                    alt="Water reservoir construction"
                    index={2}
                    style={{ aspectRatio: "3/2" }}
                  />
                </div>
              </div>
            </ImageGallery>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────── Values ──────────────── */
const values = [
  {
    icon: Heart,
    title: "Community-Led",
    description:
      "We listen first. Every program is designed in partnership with the communities we serve.",
  },
  {
    icon: TrendingUp,
    title: "Sustainable Impact",
    description:
      "We build systems, not Band-Aids. Our programs create lasting change that outlives our involvement.",
  },
  {
    icon: Shield,
    title: "Radical Transparency",
    description:
      "Every dollar is tracked and reported. Our financial records are publicly available because you deserve to know.",
  },
  {
    icon: Users,
    title: "Equity & Inclusion",
    description:
      "We actively dismantle barriers to opportunity based on gender, ethnicity, or economic status.",
  },
];

function Values() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll(".value-card"), {
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
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-24 md:py-[120px]">
      <div className="section-container">
        <h2
          className="font-serif-display text-deep-indigo text-center mb-16"
          style={{ fontSize: "clamp(32px, 3vw, 56px)" }}
        >
          What We Stand For
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div
              key={v.title}
              className="value-card bg-off-white rounded-lg p-10 text-center"
            >
              <v.icon size={36} className="mx-auto text-emerald" />
              <h3 className="mt-6 font-sans-body text-lg font-semibold text-charcoal">
                {v.title}
              </h3>
              <p className="mt-3 text-sm text-muted-dark leading-relaxed">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────── Leadership Team ──────────────── */
const team = [
  {
    name: "Dr. Sarah Chen",
    title: "Executive Director",
    bio: "Former UN development officer with 20 years of experience in global health and education policy.",
    image: "/images/team-sarah.jpg",
  },
  {
    name: "James Osei",
    title: "Director of Programs",
    bio: "Led community development initiatives across 15 African countries before joining Horizon Aid.",
    image: "/images/team-james.jpg",
  },
  {
    name: "Elena Vasquez",
    title: "Chief Operations Officer",
    bio: "Expert in nonprofit scaling and operational excellence, former COO at Global Health Corps.",
    image: "/images/team-elena.jpg",
  },
];

function LeadershipTeam() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll(".team-card"), {
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
      <div className="section-container max-w-[960px]">
        <h2
          className="font-serif-display text-deep-indigo text-center mb-16"
          style={{ fontSize: "clamp(32px, 3vw, 56px)" }}
        >
          Our Leadership
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member) => (
            <div
              key={member.name}
              className="team-card bg-white rounded-lg p-10 text-center border border-charcoal/[0.06]"
            >
              <div className="w-[120px] h-[120px] mx-auto rounded-full overflow-hidden bg-cream">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="mt-6 font-sans-body text-lg font-semibold text-charcoal">
                {member.name}
              </h3>
              <p className="mt-1 text-sm text-emerald">{member.title}</p>
              <p className="mt-4 text-sm text-muted-dark leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────── About Page ──────────────── */
export default function About() {
  return (
    <>
      <PageHeader
        title="About Horizon Aid"
        subtitle="A global community of changemakers committed to building a more equitable world."
      />
      <OurStory />
      <Values />
      <LeadershipTeam />
      <CTABanner
        heading="Join Our Mission"
        subtext="Whether you donate, volunteer, or advocate, there's a place for you in our community."
      />
    </>
  );
}
