export default function KuttLogo({
  className = "h-9 w-auto",
  glow = true,
}: {
  className?: string;
  glow?: boolean;
}) {
  return (
    <div className={`relative inline-flex items-center select-none ${glow ? "group" : ""}`}>
      {glow && (
        <div className="absolute -inset-1 bg-kutt-green/20 blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
      <svg
        viewBox="0 0 280 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} overflow-visible transition-transform duration-300 group-hover:scale-[1.02]`}
      >
        {/* Parallelogram Framed Box */}
        {/* Top & Left White Edge */}
        <path
          d="M 50 14 L 205 14 M 42 14 L 25 82 L 75 82"
          stroke="#FFFFFF"
          strokeWidth="6"
          strokeLinecap="square"
          strokeLinejoin="miter"
          className="kutt-logo-border transition-colors duration-300"
        />

        {/* Bottom & Right Neon Green Edge */}
        <path
          d="M 75 82 L 245 82 L 262 14 L 210 14"
          stroke="#00FF66"
          strokeWidth="6"
          strokeLinecap="square"
          strokeLinejoin="miter"
          filter="url(#greenGlow)"
        />

        {/* Neon Glow Filter */}
        <defs>
          <filter id="greenGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#00FF66" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* Text KUTT */}
        {/* 'K' */}
        <path
          d="M 54 28 L 68 28 L 68 47 L 85 28 L 102 28 L 78 52 L 104 74 L 86 74 L 68 56 L 68 74 L 54 74 Z"
          fill="#FFFFFF"
          className="kutt-logo-letter transition-colors duration-300"
        />

        {/* 'U' - with signature green inner accent */}
        <path
          d="M 108 28 L 122 28 L 122 56 C 122 62 125 65 131 65 C 137 65 140 62 140 56 L 140 28 L 154 28 L 154 56 C 154 69 145 76 131 76 C 117 76 108 69 108 56 Z"
          fill="#FFFFFF"
          className="kutt-logo-letter transition-colors duration-300"
        />
        {/* Green inner accent for 'U' */}
        <path
          d="M 124 38 L 124 55 C 124 59 127 61 131 61 C 135 61 138 59 138 55 L 138 38 L 146 38 L 146 55 C 146 64 140 69 131 69 C 122 69 116 64 116 55 L 116 38 Z"
          fill="#00FF66"
          filter="url(#greenGlow)"
        />

        {/* First 'T' */}
        <path
          d="M 158 28 L 194 28 L 194 40 L 183 40 L 183 74 L 169 74 L 169 40 L 158 40 Z"
          fill="#FFFFFF"
          className="kutt-logo-letter transition-colors duration-300"
        />

        {/* Second 'T' */}
        <path
          d="M 198 28 L 234 28 L 234 40 L 223 40 L 223 74 L 209 74 L 209 40 L 198 40 Z"
          fill="#FFFFFF"
          className="kutt-logo-letter transition-colors duration-300"
        />
      </svg>
    </div>
  );
}
