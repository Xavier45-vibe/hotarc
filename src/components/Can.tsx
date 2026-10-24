export function Can({ color = "#C9A24B", className }: { color?: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 240" role="img" aria-label="Hot Arc drink can" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="canbody" x1="0" x2="1">
          <stop offset="0" stopColor="#0d0c0a" />
          <stop offset="0.35" stopColor="#26231c" />
          <stop offset="1" stopColor="#0d0c0a" />
        </linearGradient>
      </defs>
      <rect x="10" y="20" width="100" height="205" rx="14" fill="url(#canbody)" stroke={color} strokeWidth="1.5" />
      <rect x="22" y="8" width="76" height="16" rx="6" fill="#26231c" stroke={color} strokeWidth="1.5" />
      <path d="M32 140 C45 92 75 92 88 140" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M42 140 C50 112 70 112 78 140" fill="none" stroke="#E8CF8F" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="30" y1="165" x2="90" y2="165" stroke={color} strokeWidth="0.8" />
      <text x="60" y="190" textAnchor="middle" fontFamily="Georgia, serif" letterSpacing="3" fontSize="13" fill={color}>HOT ARC</text>
      <text x="60" y="207" textAnchor="middle" fontFamily="Georgia, serif" letterSpacing="2" fontSize="6" fill="#a8a08e">GERMAN CRAFT</text>
      <rect x="18" y="40" width="5" height="150" rx="2.5" fill="#fff" opacity="0.08" />
    </svg>
  );
}
