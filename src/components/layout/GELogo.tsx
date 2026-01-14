const GELogo = ({ className = "w-10 h-10" }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gold gradient for the logo */}
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
        
        {/* Darker gold for depth */}
        <linearGradient id="goldDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>

        {/* Glow effect */}
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background circle with subtle glow */}
      <circle
        cx="50"
        cy="50"
        r="46"
        fill="none"
        stroke="url(#goldGradient)"
        strokeWidth="3"
        opacity="0.3"
      />

      {/* Main G shape - forms the outer structure */}
      <path
        d="M 70 35
           A 28 28 0 1 0 70 65
           L 70 55
           L 55 55
           L 55 50
           L 75 50
           L 75 70
           A 35 35 0 1 1 75 30
           L 70 35"
        fill="url(#goldGradient)"
        filter="url(#glow)"
      />

      {/* E integrated inside - three horizontal bars */}
      <g transform="translate(30, 35)">
        {/* Top bar of E */}
        <rect
          x="0"
          y="0"
          width="22"
          height="6"
          rx="2"
          fill="url(#goldGradient)"
        />
        
        {/* Middle bar of E - slightly shorter */}
        <rect
          x="0"
          y="12"
          width="18"
          height="6"
          rx="2"
          fill="url(#goldGradient)"
        />
        
        {/* Bottom bar of E */}
        <rect
          x="0"
          y="24"
          width="22"
          height="6"
          rx="2"
          fill="url(#goldGradient)"
        />
        
        {/* Vertical bar of E */}
        <rect
          x="0"
          y="0"
          width="6"
          height="30"
          rx="2"
          fill="url(#goldDark)"
        />
      </g>

      {/* Accent dot */}
      <circle
        cx="72"
        cy="52"
        r="4"
        fill="url(#goldGradient)"
      />
    </svg>
  );
};

export default GELogo;