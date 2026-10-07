'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import RevealSection from '@/components/reveal-section';
import { Badge } from '@/components/ui/badge';
import {
  Network,
  GitBranch,
  Brain,
  FileSpreadsheet,
  FileText,
  Target,
} from 'lucide-react';

/* ---------- Types ---------- */
type LucideIcon = React.ComponentType<{
  className?: string;
  style?: React.CSSProperties;
}>;

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  large: boolean;
}

/* ---------- Data ---------- */
const FEATURES: Feature[] = [
  {
    title: 'Visual Workflow Canvas',
    description:
      'Build your research process as a connected graph. Link data inputs to analysis tools to output documents. See the full picture. Control every step.',
    icon: Network,
    large: true,
  },
  {
    title: 'Structured Research Library',
    description:
      'Pull documents into a curated, searchable research library. Every source tagged, every citation traceable from the first document added to the last line of your report.',
    icon: GitBranch,
    large: true,
  },
  {
    title: 'AI That Is Reliable',
    description:
      'Every AI output references the specific document and passage it drew from. Before anything reaches your report, you can see exactly where it came from.',
    icon: Brain,
    large: false,
  },
  {
    title: 'Spreadsheet Node',
    description:
      'The spreadsheet you already know, with the document context you have been building. AI assists your analysis using the sources attached to the workflow, not assumptions.',
    icon: FileSpreadsheet,
    large: false,
  },
  {
    title: 'Report and Memo Generation',
    description:
      'Draft analyst reports and investment memos directly from your canvas. Outputs are structured for stakeholder review with every insight already linked to its source.',
    icon: FileText,
    large: false,
  },
  {
    title: 'Full Audit Trail',
    description:
      'From the first document pulled to the last line of the report, every step is logged. Built for teams where traceability is not optional.',
    icon: Target,
    large: false,
  },
];

/* ---------- FeatureHighlightsSection ---------- */
const FeatureHighlightsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <RevealSection
      id="features"
      testId="features-section"
      className="pt-8 sm:pt-12 lg:pt-14 pb-12 sm:pb-16 lg:pb-20 -mt-[50vh] relative z-10"
      trackAs="features"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <Badge
            variant="secondary"
            className="rounded-full px-4 py-1.5 text-xs font-medium mb-4 inline-flex"
            style={{
              backgroundColor: 'hsl(162 45% 90%)',
              color: 'hsl(162 45% 40%)',
              border: '1px solid hsl(162 45% 80%)',
            }}
          >
            What&apos;s Inside
          </Badge>
          <h2
            className="text-3xl sm:text-4xl leading-[1.12] tracking-[-0.015em]"
            style={{
              fontFamily: "var(--font-gloock), 'Gloock', serif",
              color: 'hsl(222 35% 12%)',
            }}
          >
            Everything an analyst needs. Nothing they don&apos;t.
          </h2>
          <p
            className="text-base md:text-lg leading-relaxed mt-4 max-w-[58ch] mx-auto"
            style={{ color: 'hsl(222 18% 34%)' }}
          >
            Purpose-built capabilities for the financial research workflow.
            Familiar tools, connected to power your analysis.
          </p>
        </div>

        {/* Top row (3 features) */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-8 lg:gap-x-14">
            {FEATURES.slice(0, 3).map((feature, i) => {
              const Icon = feature.icon;

              if (shouldReduceMotion) {
                return (
                  <div
                    key={feature.title}
                    data-testid={`feature-card-${i + 1}`}
                    className="text-center"
                  >
                    <FeatureCardContent
                      title={feature.title}
                      description={feature.description}
                      Icon={Icon}
                    />
                  </div>
                );
              }

              return (
                <motion.div
                  key={feature.title}
                  data-testid={`feature-card-${i + 1}`}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.55 }}
                >
                  <FeatureCardContent
                    title={feature.title}
                    description={feature.description}
                    Icon={Icon}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Divider */}
          <div
            className="my-10 lg:my-12 h-px max-w-4xl mx-auto"
            style={{ backgroundColor: 'hsl(30 30% 85%)' }}
            aria-hidden="true"
          />

          {/* Bottom row (3 features) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-8 lg:gap-x-14">
            {FEATURES.slice(3, 6).map((feature, i) => {
              const Icon = feature.icon;
              const idx = i + 3;

              if (shouldReduceMotion) {
                return (
                  <div
                    key={feature.title}
                    data-testid={`feature-card-${idx + 1}`}
                    className="text-center"
                  >
                    <FeatureCardContent
                      title={feature.title}
                      description={feature.description}
                      Icon={Icon}
                    />
                  </div>
                );
              }

              return (
                <motion.div
                  key={feature.title}
                  data-testid={`feature-card-${idx + 1}`}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.55 }}
                >
                  <FeatureCardContent
                    title={feature.title}
                    description={feature.description}
                    Icon={Icon}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </RevealSection>
  );
};

/* ---------- FeatureCardContent ---------- */
interface FeatureCardContentProps {
  title: string;
  description: string;
  Icon: LucideIcon;
}

const FeatureCardContent: React.FC<FeatureCardContentProps> = ({
  title,
  description,
  Icon,
}) => (
  <>
    <div
      className="flex items-center justify-center w-14 h-14 rounded-2xl mx-auto mb-5"
      style={{ backgroundColor: 'hsl(222 35% 12%)' }}
    >
      <Icon className="h-6 w-6 text-white" />
    </div>
    <h3
      className="text-lg sm:text-xl font-semibold mb-2.5 leading-snug"
      style={{ color: 'hsl(222 35% 12%)' }}
    >
      {title}
    </h3>
    <p
      className="text-sm leading-relaxed max-w-[32ch] mx-auto"
      style={{ color: 'hsl(222 18% 34%)' }}
    >
      {description}
    </p>
  </>
);

export default FeatureHighlightsSection;
