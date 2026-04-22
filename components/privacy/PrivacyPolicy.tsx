import React from 'react';

const PrivacyPolicy = () => {
  const policies = [
    "We collect personal information like name, email, and address only to process your orders.",
    "Your payment details are encrypted and processed securely through verified gateways.",
    "We do not sell, trade, or rent your personal information to any third parties.",
    "Cookies are used to enhance your browsing experience and remember your preferences.",
    "We may use your contact information to send updates about your order or promotional offers.",
    "Users have the right to request access to or deletion of their personal data at any time.",
    "Browser data is collected anonymously to help us improve our website performance.",
    "Third-party services (like couriers) only receive the data necessary to complete delivery.",
    "We implement industry-standard security measures to protect your data from unauthorized access.",
    "Any changes to our privacy practices will be updated on this page immediately."
  ];

  return (
    <section className="max-w-4xl mx-auto px-6 py-16 animate-page-entrance">
      {/* Heading Section */}
      <div className="text-center mb-12">
        <h1 className="font-serif-royal text-4xl md:text-5xl text-foreground mb-4">
          Privacy <span className="text-accent">Policy</span>
        </h1>
        <div className="h-1 w-24 bg-accent-soft mx-auto rounded-full" />
        <p className="mt-6 text-foreground/70 italic">
          Last updated: April 2026
        </p>
      </div>

      {/* Content Card */}
      <div className="bg-surface border border-border-soft rounded-2xl shadow-sm overflow-hidden">
        <div className="p-8 md:p-12 space-y-6">
          {policies.map((policy, index) => (
            <div 
              key={index} 
              className="flex gap-4 items-start group transition-all hover:translate-x-1"
            >
              <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-surface-strong text-accent font-serif-royal text-sm border border-border-soft">
                {index + 1}
              </span>
              <p className="text-foreground leading-relaxed pt-1 group-hover:text-black transition-colors">
                {policy}
              </p>
            </div>
          ))}
        </div>

        {/* Decorative Footer inside card */}
        <div className="bg-surface-strong p-6 text-center border-t border-border-soft">
          <p className="text-sm text-foreground/60">
            © {new Date().getFullYear()} Rangam Adi Silks. Your privacy is our priority.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;