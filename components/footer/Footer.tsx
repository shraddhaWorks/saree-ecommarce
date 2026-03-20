"use client";

import Link from "next/link";
import React from "react";
import { Facebook, Instagram, MessageCircle } from "lucide-react";
import { RangamLogo } from "../navbar/storefront-navbar";

const SocialIcon = ({
  href,
  label,
  children,
}: {
  href?: string;
  label: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href || "/"}
    aria-label={label}
    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/10 hover:text-[#9d2936]"
  >
    {children}
  </Link>
);

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:py-16">

        {/* Top Section */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center">
              <RangamLogo />
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <SocialIcon label="Facebook">
                <Facebook size={18} />
              </SocialIcon>

              <SocialIcon label="Instagram">
                <Instagram size={18} />
              </SocialIcon>

              <SocialIcon label="WhatsApp">
                <MessageCircle size={18} />
              </SocialIcon>
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: "About",
              links: ["About Us", "Our Promoters", "Stores", "Blog"],
            },
            {
              title: "Policies",
              links: [
                "Terms & Conditions",
                "Privacy Policy",
                "Return Policy",
                "Shipping",
                "COD Policy",
              ],
            },
            {
              title: "Support",
              links: ["Contact Us", "FAQ's", "Careers"],
            },
          ].map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/80">
                {section.title}
              </h3>

              <ul className="space-y-2 text-sm text-white/70">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="/"
                      className="transition hover:text-white"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t border-white/10 pt-8 sm:pt-10 text-sm text-white/70">

          <div className="flex flex-col gap-6 md:flex-row md:justify-between">

            <div>
              <h4 className="text-base font-semibold text-white">
                Logistics
              </h4>
              <p className="mt-1 max-w-sm">
                Delivery within 2–7 days across India and worldwide shipping available.
              </p>
            </div>

            <div>
              <h4 className="text-base font-semibold text-white">
                Reach Us
              </h4>
              <p className="mt-1">📱 +91-40-23231147</p>
              <p>✉️ web@rangam.com</p>
            </div>

          </div>

          <p className="mt-8 text-center text-xs text-white/40">
            © {new Date().getFullYear()} Rangam. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;