import { motion } from 'motion/react';

/**
 * A six-blade iris, drawn as a mask rather than six animated blades.
 *
 * The opening is a hexagon — which is what a real six-blade aperture
 * actually looks like stopped down — punched out of a dark disc. Scaling
 * that one hexagon to zero closes the whole iris in a single transform,
 * so the blades can never drift out of register the way six
 * independently rotated paths do.
 *
 * The group is translated to the lens centre first, so `scale` pivots on
 * the default origin (0,0) and needs no transform-origin juggling.
 */
export default function ApertureIris({ cx, cy, r, maskId, scale }) {
  const hex = Array.from({ length: 6 }, (_, i) => {
    const a = ((i * 60 - 90) * Math.PI) / 180;
    return `${(r * Math.cos(a)).toFixed(2)},${(r * Math.sin(a)).toFixed(2)}`;
  }).join(' ');

  return (
    <g transform={`translate(${cx},${cy})`}>
      <defs>
        <mask id={maskId}>
          <rect x={-r * 2} y={-r * 2} width={r * 4} height={r * 4} fill="#fff" />
          <motion.polygon points={hex} fill="#000" style={{ scale }} />
        </mask>
      </defs>

      {/* The closed blades. The hole in the mask is the opening. */}
      <circle r={r} fill="#0A0A0A" mask={`url(#${maskId})`} />

      {/* Blade seams, so the iris reads as mechanism and not a hole. */}
      <g mask={`url(#${maskId})`} opacity="0.5">
        {Array.from({ length: 6 }, (_, i) => (
          <line
            key={i}
            x1="0"
            y1="0"
            x2={r}
            y2="0"
            stroke="#2A2A2A"
            strokeWidth="0.8"
            transform={`rotate(${i * 60})`}
          />
        ))}
      </g>
    </g>
  );
}
