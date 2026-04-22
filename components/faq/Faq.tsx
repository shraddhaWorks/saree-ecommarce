'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowLeft, HelpCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Faq = () => {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What makes Rangam Adi Silks unique?",
      answer: "We source our sarees directly from master weavers across India. Each piece is hand-selected to ensure the highest quality of silk, authentic zari work, and traditional craftsmanship that has been passed down through generations."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship our heritage collection worldwide. Shipping costs and delivery timelines vary by country. You can see the specific rates at checkout."
    },
    {
      question: "How should I care for my silk saree?",
      answer: "We recommend dry cleaning only for all our silk products. Always store your sarees in a cool, dry place wrapped in a clean cotton cloth (muslin) to allow the fabric to breathe and protect the zari."
    },
    {
      question: "Can I customize the blouse or tassels?",
      answer: "Currently, we provide the unstitched blouse piece attached to the saree. For specific tassel (kuchu) requests, please contact our support team immediately after placing your order."
    },
    {
      question: "What is your return policy?",
      answer: "As our products are handcrafted, we only accept returns in the case of genuine manufacturing defects. Please record an unboxing video to assist us in processing your request smoothly."
    },
    {
      question: "Are the colors exactly as shown in the images?",
      answer: "While we strive for 100% accuracy using professional lighting, slight variations may occur due to digital screen settings and the natural sheen of pure silk."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-16 animate-page-entrance">
     

      {/* Heading Section */}
      <div className="text-center mb-16">
        <h1 className="font-serif-royal text-4xl md:text-6xl text-foreground mb-4">
          Common <span className="text-accent">Queries</span>
        </h1>
        <div className="h-1 w-24 bg-accent-soft mx-auto rounded-full" />
        <p className="mt-8 text-foreground/70 italic">
          Everything you need to know about our weaves and services.
        </p>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="bg-surface border border-border-soft rounded-2xl overflow-hidden transition-all"
          >
            <button
              onClick={() => toggleFaq(index)}
              className="w-full p-6 md:p-8 flex items-center justify-between text-left gap-4 focus:outline-none"
            >
              <div className="flex gap-4 items-center">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-surface-strong text-accent flex items-center justify-center font-serif-royal text-sm border border-border-soft">
                  {index + 1}
                </span>
                <span className="font-serif-royal text-xl text-foreground leading-tight">
                  {faq.question}
                </span>
              </div>
              <div className="text-accent-soft">
                {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </button>

            {/* Answer section with smooth-ish transition logic */}
            {openIndex === index && (
              <div className="px-6 md:px-8 pb-8 ml-12">
                <div className="h-px w-full bg-border-soft mb-6" />
                <p className="text-foreground/80 leading-relaxed max-w-2xl">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Help Banner */}
      <div className="mt-16 bg-surface-strong border border-border-soft rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-surface rounded-xl text-accent shadow-sm">
            <HelpCircle size={24} />
          </div>
          <div>
            <h4 className="font-serif-royal text-lg text-foreground">Still have questions?</h4>
            <p className="text-sm text-foreground/60">Our experts are happy to help you with your purchase.</p>
          </div>
        </div>
        <button 
          onClick={() => router.push('/contact')}
          className="px-8 py-3 bg-accent text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-accent/90 transition-colors"
        >
          Contact Support
        </button>
      </div>

      <p className="mt-12 text-center text-sm text-foreground/40 italic font-serif-royal">
        © {new Date().getFullYear()} Rangam Adi Silks — Preserving the Art of Weaving.
      </p>
    </section>
  );
};

export default Faq;