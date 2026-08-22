import ScrollProgress from './scroll_progress';
import './overlay.css';

/**
 * Fixed global chrome.
 *
 * The world clock used to live here as a floating mix-blend-difference
 * widget. It collided with the hero's scroll cue and the footer's
 * address block, and a fixed element that has to dodge the layout
 * always reads as bolted on. The times now sit in the header and the
 * footer — chrome that already exists — so nothing overlaps.
 */
export default function Overlay() {
  return <ScrollProgress />;
}
