import { useCallback, useState } from 'react';
import { MotionConfig } from 'motion/react';
import Preloader from './components/preloader/main_preloader';
import Overlay from './components/overlay/main_overlay';
import Header from './components/header/main_header';
import Hero from './components/hero/main_hero';
import Partners from './components/partners/main_partners';
import Services from './components/services/main_services';
import Work from './components/work/main_work';
import Gallery from './components/gallery/main_gallery';
import Process from './components/process/main_process';
import Insights from './components/insights/main_insights';
import Faq from './components/faq/main_faq';
import Footer from './components/footer/main_footer';
import Cursor from './common/cursor';
import useSmoothScroll from './common/use_smooth_scroll';

/**
 * App only ever knows about main_* composers — never their internals.
 * Still to build: team, testimonials, blog, faq.
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
      <Overlay />
      <Header />
      <main id="main" className={developed ? 'site--developing' : undefined}>
        <Hero />
        <Partners />
        <Services />
        <Work />
        <Gallery />
        <Process />
        <Insights />
        <Faq />
      </main>
      <Footer />
    </MotionConfig>
  );
}
