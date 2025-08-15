import React from 'react';
import logo from '@/assets/images/logo-gold.png';

const Logo: React.FC<{ showText?: boolean; size?: number }> = ({
  showText = true,
  size = 40
}) => {
  return (
    <div className="flex items-center space-x-2">
      <img
        src={logo}
        alt="Logo"
        width={size}
        height={size}
      />
      {showText && (
        <h1 className="text-2xl font-bold text-white">Diagrama de Pareto</h1>
      )}
    </div>
  );
};

export default Logo;
