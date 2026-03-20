"use client";

import Image from "next/image";

const collections = [
  { title: "Handwoven Silks", img: "/handwoven_silks.webp" },
  { title: "Zari Classics", img: "/Zari_Classics.webp" },
  { title: "Motif Heritage", img: "/Motif_Heritage.webp" },
  { title: "Contemporary", img: "/Contemporary_Weaves.webp" },
];

export default function Crafts() {
  return (
    <section className="w-full py-10 bg-white">
      {/* Header */}
      <div className="px-6 mb-8">
        <h2 className="text-xl md:text-3xl font-semibold text-foreground text-center">
          Discover timeless crafts
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-6">
        {collections.map((item, index) => (
          <div key={index} className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-xl bg-surface">
              
              {/* IMAGE */}
              <Image
                src={item.img}
                alt={item.title}
                width={400}
                height={600}
                className="w-full h-[400px] object-cover object-[center_top] transition duration-500 group-hover:scale-105"
              />

              {/* subtle gradient (theme-based) */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--foreground)/60] via-transparent to-transparent" />

              {/* TITLE */}
              <h3 className="absolute left-5 bottom-8 text-white text-lg md:text-xl font-semibold transition-all duration-300 group-hover:bottom-12">
                {item.title}
              </h3>

              {/* ARROW */}
              <div className="absolute right-5 bottom-5 w-12 h-12 border-2 border-white rounded-full flex items-center justify-center text-white transition duration-300 group-hover:rotate-[-30deg]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12H19M19 12L13 6M19 12L13 18"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}