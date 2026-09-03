import { useRef, useState } from 'react';
import SectionWrapper from '../../common/section_wrapper';
import RevealText from '../../common/reveal_text';
import Eyebrow from '../../common/eyebrow';
import { showreel } from '../../data/cta';
import './showreel.css';

/**
 * Click-to-play reel.
 *
 * `preload="none"` until the first click, same deal as the gallery
 * hover clips: an autoplaying hero video is the single most expensive
 * thing a page like this can ship, and nobody watches it. The poster is
 * a real frame, so the section is finished even if the file never loads.
 */
export default function Showreel() {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);

  // `playing` is driven by the element's own play/pause events, never
  // set optimistically here: play() can reject (autoplay policy, a
  // failed fetch) and a button that says "Pause" over a frozen frame is
  // worse than one that never changed.
  function toggle() {
    const v = ref.current;
    if (!v) return;

    if (v.paused) v.play().catch(() => {});
    else v.pause();
  }

  return (
    <SectionWrapper id="showreel" className="reel" label="Showreel">
      <div className="reel__head">
        <div>
          <Eyebrow>{showreel.label}</Eyebrow>
          <RevealText
            as="h2"
            lines={[showreel.headline]}
            className="reel__heading sec-title"
          />
        </div>
        <p className="reel__intro">{showreel.body}</p>
      </div>

      <div className={`reel__frame ${playing ? 'reel__frame--playing' : ''}`}>
        <video
          ref={ref}
          className="reel__video"
          poster={showreel.poster}
          src={showreel.src}
          preload="none"
          playsInline
          loop
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />

        <button
          type="button"
          className="reel__play"
          onClick={toggle}
          aria-pressed={playing}
        >
          <span className="reel__play-ring" aria-hidden="true" />
          <span className="reel__play-label">
            {playing ? 'Pause' : 'Watch'}
            <span className="reel__play-sub">reel</span>
          </span>
        </button>

        <span className="label reel__duration">{showreel.duration}</span>
      </div>
    </SectionWrapper>
  );
}
