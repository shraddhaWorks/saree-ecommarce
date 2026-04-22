import React from 'react';

const ShippingInfo = () => {
  const shippingPoints = [
    "We offer free standard shipping on all domestic orders across India.",
    "Orders are typically processed and dispatched within 24 to 48 business hours.",
    "Domestic deliveries usually take 5–7 business days depending on the location.",
    "International shipping is available, with delivery timelines ranging from 10–15 business days.",
    "Tracking details will be shared via Email and WhatsApp once the order is handed over to our courier partner.",
    "We partner with reputed services like BlueDart, Delhivery, and DHL to ensure safe handling of your silks.",
    "For international orders, any custom duties or import taxes levied by the destination country are to be borne by the customer.",
    "Please ensure the shipping address and contact number are accurate to avoid delivery delays or RTO (Return to Origin).",
    "In case of multiple items in one order, they may occasionally be shipped separately based on availability.",
    "Delivery attempts are usually made thrice; failure to receive the parcel may result in the order being returned to our warehouse."
  ];

  return (
    <section className="max-w-4xl mx-auto px-6 py-16 animate-page-entrance">
      {/* Heading Section */}
      <div className="text-center mb-12">
        <h1 className="font-serif-royal text-4xl md:text-5xl text-foreground mb-4">
          Shipping <span className="text-accent">& Delivery</span>
        </h1>
        <div className="h-1 w-24 bg-accent-soft mx-auto rounded-full" />
        <p className="mt-6 text-foreground/70 italic">
          Last updated: April 2026
        </p>
      </div>

      {/* Content Card */}
      <div className="bg-surface border border-border-soft rounded-2xl shadow-sm overflow-hidden">
        <div className="p-8 md:p-12 space-y-6">
          {shippingPoints.map((point, index) => (
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
            © {new Date().getFullYear()} Rangam Adi Silks. Delivering elegance to your doorstep.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ShippingInfo;