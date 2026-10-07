'use client';

import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import posthog from 'posthog-js';

interface RevealSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  testId?: string;
  delay?: number;
  style?: React.CSSProperties;
  /** When set, fires a `section_viewed` PostHog event once when this section scrolls into view */
  trackAs?: string;
}

const RevealSection: React.FC<RevealSectionProps> = ({
  children,
  className = '',
  id,
  testId,
  delay = 0,
  style,
  trackAs,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView && trackAs) {
      posthog.capture('section_viewed', { section: trackAs })
    }
  }, [inView, trackAs]);

  if (shouldReduceMotion) {
    return (
      <section id={id} data-testid={testId} className={className} ref={ref} style={style}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      data-testid={testId}
      className={className}
      ref={ref}
      style={style}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            delay,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      {children}
    </motion.section>
  );
};

export default RevealSection;
