import { useCallback, useState } from 'react';
import { MotionConfig } from 'motion/react';
import Preloader from './components/preloader/main_preloader';
import ScrollProgress from './components/overlay/scroll_progress';
import Header from './components/header/main_header';
import Hero from './components/hero/main_hero';
import Stats from './components/stats/main_stats';
import Partners from './components/partners/main_partners';
import Services from './components/services/main_services';
import Work from './components/work/main_work';
import Cta from './components/cta/main_cta';
import Gallery from './components/gallery/main_gallery';
import Showreel from './components/showreel/main_showreel';
import Process from './components/process/main_process';
import Pillars from './components/pillars/main_pillars';
import Insights from './components/insights/main_insights';
import Testimonials from './components/testimonials/main_testimonials';
import Faq from './components/faq/main_faq';
import Contact from './components/contact/main_contact';
import Footer from './components/footer/main_footer';
import Cursor from './common/cursor';
import { ctaProject, ctaStudio } from './data/cta';
import useSmoothScroll from './common/use_smooth_scroll';

/**
 * App only ever knows about main_* composers — never their internals.
 * Still to build: team.
 *
 * MotionConfig reducedMotion="user" is load-bearing: Motion writes
 * inline styles from rAF, so the CSS reduced-motion override in
 * global.css cannot reach it. Without this, users who ask for reduced
 * motion still get every transform animation.
 */
export default function App() {
  useSmoothScroll();

  // Set once the shutter intro finishes, so the page can ease out of the
  // flash decay rather than cutting in behind it.
  const [developed, setDeveloped] = useState(false);
  const handleDone = useCallback(() => setDeveloped(true), []);

  return (
    <MotionConfig reducedMotion="user">
      <Preloader onDone={handleDone} />
      <Cursor />
      <ScrollProgress />
      <Header />
      <main id="main" className={developed ? 'site--developing' : undefined}>
        <Hero />
        <Stats />
        <Partners />
        <Services />
        <Work />
        <Cta data={ctaProject} variant="molten" />
        <Gallery />
        <Showreel />
        <Cta data={ctaStudio} />
        <Process />
        <Pillars />
        <Insights />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
