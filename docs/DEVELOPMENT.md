# Guía de Desarrollo - Pareto Frontend

## 🏗️ Arquitectura del Proyecto

### Estructura de Carpetas Detallada

```
src/
├── assets/                 # Recursos estáticos
│   └── fonts/             # Fuentes personalizadas
├── components/            # Componentes reutilizables
│   ├── ui/               # Componentes base (Radix UI + Tailwind)
│   ├── app-sidebar.tsx   # Sidebar principal de la app
│   ├── Header.tsx        # Header con navegación
│   ├── ParetoChart.tsx   # Componente del gráfico de Pareto
│   └── ...
├── hooks/                # Custom hooks
│   ├── store.ts          # Hooks de Redux (useAppDispatch, useAppSelector)
│   ├── useAuth.ts        # Lógica de autenticación
│   ├── useParetoData.ts  # Manejo de datos de Pareto
│   └── ...
├── layouts/              # Layouts de páginas
│   └── DashboardLayout.tsx
├── lib/                  # Utilidades y helpers
│   └── utils.ts          # Funciones de utilidad (cn, clsx)
├── pages/                # Páginas principales de la aplicación
├── sections/             # Secciones grandes de páginas
├── services/             # Comunicación con APIs
├── store/                # Redux store y slices
├── types/                # Definiciones TypeScript
└── config.ts             # Configuración global
```

## 🔧 Configuración de Desarrollo

### ESLint y TypeScript

El proyecto usa configuración estricta de TypeScript y ESLint:

```typescript
// tsconfig.json configuraciones clave
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

### Alias de Importación

```typescript
// Configurado en vite.config.ts
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
}

// Uso en componentes
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
```

## 🎨 Sistema de Componentes

### Componentes Base (UI)

Todos los componentes UI están basados en Radix UI con estilos Tailwind:

```typescript
// Ejemplo: Button component
interface ButtonProps {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}
```

### Composición de Componentes

```typescript
// Patrón usado en el proyecto
const Header = ({ project }: { project: Project | null }) => {
  return (
    <header className="...">
      <Breadcrumb />
      {project && <ProjectActions project={project} />}
    </header>
  )
}
```

## 🔄 Manejo de Estado

### Redux Store Structure

```typescript
// store/index.ts
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    project: projectSlice.reducer,
    problems: problemsSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

### Slices Principales

#### Auth Slice

```typescript
interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
}

// Actions principales
;-setUser - setPendingUser - verifySuccess - clearUser
```

#### Project Slice

```typescript
interface ProjectState {
  projects: Project[]
  currentProject: Project | null
  loading: boolean
}
```

## 🔐 Sistema de Autenticación

### Flujo Completo

1. **Registro**:

   ```typescript
   const signup = async (userData: RegisterData) => {
     // 1. Enviar datos de registro
     // 2. Guardar usuario pendiente
     // 3. Navegar a verificación
   }
   ```

2. **Verificación de Cuenta**:

   ```typescript
   const verifyCode = async (code: string, isActivation: boolean) => {
     // 1. Verificar código
     // 2. Activar cuenta o completar login
     // 3. Guardar token y navegar al dashboard
   }
   ```

3. **Login con 2FA**:
   ```typescript
   const login = async (userData: LoginData) => {
     // 1. Validar credenciales
     // 2. Guardar usuario temporal
     // 3. Navegar a verificación 2FA
   }
   ```

### Protección de Rutas

```typescript
// ProtectedRoute component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" />
}
```

## 📊 Componente ParetoChart

### Uso de Recharts

```typescript
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from 'recharts'

// Estructura de datos esperada
interface ParetoData {
  name: string
  frequency: number
  cumulative: number
  percentage: number
}
```

### Configuración del Gráfico

```typescript
const ParetoChart = ({ data }: { data: ParetoData[] }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="frequency" fill="#f59e0b" />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="cumulative"
          stroke="#1e3a8a"
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
```

## 🌐 Servicios de API

### Configuración de Axios

```typescript
// services/axios.ts
const instance = axios.create({
  baseURL: VITE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para tokens
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

### Servicios por Módulo

```typescript
// services/auth.ts
export const registerRequest = async (data: RegisterData) => {
  const response = await axios.post<User>('/auth/register', data)
  return response.data
}

// services/project.ts
export const getProjectsRequest = async () => {
  const response = await axios.get<Project[]>('/projects')
  return response.data
}
```

## 🎯 Hooks Personalizados

### useAuth Hook

```typescript
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signup = async (userData: RegisterData) => { ... };
  const login = async (userData: LoginData) => { ... };
  const verifyCode = async (code: string, verifyActivation: boolean) => { ... };
  const logout = () => { ... };
  const verifyToken = async () => { ... };

  return {
    signup,
    login,
    verifyCode,
    logout,
    isAuthenticated,
    user,
    verifyToken,
  };
};
```

### useParetoData Hook

```typescript
export const useParetoData = () => {
  const [data, setData] = useState<ParetoData[]>([])

  const processData = (rawData: RawProblemData[]) => {
    // Lógica para calcular frecuencias y porcentajes acumulativos
    const processed = calculateParetoData(rawData)
    setData(processed)
  }

  return { data, processData }
}
```

## 🚀 Mejores Prácticas

### Tipado TypeScript

```typescript
// Siempre definir interfaces para props
interface ComponentProps {
  title: string
  onAction: (id: string) => void
  optional?: boolean
}

// Usar tipos específicos para eventos
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault()
}
```

### Gestión de Formularios

```typescript
// Usar react-hook-form + zod para validación
const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
})

const form = useForm({
  resolver: zodResolver(schema),
  mode: 'onTouched',
})
```

### Manejo de Errores

```typescript
// Usar toast para notificaciones
import { toast } from 'sonner'

toast.promise(apiCall(), {
  loading: 'Cargando...',
  success: 'Operación exitosa',
  error: error => `Error: ${error.message}`,
})
```

## 🔧 Comandos de Desarrollo

```bash
# Desarrollo
pnpm dev                    # Servidor de desarrollo
pnpm dev --host            # Accesible desde la red

# Build
pnpm build                 # Build de producción
pnpm preview              # Preview del build

# Linting
pnpm lint                 # Ejecutar ESLint
pnpm lint --fix           # Corregir errores automáticamente

# Dependencias
pnpm add <package>        # Agregar dependencia
pnpm add -D <package>     # Agregar dev dependency
```

## 📱 Responsive Design

### Breakpoints Tailwind

```css
/* Configuración actual */
sm: '640px'
md: '768px'
lg: '1024px'
xl: '1280px'
2xl: '1536px'
```

### Patrones Responsive

```typescript
// Sidebar responsive
<div className="hidden md:block">
  <AppSidebar />
</div>

// Botones adaptativos
<Button className="w-full sm:w-auto">
  Acción
</Button>
```

## 🧪 Testing (Para implementar)

### Estructura Recomendada

```
src/
├── __tests__/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── utils/
└── test-utils/
    ├── setup.ts
    ├── mocks/
    └── helpers/
```

### Testing Hooks

```typescript
// Ejemplo para testing de useAuth
import { renderHook } from '@testing-library/react'
import { Provider } from 'react-redux'
import { useAuth } from '@/hooks/useAuth'

test('should handle login correctly', async () => {
  const { result } = renderHook(() => useAuth(), {
    wrapper: ({ children }) => (
      <Provider store={testStore}>{children}</Provider>
    ),
  })

  await act(async () => {
    await result.current.login(mockLoginData)
  })

  expect(result.current.isAuthenticated).toBe(true)
})
```

## 🔍 Debugging

### Redux DevTools

```typescript
// Ya configurado en store/index.ts
export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
})
```

### Vite DevTools

```bash
# Variables de entorno para debugging
VITE_DEBUG=true
```

## 📦 Optimización

### Code Splitting

```typescript
// Lazy loading de páginas
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Login = lazy(() => import('@/pages/Login'))

// Usar con Suspense
;<Suspense fallback={<LoadingSpinner />}>
  <Dashboard />
</Suspense>
```

### Bundle Analysis

```bash
# Analizar el bundle (instalar primero)
pnpm add -D rollup-plugin-visualizer
pnpm build --analyze
```
