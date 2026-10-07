'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Database,
  BarChart3,
  LayoutDashboard,
  FileSpreadsheet,
  FileText,
} from 'lucide-react';

/* ---------- Types ---------- */
type LucideIcon = React.ComponentType<{
  className?: string;
  style?: React.CSSProperties;
}>;

interface WorkflowStep {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: 'fq-accent' | 'fq-mint' | 'fq-peach';
}

/* ---------- Data ---------- */
const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: '01',
    title: 'Find Every Filing That Matters',
    description:
      'Search any public company and pull its filings, earnings transcripts, news coverage, and analyst reports into a single structured view. Nothing scattered across tabs.',
    icon: Search,
    accent: 'fq-accent',
  },
  {
    step: '02',
    title: 'Build Your Research Foundation',
    description:
      'Choose the documents that belong in your analysis. n4a organizes them into a structured research base where every source stays tagged and traceable from the start.',
    icon: Database,
    accent: 'fq-mint',
  },
  {
    step: '03',
    title: 'Surface the Signal',
    description:
      'AI reads your selected documents and surfaces key metrics, trend indicators, and data visualizations. You see exactly where each insight came from. You decide which ones matter.',
    icon: BarChart3,
    accent: 'fq-peach',
  },
  {
    step: '04',
    title: 'Wire Your Workflow on Canvas',
    description:
      'Drop data sources, analysis tools, and output nodes onto an infinite canvas. Connect them. This is your research process made visible and editable.',
    icon: LayoutDashboard,
    accent: 'fq-accent',
  },
  {
    step: '05',
    title: 'Model in Spreadsheets You Already Know',
    description:
      'The spreadsheet works the way you expect it to, but now with an AI assistant connected to the context you need. It assists your analysis without guessing at what the numbers mean.',
    icon: FileSpreadsheet,
    accent: 'fq-mint',
  },
  {
    step: '06',
    title: 'Write the Report with Confidence',
    description:
      'Connect your analysis to a document node and generate a first-draft analyst report. Every insight links back to its source document. You edit, verify, and send with confidence.',
    icon: FileText,
    accent: 'fq-peach',
  },
];

/* ---------- Helpers ---------- */
function getAccentColors(accent: WorkflowStep['accent']): {
  accentColor: string;
  softColor: string;
} {
  switch (accent) {
    case 'fq-accent':
      return {
        accentColor: 'hsl(196 55% 38%)',
        softColor: 'hsl(196 55% 90%)',
      };
    case 'fq-mint':
      return {
        accentColor: 'hsl(162 45% 40%)',
        softColor: 'hsl(162 45% 90%)',
      };
    case 'fq-peach':
      return {
        accentColor: 'hsl(24 85% 62%)',
        softColor: 'hsl(24 85% 92%)',
      };
  }
}

/* ---------- WorkflowCard ---------- */
interface WorkflowCardProps {
  step: WorkflowStep;
  Icon: LucideIcon;
  accentColor: string;
  softColor: string;
  inView: boolean;
  shouldReduceMotion: boolean | null;
  slideFrom: 'left' | 'right';
}

const WorkflowCard: React.FC<WorkflowCardProps> = ({
  step,
  Icon,
  accentColor,
  softColor,
  inView,
  shouldReduceMotion,
  slideFrom,
}) => {
  const initial =
    slideFrom === 'left'
      ? { opacity: 0, x: -32 }
      : { opacity: 0, x: 32 };

  if (shouldReduceMotion) {
    return (
      <div
        className="rounded-2xl bg-white border overflow-hidden"
        style={{
          borderColor: 'hsl(214 20% 88%)',
          boxShadow:
            '0 1px 0 rgba(15,23,42,0.03), 0 8px 24px rgba(15,23,42,0.06)',
        }}
      >
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-2.5 mb-2">
            <div
              className="flex items-center justify-center w-7 h-7 rounded-lg shrink-0"
              style={{ backgroundColor: softColor }}
            >
              <Icon
                className="h-3.5 w-3.5"
                style={{ color: accentColor }}
              />
            </div>
            <h3
              className="text-lg sm:text-xl font-medium leading-snug"
              style={{ color: 'hsl(222 35% 12%)' }}
            >
              {step.title}
            </h3>
          </div>
          <p
            className="text-sm sm:text-base leading-relaxed ml-9.5"
            style={{ color: 'hsl(222 18% 34%)' }}
          >
            {step.description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="rounded-2xl bg-white border overflow-hidden"
      style={{
        borderColor: 'hsl(214 20% 88%)',
        boxShadow:
          '0 1px 0 rgba(15,23,42,0.03), 0 8px 24px rgba(15,23,42,0.06)',
      }}
      initial={initial}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : initial}
      transition={{
        delay: 0.12,
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-2.5 mb-2">
          <div
            className="flex items-center justify-center w-7 h-7 rounded-lg shrink-0"
            style={{ backgroundColor: softColor }}
          >
            <Icon
              className="h-3.5 w-3.5"
              style={{ color: accentColor }}
            />
          </div>
          <h3
            className="text-base sm:text-[17px] font-medium leading-snug"
            style={{ color: 'hsl(222 35% 12%)' }}
          >
            {step.title}
          </h3>
        </div>
        <p
          className="text-[13px] sm:text-sm leading-relaxed ml-[38px]"
          style={{ color: 'hsl(222 18% 34%)' }}
        >
          {step.description}
        </p>
      </div>
    </motion.div>
  );
};

/* ---------- DesktopFlowNode ---------- */
interface DesktopFlowNodeProps {
  step: WorkflowStep;
  index: number;
  Icon: LucideIcon;
  accentColor: string;
  softColor: string;
  isEven: boolean;
  shouldReduceMotion: boolean | null;
}

const DesktopFlowNode: React.FC<DesktopFlowNodeProps> = ({
  step,
  Icon,
  accentColor,
  softColor,
  isEven,
  shouldReduceMotion,
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div ref={ref} className="grid grid-cols-[1fr_56px_1fr] items-center py-4">
      {isEven ? (
        <WorkflowCard
          step={step}
          Icon={Icon}
          accentColor={accentColor}
          softColor={softColor}
          inView={inView}
          shouldReduceMotion={shouldReduceMotion}
          slideFrom="left"
        />
      ) : (
        <div />
      )}

      <div className="flex items-center justify-center relative z-10">
        {shouldReduceMotion ? (
          <div
            className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white border-2 shadow-md"
            style={{ borderColor: accentColor }}
          >
            <Icon className="h-5 w-5" style={{ color: accentColor }} />
          </div>
        ) : (
          <motion.div
            className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white border-2 shadow-md"
            style={{ borderColor: accentColor }}
            initial={{ scale: 0, opacity: 0 }}
            animate={
              inView
                ? { scale: 1, opacity: 1 }
                : { scale: 0, opacity: 0 }
            }
            transition={{
              delay: 0.08,
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Icon className="h-5 w-5" style={{ color: accentColor }} />
          </motion.div>
        )}
      </div>

      {!isEven ? (
        <WorkflowCard
          step={step}
          Icon={Icon}
          accentColor={accentColor}
          softColor={softColor}
          inView={inView}
          shouldReduceMotion={shouldReduceMotion}
          slideFrom="right"
        />
      ) : (
        <div />
      )}
    </div>
  );
};

/* ---------- MobileFlowNode ---------- */
interface MobileFlowNodeProps {
  step: WorkflowStep;
  index: number;
  Icon: LucideIcon;
  accentColor: string;
  softColor: string;
  shouldReduceMotion: boolean | null;
}

const MobileFlowNode: React.FC<MobileFlowNodeProps> = ({
  step,
  Icon,
  accentColor,
  softColor,
  shouldReduceMotion,
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-[48px_1fr] gap-3 items-start"
    >
      <div className="flex justify-center relative z-10 pt-1">
        {shouldReduceMotion ? (
          <div
            className="flex items-center justify-center w-12 h-12 rounded-xl bg-white border-2 shadow-sm"
            style={{ borderColor: accentColor }}
          >
            <Icon className="h-4 w-4" style={{ color: accentColor }} />
          </div>
        ) : (
          <motion.div
            className="flex items-center justify-center w-12 h-12 rounded-xl bg-white border-2 shadow-sm"
            style={{ borderColor: accentColor }}
            initial={{ scale: 0, opacity: 0 }}
            animate={
              inView
                ? { scale: 1, opacity: 1 }
                : { scale: 0, opacity: 0 }
            }
            transition={{
              delay: 0.05,
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Icon className="h-4 w-4" style={{ color: accentColor }} />
          </motion.div>
        )}
      </div>

      <WorkflowCard
        step={step}
        Icon={Icon}
        accentColor={accentColor}
        softColor={softColor}
        inView={inView}
        shouldReduceMotion={shouldReduceMotion}
        slideFrom="right"
      />
    </div>
  );
};

/* ---------- WorkflowStorySection ---------- */
const WorkflowStorySection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="workflow"
      data-testid="workflow-section"
      className="py-12 sm:py-16 lg:py-20 relative overflow-hidden"
    >
      {/* Dot pattern background */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(148,163,184,0.22) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          mask: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 20%, transparent 90%)',
          WebkitMask:
            'radial-gradient(ellipse 90% 80% at 50% 50%, black 20%, transparent 90%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-14">
          <Badge
            variant="secondary"
            className="rounded-full px-4 py-1.5 text-xs font-medium mb-4"
            style={{
              backgroundColor: 'hsl(162 45% 90%)',
              color: 'hsl(162 45% 40%)',
              border: '1px solid hsl(162 45% 80%)',
            }}
          >
            The Research Workflow
          </Badge>
          <h2
            className="text-3xl sm:text-4xl leading-[1.12] tracking-[-0.015em] mt-4"
            style={{
              fontFamily: "var(--font-gloock), 'Gloock', serif",
              color: 'hsl(222 35% 12%)',
            }}
          >
            From Data to Decisions. One platform.
          </h2>
          <p
            className="text-base md:text-lg leading-relaxed mt-4 max-w-[54ch] mx-auto"
            style={{ color: 'hsl(222 18% 34%)' }}
          >
            Most analysts know their research process well.{' '}
            <br />
            They just do not have a tool built around it. n4a does.
          </p>
        </div>

        {/* Flow chart */}
        <div className="relative">
          {/* Desktop center line */}
          <div
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2"
            style={{ backgroundColor: 'hsl(214 22% 88%)' }}
            aria-hidden="true"
          />
          {/* Mobile left line */}
          <div
            className="lg:hidden absolute left-6 top-0 bottom-0 w-[2px]"
            style={{ backgroundColor: 'hsl(214 22% 88%)' }}
            aria-hidden="true"
          />

          {WORKFLOW_STEPS.map((step, i) => {
            const Icon = step.icon;
            const { accentColor, softColor } = getAccentColors(step.accent);
            const isEven = i % 2 === 0;

            return (
              <div key={step.step} data-testid={`workflow-step-${i + 1}`}>
                <div className="hidden lg:block">
                  <DesktopFlowNode
                    step={step}
                    index={i}
                    Icon={Icon}
                    accentColor={accentColor}
                    softColor={softColor}
                    isEven={isEven}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                </div>
                <div className="lg:hidden">
                  <MobileFlowNode
                    step={step}
                    index={i}
                    Icon={Icon}
                    accentColor={accentColor}
                    softColor={softColor}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkflowStorySection;
