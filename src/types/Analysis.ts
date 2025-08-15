export type Analysis = {
  data: Datum[];
  totalFrequency: number;
  totalCategories: number;
  topCause: string;
  threshold: number;
};

export type Datum = {
  category: string;
  frequency: number;
  percentage: number;
  cumulativePercentage: number;
  cumulativeFrequency: number;
  isCritical: boolean;
};
