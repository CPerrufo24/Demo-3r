# EstatePro CRM — Notas de la Demo

Resumen de lo construido para la segunda reunión con el cliente (**mañana 4pm**) y los puntos pendientes para cerrar la propuesta.

## Refresh de última hora (previo a la reunión)

- **Rebrand**: se quitó "Elite Realty Group" (placeholder heredado del export de AI Studio) y ahora todo dice **3R Connect** — sidebar, navbar, login, narrativa de Reportes y el system prompt de la IA.
- **El Overview ahora SÍ es el Morning Brief del pitch**: antes la pantalla principal abría con 4 tarjetas de métricas genéricas (24 Leads / 12 Appointments / 156 Listings / 4.2% Conversión) — exactamente el patrón que la narrativa del pitch dice que se descartó — y las tarjetas de acción (compradores listos, ajuste de precio, leads sin contactar, listing en riesgo) quedaban abajo, secundarias. Se invirtió la jerarquía: las tarjetas de acción son ahora el contenido principal arriba, y las métricas bajaron a una franja compacta secundaria. Si en la reunión abren el Overview esperando ver el "Morning Brief" que se les va a explicar, ahora sí es lo primero que ven.
- **Tipografía propia**: se agregó Fraunces (serif con carácter) para el título del Morning Brief y el wordmark "EstatePro CRM" — el resto de la UI se queda en Inter a propósito, para no arriesgar el resto de pantallas la noche antes de la reunión.
- **Motion**: las 4 tarjetas de acción del Morning Brief ahora entran con una animación escalonada (usaba la librería `motion` que ya estaba instalada pero sin usar en ningún lado).
- **Vercel Authentication desactivada**: el proyecto tenía activada por defecto la protección SSO de Vercel (pedía login con cuenta de Vercel antes incluso de llegar a nuestro propio gate de usuario/contraseña) — se desactivó porque duplicaba el gate y hubiera bloqueado a alguien de 3R Connect sin cuenta de Vercel.

## Cómo levantar la demo

```bash
# App (desde la carpeta estatepro-crm)
npm install
npm run dev
# → http://localhost:3000

# Base de datos de prueba (opcional para la demo en vivo, ver nota abajo)
docker compose up -d
```

- **Login**: cualquier correo y contraseña funcionan (es una pantalla de demo, no hay auth real todavía).
- **IA**: si no hay `GEMINI_API_KEY` en `.env`, el panel de Sales Intelligence usa respuestas simuladas pero realistas — la demo funciona igual de bien sin conexión a internet a la API de Gemini.

## Qué se construyó hoy

### 1. Base del proyecto
Se partió de un export de Google AI Studio (`IN3/estatepro-crm`) y se copió a su propia carpeta (`Personal/estatepro-crm`), independiente de Motor IN3.

### 2. Dos ideas extraídas de Motor IN3
- **Lead Score con explicabilidad** (`src/lib/leadScoring.ts`) — mismo patrón que `calcIN3Score()` de Motor IN3: criterios con peso fijo, cada uno con un estado (`CUMPLE` / `CUMPLE_CON_OBSERVACIONES` / `NO_CUMPLE` / `SIN_INFORMACION`), y el score siempre se calcula con matemática pura — nunca lo inventa la IA. Se ve como el badge `%` en cada tarjeta del Pipeline y el desglose completo en el detalle del lead.
- **Market Health Radar** (`src/components/MarketHealthRadar.tsx`) — mismo radar SVG de 6 ejes que Motor IN3, adaptado a Precio / Ubicación / Demanda / Velocidad / Competencia / Estado. Se abre desde "Inteligencia de Mercado" en cualquier propiedad.

### 3. Base de datos de prueba (Docker)
`docker-compose.yml` + `db/init/*.sql` — Postgres con el mismo modelo de datos que la demo (leads, criterios de scoring, propiedades, comparables, fuentes, eventos de sync). **No está conectada a la app** — la demo corre sobre datos en memoria a propósito, para que nada falle en vivo. La base sirve para mostrar "así persistiría esto en producción" si el cliente pregunta.

### 4. "Fuentes Unificadas" — la pieza central del pitch
Responde directo a la petición del cliente: "quiero ver mis 3 sistemas en un solo lugar, sin brincar de EasyBroker a HubSpot y de regreso".
- Cada lead y cada propiedad tiene un badge de origen (`HubSpot` / `EasyBroker` / `EstatePro`).
- Filtro por fuente en Pipeline y en Propiedades.
- Nueva sección "Fuentes Unificadas": tarjetas de conexión por sistema (contactos sincronizados, propiedades sincronizadas, registros nativos) + feed de actividad de sincronización en vivo.
- Botón **"Migrar desde tu CRM actual"** — wizard de 3 pasos (elegir plataforma → progreso simulado → confirmación) que responde a la petición de exportar/migrar fácil desde cualquier CRM.
- **Todo esto es simulado a propósito** (sin llamadas reales a APIs de HubSpot/EasyBroker) — decisión tomada para eliminar riesgo de que algo falle en vivo frente al cliente.

### 5. Localización a español + selector de idioma
Toda la interfaz (nav, botones, headers, tablas, modales, datos de ejemplo) está en español por defecto, con un botón ES/EN en el navbar y en el login. La infraestructura (`src/lib/i18n.tsx`) ya soporta ambos idiomas para el contenido de interfaz (chrome); el contenido generado por IA y los datos de ejemplo narrativos quedaron solo en español por ahora.

### 6. Login y limpieza de UI
- Pantalla de login (`LoginView.tsx`) para que la demo no arranque directo en el dashboard — se siente como producto real.
- Se quitaron los botones "Color Palette" / "Executive Palette" (no aportaban nada al pitch) y el `DesignSystemModal` asociado.

### 7. Layout responsivo
El sidebar y navbar usaban anchos fijos y no se adaptaban a pantalla dividida. Ahora el sidebar colapsa a un panel deslizable (con botón de menú ☰) por debajo de `lg` (~1024px), y el contenido usa el ancho disponible.

## Qué es real vs. simulado (para no prometer de más en la reunión)

| Pieza | Estado |
|---|---|
| Lead Score, Market Health Radar | Lógica real, determinística, corre en el navegador |
| Sales Intelligence (IA) | Real si hay `GEMINI_API_KEY`; si no, fallback simulado |
| HubSpot / EasyBroker / migración de CRM | 100% simulado — no hay conexión real a ninguna API externa |
| Base de datos Docker | Existe y tiene el mismo modelo, pero no está conectada a la app |
| Login | Pantalla real, sin autenticación real detrás |
| Publicar en portales (EasyBroker, MercadoLibre) | **No construido aún** — se discutió pero no se implementó |

## Puntos pendientes para cerrar la demo con el cliente

En orden sugerido de prioridad (de "prueba de concepto" a "producto real"):

1. **Persistencia real** — conectar el backend Express a la base Postgres que ya existe en Docker (hoy todo vive en memoria del navegador).
2. **Integración real con al menos un sistema** — buen candidato: EasyBroker, porque tiene API pública documentada. Empezar por lectura (traer propiedades reales) antes que escritura.
3. **Captura de leads entrante** — formulario web → EstatePro, para no depender solo de HubSpot para eso.
4. **Motor de tareas y recordatorios** — hoy solo hay feed de actividad, falta agenda/seguimiento con SLA.
5. **Roles y permisos de equipo** — vista de administrador/multiagente (hoy todo es de un solo usuario implícito).
6. **Publicar en portales** — botón de "Publicar en EasyBroker / MercadoLibre" desde Propiedades (simulado primero, real después si EasyBroker lo permite).
7. **Traducción completa** — las respuestas de IA y los datos de ejemplo hoy solo están en español; si se necesita inglés real para otro cliente, falta poblar esas cadenas.

## Deploy en Vercel (demo en vivo para la reunión)

- Repo: `CPerrufo24/Demo-3r` (push por SSH usando el alias `github-personal`, no `github.com`).
- Endpoint de IA migrado a función serverless (`api/ai.ts`, `api/health.ts`) — Express (`server.ts`) queda solo para dev local.
- **Variables de entorno a configurar en Vercel** (Project Settings → Environment Variables):
  - `GEMINI_API_KEY` — tu key real, para que la IA responda en vivo durante la reunión.
  - `DEMO_USER` = `3rconnect`
  - `DEMO_PASSWORD` = `Demo2026!`
- El plan Hobby de Vercel no tiene password protection nativo (es de Pro), así que se agregó `middleware.ts` con HTTP Basic Auth: cualquier visita a la URL pide usuario/contraseña con el prompt nativo del navegador, usando `DEMO_USER`/`DEMO_PASSWORD`. Solo hay que decirle a 3R Connect esas credenciales cuando compartas el link.

## Mensaje clave para la reunión

No prometer "reemplazo total de HubSpot" listo hoy — eso se cae con la primera pregunta técnica sobre sync de email o roles. El pitch correcto es: *"esta es la capa de inteligencia y el punto único de trabajo; la conexión real con tus sistemas actuales es la siguiente fase, y aquí está el plan."*
