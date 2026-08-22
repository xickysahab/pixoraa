import { useId } from 'react';
import { motion } from 'motion/react';
import ApertureIris from './aperture_iris';

/**
 * Stylised DSLR, front on. Geometric rather than illustrative, so it
 * sits with the rest of the type-led design instead of reading as a
 * clipart camera.
 *
 * `irisScale` and `pressY` are motion values owned by the preloader
 * timeline — this component only draws.
 */
export default function CameraBody({ irisScale, pressY, lit }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const maskId = `iris-${uid}`;
  const glowId = `glow-${uid}`;

  return (
    <svg
      className="cam__svg"
      viewBox="0 0 240 176"
      fill="none"
      role="img"
      aria-label="Camera taking a photograph"
    >
      <defs>
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF6A31" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FF4D0A" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ---- prism hump ---- */}
      <path
        d="M92 46 L104 20 Q106 16 110 16 L130 16 Q134 16 136 20 L148 46 Z"
        fill="#1C1C1C"
        stroke="#3A3A3A"
        strokeWidth="1.5"
      />
      {/* hot shoe */}
      <rect x="108" y="10" width="24" height="7" rx="1.5" fill="#262626" stroke="#3A3A3A" strokeWidth="1" />

      {/* ---- body ---- */}
      <rect
        x="12" y="44" width="216" height="112" rx="14"
        fill="#191919" stroke="#3D3D3D" strokeWidth="1.5"
      />
      {/* grip */}
      <path
        d="M188 46 Q214 50 218 78 L218 122 Q216 152 190 154 Z"
        fill="#212121" stroke="#3A3A3A" strokeWidth="1.2"
      />

      {/* shutter button — depresses when the shot fires */}
      <motion.g style={{ y: pressY }}>
        <rect x="36" y="34" width="26" height="12" rx="6" fill="#2A2A2A" stroke="#454545" strokeWidth="1.2" />
        <circle cx="49" cy="40" r="3.4" fill="#FF4D0A" />
      </motion.g>

      {/* mode dial */}
      <circle cx="168" cy="36" r="11" fill="#212121" stroke="#3A3A3A" strokeWidth="1.2" />
      <line x1="168" y1="28" x2="168" y2="32" stroke="#4A4A4A" strokeWidth="1.6" strokeLinecap="round" />

      {/* AF-assist lamp — lights on focus lock */}
      <circle
        cx="34" cy="72" r="5"
        fill={lit ? '#FF4D0A' : '#242424'}
        stroke="#3A3A3A" strokeWidth="1"
      />

      {/* ---- lens ---- */}
      <circle cx="120" cy="100" r="52" fill="#141414" stroke="#3D3D3D" strokeWidth="1.5" />
      <circle cx="120" cy="100" r="45" fill="#101010" stroke="#333333" strokeWidth="1.2" />

      {/* focal-length knurling */}
      <g opacity="0.55">
        {Array.from({ length: 36 }, (_, i) => (
          <line
            key={i}
            x1="120" y1="52" x2="120" y2="57"
            stroke="#4A4A4A" strokeWidth="1.4" strokeLinecap="round"
            transform={`rotate(${i * 10} 120 100)`}
          />
        ))}
      </g>

      {/* glass tint */}
      <circle cx="120" cy="100" r="38" fill="#0E1512" />
      <circle cx="120" cy="100" r="38" fill={`url(#${glowId})`} opacity={lit ? 0.55 : 0.18} />

      <ApertureIris cx={120} cy={100} r={38} maskId={maskId} scale={irisScale} />

      {/* coating flare — the one warm highlight that sells it as glass */}
      <ellipse cx="103" cy="83" rx="13" ry="8" fill="#FFFFFF" opacity="0.07" transform="rotate(-35 103 83)" />
    </svg>
  );
}
