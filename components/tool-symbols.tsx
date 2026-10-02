// Hand-drawn symbols for toolbox entries that are concepts, not brands, so no
// logo set covers them. 24px grid, currentColor, matching the simple-icons.
const Svg = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);

// two-way arrows: one connection, messages both directions
export const WebSocketsSymbol = ({ className }: { className?: string }) => (
  <Svg className={className}>
    <path d="M4 8h15l-4-4" />
    <path d="M20 16H5l4 4" />
  </Svg>
);

// sparkle: the common shorthand for generated / AI output
export const LlmSymbol = ({ className }: { className?: string }) => (
  <Svg className={className}>
    <path d="M10 3.5 11.9 9l5.6 1.9-5.6 1.9L10 18.4l-1.9-5.6L2.5 10.9 8.1 9z" />
    <path d="M18.5 3v4M16.5 5h4" />
  </Svg>
);

// two edits converging into one state: what a CRDT like Yjs does
export const YjsSymbol = ({ className }: { className?: string }) => (
  <Svg className={className}>
    <circle cx="6" cy="5" r="2.2" />
    <circle cx="18" cy="5" r="2.2" />
    <circle cx="12" cy="19" r="2.2" />
    <path d="M7.4 6.8 12 12l4.6-5.2M12 12v4.8" />
  </Svg>
);
