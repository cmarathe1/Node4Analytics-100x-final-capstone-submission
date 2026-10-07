'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Badge } from '@/components/ui/badge';
import { Link2, Layers, Shield, Clock } from 'lucide-react';

/* ---------- Types ---------- */
type LucideIcon = React.ComponentType<{
  className?: string;
  style?: React.CSSProperties;
}>;

interface ValueProp {
  icon: LucideIcon;
  title: string;
  accent: string;
  accentSoft: string;
  problem: string;
  solution: string;
}

/* ---------- Data ---------- */
const VALUE_PROPS: ValueProp[] = [
  {
    icon: Link2,
    title: 'One Platform That Connects It All',
    accent: 'hsl(196 55% 38%)',
    accentSoft: 'hsl(196 55% 90%)',
    problem:
      'Every tool change is a context reset. Filings in one tab, model in another, notes somewhere else.',
    solution:
      'n4a runs the full research cycle from discovery through reporting without asking you to start over between steps.',
  },
  {
    icon: Layers,
    title: 'Context That Carries Forward',
    accent: 'hsl(162 45% 40%)',
    accentSoft: 'hsl(162 45% 90%)',
    problem:
      'Your generic AI assistant does not know what is in the Excel you opened two windows ago. Neither does the next one.',
    solution:
      'Every node in your workflow shares the same research context. When you reach the report, the AI already knows what data you built it on.',
  },
  {
    icon: Shield,
    title: 'Every Number Has a Source',
    accent: 'hsl(222 45% 35%)',
    accentSoft: 'hsl(222 30% 92%)',
    problem:
      '"Where did this come from?" is a question that should never slow down a final review.',
    solution:
      'Every figure, claim, and insight in your report links directly to the source document it came from. Built for source review.',
  },
  {
    icon: Clock,
    title: 'AI That Works With Your Judgment',
    accent: 'hsl(24 85% 52%)',
    accentSoft: 'hsl(24 85% 92%)',
    problem:
      'Most AI tools answer confidently from sources you cannot verify. That is not useful when the output influences a real decision.',
    solution:
      'n4a AI surfaces relevant content, extracts key insights, and compels critical thinking to drafts grounded in your selected sources.',
  },
];

/* ---------- BenefitCard ---------- */
interface BenefitCardProps {
  prop: ValueProp;
  index: number;
  Icon: LucideIcon;
  shouldReduceMotion: boolean | null;
}

const BenefitCard: React.FC<BenefitCardProps> = ({
  prop,
  index,
  Icon,
  shouldReduceMotion,
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0 });
  const stickyTop = 68 + index * 54;

  const cardStyle: React.CSSProperties = {
    top: `${stickyTop}px`,
    borderColor: 'hsl(214 20% 88%)',
    boxShadow: `0 ${4 + index * 2}px ${20 + index * 6}px rgba(15,23,42,${0.06 + index * 0.015})`,
    zIndex: index + 1,
  };

  if (shouldReduceMotion) {
    return (
      <div
        ref={ref}
        data-testid={`benefit-card-${index + 1}`}
        className="sticky rounded-2xl bg-white border overflow-hidden"
        style={cardStyle}
      >
        <CardContent prop={prop} Icon={Icon} />
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      data-testid={`benefit-card-${index + 1}`}
      className="sticky rounded-2xl bg-white border overflow-hidden"
      style={cardStyle}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{
        delay: 0.05,
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <CardContent prop={prop} Icon={Icon} />
    </motion.div>
  );
};

/* ---------- CardContent (shared between motion/static) ---------- */
interface CardContentProps {
  prop: ValueProp;
  Icon: LucideIcon;
}

const CardContent: React.FC<CardContentProps> = ({ prop, Icon }) => (
  <>
    <div
      className="flex items-center gap-2.5 px-5 py-3 border-b"
      style={{ borderColor: 'hsl(214 20% 92%)' }}
    >
      <div
        className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
        style={{ backgroundColor: prop.accentSoft }}
      >
        <Icon className="h-3.5 w-3.5" style={{ color: prop.accent }} />
      </div>
      <h3
        className="text-sm sm:text-base font-semibold leading-snug"
        style={{ color: prop.accent }}
      >
        {prop.title}
      </h3>
    </div>
    <div className="grid sm:grid-cols-2 gap-0">
      <div
        className="p-4 sm:p-5"
        style={{ backgroundColor: 'rgba(239, 68, 68, 0.06)' }}
      >
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'hsl(0 50% 35%)' }}
        >
          {prop.problem}
        </p>
      </div>
      <div
        className="p-4 sm:p-5"
        style={{ backgroundColor: 'rgba(34, 197, 94, 0.06)' }}
      >
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'hsl(152 50% 28%)' }}
        >
          {prop.solution}
        </p>
      </div>
    </div>
  </>
);

/* ---------- ValuePropsSection ---------- */
const ValuePropsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="benefits"
      data-testid="benefits-section"
      className="pt-12 sm:pt-16 lg:pt-20 pb-4"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-14">
          <Badge
            variant="secondary"
            className="rounded-full px-4 py-1.5 text-xs font-medium mb-4"
            style={{
              backgroundColor: 'hsl(24 85% 92%)',
              color: 'hsl(24 85% 52%)',
              border: '1px solid hsl(24 85% 82%)',
            }}
          >
            Why Analysts Switch
          </Badge>
          <h2
            className="text-3xl sm:text-4xl leading-[1.12] tracking-[-0.015em] mt-4"
            style={{
              fontFamily: "var(--font-gloock), 'Gloock', serif",
              color: 'hsl(222 35% 12%)',
            }}
          >
            Your research lives in six tools. It shouldn&apos;t.
          </h2>
          <p
            className="text-base md:text-lg leading-relaxed mt-4 max-w-[58ch] mx-auto"
            style={{ color: 'hsl(222 18% 34%)' }}
          >
            Between screeners, filings, Excel, Word, and email, research context
            gets scattered. Node4analytics brings the workflow together.
          </p>
        </div>

        {/* Sticky stacking cards */}
        <div className="relative">
          <div className="space-y-10">
            {VALUE_PROPS.map((prop, i) => {
              const Icon = prop.icon;
              return (
                <BenefitCard
                  key={prop.title}
                  prop={prop}
                  index={i}
                  Icon={Icon}
                  shouldReduceMotion={shouldReduceMotion}
                />
              );
            })}
          </div>
          <div className="h-[50vh]" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default ValuePropsSection;
