import Image from "next/image";

/** Vaarahi-style gold wordmark for Rangam Silk Sarees. */
export function RoyalWordmark() {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="font-serif-royal text-xl font-semibold tracking-[0.26em] text-[var(--nav-royal-gold-bright)] sm:text-2xl lg:text-[2.15rem] lg:tracking-[0.32em]">
        RA
        <span className="mx-0.5 inline-block translate-y-px text-[0.5em] font-normal text-[var(--nav-royal-gold)]">
          ✦
        </span>
        NGAM
      </span>
      <p className="font-serif-royal mt-0.5 text-[11px] font-medium tracking-[0.42em] text-[var(--nav-royal-gold)] sm:text-xs lg:text-[13px]">
        <span className="text-[var(--nav-royal-gold)]/70">—</span>
        <span className="px-1.5">SILK SAREES</span>
        <span className="text-[var(--nav-royal-gold)]/70">—</span>
      </p>
    </div>
  );
}

export function RangamLogo() {
  return (
    <div className="flex items-center">
      <Image
        src="/WhatsApp_Image_2025-06-02_at_12_39_05_PM-removebg-preview.png"
        alt="Rangam The Fashion House"
        width={190}
        height={190}
        priority
        className="block h-[26px] w-auto object-contain sm:h-[38px] lg:h-[64px]"
      />
    </div>
  );
}
