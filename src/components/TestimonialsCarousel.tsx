import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";

const testimonials = [
  {
    name: "Amina Hassan",
    role: "Water Initiative Beneficiary",
    location: "Kenya",
    image: "/images/testimonial-amina.jpg",
    quote:
      "Before Horizon Aid, we walked 5 miles daily for water. Now we have clean water steps away from our homes. This has transformed everything—our health, our children's school attendance, our dignity.",
  },
  {
    name: "Carlos Rodriguez",
    role: "Girls' Education Fund Scholar",
    location: "El Salvador",
    image: "/images/testimonial-carlos.jpg",
    quote:
      "I'm the first in my family to go to university. Horizon Aid didn't just give me a scholarship—they showed me I deserve a future. I'm coming back to serve my community.",
  },
  {
    name: "Priya Sharma",
    role: "Health Worker Trainer",
    location: "India",
    image: "/images/testimonial-priya.jpg",
    quote:
      "Our training has enabled us to save lives in villages that had never seen a health worker. We're not just delivering healthcare—we're building hope.",
  },
];

export default function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlay]);

  // Animate content change
  useEffect(() => {
    if (!contentRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.3,
        onComplete: () => {
          gsap.to(contentRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        },
      });

      gsap.to(imageRef.current, {
        opacity: 0.5,
        scale: 0.95,
        duration: 0.3,
        onComplete: () => {
          gsap.to(imageRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
          });
        },
      });
    });

    return () => ctx.revert();
  }, [activeIndex]);

  const current = testimonials[activeIndex];

  const handlePrev = () => {
    setIsAutoPlay(false);
    setActiveIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="bg-deep-indigo py-24 md:py-[120px]">
      <div className="section-container">
        <div className="max-w-[1000px] mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            {/* Image */}
            <div ref={imageRef} className="md:w-[40%] flex-shrink-0">
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={current.image}
                  alt={current.name}
                  className="w-full h-auto object-cover"
                  style={{ aspectRatio: "4/5" }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-indigo via-transparent to-transparent opacity-40" />
              </div>
            </div>

            {/* Content */}
            <div ref={contentRef} className="md:w-[60%]">
              <blockquote className="font-serif-display text-2xl md:text-3xl text-white leading-[1.4] mb-6">
                "{current.quote}"
              </blockquote>
              <div className="space-y-1 mb-8">
                <p className="font-sans-body font-semibold text-white">
                  {current.name}
                </p>
                <p className="font-sans-body text-sm text-emerald">
                  {current.role}
                </p>
                <p className="font-sans-body text-xs text-white/60">
                  {current.location}
                </p>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrev}
                  className="flex items-center justify-center w-12 h-12 rounded-full border border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setIsAutoPlay(false);
                        setActiveIndex(index);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === activeIndex
                          ? "bg-emerald w-8"
                          : "bg-white/30 w-1.5 hover:bg-white/50"
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="flex items-center justify-center w-12 h-12 rounded-full border border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
