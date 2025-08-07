import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'bordered' | 'elevated';
}

const DashboardCard = ({
  title,
  description,
  children,
  className,
  variant = 'default',
}: DashboardCardProps) => {
  const cardVariants = {
    default: '',
    bordered: 'border-2 border-gold-base',
    elevated: 'shadow-lg border border-gold-base',
  };

  return (
    <Card className={cn(cardVariants[variant], className)}>
      <CardHeader>
        <CardTitle className="text-blue-dark">{title}</CardTitle>
        {description && (
          <CardDescription className="text-gold-dark">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
};

export default DashboardCard;
