import BackgroundOrbs from '@/components/background-orbs';
import Navigation from '@/components/navigation';
import HeroSection from '@/components/hero-section';
import WorkflowStorySection from '@/components/workflow-story-section';
import WorkflowCanvasSection from '@/components/workflow-canvas-section';
import ValuePropsSection from '@/components/value-props-section';
import FeatureHighlightsSection from '@/components/feature-highlights-section';
import ContactSection from '@/components/contact-section';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <>
      <BackgroundOrbs />
      <Navigation />
      <main>
        <HeroSection />
        <WorkflowStorySection />
        <WorkflowCanvasSection />
        <ValuePropsSection />
        <FeatureHighlightsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
