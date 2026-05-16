# Contexto del proyecto

## Resumen

Aureo es una app de finanzas personales en desarrollo. Hoy tiene una base funcional en frontend y un backend inicial en Spring Boot.

## Estado actual real

### Frontend

- Hecho con React + Vite.
- Tiene navegación simple:
  - pantalla de inicio,
  - login,
  - registro,
  - dashboard principal.
- El dashboard prioriza cargar movimientos rápido.
- Permite:
  - agregar ingresos,
  - agregar gastos,
  - editar movimientos,
  - borrar movimientos,
  - filtrar movimientos,
  - ver balance y resumen.
- Incluye:
  - tema claro/oscuro,
  - idioma español/inglés,
  - guardado local de preferencias.

### Backend

- Hecho con Spring Boot.
- Tiene una base de usuarios y metas.
- Usa H2 en memoria.
- No está conectado todavía al flujo principal del dashboard.

## Decisiones tomadas

- El dashboard principal se mantiene simple para priorizar el alta rápida de ingresos y gastos.
- Las preferencias globales se resuelven en un botón flotante arriba a la derecha.
- La persistencia del frontend se resolvió con `localStorage` para no bloquear la usabilidad mientras no haya una base de datos real.

## Limitaciones actuales

- No hay API completa para movimientos.
- No hay base de datos persistente para producción.
- No hay autenticación real con sesión/token.
- No hay integración total entre frontend y backend.
- Las metas y usuarios del backend no forman parte todavía del flujo visible principal.

## Objetivo de evolución

La siguiente etapa del proyecto debería convertir Aureo en una app completa con:

- API real para movimientos, usuarios, categorías, metas y reportes.
- Persistencia con base de datos.
- Autenticación.
- Sincronización completa del frontend con el backend.
- Mejor manejo de errores, validaciones y estados de carga.

## Cómo correrlo hoy

- `npm run start:all` desde la raíz.
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8080`

## Riesgo principal

El mayor riesgo hoy es que el frontend y el backend sigan avanzando por separado. La prioridad debería ser unificar datos y lógica en una API estable.
