# Plan de iteraciones: APIs externas y base de datos

## Objetivo

Llevar Aureo desde una app funcional local a una plataforma financiera realmente persistente, integrada y escalable.

## Iteración 1: API interna para movimientos

### Meta

Dejar de guardar movimientos solo en `localStorage` y moverlos al backend.

### Tareas

- Crear entidad `Transaction` en backend con:
  - tipo,
  - monto,
  - categoría,
  - descripción,
  - fecha,
  - usuario.
- Crear endpoints REST para:
  - listar movimientos,
  - crear movimientos,
  - editar movimientos,
  - eliminar movimientos,
  - filtrar por fecha, tipo y categoría.
- Conectar el frontend al backend.
- Mantener `localStorage` solo como fallback temporal.

### Resultado esperado

El dashboard principal ya funciona sobre datos persistidos y no sobre datos locales.

## Iteración 2: Base de datos persistente

### Meta

Pasar de H2 en memoria a una base de datos persistente.

### Tareas

- Elegir base de datos:
  - PostgreSQL para desarrollo y producción, o
  - MySQL si el entorno ya lo favorece.
- Configurar Spring Boot con perfiles:
  - `dev`,
  - `prod`.
- Agregar migraciones con Flyway o Liquibase.
- Definir índices y constraints:
  - email único,
  - relación usuario-movimiento,
  - relación usuario-meta,
  - categorías normalizadas.

### Resultado esperado

Los datos sobreviven reinicios y el sistema queda listo para producción.

## Iteración 3: Autenticación real

### Meta

Sacar el login mock y convertirlo en una sesión real.

### Tareas

- Crear registro y login con contraseña hasheada.
- Implementar JWT o sesiones seguras.
- Proteger endpoints por usuario autenticado.
- Guardar el usuario actual en el frontend.

### Resultado esperado

Cada persona ve solo sus propios datos.

## Iteración 4: APIs externas útiles

### Meta

Enriquecer la app con datos externos que aporten valor financiero real.

### Opciones de integración

- Tipo de cambio y moneda.
- Cotizaciones de acciones o ETFs.
- Inflación o indicadores económicos.
- Conversión entre monedas.
- Categorías sugeridas desde reglas externas.

### Tareas

- Encapsular cada integración en un servicio backend.
- Cachear respuestas para evitar llamadas innecesarias.
- Manejar errores y timeouts.
- Mostrar datos externos en widgets opcionales del dashboard.

### Resultado esperado

La app deja de ser solo un registro manual y empieza a dar contexto financiero útil.

## Iteración 5: Reportes y analítica

### Meta

Mejorar la lectura de la situación financiera.

### Tareas

- Comparación mes a mes.
- Gráficos de evolución.
- Presupuesto mensual por categoría.
- Alertas por exceso de gasto.
- Objetivos de ahorro con progreso real.

### Resultado esperado

El usuario entiende mejor en qué gasta y cómo progresa.

## Iteración 6: Calidad y mantenimiento

### Meta

Hacer el sistema estable y fácil de evolucionar.

### Tareas

- Tests de API.
- Tests de formularios y validaciones.
- Tipado fuerte si se migra a TypeScript.
- Centralizar manejo de errores.
- Separar mejor UI, lógica y acceso a datos.
- Documentar contratos de API.

### Resultado esperado

Menos bugs, menos duplicación y más velocidad para agregar funciones nuevas.

## Orden recomendado de implementación

1. API de movimientos.
2. Base de datos persistente.
3. Autenticación real.
4. Integraciones externas.
5. Reportes y analítica.
6. Tests y endurecimiento final.

## Criterio para considerar la app lista

- El usuario puede registrarse e iniciar sesión.
- Los movimientos quedan guardados en la base.
- Las categorías y metas son por usuario.
- Hay consultas filtradas y reportes.
- La app maneja errores de forma clara.
- El frontend no depende de mocks para el flujo principal.
