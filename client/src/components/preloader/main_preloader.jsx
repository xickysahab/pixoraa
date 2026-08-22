import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, animate } from 'motion/react';
import CameraBody from './camera_body';
import FocusBrackets from './focus_brackets';
import ExifReadout from './exif_readout';
import FlashBurst from './flash_burst';
import { STATIC_MOTION } from '../../common/motion_env';
import './preloader.css';

/**
 * DSLR shutter intro.
 *
 *   raise  → camera rises into frame
 *   hunt   → AF brackets close on the subject
 *   lock   → focus confirms, AF lamp lights, EXIF strip appears
 *   fire   → shutter button depresses, iris snaps shut and reopens
 *   flash  → strobe fires and decays
 *   clear  → curtain lifts through the flash decay
 *
 * The reveal happens *inside* the flash decay rather than after it, so
 * the site appears out of the light instead of the light fading to black
 * and the page then arriving separately.
 */
const BEATS = {
  hunt: 620,
  lock: 1250,
  fire: 1650,
  flash: 1850,
  clear: 2150,
  done: 2950,
};

/**
 * Dev affordances, because the intro runs once per session and is over
 * in three seconds — which makes it nearly impossible to tune or review.
 *
 *   ?shutter        replay it, ignoring the once-per-session flag
 *   ?shutter=slow   replay at quarter speed, to inspect each beat
 *   ?shutter=lock   hold on a named beat (hunt|lock|fire|flash) so a
 *                   single state can be reviewed without chasing it
 */
const HOLDABLE = ['hunt', 'lock', 'fire', 'flash'];

function devFlags() {
  if (typeof window === 'undefined') {
    return { force: false, rate: 1, hold: null };
  }
  const p = new URLSearchParams(window.location.search);
  if (!p.has('shutter')) return { force: false, rate: 1, hold: null };

  const v = p.get('shutter');
  return {
    force: true,
    rate: v === 'slow' ? 4 : 1,
    hold: HOLDABLE.includes(v) ? v : null,
  };
}

export default function Preloader({ onDone }) {
  const { force, rate, hold } = devFlags();

  const skip =
    !force &&
    (STATIC_MOTION ||
      (typeof window !== 'undefined' &&
        (window.sessionStorage.getItem('pixoraa:seen') === '1' ||
          window.matchMedia('(prefers-reduced-motion: reduce)').matches)));

  const [open, setOpen] = useState(!skip);
  const [phase, setPhase] = useState('raise');
  const irisScale = useMotionValue(1);
  const pressY = useMotionValue(0);
  const timers = useRef([]);

  useEffect(() => {
    if (skip) {
      onDone?.();
      return;
    }

    document.body.style.overflow = 'hidden';

    // Hold mode parks on one beat and never advances, so the state can
    // be inspected. Everything after it is simply never scheduled.
    if (hold) {
      const order = ['hunt', 'lock', 'fire', 'flash'];
      order.slice(0, order.indexOf(hold) + 1).forEach((p, i) => {
        timers.current.push(setTimeout(() => setPhase(p), 400 + i * 300));
      });
      if (order.indexOf(hold) >= 2) {
        timers.current.push(
          setTimeout(() => animate(irisScale, 0, { duration: 0.2 }), 1000)
        );
      }
      return () => {
        timers.current.forEach(clearTimeout);
        timers.current = [];
        document.body.style.overflow = '';
      };
    }

    const at = (ms, fn) => timers.current.push(setTimeout(fn, ms * rate));

    at(BEATS.hunt, () => setPhase('hunt'));
    at(BEATS.lock, () => setPhase('lock'));

    at(BEATS.fire, () => {
      setPhase('fire');
      // Shutter button dips, iris slams shut, then reopens. The close is
      // faster than the open — that asymmetry is what makes it read as a
      // mechanism firing rather than a symmetrical pulse.
      animate(pressY, 3, { duration: 0.08 });
      animate(irisScale, 0, { duration: 0.11, ease: [0.4, 0, 1, 1] }).then(() =>
        animate(irisScale, 1, { duration: 0.26, ease: [0.16, 1, 0.3, 1] })
      );
      animate(pressY, 0, { duration: 0.18, delay: 0.12 });
    });

    at(BEATS.flash, () => setPhase('flash'));
    at(BEATS.clear, () => setPhase('clear'));

    at(BEATS.done, () => {
      setOpen(false);
      window.sessionStorage.setItem('pixoraa:seen', '1');
      document.body.style.overflow = '';
      onDone?.();
    });

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      document.body.style.overflow = '';
    };
  }, [skip, onDone, irisScale, pressY, rate, hold]);

  const hunting = ['hunt', 'lock', 'fire', 'flash'].includes(phase);
  const locked = ['lock', 'fire', 'flash'].includes(phase);
  const clearing = phase === 'clear';

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="pre"
          role="presentation"
          animate={clearing ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* viewfinder furniture */}
          <div className="pre__grid" aria-hidden="true" />

          <motion.div
            className="pre__stage"
            initial={{ y: 90, opacity: 0, scale: 0.94 }}
            animate={
              clearing
                ? { y: -30, opacity: 0, scale: 1.12 }
                : { y: 0, opacity: 1, scale: 1 }
            }
            transition={{ duration: 0.85, ease: [0.23, 1, 0.32, 1] }}
          >
            <FocusBrackets hunting={hunting} locked={locked} />
            <div className="cam">
              <CameraBody
                irisScale={irisScale}
                pressY={pressY}
                lit={locked}
              />
            </div>
          </motion.div>

          <div className="pre__caption">
            <motion.p
              className="pre__word"
              initial={{ opacity: 0, y: 14 }}
              animate={
                locked ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
              }
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              Pixoraa<span className="pre__word-dim"> Digital</span>
            </motion.p>
          </div>

          <ExifReadout show={hunting} locked={locked} />
          <FlashBurst fire={phase === 'flash' || clearing} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
