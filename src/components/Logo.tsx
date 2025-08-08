import { BarChart3 } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <BarChart3 className="h-8 w-8 text-gold-light " />
      <h1 className="text-2xl font-bold text-white">Diagrama de Pareto</h1>
    </div>
  );
};

export default Logo;
