import React from 'react';

const ReturnPolicy = () => {
  const points = [
    "Returns are only accepted for damaged products or if the wrong item was dispatched.",
    "Requests for returns must be raised within 48 hours of receiving the parcel.",
    "A clear, unedited unboxing video (from start to finish) is mandatory for processing claims.",
    "The product must be unused, unwashed, and returned in its original fold with all tags intact.",
    "Minor variations in color or thread pulls are inherent to handloom and are not considered defects.",
    "Once the return is approved, the item must be shipped back to us within 5 working days.",
    "Refunds will be processed to the original payment method after a quality check at our warehouse.",
    "Shipping charges paid at the time of purchase are non-refundable.",
    "Customized products (e.g., sarees with stitched blouses) are not eligible for return or exchange.",
    "Sale items are considered final sale and cannot be returned or exchanged."
  ];

  return (
    <section className="max-w-4xl mx-auto px-6 py-16 animate-page-entrance">
      {/* Heading Section */}
      <div className="text-center mb-12">
        <h1 className="font-serif-royal text-4xl md:text-5xl text-foreground mb-4">
          Return & <span className="text-accent">Refund</span>
        </h1>
        <div className="h-1 w-24 bg-accent-soft mx-auto rounded-full" />
        <p className="mt-6 text-foreground/70 italic">
          Last updated: April 2026
        </p>
      </div>

      {/* Content Card */}
      <div className="bg-surface border border-border-soft rounded-2xl shadow-sm overflow-hidden">
        <div className="p-8 md:p-12 space-y-6">
          {points.map((point, index) => (
            <div 
              key={index} 
              className="flex gap-4 items-start group transition-all hover:translate-x-1"
            >
              <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-surface-strong text-accent font-serif-royal text-sm border border-border-soft">
                {index + 1}
              </span>
              <p className="text-foreground leading-relaxed pt-1 group-hover:text-black transition-colors">
                {point}
              </p>
            </div>
          ))}
        </div>

        {/* Decorative Footer inside card */}
        <div className="bg-surface-strong p-6 text-center border-t border-border-soft">
          <p className="text-sm text-foreground/60">
            © {new Date().getFullYear()} Rangam Adi Silks. Quality and trust in every thread.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReturnPolicy;