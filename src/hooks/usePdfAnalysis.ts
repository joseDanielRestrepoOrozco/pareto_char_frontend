import { useState, useEffect, useMemo, createElement } from 'react';
import useParetoData from '@/hooks/useParetoData';
import type { ParetoAnalysis } from '@/hooks/useParetoData';
import MyDocument from '@/components/PDF';
import type { Project } from '@/types/Project';

interface UsePdfAnalysisResult {
  hasData: boolean;
  analysisSnapshot: ParetoAnalysis | null;
  pdfDocument: React.ReactNode | null;
  createSnapshot: () => void;
  canPrepare: boolean; // hay datos pero no snapshot aún
  canDownload: boolean; // snapshot listo
}

/**
 * Encapsula la lógica de creación de snapshot del análisis de Pareto y el documento PDF.
 * Mantiene un snapshot inmutable que sólo cambia cuando se invoca createSnapshot.
 */
export default function usePdfAnalysis(
  project: Project | null
): UsePdfAnalysisResult {
  const analysis = useParetoData();
  const hasData = !!analysis.data && analysis.data.length > 0;

  const [analysisSnapshot, setAnalysisSnapshot] =
    useState<ParetoAnalysis | null>(null);

  // Invalidar snapshot si se borran todos los datos
  useEffect(() => {
    if (!hasData && analysisSnapshot) setAnalysisSnapshot(null);
  }, [hasData, analysisSnapshot]);

  const createSnapshot = () => {
    if (!hasData) return;
    try {
      const snap =
        typeof structuredClone === 'function'
          ? structuredClone(analysis)
          : (JSON.parse(JSON.stringify(analysis)) as ParetoAnalysis);
      setAnalysisSnapshot(snap);
    } catch {
      setAnalysisSnapshot(analysis);
    }
  };

  const pdfDocument = useMemo(() => {
    if (!project || !analysisSnapshot) return null;
    return createElement(MyDocument, { project, analysis: analysisSnapshot });
  }, [project, analysisSnapshot]);

  return {
    hasData,
    analysisSnapshot,
    pdfDocument,
    createSnapshot,
    canPrepare: hasData && !analysisSnapshot,
    canDownload: !!analysisSnapshot && !!pdfDocument
  };
}
