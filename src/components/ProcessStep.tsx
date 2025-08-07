const ProcessStep = ({
  stepNumber,
  title,
  children,
}: {
  stepNumber: number;
  title: string;
  children: React.ReactNode;
}) => {
  const style = stepNumber % 2 === 0 ? 'bg-blue-light' : 'bg-blue-base';

  return (
    <div className="bg-gold-light p-6 rounded-xl border-l-4 border-blue-base">
      <div className="flex items-start space-x-4">
        <div
          className={`${style} w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1`}
        >
          <span className="text-white font-bold text-sm">{stepNumber}</span>
        </div>
        <div>
          <h5 className="font-bold text-blue-base mb-2">{title}</h5>
          <p className="text-blue-dark">{children}</p>
        </div>
      </div>
    </div>
  );
};

export default ProcessStep;
