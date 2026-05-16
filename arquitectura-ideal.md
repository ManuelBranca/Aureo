# Arquitectura ideal de Aureo

## Objetivo

Definir una arquitectura simple, escalable y mantenible para que Aureo pase de app funcional a producto sólido.

## Principios base

- Separar claramente presentación, lógica de negocio y acceso a datos.
- Evitar que el frontend conozca detalles internos de persistencia.
- Hacer que el backend sea la única fuente de verdad.
- Mantener módulos pequeños y con responsabilidad única.
- Priorizar contratos claros entre frontend y backend.

## Arquitectura recomendada

### 1. Frontend

El frontend debería quedar organizado por dominios funcionales, no por tipo de archivo suelto.

#### Capas sugeridas

- `pages/`
  - pantallas completas.
- `components/`
  - piezas reutilizables de UI.
- `features/`
  - lógica de negocio por dominio:
    - movimientos,
    - autenticación,
    - presupuesto,
    - metas,
    - reportes.
- `services/` o `api/`
  - clientes HTTP.
- `hooks/`
  - lógica reutilizable de estado y efectos.
- `context/`
  - estado global de sesión, idioma, tema y usuario.
- `utils/`
  - helpers puros.
- `styles/`
  - tokens, temas y estilos globales.

#### Flujo ideal

- La UI llama a un hook o servicio.
- El hook llama al cliente API.
- El cliente API se comunica con el backend.
- La vista solo renderiza estado y acciones.

### 2. Backend

El backend debería organizarse por capas clásicas.

#### Capas sugeridas

- `controller`
  - recibe requests y devuelve responses.
- `service`
  - contiene reglas de negocio.
- `repository`
  - acceso a datos.
- `entity` o `model`
  - entidades persistentes.
- `dto`
  - objetos de entrada y salida.
- `mapper`
  - conversión entre entidades y DTOs.
- `config`
  - seguridad, CORS, Swagger, perfiles.
- `exception`
  - manejo centralizado de errores.

#### Regla clave

El controller no debe contener lógica compleja. Solo orquesta.

## Diseño por dominios

La app debería dividirse por dominios financieros:

- autenticación,
- usuarios,
- movimientos,
- categorías,
- metas de ahorro,
- presupuestos,
- reportes,
- integraciones externas.

Eso evita mezclar lógica de negocio de distintas partes en un mismo módulo.

## Modelo de datos ideal

### Entidades principales

- `User`
- `Transaction`
- `Category`
- `Goal`
- `Budget`
- `MonthlyReport`
- `ExternalRate` o similar para datos externos cacheados

### Relaciones

- Un usuario tiene muchos movimientos.
- Un usuario tiene muchas metas.
- Un usuario puede tener muchas categorías personalizadas.
- Un presupuesto pertenece a un usuario y opcionalmente a un mes y categoría.

## Persistencia

### Desarrollo

- PostgreSQL local o Docker.
- Migraciones con Flyway o Liquibase.

### Producción

- PostgreSQL administrado.
- Variables de entorno para credenciales.
- Backups y monitoreo.

## Estado global del frontend

El estado global ideal debería dividirse en:

- sesión de usuario,
- preferencias visuales,
- idioma,
- cache de datos remotos,
- filtros de pantalla,
- formularios locales.

No conviene meter todo en un solo contexto gigante.

## Manejo de errores

### Frontend

- Mostrar mensajes claros por campo.
- Manejar loading y error por request.
- Evitar pantallas vacías sin explicación.

### Backend

- Responder con códigos HTTP correctos.
- Usar un handler global de excepciones.
- Devolver mensajes consistentes.

## Seguridad

- Hash de contraseñas.
- Sesión con JWT o cookies seguras.
- Autorización por usuario autenticado.
- Validación de entrada en backend y frontend.
- Nunca confiar solo en el cliente.

## APIs externas

Las integraciones externas deberían ir detrás de una capa de servicio propia.

### Ejemplos

- tipo de cambio,
- cotización de activos,
- indicadores macroeconómicos,
- conversión de moneda.

### Regla importante

Nunca llamar APIs externas directamente desde los componentes visuales.

## Estructura ideal de carpetas

### Frontend

```text
frontend/src/
  app/
  components/
  features/
  hooks/
  context/
  pages/
  services/
  utils/
  styles/
```

### Backend

```text
backend/src/main/java/.../
  config/
  controller/
  dto/
  entity/
  exception/
  mapper/
  repository/
  service/
```

## Evolución recomendada

1. Mover movimientos al backend.
2. Agregar base de datos persistente.
3. Implementar autenticación real.
4. Agregar presupuestos y metas reales.
5. Integrar APIs externas con cache.
6. Mejorar reportes y dashboards.
7. Endurecer seguridad y tests.

## Criterio de arquitectura sana

La arquitectura es buena si:

- cada capa tiene una responsabilidad clara,
- el frontend no conoce la base de datos,
- el backend no depende de la UI,
- es fácil agregar una nueva feature sin romper otras,
- los datos de usuario quedan aislados por cuenta.
