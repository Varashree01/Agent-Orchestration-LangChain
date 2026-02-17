// VARIX Logo - Thunderbolt design
export const VarixLogo = ({ size = 32, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="thunderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1e3a8a" />
        <stop offset="55%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1e40af" />
      </linearGradient>
      <linearGradient id="thunderGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.2" />
      </linearGradient>
    </defs>
    <path
      d="M36 4L12 36H30L24 60L52 26H34L36 4Z"
      fill="url(#thunderGradient)"
      stroke="#1e3a8a"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    <path
      d="M35 10L18 36H33L28 54L46 28H31L35 10Z"
      fill="url(#thunderGlow)"
      opacity="0.5"
    />
  </svg>
);

// User Avatar
export const UserAvatar = ({ username, size = 32, className = "" }) => (
  <div
    className={`flex items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white font-bold text-sm ${className}`}
    style={{ width: size, height: size }}
  >
    {username.charAt(0).toUpperCase()}
  </div>
);

// Agent Icons with gradients
export const AgentIcon = ({ agent, size = 24 }) => {
  const icons = {
    math_agent: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="mathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
        </defs>
        <circle cx="8" cy="6" r="1" fill="url(#mathGrad)" />
        <circle cx="16" cy="6" r="1" fill="url(#mathGrad)" />
        <circle cx="8" cy="18" r="1" fill="url(#mathGrad)" />
        <circle cx="16" cy="18" r="1" fill="url(#mathGrad)" />
        <path d="M8 8V16M16 8V16M4 12H20" stroke="url(#mathGrad)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    poem_agent: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="poemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
        <path d="M4 4H20V20H4V4Z" stroke="url(#poemGrad)" strokeWidth="2" />
        <path d="M8 8H16M8 12H16M8 16H12" stroke="url(#poemGrad)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    weather_agent: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="weatherGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="13" r="5" stroke="url(#weatherGrad)" strokeWidth="2" />
        <path d="M8 18C5.2 19.2 3 21.5 3 24M16 18C18.8 19.2 21 21.5 21 24" stroke="url(#weatherGrad)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    launch_vehicle_agent: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="rocketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
        </defs>
        <path d="M12 2L15 8H18L15 12M12 2L9 8H6L9 12M12 12V22M10 20L12 18L14 20" stroke="url(#rocketGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    todoist_agent: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="todoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
        <rect x="4" y="4" width="16" height="16" rx="2" stroke="url(#todoGrad)" strokeWidth="2" />
        <path d="M8 12L11 15L16 9" stroke="url(#todoGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  };

  return icons[agent] || icons.math_agent;
};
