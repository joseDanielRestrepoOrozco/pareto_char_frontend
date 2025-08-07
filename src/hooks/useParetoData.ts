import { useMemo } from 'react';
import { useAppSelector } from '@/hooks/store';
import type { Problem } from '@/types/Problem';

export interface ParetoDataItem {
  category: string;
  frequency: number;
  percentage: number;
  cumulative: number;
  cumulativePercentage: number;
  isCritical: boolean;
  isGolden?: boolean;
}

export interface ParetoAnalysis {
  data: ParetoDataItem[];
  totalFrequency: number;
  totalCategories: number;
  topCause: string;
  principalCauses: ParetoDataItem[];
  threshold: number;
}

interface UseParetoDataOptions {
  threshold?: number;
  problems?: Problem[];
}

export const useParetoData = (
  options: UseParetoDataOptions = {}
): ParetoAnalysis => {
  const { threshold = 80, problems: externalProblems } = options;

  const storeProblems = useAppSelector(state => state.problems) as Problem[];
  const problems = externalProblems || storeProblems;

  const analysis = useMemo(() => {
    if (!problems || problems.length === 0) {
      return {
        data: [],
        totalFrequency: 0,
        totalCategories: 0,
        topCause: 'N/A',
        principalCauses: [],
        threshold,
      };
    }

    const totalFrequency = problems.reduce((sum, p) => sum + p.frequency, 0);
    let cumulativeSum = 0;
    let cumulativeFrequency = 0;

    const processedData = problems
      .slice()
      .sort((a, b) => b.frequency - a.frequency)
      .map(problem => {
        const percentage =
          totalFrequency > 0 ? (problem.frequency / totalFrequency) * 100 : 0;
        cumulativeSum += percentage;
        cumulativeFrequency += problem.frequency;

        return {
          category: problem.name,
          frequency: problem.frequency,
          percentage,
          cumulative: cumulativeFrequency,
          cumulativePercentage: cumulativeSum,
          isCritical: false, // Se asignará después
          isGolden: false, // Se asignará después
        };
      });

    // Encontrar índice donde se supera el threshold e incluirlo como crítico
    const thresholdIndex = processedData.findIndex(
      item => item.cumulativePercentage > threshold
    );
    const criticalEndIndex =
      thresholdIndex === -1 ? processedData.length - 1 : thresholdIndex;

    // Marcar elementos críticos de una vez
    processedData.forEach((item, index) => {
      const isCritical = index <= criticalEndIndex;
      item.isCritical = isCritical;
      item.isGolden = isCritical;
    });

    const principalCauses = processedData.filter(item => item.isCritical);

    const topCause = processedData[0]?.category || 'N/A';

    return {
      data: processedData,
      totalFrequency,
      totalCategories: problems.length,
      topCause,
      principalCauses,
      threshold,
    };
  }, [problems, threshold]);

  return analysis;
};

export const useParetoChartData = (options: UseParetoDataOptions = {}) => {
  const analysis = useParetoData(options);

  return useMemo(() => {
    return analysis.data.map(item => ({
      category: item.category,
      frequency: item.frequency,
      percentage: item.percentage,
      cumulative: item.cumulativePercentage,
      isGolden: item.isGolden,
    }));
  }, [analysis.data]);
};

export default useParetoData;
