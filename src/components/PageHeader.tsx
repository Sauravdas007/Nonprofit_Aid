interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="bg-deep-indigo pt-[160px] pb-20">
      <div className="section-container">
        <h1
          className="font-serif-display text-white leading-[1.05] tracking-[-0.02em]"
          style={{ fontSize: "clamp(40px, 5vw, 80px)" }}
        >
          {title}
        </h1>
        <p className="mt-4 text-lg text-white/65 max-w-[560px] leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
