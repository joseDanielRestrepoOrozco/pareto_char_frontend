import { Page, Text, View, Document, Image } from '@react-pdf/renderer';
import type { Project } from '@/types/Project';
import type { Problem } from '@/types/Problem';
import { pdfStyles as styles } from '@/components/pdf-styles';

interface MyDocumentProps {
  project: Project;
}

// Calculate Pareto analysis
const calculateParetoAnalysis = (
  problems: Problem[],
  threshold: number = 80
) => {
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
        isCritical: false,
      };
    });

  // Mark critical items
  const thresholdIndex = processedData.findIndex(
    item => item.cumulativePercentage > threshold
  );
  const criticalEndIndex =
    thresholdIndex === -1 ? processedData.length - 1 : thresholdIndex;

  processedData.forEach((item, index) => {
    item.isCritical = index <= criticalEndIndex;
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
};

const logoUniversity = '/images/logo.jpg';

// Create Document Component
const MyDocument = ({ project }: MyDocumentProps) => {
  const analysis = calculateParetoAnalysis(project.problems || []);
  const currentDate = new Date().toLocaleDateString('es-ES');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with Logo */}
        <View style={styles.headerContainer}>
          <Image style={styles.logo} src={logoUniversity} />
          <Text style={styles.header}>Análisis de Pareto - {project.name}</Text>
        </View>

        {/* Project Information */}
        <View style={styles.projectInfo}>
          <Text style={styles.subtitle}>Información del Proyecto</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Nombre:</Text>
            <Text style={styles.value}>{project.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Fecha de Creación:</Text>
            <Text style={styles.value}>
              {new Date(project.createdAt).toLocaleDateString('es-ES')}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Última Actualización:</Text>
            <Text style={styles.value}>
              {new Date(project.updatedAt).toLocaleDateString('es-ES')}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Total de Problemas:</Text>
            <Text style={styles.value}>{analysis.totalCategories}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Frecuencia Total:</Text>
            <Text style={styles.value}>{analysis.totalFrequency}</Text>
          </View>
        </View>

        {/* Problems Data Table */}
        {analysis.data.length > 0 && (
          <>
            <Text style={styles.subtitle}>Datos de los Problemas</Text>
            <View style={styles.table}>
              {/* Table Header */}
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>Problema</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>Frecuencia</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>Porcentaje</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>Acumulado</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>Crítico</Text>
                </View>
              </View>

              {/* Table Rows */}
              {analysis.data.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{item.category}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{item.frequency}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {item.percentage.toFixed(1)}%
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {item.cumulativePercentage.toFixed(1)}%
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {item.isCritical ? 'Sí' : 'No'}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Analysis Summary */}
        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Resumen del Análisis</Text>

          <Text style={styles.summaryText}>
            <Text style={{ fontWeight: 'bold' }}>
              Principio de Pareto (80/20):
            </Text>{' '}
            El {analysis.threshold}% de los problemas son causados por{' '}
            {analysis.principalCauses.length} de las {analysis.totalCategories}{' '}
            categorías identificadas.
          </Text>

          <Text style={styles.summaryText}>
            <Text style={{ fontWeight: 'bold' }}>Causa Principal:</Text>{' '}
            {analysis.topCause}
          </Text>

          {analysis.principalCauses.length > 0 && (
            <>
              <Text style={styles.summaryText}>
                <Text style={{ fontWeight: 'bold' }}>
                  Causas Críticas (Foco de Acción):
                </Text>
              </Text>
              {analysis.principalCauses.map((cause, index) => (
                <View key={index} style={styles.criticalItem}>
                  <Text style={{ fontSize: 10 }}>
                    {cause.category}: {cause.frequency} ocurrencias (
                    {cause.percentage.toFixed(1)}%)
                  </Text>
                </View>
              ))}
            </>
          )}

          <Text style={styles.summaryText}>
            <Text style={{ fontWeight: 'bold' }}>Recomendación:</Text> Concentre
            esfuerzos en las causas críticas listadas arriba para obtener el
            máximo impacto en la resolución de los problemas.
          </Text>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Reporte generado el {currentDate} • Análisis de Pareto •{' '}
          {project.name}
        </Text>
      </Page>
    </Document>
  );
};

export default MyDocument;
