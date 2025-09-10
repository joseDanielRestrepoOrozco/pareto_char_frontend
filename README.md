# Diagrama de Pareto — Frontend 📊

Aplicación web React (Vite + TypeScript) para realizar análisis de Pareto y priorizar causas según el principio 80/20.

Proyecto académico de la Universidad de Caldas.

## 🚀 Características Principales

- Gráfico de Pareto interactivo con porcentajes acumulados
- Identificación automática de causas críticas por umbral (80/20 configurable)
- Gestión de proyectos (crear, listar, eliminar, actualizar)
- Descarga de reporte en PDF del análisis
- Autenticación con verificación en dos pasos (2FA)
- Interfaz responsive (móvil y escritorio)

## 📋 Requisitos

- Node.js 20+
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

Este proyecto hace parte de un trabajo de la Universidad de Caldas.

Autoría y mantenimiento: ver el repositorio y colaboradores.
