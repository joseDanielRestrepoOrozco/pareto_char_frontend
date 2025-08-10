# Pareto Chart Application 📊

Una aplicación web moderna para realizar análisis de Pareto que te ayuda a identificar los problemas más críticos aplicando el principio 80/20.

## 🌟 ¿Qué es el Principio de Pareto?

El Principio de Pareto, también conocido como la regla 80/20, establece que aproximadamente el 80% de los efectos provienen del 20% de las causas. En el contexto empresarial y de análisis de problemas, esto significa que:

- 80% de los problemas son causados por 20% de las causas raíz
- 80% de las quejas provienen de 20% de los clientes
- 80% de los defectos son producidos por 20% de los procesos

## 🚀 Características Principales

- **Análisis Visual**: Gráficos interactivos que muestran la distribución de problemas
- **Identificación Automática**: La aplicación identifica automáticamente el 20% crítico
- **Gestión de Proyectos**: Organiza múltiples análisis en proyectos separados
- **Dashboard Intuitivo**: Interfaz moderna y fácil de usar
- **Autenticación Segura**: Sistema de login con verificación en dos pasos
- **Responsive**: Funciona perfectamente en dispositivos móviles y desktop

## 📋 Requisitos Previos

- Node.js (versión 18 o superior)
- pnpm (recomendado) o npm
- Un navegador web moderno
- Conexión a internet para el registro inicial

## 🔧 Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd pareto/frontend
```

### 2. Instalar Dependencias

```bash
pnpm install
```

### 3. Configurar Variables de Entorno

```bash
cp .env.example .env
```

Edita el archivo `.env` con la URL de tu backend:

```env
VITE_BACKEND_URL=http://localhost:3000/api
```

### 4. Ejecutar la Aplicación

```bash
pnpm run dev
```

La aplicación estará disponible en `http://localhost:5173`

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

- **Vista general** de todos tus proyectos
- **Estadísticas rápidas** de análisis realizados
- **Acceso directo** a crear nuevos proyectos
- **Historial** de análisis recientes

#### Sidebar de Navegación

- **Proyectos**: Lista de todos tus proyectos
- **Nuevo Proyecto**: Crear un análisis desde cero
- **Configuración**: Ajustes de cuenta
- **Cerrar Sesión**: Salir de la aplicación

### 📊 Creando tu Primer Análisis de Pareto

#### Paso 1: Crear un Proyecto

1. En el dashboard, haz clic en **"Nuevo Proyecto"**
2. Completa la información:
   - **Nombre**: Ej. "Análisis de Defectos de Calidad Q1 2024"
   - **Descripción**: Ej. "Identificación de principales causas de defectos en producción"
   - **Categoría**: Selecciona la más apropiada
3. Haz clic en **"Crear Proyecto"**

#### Paso 2: Agregar Datos

1. **Accede al proyecto** creado
2. En la sección **"Ingreso de Datos"**, puedes:
   - **Ingresar manualmente**: Agregar problemas uno por uno (máximo 10 por proyecto)
   - **Importar desde archivo**: Subir un CSV o Excel
3. **Formato de datos requerido**:
   - **Problema/Causa**: Descripción del problema
   - **Frecuencia**: Número de veces que ocurrió
   - **Costo** (opcional): Impacto económico
4. **Limitaciones**:
   - Máximo 10 problemas por proyecto para mantener la claridad del análisis

#### Ejemplo de Datos:

| Problema                | Frecuencia | Costo  |
| ----------------------- | ---------- | ------ |
| Defecto en soldadura    | 45         | $1,200 |
| Material defectuoso     | 32         | $800   |
| Error humano            | 28         | $600   |
| Falla de máquina        | 15         | $1,500 |
| Problema de calibración | 8          | $300   |

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

#### Exportación de Datos

- **PDF**: Reportes completos para presentaciones
- **Excel**: Datos para análisis adicional
- **Imágenes**: Gráficos para documentación

#### Colaboración

- Comparte proyectos con tu equipo
- Agrega comentarios y notas
- Mantén un historial de cambios

### 🔧 Configuración y Personalización

#### Ajustes de Cuenta

- Cambiar información personal
- Actualizar contraseña
- Configurar notificaciones

#### Personalización de Gráficos

- Elegir colores corporativos
- Ajustar etiquetas y títulos
- Configurar formatos de números
