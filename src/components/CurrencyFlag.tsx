/**
 * Flags for the currency converter, drawn rather than typed.
 *
 * The converter used flag emoji (🇹🇹, 🇯🇲) which look right on a Mac or a
 * phone and are blank on Windows. Windows deliberately ships no glyphs for
 * regional indicator pairs, so the browser falls back to rendering the two
 * letters, and the list reads "TT TTD", "JM JMD" down the page. No font stack
 * fixes it, because the glyphs are not there to fall back to.
 *
 * So these are inline SVG: identical on every platform, no network request,
 * no dependency. Each keeps its own real aspect ratio and is rendered at a
 * fixed WIDTH with the height left to follow, which keeps the labels beside
 * them in a straight line while a 1:2 flag still looks like a 1:2 flag.
 *
 * XCD is not a country, so it has no flag. It gets a plain mark rather than
 * one of the six member states' flags, since picking one would be wrong.
 */

type Props = { code: string; className?: string };

const box = "shrink-0 rounded-[1px] shadow-[0_0_0_0.5px_rgba(14,42,58,0.25)]";

function Svg({ vb, children, className }: { vb: string; children: React.ReactNode; className?: string }) {
  return (
    <svg
      viewBox={vb}
      className={`${box} ${className ?? ""}`}
      style={{ width: 22, height: "auto" }}
      role="presentation"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

// A five-point star centred on the origin, radius 1.
const STAR = "M0,-1 L0.2245,-0.309 L0.951,-0.309 L0.363,0.118 L0.588,0.809 L0,0.382 L-0.588,0.809 L-0.363,0.118 L-0.951,-0.309 L-0.2245,-0.309 Z";

export default function CurrencyFlag({ code, className }: Props) {
  switch (code) {
    case "TTD":
      return (
        <Svg vb="0 0 500 300" className={className}>
          <rect width="500" height="300" fill="#CE1126" />
          <polygon points="0,0 160,0 500,300 340,300" fill="#fff" />
          <polygon points="26,0 134,0 474,300 366,300" fill="#000" />
        </Svg>
      );
    case "JMD":
      return (
        <Svg vb="0 0 600 300" className={className}>
          <rect width="600" height="300" fill="#000" />
          <polygon points="0,0 600,0 300,150" fill="#009B3A" />
          <polygon points="0,300 600,300 300,150" fill="#009B3A" />
          <path d="M0,0 L600,300 M600,0 L0,300" stroke="#FED100" strokeWidth="52" strokeLinecap="square" fill="none" />
        </Svg>
      );
    case "BBD":
      return (
        <Svg vb="0 0 450 300" className={className}>
          <rect width="450" height="300" fill="#00267F" />
          <rect x="150" width="150" height="300" fill="#FFC726" />
          <g fill="#000">
            <polygon points="225,46 236,112 214,112" />
            <polygon points="181,68 190,112 172,112" />
            <polygon points="269,68 278,112 260,112" />
            <rect x="166" y="112" width="118" height="15" />
            <polygon points="212,127 238,127 232,250 218,250" />
          </g>
        </Svg>
      );
    case "BZD":
      return (
        <Svg vb="0 0 500 300" className={className}>
          <rect width="500" height="300" fill="#003F87" />
          <rect width="500" height="26" fill="#CE1126" />
          <rect y="274" width="500" height="26" fill="#CE1126" />
          <circle cx="250" cy="150" r="110" fill="#fff" />
          <circle cx="250" cy="150" r="99" fill="none" stroke="#289400" strokeWidth="22" />
          <path d="M250,96 C262,116 276,128 276,146 C276,160 264,170 250,170 C236,170 224,160 224,146 C224,128 238,116 250,96 Z" fill="#289400" />
          <rect x="244" y="166" width="12" height="38" fill="#6B4A2B" />
        </Svg>
      );
    case "GYD":
      return (
        <Svg vb="0 0 500 300" className={className}>
          <rect width="500" height="300" fill="#009E49" />
          <polygon points="0,0 500,150 0,300" fill="#fff" />
          <polygon points="0,16 462,150 0,284" fill="#FCD116" />
          <polygon points="0,0 250,150 0,300" fill="#000" />
          <polygon points="0,18 220,150 0,282" fill="#CF142B" />
        </Svg>
      );
    case "SRD":
      return (
        <Svg vb="0 0 450 300" className={className}>
          <rect width="450" height="300" fill="#377E3F" />
          <rect y="60" width="450" height="30" fill="#fff" />
          <rect y="90" width="450" height="120" fill="#B40A2D" />
          <rect y="210" width="450" height="30" fill="#fff" />
          <g transform="translate(225,150) scale(46)" fill="#ECC81D">
            <path d={STAR} />
          </g>
        </Svg>
      );
    case "USD":
      return (
        <Svg vb="0 0 570 300" className={className}>
          <rect width="570" height="300" fill="#fff" />
          <g fill="#B22234">
            {[0, 2, 4, 6, 8, 10, 12].map((i) => (
              <rect key={i} y={(i * 300) / 13} width="570" height={300 / 13} />
            ))}
          </g>
          <rect width="228" height={(300 / 13) * 7} fill="#3C3B6E" />
          <g fill="#fff">
            {[0, 1, 2, 3].map((r) =>
              [0, 1, 2, 3, 4].map((col) => (
                <circle key={`${r}-${col}`} cx={26 + col * 45} cy={22 + r * 42} r="7.5" />
              ))
            )}
          </g>
        </Svg>
      );
    case "CAD":
      return (
        <Svg vb="0 0 600 300" className={className}>
          <rect width="600" height="300" fill="#fff" />
          <rect width="150" height="300" fill="#D52B1E" />
          <rect x="450" width="150" height="300" fill="#D52B1E" />
          <path
            fill="#D52B1E"
            d="M300 58l17 33c2 4 5 3 8 2l24-13-11 47c-2 9 3 12 9 6l31-30 8 19c1 2 3 3 6 2l32-7-11 39c-2 6-3 8 1 10l11 5-56 45c-5 4-4 6-2 12l5 16-53-9c-6-1-10 0-10 5l3 47h-12l3-47c0-5-4-6-10-5l-53 9 5-16c2-6 3-8-2-12l-56-45 11-5c4-2 3-4 1-10l-11-39 32 7c3 1 5 0 6-2l8-19 31 30c6 6 11 3 9-6l-11-47 24 13c3 1 6 2 8-2z"
          />
        </Svg>
      );
    case "GBP":
      return (
        <Svg vb="0 0 600 300" className={className}>
          <rect width="600" height="300" fill="#012169" />
          <path d="M0,0 L600,300 M600,0 L0,300" stroke="#fff" strokeWidth="68" />
          <path d="M0,0 L600,300 M600,0 L0,300" stroke="#C8102E" strokeWidth="32" />
          <path d="M300,0 L300,300 M0,150 L600,150" stroke="#fff" strokeWidth="100" />
          <path d="M300,0 L300,300 M0,150 L600,150" stroke="#C8102E" strokeWidth="60" />
        </Svg>
      );
    case "XCD":
      // Shared by six countries, so no single flag is right. A neutral mark.
      return (
        <Svg vb="0 0 450 300" className={className}>
          <rect width="450" height="300" fill="#0b6b72" />
          <path d="M0,214 C75,196 150,238 225,220 C300,202 375,240 450,222 L450,300 L0,300 Z" fill="#12a3ae" />
          <path d="M0,246 C75,228 150,268 225,250 C300,232 375,270 450,252 L450,300 L0,300 Z" fill="#7fd6dd" />
          <circle cx="225" cy="112" r="46" fill="#FCD116" />
        </Svg>
      );
    default:
      return null;
  }
}
