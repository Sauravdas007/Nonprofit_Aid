import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Our Mission", href: "/#mission" },
  { label: "Programs", href: "/programs" },
  { label: "Impact", href: "/impact" },
  { label: "About", href: "/about" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleNavClick = (href: string) => {
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      if (isHome) {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }
    }
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled || !isHome
            ? "bg-[rgba(46,26,94,0.85)] backdrop-blur-[20px] border-b border-[rgba(255,255,255,0.06)]"
            : "bg-transparent"
        }`}
        style={{ height: 72 }}
      >
        <div className="section-container h-full flex items-center justify-between">
          <Link
            to="/"
            className="font-serif-display text-white text-[20px] tracking-normal"
          >
            Horizon Aid
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.href.startsWith("/#") ? (
                <Link
                  key={link.label}
                  to={isHome ? "/" : link.href.replace("#", "")}
                  onClick={() => handleNavClick(link.href)}
                  className="font-sans-body text-[13px] font-medium uppercase tracking-[0.08em] text-white/70 hover:text-white transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-emerald group-hover:w-full transition-all duration-300" />
                </Link>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="font-sans-body text-[13px] font-medium uppercase tracking-[0.08em] text-white/70 hover:text-white transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-emerald group-hover:w-full transition-all duration-300" />
                </Link>
              )
            )}
          </div>

          <div className="hidden md:block">
            <Link
              to="/donate"
              className="inline-flex items-center justify-center font-sans-body text-[13px] font-semibold uppercase tracking-[0.04em] bg-emerald text-charcoal px-7 py-3 rounded-full hover:bg-emerald-dark hover:scale-[1.02] transition-all duration-250"
            >
              Donate
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-deep-indigo/95 backdrop-blur-lg pt-[72px] md:hidden">
          <div className="flex flex-col items-center gap-8 pt-12">
            {navLinks.map((link) =>
              link.href.startsWith("/#") ? (
                <Link
                  key={link.label}
                  to={isHome ? "/" : link.href.replace("#", "")}
                  onClick={() => handleNavClick(link.href)}
                  className="font-sans-body text-lg font-medium uppercase tracking-[0.08em] text-white/70 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="font-sans-body text-lg font-medium uppercase tracking-[0.08em] text-white/70 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
            <Link
              to="/donate"
              className="mt-4 inline-flex items-center justify-center font-sans-body text-[13px] font-semibold uppercase tracking-[0.04em] bg-emerald text-charcoal px-10 py-4 rounded-full"
            >
              Donate Now
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
