import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'bordered' | 'elevated';
  contentScrollable?: boolean; // activa scroll interno para el contenido
}

const DashboardCard = ({
  title,
  description,
  children,
  className,
  variant = 'default',
  contentScrollable = false
}: DashboardCardProps) => {
  const cardVariants = {
    default: '',
    bordered: 'border-2 border-gold-base',
    elevated: 'shadow-lg border border-gold-base'
  } as const;

  return (
    <Card className={cn('flex flex-col', cardVariants[variant], className)}>
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-blue-dark">{title}</CardTitle>
        {description && (
          <CardDescription className="text-gold-dark">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent
        className={cn(
          'space-y-4 flex-1 flex flex-col',
          contentScrollable && 'overflow-y-auto'
        )}
      >
        {children}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
