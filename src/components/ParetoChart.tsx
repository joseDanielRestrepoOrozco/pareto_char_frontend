'use client';

import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  ComposedChart,
  Cell,
} from 'recharts';

interface ParetoData {
  category: string;
  frequency: number;
  percentage: number;
  cumulative: number;
  isGolden?: boolean;
}

interface ParetoChartProps {
  data: ParetoData[];
  barColors?: {
    critical?: string;
    normal?: string;
  };
  lineColors?: {
    cumulative?: string;
    reference?: string;
  };
  threshold?: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: ParetoData & { isGolden?: boolean };
  }>;
  label?: string;
}

const DEFAULT_COLORS = {
  bar: {
    critical: '#d5bb87',
    normal: '#003e70',
  },
  line: {
    cumulative: '#045389',
    reference: '#b5a27c',
  },
  text: {
    dark: '#00284d',
    light: '#045389',
  },
};

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0]?.payload;
  return (
    <div className="bg-white p-4 border-2 rounded-lg shadow-lg border-gold-base min-w-[180px]">
      <p className="font-semibold mb-2 text-blue-dark truncate">{label}</p>
      <p className="text-blue-base">{`Frecuencia: ${
        payload[0]?.value?.toLocaleString() || 0
      }`}</p>
      <p className="text-blue-light">{`Acumulado: ${(
        payload[1]?.value || 0
      ).toFixed(1)}%`}</p>
      {data?.isGolden && (
        <p className="text-xs mt-1 font-medium text-gold-dark">
          ⭐ Parte crítica (80/20)
        </p>
      )}
    </div>
  );
};

const ParetoChart = ({
  data,
  barColors = DEFAULT_COLORS.bar,
  lineColors = DEFAULT_COLORS.line,
  threshold = 80,
}: ParetoChartProps) => {

  // Si no hay datos, mostrar mensaje
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <p className="text-gray-500">No hay datos disponibles</p>
      </div>
    );
  }

  return (
    <div
      className="w-full h-96"
      role="graphics-document"
      aria-label="Gráfico de Pareto"
    >
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} accessibilityLayer>
          <CartesianGrid strokeDasharray="3 3" stroke="#d5bb87" opacity={0.5} />
          <XAxis
            dataKey="category"
            tick={{ fill: DEFAULT_COLORS.text.dark, fontSize: 12 }}
            axisLine={{ stroke: '#b5a27c' }}
            angle={-45}
            textAnchor="end"
            height={80}
            interval={0}
          />
          <YAxis
            yAxisId="left"
            tick={{ fill: DEFAULT_COLORS.text.dark, fontSize: 12 }}
            axisLine={{ stroke: '#b5a27c' }}
            label={{
              value: 'Frecuencia',
              angle: -90,
              position: 'insideLeft',
              style: { textAnchor: 'middle', fill: DEFAULT_COLORS.text.dark },
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[0, 100]}
            tick={{ fill: lineColors.cumulative, fontSize: 12 }}
            axisLine={{ stroke: lineColors.cumulative }}
            label={{
              value: 'Porcentaje Acumulado (%)',
              angle: 90,
              position: 'insideRight',
              style: { textAnchor: 'middle', fill: lineColors.cumulative },
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            payload={[
              {
                value: 'Frecuencia (Críticos)',
                type: 'rect',
                color: barColors.critical,
              },
              {
                value: 'Frecuencia (Otros)',
                type: 'rect',
                color: barColors.normal,
              },
              {
                value: '% Acumulado',
                type: 'line',
                color: lineColors.cumulative,
              },
              {
                value: `% línea ${threshold}%`,
                type: 'line',
                color: lineColors.reference,
              },
            ]}
          />
          <Bar
            yAxisId="left"
            dataKey="frequency"
            name="Frecuencia"
            radius={[4, 4, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.isGolden ? barColors.critical : barColors.normal}
                aria-label={`Categoría ${entry.category} con frecuencia ${entry.frequency}`}
              />
            ))}
          </Bar>
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="cumulative"
            stroke={lineColors.cumulative}
            strokeWidth={3}
            name="% Acumulado"
            dot={{ fill: lineColors.cumulative, strokeWidth: 2, r: 6 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey={() => threshold}
            stroke={lineColors.reference}
            strokeWidth={2}
            strokeDasharray="5 5"
            name={`Línea ${threshold}%`}
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ParetoChart;
