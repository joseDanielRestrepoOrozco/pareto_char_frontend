import { StyleSheet } from '@react-pdf/renderer';

export const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 42.5, // 1.5 cm en puntos (1 cm = 28.35 puntos)
    height: 42.5,
    marginRight: 15,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    color: '#003e70',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 15,
    marginTop: 20,
    color: '#003e70',
    fontWeight: 'bold',
  },
  section: {
    margin: '10 0',
    padding: 10,
  },
  projectInfo: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    marginBottom: 20,
    border: '1px solid #e0e0e0',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    width: 120,
    color: '#003e70',
  },
  value: {
    flex: 1,
  },
  table: {
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderColor: '#bfbfbf',
    marginBottom: 20,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: '#bfbfbf',
    backgroundColor: '#f0f0f0',
    padding: 8,
  },
  tableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: '#bfbfbf',
    padding: 8,
  },
  tableCellHeader: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableCell: {
    fontSize: 10,
    textAlign: 'center',
  },
  summary: {
    backgroundColor: '#e8f4f8',
    padding: 15,
    marginTop: 20,
    border: '1px solid #d5bb87',
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#003e70',
  },
  summaryText: {
    fontSize: 11,
    lineHeight: 1.5,
    marginBottom: 8,
  },
  criticalItem: {
    backgroundColor: '#fff3cd',
    padding: 8,
    marginBottom: 5,
    border: '1px solid #d5bb87',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#666666',
    borderTop: '1px solid #e0e0e0',
    paddingTop: 10,
  },
});
