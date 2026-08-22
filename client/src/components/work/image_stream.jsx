import { useId, useMemo } from 'react';
import './image_stream.css';

/* ── the corridor ────────────────────────────────────────────────
 * Two rails of cards ride from far behind the screen toward the
 * viewer. Perspective alone does the work that looks like two
 * animations: as a card's z grows it gets bigger *and* its screen x
 * sweeps outward from the vanishing point, because the projection
 * scales position and size by the same factor.
 *
 * Three things shape it, and each one fixes a specific artefact:
 *
 * 1. Depth is authored as *apparent size*, geometrically — each card
 *    is a constant ratio bigger than the one behind it. Spacing a
 *    straight z-range evenly instead makes the near cards tear apart
 *    from each other as the projection blows up.
 * 2. The rails open hard in the first stretch and then hold
 *    (`fan` > 1), so the ribbon leaves the centre as a flat band,
 *    bends once, then runs out on the diagonal. Parallel rails
 *    project to a straight cone with no bend at all.
 * 3. Neither end of the loop is ever on screen. A card is born
 *    *across* the axis (`railBirth` is negative), which plugs the
 *    throat — birthing on its own side leaves a hole at dead centre
 *    that blinks open once per cycle.
 *
 * Every length is in `cqw` — a percentage of the container's width —
 * so the corridor keeps its proportions at any size.
 * ─────────────────────────────────────────────────────────────── */

const PATH = {
  perspective: 30,
  cardWidth: 18,
  cardHeight: 25,
  cardRadius: 0.4,
  birthHeight: 2.6,
  exitHeight: 46,
  railBirth: -11,
  railExit: 44,
  fan: 3.3,
  turnBirth: 6,
  turnExit: 28,
  stops: 24,
};

/** Sample the path once so the CSS keyframes trace the real curve. */
function keyframes(dir, name, p) {
  const steps = [];
  for (let s = 0; s <= p.stops; s++) {
    const u = s / p.stops;
    // Geometric in apparent size, so consecutive cards keep a constant
    // size ratio and the ribbon stays solid at both ends.
    const scale =
      (p.birthHeight / p.cardHeight) *
      Math.pow(p.exitHeight / p.birthHeight, u);
    const z = p.perspective * (1 - 1 / scale);
    const rail =
      p.railExit - (p.railExit - p.railBirth) * Math.pow(1 - u, p.fan);
    const turn = p.turnBirth + (p.turnExit - p.turnBirth) * u;
    steps.push(
      `${(u * 100).toFixed(2)}%{transform:translate3d(${(dir * rail).toFixed(
        2
      )}cqw,0,${z.toFixed(2)}cqw) rotateY(${(-dir * turn).toFixed(2)}deg)}`
    );
  }
  return `@keyframes ${name}{${steps.join('')}}`;
}

/**
 * `items` are plates (gradient tones) rather than photographs, so the
 * corridor works before any real imagery exists. Pass `src` on an item
 * and it renders an <img> instead.
 */
export default function ImageStream({
  items = [],
  cards = 9,
  speed = 18,
  axis = 55,
  path,
  children,
  className = '',
}) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const right = `ish-r-${id}`;
  const left = `ish-l-${id}`;
  const card = `ish-c-${id}`;

  const p = useMemo(() => ({ ...PATH, ...path }), [path]);

  const css = useMemo(
    () =>
      `${keyframes(1, right, p)}${keyframes(-1, left, p)}` +
      // Pausing rather than disabling keeps the corridor whole: every
      // card is already dropped mid-flight by its negative delay, so it
      // freezes as a finished still instead of collapsing onto the axis.
      `@media(prefers-reduced-motion:reduce){.${card}{animation-play-state:paused}}`,
    [right, left, card, p]
  );

  return (
    <div className={`stream ${className}`}>
      <style>{css}</style>

      <div
        aria-hidden="true"
        className="stream__stage"
        style={{
          perspective: `${p.perspective}cqw`,
          perspectiveOrigin: `50% ${axis}%`,
        }}
      >
        <div className="stream__space">
          {[right, left].map((name) =>
            Array.from({ length: cards }, (_, i) => {
              // Both rails walk the same sequence, so the left side
              // mirrors the right at every depth.
              const item = items[i % Math.max(items.length, 1)];
              return (
                <div
                  key={`${name}-${i}`}
                  className={`${card} stream__card`}
                  style={{
                    top: `${axis}%`,
                    width: `${p.cardWidth}cqw`,
                    height: `${p.cardHeight}cqw`,
                    marginLeft: `${-p.cardWidth / 2}cqw`,
                    marginTop: `${-p.cardHeight / 2}cqw`,
                    borderRadius: `${p.cardRadius}cqw`,
                    animation: `${name} ${speed}s linear infinite`,
                    // Negative delay drops each card mid-flight, so the
                    // corridor is already full on the first frame.
                    animationDelay: `${-(i * speed) / cards}s`,
                  }}
                >
                  {item?.src ? (
                    <img
                      src={item.src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="stream__img"
                      draggable={false}
                    />
                  ) : (
                    <div
                      className={`stream__plate work__plate--${item?.tone || 'ember'}`}
                    />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {children}
    </div>
  );
}
