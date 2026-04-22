'use client';

import React from 'react';
import { ArrowLeft, Briefcase, Star, Users, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CareersPage() {
  const router = useRouter();

  const openings = [
    {
      role: "Master Sourcing Specialist",
      type: "Full-time",
      location: "Kanchipuram / Remote",
      description: "Liaise with master weavers to curate our seasonal bridal collections."
    },
    {
      role: "Heritage Storyteller (Content)",
      type: "Contract",
      location: "Bangalore / Remote",
      description: "Write compelling narratives about Indian textiles and weaving history."
    },
    {
      role: "Client Relations Associate",
      type: "Full-time",
      location: "Chennai Studio",
      description: "Provide personalized styling consultations for our global clientele."
    }
  ];

  return (
    <section className="max-w-5xl mx-auto px-6 py-16 animate-page-entrance">
      {/* Back Button */}
     

      {/* Heading Section */}
      <div className="text-center mb-16">
        <h1 className="font-serif-royal text-4xl md:text-6xl text-foreground mb-4">
          Join the <span className="text-accent">Legacy</span>
        </h1>
        <div className="h-1 w-24 bg-accent-soft mx-auto rounded-full" />
        <p className="mt-8 text-foreground/70 max-w-2xl mx-auto leading-relaxed">
          At Rangam Adi Silks, we don't just sell sarees; we preserve a thousand-year-old 
          tradition. We are looking for passionate individuals to help us weave the 
          future of Indian heritage.
        </p>
      </div>

      {/* Culture Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {[
          { icon: <Star size={20} />, title: "Artisanal Focus", desc: "Work closely with the heart of Indian weaving." },
          { icon: <Users size={20} />, title: "Vibrant Team", desc: "Collaborate with experts in fashion and heritage." },
          { icon: <Briefcase size={20} />, title: "Growth", desc: "Build a career in the luxury ethnic wear space." }
        ].map((item, i) => (
          <div key={i} className="bg-surface-strong/50 p-6 rounded-2xl border border-border-soft text-center">
            <div className="text-accent flex justify-center mb-4">{item.icon}</div>
            <h3 className="font-serif-royal text-lg mb-2">{item.title}</h3>
            <p className="text-sm text-foreground/60">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Job Openings */}
      <div className="space-y-6">
        <h2 className="font-serif-royal text-3xl text-foreground mb-8 text-center">Openings</h2>
        <p className="text-foreground/70 max-w-2xl mx-auto">
          Update soon with our current openings. We are always looking for passionate individuals to join our team and help us preserve the rich heritage of Indian weaving. If you have a love for textiles, fashion, and culture, we encourage you to reach out to us even if there isn't a current opening that fits your profile.
        </p>
       {/**  {openings.map((job, index) => (
          <div 
            key={index} 
            className="bg-surface border border-border-soft rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 group transition-colors hover:border-accent/30"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h3 className="font-serif-royal text-2xl text-foreground">{job.role}</h3>
                <span className="text-[10px] bg-accent/10 text-accent px-2 py-1 rounded-md uppercase font-bold tracking-tighter">
                  {job.type}
                </span>
              </div>
              <div className="flex items-center gap-2 text-foreground/50 text-sm italic">
                <MapPin size={14} />
                {job.location}
              </div>
              <p className="text-foreground/70 max-w-xl pt-2">
                {job.description}
              </p>
            </div>
            
            <a 
              href="mailto:careers@rangamadisilks.com"
              className="inline-flex items-center justify-center px-8 py-3 bg-surface-strong border border-border-soft text-accent rounded-full text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all"
            >
              Apply Now
            </a>
          </div>
        ))}
          */}
      </div>

      <p className="mt-12 text-center text-sm text-foreground/40 italic font-serif-royal">
        © {new Date().getFullYear()} Rangam Adi Silks — Preserving the Art of Weaving.
      </p>
    </section>
  );
}