'use client';

import React from 'react';
import RevealSection from '@/components/reveal-section';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Mail } from 'lucide-react';
import posthog from 'posthog-js';

const CHECKLIST_ITEMS = [
  'Live walkthrough using a real company analysis, not a scripted demo',
  'Your current research process mapped onto the canvas',
  'Honest answers on integrations, data sources, and what is still being built',
];

const ContactSection: React.FC = () => {
  return (
    <RevealSection
      id="contact"
      testId="contact-section"
      className="py-12 sm:py-16 lg:py-20"
      trackAs="contact"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Badge
          variant="secondary"
          className="rounded-full px-4 py-1.5 text-xs font-medium mb-6 inline-flex"
          style={{
            backgroundColor: 'hsl(196 55% 90%)',
            color: 'hsl(196 55% 38%)',
            border: '1px solid hsl(196 55% 80%)',
          }}
        >
          Early Access
        </Badge>

        <h2
          className="text-3xl sm:text-4xl leading-[1.12] tracking-[-0.015em] mb-4"
          style={{
            fontFamily: "var(--font-gloock), 'Gloock', serif",
            color: 'hsl(222 35% 12%)',
          }}
        >
          See it run on a real research workflow
        </h2>

        <p
          className="text-base md:text-lg leading-relaxed mb-8"
          style={{ color: 'hsl(222 18% 34%)' }}
        >
          We walk you through the n4a platform using an actual equity research
          scenario. Your sector, your workflow, your questions.
          Thirty minutes. No slides. No pitch.
        </p>

        <div className="flex flex-col items-center gap-3 mb-10">
          {CHECKLIST_ITEMS.map((item, i) => (
            <div key={i} className="flex items-start gap-3 text-left max-w-lg w-full">
              <CheckCircle2
                className="h-4 w-4 mt-0.5 shrink-0"
                style={{ color: 'hsl(162 45% 40%)' }}
              />
              <span
                className="text-sm leading-relaxed"
                style={{ color: 'hsl(222 18% 34%)' }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>

        <Button
          render={<a href="mailto:cmarathe1@gmail.com" />}
          nativeButton={false}
          data-testid="contact-email-button"
          className="rounded-xl bg-[hsl(222_45%_16%)] text-white px-8 py-3 text-sm font-medium shadow-lg hover:bg-[hsl(222_45%_14%)] hover:-translate-y-0.5 active:scale-[0.98] transition-all"
          onClick={() => posthog.capture('contact_email_clicked', { location: 'contact_section' })}
        >
          Request a Walkthrough
          <Mail className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </RevealSection>
  );
};

export default ContactSection;
