import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <Loader2 className="h-12 w-12 text-blue-dark animate-spin" />
      <span className="ml-2 text-lg">Cargando proyecto...</span>
    </div>
  );
};
