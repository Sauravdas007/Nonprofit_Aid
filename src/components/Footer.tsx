import { Link } from "react-router-dom";
import { Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

const programLinks = [
  { label: "Clean Water", href: "/programs" },
  { label: "Education Fund", href: "/programs" },
  { label: "Health Workers", href: "/programs" },
  { label: "Emergency Relief", href: "/programs" },
];

const orgLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/about" },
  { label: "Financial Reports", href: "/impact" },
  { label: "Careers", href: "/about" },
];

const connectLinks = [
  { label: "Contact", href: "/about" },
  { label: "Newsletter", href: "/about" },
  { label: "Press Kit", href: "/about" },
  { label: "Partners", href: "/about" },
];

export default function Footer() {
  return (
    <footer className="bg-deep-indigo border-t border-[rgba(255,255,255,0.06)]">
      <div className="section-container pt-20 pb-10">
        {/* Upper Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              to="/"
              className="font-serif-display text-white text-2xl"
            >
              Horizon Aid
            </Link>
            <p className="mt-4 text-sm text-white/50 leading-relaxed max-w-[280px]">
              Creating sustainable change through compassion and action since 2008.
            </p>
          </div>

          {/* Programs Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.1em] text-white/40 mb-4">
              Programs
            </h4>
            <ul className="space-y-1">
              {programLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/70 leading-[2.2] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Organization Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.1em] text-white/40 mb-4">
              Organization
            </h4>
            <ul className="space-y-1">
              {orgLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/70 leading-[2.2] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.1em] text-white/40 mb-4">
              Connect
            </h4>
            <ul className="space-y-1">
              {connectLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/70 leading-[2.2] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Lower Footer */}
        <div className="mt-16 pt-6 border-t border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/35">
            2026 Horizon Aid. All rights reserved.
          </p>
          <div className="text-xs text-white/35">
            <span className="hover:text-white/60 cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="mx-2">·</span>
            <span className="hover:text-white/60 cursor-pointer transition-colors">
              Terms of Service
            </span>
            <span className="mx-2">·</span>
            <span className="hover:text-white/60 cursor-pointer transition-colors">
              Cookie Settings
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Twitter
              size={20}
              className="text-white/35 hover:text-white/80 transition-colors cursor-pointer"
            />
            <Instagram
              size={20}
              className="text-white/35 hover:text-white/80 transition-colors cursor-pointer"
            />
            <Linkedin
              size={20}
              className="text-white/35 hover:text-white/80 transition-colors cursor-pointer"
            />
            <Youtube
              size={20}
              className="text-white/35 hover:text-white/80 transition-colors cursor-pointer"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
