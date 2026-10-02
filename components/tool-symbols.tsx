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
