'use client';

import React from 'react';
import { Phone, Mail, MapPin, Clock, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Contact = () => {
  const router = useRouter();

  const contactMethods = [
    {
      icon: <Phone size={24} />,
      title: "Call Support",
      detail: "+91 81069 62752",
      subDetail: "Speak with our fabric experts",
      href: "tel:+918106962752"
    },
    {
      icon: <Mail size={24} />,
      title: "Write To Us",
      detail: "rangam.venkatsai@gmail.com",
      subDetail: "Response within 24 hours",
      href: "mailto:rangam.venkatsai@gmail.com"
    },
   
  ];

  return (
    <section className="max-w-5xl mx-auto px-6 py-16 animate-page-entrance">
     
      {/* Heading Section */}
      <div className="text-center mb-16">
        <h1 className="font-serif-royal text-4xl md:text-6xl text-foreground mb-4">
          Get in <span className="text-accent">Touch</span>
        </h1>
        <div className="h-1 w-24 bg-accent-soft mx-auto rounded-full" />
        <p className="mt-8 text-foreground/70 max-w-2xl mx-auto leading-relaxed">
          Whether you are looking for a bridal masterpiece or have a question about our 
          weaving process, the Rangam Adi Silks team is here to assist you.
        </p>
      </div>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contactMethods.map((method, index) => {
          const Wrapper = method.href ? 'a' : 'div';
          
          return (
            <Wrapper
              key={index}
              href={method.href || undefined}
              target={method.href?.startsWith('http') ? '_blank' : undefined}
              rel={method.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`bg-surface border border-border-soft rounded-2xl p-8 flex flex-col items-center text-center transition-colors ${method.href ? 'hover:border-accent/30 cursor-pointer' : ''}`}
            >
              <div className="w-14 h-14 rounded-full bg-surface-strong border border-border-soft flex items-center justify-center text-accent mb-6">
                {method.icon}
              </div>
              
              <h3 className="font-serif-royal text-xl text-foreground mb-2">
                {method.title}
              </h3>
              
              <p className="text-lg font-medium text-foreground mb-1">
                {method.detail}
              </p>
              
              <p className="text-sm text-foreground/50 italic">
                {method.subDetail}
              </p>

              {method.href && (
                <span className="mt-6 text-[10px] uppercase tracking-widest font-bold text-accent border-b border-accent/20 pb-1">
                  Open {method.title.split(' ')[0]}
                </span>
              )}
            </Wrapper>
          );
        })}
      </div>

      {/* Decorative Footer */}
      <div className="mt-16 text-center">
        <div className="bg-surface border border-border-soft rounded-2xl p-8">
          <p className="font-serif-royal text-2xl text-foreground italic">
            "Every thread tells a story. We'd love to hear yours."
          </p>
          <p className="mt-4 text-sm text-foreground/60">
            © {new Date().getFullYear()} Rangam Adi Silks. All Rights Reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;