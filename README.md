# Diagrama de Pareto — Frontend 📊

Aplicación web React (Vite + TypeScript) para realizar análisis de Pareto y priorizar causas según el principio 80/20.

Proyecto académico de la Universidad de Caldas.

## 🌟 ¿Qué es el Principio de Pareto?

El Principio de Pareto, también conocido como la regla 80/20, establece que aproximadamente el 80% de los efectos provienen del 20% de las causas. En el contexto empresarial y de análisis de problemas, esto significa que:

- 80% de los problemas son causados por 20% de las causas raíz
- 80% de las quejas provienen de 20% de los clientes
- 80% de los defectos son producidos por 20% de los procesos

## 🚀 Características Principales

- Gráfico de Pareto interactivo con porcentajes acumulados
- Identificación automática de causas críticas por umbral (80/20 configurable)
- Gestión de proyectos (crear, listar, eliminar, actualizar)
- Descarga de reporte en PDF del análisis
- Autenticación con verificación en dos pasos (2FA)
- Interfaz responsive (móvil y escritorio)

## 📋 Requisitos

- Node.js 18+
- pnpm (recomendado)
- Backend accesible y su URL en variables de entorno

## 🔧 Instalación y Configuración

### 1) Clonar el repositorio

```bash
git clone https://github.com/joseDanielRestrepoOrozco/pareto_char_frontend.git
cd pareto_char_frontend
```

### 2) Instalar dependencias

```bash
pnpm install
```

### 3) Configurar variables de entorno

```bash
cp .env.example .env
```

Edita el archivo `.env` con la URL del backend:

```
# ejemplo
VITE_BACKEND_URL=http://localhost:3000/api
```

### 4) Ejecutar en desarrollo

```bash
pnpm run dev
```

La aplicación estará disponible en http://localhost:5173

## 📖 Guía de Uso

### 🔐 Primer Acceso - Registro de Usuario

1. **Accede a la aplicación** en tu navegador
2. **Haz clic en "Registrarse"** en la página principal
3. **Completa el formulario** con:
   - Nombre de usuario único
   - Dirección de correo electrónico válida
   - Contraseña segura (mínimo 8 caracteres, incluir números y símbolos)
4. **Verifica tu cuenta** con el código enviado a tu email
5. **¡Listo!** Ya puedes comenzar a usar la aplicación

### 🏠 Navegación Principal

#### Dashboard

- **Formulario para crear nuevos proyectos**

ó

- **Formulario para ingresar nuevos problemas al proyecto**
- **Lista de los problemas junto a sus frecuencias**
- **Diagrama de pareto ordenado de mayor a menor frecuencia**
- **Lista con el reporte de los problemas incluyendo frecuencias y porcentajes**

#### Sidebar de Navegación

- **Proyectos**: Lista de todos tus proyectos
- **Nuevo Proyecto**: Crear un análisis desde cero
- **Cerrar Sesión**: Salir de la aplicación

### 📊 Crear tu primer análisis de Pareto

#### Paso 1: Crear un Proyecto

1. En el dashboard, haz clic en **"Nuevo Proyecto"**
2. Completa la información:
   - **Nombre**: Ej. "Análisis de Defectos de Calidad Q1 2024"
   - **Categoría**: Selecciona la más apropiada
3. Haz clic en **"Crear Proyecto"**

#### Paso 2: Agregar Datos

1. **Accede al proyecto** creado
2. En la sección **"Ingreso de Datos"**, puedes:
   - **Ingresar manualmente**: Agregar problemas uno por uno (máximo 10 por proyecto)
   - Importación desde archivo: aún no disponible en el frontend
3. **Formato de datos requerido**:
   - **Problema/Causa**: Descripción del problema
   - **Frecuencia**: Número de veces que ocurrió
   - **Costo** (opcional): Impacto económico
4. **Limitaciones**:
   - Máximo 10 problemas por proyecto para mantener la claridad del análisis

#### Ejemplo de Datos:

| Problema                | Frecuencia |
| ----------------------- | ---------- |
| Defecto en soldadura    | 45         |
| Material defectuoso     | 32         |
| Error humano            | 28         |
| Falla de máquina        | 15         |
| Problema de calibración | 8          |

#### Paso 3: Generar el Análisis

1. Una vez ingresados los datos, haz clic en **"Generar Gráfico"**
2. La aplicación automáticamente:
   - Ordena los problemas por frecuencia (de mayor a menor)
   - Calcula los porcentajes individuales y acumulativos
   - Identifica el 20% crítico que causa el 80% de los problemas
   - Genera el gráfico de Pareto

### 📈 Interpretando los Resultados

#### El Gráfico de Pareto

- **Barras azules**: Representan la frecuencia de cada problema
- **Línea roja**: Muestra el porcentaje acumulativo
- **Zona sombreada**: Indica el 20% crítico (problemas prioritarios)

#### Análisis Automático

La aplicación te mostrará:

- **Problemas prioritarios**: Los que requieren atención inmediata
- **Porcentaje de impacto**: Qué tanto del total representan
- **Recomendaciones**: Sugerencias basadas en el análisis

#### Ejemplo de Interpretación:

> "Los primeros 2 problemas (Defecto en soldadura y Material defectuoso) representan el 60% de todos los defectos. Enfocarse en resolver estos dos problemas tendrá el mayor impacto en la mejora general."

### 🎯 Casos de Uso Comunes

#### 1. Análisis de Calidad

- **Objetivo**: Identificar principales causas de defectos
- **Datos**: Tipos de defectos y su frecuencia
- **Resultado**: Priorizar mejoras en procesos

#### 2. Análisis de Quejas de Clientes

- **Objetivo**: Reducir insatisfacción del cliente
- **Datos**: Categorías de quejas y frecuencia
- **Resultado**: Mejorar aspectos críticos del servicio

#### 3. Análisis de Costos

- **Objetivo**: Reducir gastos operativos
- **Datos**: Categorías de gastos y montos
- **Resultado**: Enfocar esfuerzos en las áreas de mayor impacto

#### 4. Análisis de Tiempos Muertos

- **Objetivo**: Mejorar eficiencia operativa
- **Datos**: Causas de paradas y duración
- **Resultado**: Prevenir las causas más costosas

### 📱 Funciones Avanzadas

#### Comparación de Proyectos

- Compara resultados entre diferentes períodos
- Identifica tendencias y mejoras
- Evalúa la efectividad de las acciones correctivas

#### Exportación de datos

- PDF: Reporte completo del análisis (usa `@react-pdf/renderer`)

#### Colaboración

- Comparte proyectos con tu equipo
- Agrega comentarios y notas
- Mantén un historial de cambios

## 🧩 Tecnologías principales

- React 19 + TypeScript + Vite
- Redux Toolkit para estado global (revisar `src/store`)
- shadcn/ui + Tailwind CSS para UI
- Axios para llamadas HTTP (`src/services`)
- @react-pdf/renderer para reportes PDF

## 📁 Estructura del proyecto (src)

- `components/`: Componentes reutilizables (UI, layout, PDF, navegación)
- `sections/`: Secciones de página (formularios, tablas, hero, etc.)
- `pages/`: Páginas enrutadas (login, register, dashboard, etc.)
- `services/`: Cliente HTTP y servicios (auth, proyectos, análisis)
- `store/`: Estado global y slices
- `hooks/`: Hooks personalizados
- `assets/`: Imágenes y fuentes
- `types/`: Tipos compartidos
- `lib/`: Utilidades

## 🤝 Créditos

Este proyecto hace parte de un trabajo académico de la Universidad de Caldas.

Autoría y mantenimiento: ver el repositorio y colaboradores.
