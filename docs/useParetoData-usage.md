# Hook useParetoData - Documentación de Uso

## Descripción

El hook `useParetoData` centraliza toda la lógica de procesamiento de datos para análisis de Pareto, permitiendo reutilización eficiente en toda la aplicación.

## Ventajas

- ✅ **Reduce duplicación de código**: Lógica centralizada en un solo lugar
- ✅ **Mejora rendimiento**: Memoización automática de cálculos complejos
- ✅ **Facilita mantenimiento**: Cambios en un solo archivo afectan toda la app
- ✅ **Consistencia**: Mismos cálculos en todos los componentes
- ✅ **Reutilización**: Usar con datos externos o del store

## Hooks Disponibles

### 1. `useParetoData(options?)`

Hook principal que retorna análisis completo de Pareto.

**Parámetros:**

```typescript
interface UseParetoDataOptions {
  threshold?: number // Umbral para principio 80/20 (default: 80)
  problems?: Problem[] // Datos externos (opcional, usa store por defecto)
}
```

**Retorna:**

```typescript
interface ParetoAnalysis {
  data: ParetoDataItem[] // Datos procesados y ordenados
  totalFrequency: number // Suma total de frecuencias
  totalCategories: number // Número de categorías
  topCause: string // Causa principal
  principalCauses: ParetoDataItem[] // Causas críticas (80/20)
  threshold: number // Umbral usado
}
```

### 2. `useParetoChartData(options?)`

Hook especializado para datos de gráfico de Pareto.

## Ejemplos de Uso

### Ejemplo 1: Análisis básico (actual)

```typescript
import { useParetoData } from '@/hooks/useParetoData'

const Analysis = () => {
  const { data: paretoData, totalFrequency, topCause } = useParetoData()

  return (
    <div>
      <h2>Total: {totalFrequency}</h2>
      <h3>Causa principal: {topCause}</h3>
      {paretoData.map(item => (
        <div key={item.category}>
          {item.category}: {item.frequency} ({item.percentage.toFixed(1)}%)
        </div>
      ))}
    </div>
  )
}
```

### Ejemplo 2: Gráfico de Pareto (actual)

```typescript
import { useParetoChartData } from '@/hooks/useParetoData'

const ParetoChartSection = () => {
  const chartData = useParetoChartData()

  return <ParetoChart data={chartData} />
}
```

### Ejemplo 3: Dashboard con métricas personalizadas

```typescript
import { useParetoData } from '@/hooks/useParetoData'

const MetricsDashboard = () => {
  const { principalCauses, totalFrequency, data } = useParetoData()

  const criticalItemsPercentage = (principalCauses.length / data.length) * 100
  const criticalFrequencyPercentage =
    (principalCauses.reduce((sum, item) => sum + item.frequency, 0) /
      totalFrequency) *
    100

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="stat-card">
        <h3>Elementos Críticos</h3>
        <p>
          {principalCauses.length} de {data.length} (
          {criticalItemsPercentage.toFixed(1)}%)
        </p>
      </div>
      <div className="stat-card">
        <h3>Impacto de Elementos Críticos</h3>
        <p>{criticalFrequencyPercentage.toFixed(1)}% del total</p>
      </div>
    </div>
  )
}
```

### Ejemplo 4: Comparación con datos externos

```typescript
import { useParetoData } from '@/hooks/useParetoData'

const ComparisonView = ({ externalData }: { externalData: Problem[] }) => {
  const currentAnalysis = useParetoData()
  const externalAnalysis = useParetoData({ problems: externalData })

  return (
    <div className="comparison">
      <div>
        <h3>Datos Actuales</h3>
        <p>Causa principal: {currentAnalysis.topCause}</p>
      </div>
      <div>
        <h3>Datos Comparativos</h3>
        <p>Causa principal: {externalAnalysis.topCause}</p>
      </div>
    </div>
  )
}
```

### Ejemplo 5: Filtros dinámicos

```typescript
import { useParetoData } from '@/hooks/useParetoData'

const FilterableAnalysis = () => {
  const [threshold, setThreshold] = useState(80)
  const { data, principalCauses } = useParetoData({ threshold })

  return (
    <div>
      <label>
        Umbral 80/20:
        <input
          type="range"
          min="50"
          max="95"
          value={threshold}
          onChange={e => setThreshold(Number(e.target.value))}
        />
        {threshold}%
      </label>

      <h3>Elementos Críticos ({principalCauses.length}):</h3>
      {principalCauses.map(item => (
        <div key={item.category} className="critical-item">
          {item.category}: {item.cumulativePercentage.toFixed(1)}%
        </div>
      ))}
    </div>
  )
}
```

## Optimizaciones de Rendimiento

### Antes (código duplicado):

```typescript
// En Analysis.tsx
const data = useAppSelector(state => state.problems);
const totalFrequency = data.reduce((sum, p) => sum + p.frequency, 0);
let cumulativeSum = 0;
const paretoData = data.slice().sort((a, b) => b.frequency - a.frequency)...

// En ParetoChartSection.tsx
const problems = useAppSelector(state => state.problems);
const total = problems.reduce((sum, p) => sum + p.frequency, 0);
let cumulative = 0;
const chartData = problems.slice().sort((a, b) => b.frequency - a.frequency)...
```

### Después (optimizado):

```typescript
// En ambos componentes
const analysis = useParetoData() // Memoizado automáticamente
```

## Casos de Uso Adicionales

1. **Reportes**: Generar PDFs con datos consistentes
2. **APIs**: Enviar datos procesados al backend
3. **Comparaciones**: Analizar diferentes conjuntos de datos
4. **Filtros**: Aplicar diferentes umbrales dinámicamente
5. **Exportación**: Datos formateados para Excel/CSV

## Migración

Para migrar componentes existentes:

1. Importar el hook: `import { useParetoData } from '@/hooks/useParetoData'`
2. Reemplazar lógica de procesamiento: `const analysis = useParetoData()`
3. Usar datos del hook: `analysis.data`, `analysis.totalFrequency`, etc.
4. Remover imports innecesarios y lógica duplicada
