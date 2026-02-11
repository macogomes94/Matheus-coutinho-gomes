
import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'color';
}

const GSGALogo: React.FC<LogoProps> = ({ className = "h-12", variant = 'light' }) => {
  const textColor = variant === 'light' ? '#FFFFFF' : (variant === 'color' ? '#00867D' : '#08201F');
  
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Sunburst Icon Recreated */}
      <svg viewBox="0 0 100 100" className="w-14 h-14 mb-2" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Diamond Center */}
        <rect x="46" y="46" width="8" height="8" transform="rotate(45 50 50)" fill={variant === 'light' ? 'white' : textColor} />
        
        {/* Radiating lines (recreating the specific dense pattern) */}
        {[...Array(40)].map((_, i) => {
          const angle = (i * Math.PI) / 20;
          const length = (i % 2 === 0) ? 35 : 25;
          const x2 = 50 + length * Math.cos(angle);
          const y2 = 50 + length * Math.sin(angle);
          return (
            <line
              key={i}
              x1={50 + 8 * Math.cos(angle)}
              y1={50 + 8 * Math.sin(angle)}
              x2={x2}
              y2={y2}
              stroke={variant === 'light' ? 'white' : textColor}
              strokeWidth="0.8"
              strokeLinecap="round"
              opacity={variant === 'light' ? '0.9' : '1'}
            />
          );
        })}
      </svg>
      
      {/* Typography - Matching the spacing and style of the provided logo */}
      <div className="text-center">
        <h1 
          className="text-xl font-normal tracking-[0.4em] uppercase leading-none"
          style={{ color: textColor, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Gaia Silva Gaede
        </h1>
        <p 
          className="text-[9px] font-bold tracking-[0.8em] uppercase mt-2 opacity-90"
          style={{ color: textColor }}
        >
          Advogados
        </p>
      </div>
    </div>
  );
};

export default GSGALogo;
