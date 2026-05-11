import { Link } from "react-router-dom";

interface CTABannerProps {
  heading: string;
  subtext: string;
}

export default function CTABanner({ heading, subtext }: CTABannerProps) {
  return (
    <section className="bg-deep-indigo py-24 relative overflow-hidden">
      {/* Subtle emerald radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(46,204,113,0.08) 0%, transparent 70%)",
        }}
      />
      <div className="section-container text-center relative z-10">
        <h2
          className="font-serif-display text-white tracking-[-0.01em]"
          style={{ fontSize: "clamp(36px, 4vw, 72px)" }}
        >
          {heading}
        </h2>
        <p className="mt-5 text-lg text-white/65 max-w-[560px] mx-auto leading-relaxed">
          {subtext}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/donate"
            className="btn-primary px-11 py-[18px] text-sm"
          >
            Donate Now
          </Link>
          <Link
            to="/programs"
            className="btn-secondary px-11 py-[18px] text-sm"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
