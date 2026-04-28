import React from 'react';

const PrivacyPolicy = () => {
  const policies = [
  "We collect basic customer details like name, phone number, email, and address to process orders.",
  "Your personal information is kept secure and used only for order processing and delivery.",
  "We do not sell or share your personal information with third parties.",
  "Payment details are handled securely through trusted payment gateways.",
  "We may use your contact details to send order updates and important notifications.",
  "Your information may be shared with delivery partners only for shipping purposes.",
  "We take reasonable measures to protect your data from unauthorized access.",
  "We do not store sensitive payment information like card details on our servers.",
  "By using our website, you agree to our privacy practices.",
  "We may update this policy at any time, and changes will be reflected on this page."
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