import { useEffect, useRef, useState } from 'react';

/**
 * The clip that plays over a tile's still on hover.
 *
 * Two rules make this affordable rather than a tax on every visit:
 *
 *  - `preload="none"` and no `src` until the first hover. The <video>
 *    element exists from the start so the fade has something to fade,
 *    but the file is not fetched until someone actually points at it.
 *  - it pauses and rewinds on leave, so a tile revisited later starts
 *    from the first frame instead of resuming mid-shot.
 *
 * The still underneath is never removed — if the clip is slow or the
 * network drops it, the tile is still a finished photograph, and the
 * video simply never fades up.
 */
export default function HoverVideo({ src, active, reduced }) {
  const ref = useRef(null);
  const [armed, setArmed] = useState(false);
  const [ready, setReady] = useState(false);

  // Arm on first hover only — this is what defers the download.
  useEffect(() => {
    if (active && !armed) setArmed(true);
  }, [active, armed]);

  useEffect(() => {
    const v = ref.current;
    if (!v || !armed || reduced) return;

    if (active) {
      // play() rejects if the element is detached or autoplay is
      // blocked; neither is worth surfacing.
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
      setReady(false);
    }
  }, [active, armed, reduced]);

  if (reduced) return null;

  return (
    <video
      ref={ref}
      className={`bento__video ${ready && active ? 'bento__video--on' : ''}`}
      src={armed ? src : undefined}
      preload="none"
      muted
      loop
      playsInline
      aria-hidden="true"
      tabIndex={-1}
      onPlaying={() => setReady(true)}
    />
  );
}
