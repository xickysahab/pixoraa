import { motion } from 'motion/react';

/**
 * The viewfinder data strip. Real exposure values, in mono, because a
 * photography studio's intro should survive a photographer reading it:
 * f/1.8 at 1/250 and ISO 400 is a plausible indoor portrait exposure.
 */
const READOUT = [
  { id: 'mode', v: 'M' },
  { id: 'shutter', v: '1/250' },
  { id: 'aperture', v: 'f/1.8' },
  { id: 'iso', v: 'ISO 400' },
  { id: 'wb', v: 'AWB' },
];

export default function ExifReadout({ show, locked }) {
  return (
    <motion.div
      className="exif"
      aria-hidden="true"
      initial={{ opacity: 0, y: 10 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
    >
      <span className={`exif__lock ${locked ? 'exif__lock--on' : ''}`}>
        ●&nbsp;{locked ? 'FOCUS' : 'AF'}
      </span>
      {READOUT.map((r) => (
        <span className="exif__item" key={r.id}>{r.v}</span>
      ))}
    </motion.div>
  );
}
