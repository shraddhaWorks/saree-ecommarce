import React from 'react';

const TermsAndConditions = () => {
  const terms = [
    "By using this website, you agree to follow all terms and policies mentioned here.",
    "All products listed are subject to availability.",
    "Prices of products may change without prior notice.",
    "We try to display product details and images accurately, but slight variations may occur.",
    "Once an order is placed, it cannot be modified or cancelled after processing.",
    "Payments must be made through the available payment methods on the website.",
    "We are not responsible for delays caused by courier or external factors.",
    "Users should not misuse the website or engage in any fraudulent activity.",
    "All content on this website is the property of Rangam Adi Silks.",
    "We reserve the right to update or change these terms at any time."
  ];

  return (
    <section className="max-w-4xl mx-auto px-6 py-16 animate-page-entrance">
      {/* Heading Section */}
      <div className="text-center mb-12">
        <h1 className="font-serif-royal text-4xl md:text-5xl text-foreground mb-4">
          Terms & <span className="text-accent">Conditions</span>
        </h1>
        <div className="h-1 w-24 bg-accent-soft mx-auto rounded-full" />
        <p className="mt-6 text-foreground/70 italic">
          Last updated: April 2026
        </p>
      </div>

      {/* Content Card */}
      <div className="bg-surface border border-border-soft rounded-2xl shadow-sm overflow-hidden">
        <div className="p-8 md:p-12 space-y-6">
          {terms.map((term, index) => (
            <div 
              key={index} 
              className="flex gap-4 items-start group transition-all hover:translate-x-1"
            >
              <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-surface-strong text-accent font-serif-royal text-sm border border-border-soft">
                {index + 1}
              </span>
              <p className="text-foreground leading-relaxed pt-1 group-hover:text-black transition-colors">
                {term}
              </p>
            </div>
          ))}
        </div>

        {/* Decorative Footer inside card */}
        <div className="bg-surface-strong p-6 text-center border-t border-border-soft">
          <p className="text-sm text-foreground/60">
            © {new Date().getFullYear()} Rangam Adi Silks. All Rights Reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;