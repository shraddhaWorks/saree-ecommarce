"use client";

import Link from "next/link";
import React from "react";
import { Facebook, Instagram, MessageCircle, Mail, Phone, MapPin, Send } from "lucide-react";
import { RangamLogo } from "../navbar/ui";

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
    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all duration-300 hover:bg-[#9d2936] hover:text-white hover:border-[#9d2936] hover:-translate-y-1"
  >
    {children}
  </Link>
);

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <Link
      href={href}
      className="text-white/60 transition-colors duration-300 hover:text-white flex items-center group"
    >
      <span className="h-px w-0 bg-[#9d2936] transition-all duration-300 group-hover:w-3 mr-0 group-hover:mr-2"></span>
      {children}
    </Link>
  </li>
);

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] text-white pt-16 pb-8 border-t border-white/5">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 mb-16">
          
          {/* Brand & About Column */}
          <div className="lg:col-span-4 space-y-8">
            <div className="inline-block">
              <RangamLogo />
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              Rangam celebrates the timeless elegance of Indian heritage with a curated collection of exquisite handcrafted sarees, bridal weaves, and traditional drapes.
            </p>
            <div className="flex items-center gap-4">
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

          {/* Quick Links Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#9d2936]">
                About
              </h3>
              <ul className="space-y-4 text-sm">
                <FooterLink href="/about">About Us</FooterLink>
                <FooterLink href="/promoters">Our Promoters</FooterLink>
                <FooterLink href="/stores">Our Stores</FooterLink>
                <FooterLink href="/blog">Heritage Blog</FooterLink>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#9d2936]">
                Policies
              </h3>
              <ul className="space-y-4 text-sm">
                <FooterLink href="/terms">Terms & Conditions</FooterLink>
                <FooterLink href="/privacy">Privacy Policy</FooterLink>
                <FooterLink href="/returns">Return Policy</FooterLink>
                <FooterLink href="/shipping">Shipping Info</FooterLink>
              </ul>
            </div>

            <div className="space-y-6 col-span-2 sm:col-span-1">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#9d2936]">
                Support
              </h3>
              <ul className="space-y-4 text-sm">
                <FooterLink href="/contact">Contact Us</FooterLink>
                <FooterLink href="/faq">FAQ's</FooterLink>
                <FooterLink href="/careers">Careers</FooterLink>
              </ul>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#9d2936]">
              Stay Inspired
            </h3>
            <p className="text-white/60 text-sm">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="relative group">
              <input 
                type="email" 
                placeholder="Email address"
                className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3 text-sm outline-none transition-all duration-300 focus:bg-white/10 focus:border-[#9d2936] focus:ring-1 focus:ring-[#9d2936]/20"
              />
              <button 
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-4 bg-[#9d2936] text-white rounded-full transition-transform duration-300 hover:scale-105 active:scale-95"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Contact info bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-10 border-t border-b border-white/5 mb-8">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl bg-white/5 text-[#9d2936]">
              <Phone size={20} />
            </div>
            <div>
              <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Call Us</p>
              <p className="text-sm font-medium text-white/80">+91-40-23231147</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl bg-white/5 text-[#9d2936]">
              <Mail size={20} />
            </div>
            <div>
              <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Email</p>
              <p className="text-sm font-medium text-white/80">web@rangam.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4 sm:col-span-2 lg:col-span-1">
            <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl bg-white/5 text-[#9d2936]">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Our HQ</p>
              <p className="text-sm font-medium text-white/80">Road No. 10, Banjara Hills, Hyderabad</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/30 tracking-wide uppercase font-medium">
          <p>© {new Date().getFullYear()} Rangam. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-white transition-colors">Accessibility</Link>
            <Link href="/" className="hover:text-white transition-colors">Cookie Policy</Link>
            <Link href="/" className="hover:text-white transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;