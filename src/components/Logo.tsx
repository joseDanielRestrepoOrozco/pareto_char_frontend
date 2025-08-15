import React from 'react';
import logoUcaldas from '@/assets/images/logo.jpg';

const Logo: React.FC<{ showText?: boolean; size?: number }> = ({
  showText = true,
  size = 40
}) => {
  return (
    <div className="flex items-center space-x-2">
      <img
        src={logoUcaldas}
        alt="Logo"
        width={size}
        height={size}
        className="rounded-md object-cover shadow-sm"
      />
      {showText && (
        <h1 className="text-2xl font-bold text-white">Diagrama de Pareto</h1>
      )}
    </div>
  );
};

export default Logo;
