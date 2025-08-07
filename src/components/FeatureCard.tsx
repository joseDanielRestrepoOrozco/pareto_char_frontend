const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) => {
  return (
    <div className="bg-gold-base p-4 rounded-lg">
      <div className="flex items-center mb-2">
        <Icon className="h-5 w-5 text-blue-base mr-2" />
        <h6 className="font-bold text-blue-base">{title}</h6>
      </div>
      <p className="text-blue-dark text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;
