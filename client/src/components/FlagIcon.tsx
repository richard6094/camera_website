/**
 * Inline SVG flag icons for language switcher.
 * Renders consistently on all platforms (including Windows which lacks flag emoji support).
 */

interface FlagIconProps {
  country: 'cn' | 'us' | 'jp';
  className?: string;
}

export function FlagIcon({ country, className = 'w-5 h-3.5' }: FlagIconProps) {
  switch (country) {
    case 'cn':
      return (
        <svg viewBox="0 0 640 480" className={className} aria-label="Chinese flag">
          <rect width="640" height="480" fill="#de2910" />
          <g fill="#ffde00">
            <polygon points="160,60 172,100 212,100 180,124 192,164 160,140 128,164 140,124 108,100 148,100" />
            <polygon points="264,36 258,52 244,52 256,62 252,78 264,68 276,78 272,62 284,52 270,52" />
            <polygon points="296,84 290,100 276,100 288,110 284,126 296,116 308,126 304,110 316,100 302,100" />
            <polygon points="296,156 290,172 276,172 288,182 284,198 296,188 308,198 304,182 316,172 302,172" />
            <polygon points="264,204 258,220 244,220 256,230 252,246 264,236 276,246 272,230 284,220 270,220" />
          </g>
        </svg>
      );
    case 'us':
      return (
        <svg viewBox="0 0 640 480" className={className} aria-label="US flag">
          <rect width="640" height="480" fill="#fff" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect key={i} y={i * 73.846} width="640" height={36.923} fill="#b22234" />
          ))}
          <rect width="256" height="258.46" fill="#3c3b6e" />
          {/* Simplified stars pattern */}
          {[0, 1, 2, 3, 4].map((row) =>
            [0, 1, 2, 3, 4, 5].map((col) => (
              <circle key={`a-${row}-${col}`} cx={21.3 + col * 42.6} cy={17.2 + row * 51.7} r={8} fill="#fff" />
            ))
          )}
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2, 3, 4].map((col) => (
              <circle key={`b-${row}-${col}`} cx={42.6 + col * 42.6} cy={43.05 + row * 51.7} r={8} fill="#fff" />
            ))
          )}
        </svg>
      );
    case 'jp':
      return (
        <svg viewBox="0 0 640 480" className={className} aria-label="Japanese flag">
          <rect width="640" height="480" fill="#fff" />
          <circle cx="320" cy="240" r="140" fill="#bc002d" />
        </svg>
      );
  }
}
