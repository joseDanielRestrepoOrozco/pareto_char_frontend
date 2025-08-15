import type { Analysis } from '@/types/Analysis';
import type { Project } from '@/types/Project';
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View
} from '@react-pdf/renderer';
import logo from '@/assets/images/logo.jpg';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica'
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  logo: { width: 42.5, height: 42.5, marginRight: 15 },
  header: {
    fontSize: 24,
    textAlign: 'center',
    color: '#003e70',
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 15,
    marginTop: 20,
    color: '#003e70',
    fontWeight: 'bold'
  },
  projectInfo: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#e0e0e0'
  },
  infoRow: { flexDirection: 'row', marginBottom: 8 },
  label: { fontWeight: 'bold', width: 120, color: '#003e70' },
  value: { flex: 1 },
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderColor: '#bfbfbf',
    marginBottom: 20
  },
  tableRow: {
    flexDirection: 'row'
  },
  tableColHeader: {
    flex: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: '#bfbfbf',
    backgroundColor: '#f0f0f0',
    padding: 8
  },
  tableCol: {
    flex: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: '#bfbfbf',
    padding: 8
  },
  tableCellHeader: { fontSize: 10, fontWeight: 'bold', textAlign: 'center' },
  tableCell: { fontSize: 10, textAlign: 'center' },
  summary: {
    backgroundColor: '#e8f4f8',
    padding: 15,
    marginTop: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#d5bb87'
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#003e70'
  },
  summaryText: { fontSize: 11, lineHeight: 14, marginBottom: 8 },
  criticalItem: {
    backgroundColor: '#fff3cd',
    padding: 8,
    marginBottom: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#d5bb87'
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#666666',
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: '#e0e0e0',
    paddingTop: 10
  }
});

interface ReportePdfProps {
  project: Project;
  analysis: Analysis;
}

const ReportePdf = ({ project, analysis }: ReportePdfProps) => {
  const currentDate = new Date().toLocaleDateString('es-ES');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerContainer}>
          <Image src={logo} style={styles.logo} />
          <Text style={styles.header}>Análisis de Pareto - {project.name}</Text>
        </View>
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
        {analysis.data.length > 0 ? (
          <View>
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
              {analysis.data.map(item => (
                <View
                  key={`${item.category}-${item.frequency}`}
                  style={styles.tableRow}
                >
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{item.category}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{item.frequency}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {Number.isFinite(item.percentage)
                        ? item.percentage.toFixed(1)
                        : '0.0'}
                      %
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {Number.isFinite(item.cumulativePercentage)
                        ? item.cumulativePercentage.toFixed(1)
                        : '0.0'}
                      %
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
          </View>
        ) : null}

        {/* Analysis Summary */}
        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Resumen del Análisis</Text>

          <Text style={styles.summaryText}>
            <Text style={{ fontWeight: 'bold' }}>
              Principio de Pareto (80/20):{' '}
            </Text>
            El {analysis.threshold}% de los problemas son causados por{' '}
            {analysis.data.filter(d => d.isCritical).length} de las{' '}
            {analysis.totalCategories} categorías identificadas.
          </Text>

          <Text style={styles.summaryText}>
            <Text style={{ fontWeight: 'bold' }}>Causa Principal: </Text>
            {analysis.topCause}
          </Text>

          {analysis.data.filter(d => d.isCritical).length > 0 ? (
            <View>
              <Text style={styles.summaryText}>
                <Text style={{ fontWeight: 'bold' }}>
                  Causas Críticas (Foco de Acción):
                </Text>
              </Text>
              {analysis.data
                .filter(d => d.isCritical)
                .map((cause, index) => (
                  <View
                    key={`${cause.category}-${index}`}
                    style={styles.criticalItem}
                  >
                    <Text style={{ fontSize: 10 }}>
                      {cause.category}: {cause.frequency} ocurrencias (
                      {Number.isFinite(cause.percentage)
                        ? cause.percentage.toFixed(1)
                        : '0.0'}
                      %)
                    </Text>
                  </View>
                ))}
            </View>
          ) : null}

          <Text style={styles.summaryText}>
            <Text style={{ fontWeight: 'bold' }}>Recomendación: </Text>
            Concentre esfuerzos en las causas críticas listadas arriba para
            obtener el máximo impacto en la resolución de los problemas.
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

export default ReportePdf;
