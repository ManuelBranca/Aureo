# Aureo

Aureo es una app de finanzas personales con frontend en React + Vite y backend en Spring Boot.

## Estado actual

- El frontend ya es usable y permite:
  - registrar ingresos y gastos,
  - editar y eliminar movimientos,
  - filtrar por tipo, categoría y fecha,
  - ver un resumen mensual,
  - cambiar tema claro/oscuro,
  - cambiar idioma español/inglés.
- La persistencia principal del dashboard vive en `localStorage`.
- El backend existe y expone endpoints para usuarios y metas, pero todavía no está conectado por completo al flujo financiero principal.

## Estructura general

- `frontend/`: aplicación web con React, Vite y estilos propios.
- `backend/`: API en Spring Boot.
- `package.json` en la raíz: scripts para levantar frontend, backend o ambos juntos.

## Requisitos

- Node.js 18 o superior.
- npm.
- JDK 17 si querés correr el backend.

## Instalación

```powershell
npm install
cd frontend
npm install
```

## Ejecutar la app

### Solo frontend

```powershell
cd frontend
npm run dev
```

### Backend solo

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

### Frontend + backend juntos

Desde la raíz:

```powershell
npm run start:all
```

## URLs locales

- Frontend: `http://localhost:5173`
- App principal: `http://localhost:5173/app`
- Login: `http://localhost:5173/login`
- Registro: `http://localhost:5173/register`
- Backend: `http://localhost:8080`

## Funcionalidades actuales

- Dashboard simple de movimientos.
- Alta, edición y eliminación de transacciones.
- Filtros básicos.
- Resumen de ingresos, gastos y balance.
- Modo claro/oscuro.
- Idioma español/inglés.
- Pantalla de inicio con acceso a login y app.
- Login y registro separados.

## Persistencia

- El frontend guarda movimientos en `localStorage`.
- Los usuarios y metas del backend se guardan en H2 en memoria.
- Al reiniciar el backend, los datos del backend se pierden.

## Datos de prueba

- No hay un usuario inicial obligatorio.
- Para probar login y registro, creá un usuario desde la pantalla de registro.

## Notas

- La app está pensada para seguir evolucionando hacia una integración completa con APIs externas y una base de datos persistente.
- Si querés una versión productiva, el siguiente paso es mover movimientos, metas y usuarios a una API real con base de datos.
