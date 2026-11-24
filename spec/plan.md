# plan.md — CÓMO y EN QUÉ ORDEN

Fuentes: [`context.md`](../context.md) (`§N`) y [`spec.md`](./spec.md) (`RF-xx`, `D-x`, `RNF-xx`). Este plan no repite contratos ni criterios de aceptación: los referencia.

---

## Reglas del plan

- **Fases secuenciales.** Una fase empieza solo cuando la anterior pasa su verificación completa.
- **Herramientas de verificación** (solo estas, sin librerías de testing):
  - `npm run lint`: ESLint (`eslint-config-next`, incluye las reglas de `react-hooks`).
  - `npx tsc --noEmit`: tipos en modo `strict`.
  - `npm run dev`: la app arranca y se prueba en el navegador.
  - DevTools en modo responsive: revisión visual a **375px** y después a **768px** (mobile-first). Cuando la spec lo indique, también a 1280px.
- **Verificación base** (se repite al final de cada fase y en adelante se cita como **VB**):
  1. `npm run lint` sin errores.
  2. `npx tsc --noEmit` sin errores.
  3. `npm run dev` arranca y la consola del navegador no muestra errores.
- **Commit por fase** (recomendado): un commit al cerrar cada fase verificada permite volver atrás si una fase rompe algo.
- **Next.js 16**: ante cualquier duda de API, consultar `node_modules/next/dist/docs/` antes de escribir código (`AGENTS.md`, §6.9).

### Decisiones técnicas globales

| # | Decisión | Motivo |
|---|---|---|
| T-1 | Las pages se escriben como `const Page = (…) => …` + `export default Page`. | §6.5 exige componentes `const`; Next necesita un default export. |
| T-2 | Las tres pages son Client Components (`'use client'`) y concentran el estado (§5 "Principio"). Los componentes de `/components` son presentacionales; solo `PhotoGallery` y `BookingCard` tienen estado local (§5). | La arquitectura que pide §5. |
| T-3 | La lógica derivada (filtrar por texto y categoría, ordenar) se calcula **en el render de cada page**, sin `useEffect` y sin carpeta `/lib`. El filtro por texto (~3 líneas) se duplica en Home y Catálogo. | No se añaden carpetas fuera de las que permiten §6.6 y D-1. Duplicar es más barato que una abstracción para 3 líneas. |
| T-4 | La carga simulada es un `useEffect` con `setTimeout(…, 800)` que llama a `setListings(mock)` y `setIsLoading(false)` **dentro del callback**, con `clearTimeout` en el cleanup. | §5. Hacer el `setState` dentro del callback evita la regla `react-hooks/set-state-in-effect` del lint. |
| T-5 | Los tipos de las pages usan los helpers globales de Next 16 (`PageProps<'/rooms/[id]'>`, `LayoutProps<'/'>`). Antes de `tsc` hay que generarlos con `npm run dev` o `npx next typegen`. | Documentado en `docs/01-app/03-api-reference/03-file-conventions/page.md`. Sin ese paso, `tsc` no encuentra los helpers. |
| T-8 | **Detalle con `cacheComponents`** (D-7 en spec §4.3): `app/rooms/[id]/page.tsx` es un Server Component que pinta `<Suspense>` y pasa `params` a `components/RoomDetail.tsx` (`'use client'`), que hace `use(params)` y contiene el estado. En la fase 5, todo lo que el plan asigna a la page del Detalle (estado, efecto, composición, layout) va en `RoomDetail`. | `next.config.ts` tiene `cacheComponents: true`. Una page cliente con `use(params)` fuera de `<Suspense>` da el error "uncached data during prerendering" (detectado en la fase 0). |
| T-6 | Ocultar el scrollbar de `CategoryBar` con clases arbitrarias de Tailwind (`[scrollbar-width:none] [&::-webkit-scrollbar]:hidden`). | Tailwind v4 no trae una utilidad para esto. Siguen siendo clases, no `style={}` (§6.3). |
| T-7 | Formato numérico con `toLocaleString('es-ES')` para la coma decimal ("4,97") y los precios. | §7 "StarRating". |

---

## Fase 0 — Setup

**Objetivo**: dejar el proyecto limpio y listo para implementar, sin tocar la configuración (RNF-07).

**Depende de**: nada.

**Archivos**:

| Acción | Archivo | Detalle |
|---|---|---|
| Modificar | `package.json`, `package-lock.json` | `npm install lucide-react` (D-4; versión actual 1.79.0, compatible con React 19). Es la única dependencia nueva. |
| Modificar | `app/layout.tsx` | `lang="es"`, `metadata` propia (título del proyecto, no el de la referencia), mantener Geist, quitar `Geist_Mono` si no se usa y aplicar `font-sans bg-white text-neutral-800` al `body`. |
| Modificar | `app/globals.css` | Quitar el `font-family: Arial` del `body`, que pisa Geist, y el bloque `prefers-color-scheme: dark`, porque §7 define solo un tema claro. Se mantienen `@import "tailwindcss"` y `@theme inline`. |
| Reemplazar | `app/page.tsx` | Quitar el boilerplate de create-next-app y dejar un placeholder mínimo ("Home") como `const`. |
| Crear | `app/catalog/page.tsx`, `app/rooms/[id]/page.tsx` | Placeholders mínimos ("Catálogo", "Detalle {id}") para que existan las tres rutas desde el principio. |
| Crear (carpetas) | `/components`, `/types`, `/data` | Vacías (o con su primer archivo en la fase 1). |

**Decisiones técnicas**:
- En `app/rooms/[id]/page.tsx` se valida ya el patrón Next 16: `params` como Promise, leída con `use(params)` (T-5, RF-15). Así se descubre pronto cualquier sorpresa de la versión.
- `public/*.svg` del boilerplate no se borran: no estorban, y borrarlos no se ha pedido.

**Verificación**:
- VB.
- `package.json` solo añade `lucide-react` (`git diff package.json`).
- `/`, `/catalog` y `/rooms/123` cargan su placeholder; en el Detalle se ve el `id` "123".
- DevTools a 375px: el texto sale en Geist (inspector > Computed > font-family) y el fondo es blanco aunque el sistema esté en modo oscuro.

---

## Fase 1 — Tipos y mocks

**Objetivo**: definir los contratos de datos de `spec.md` §3 y los datos mock que los cumplen.

**Depende de**: fase 0 (carpetas creadas y `lucide-react` instalado para `LucideIcon`).

**Archivos**:

| Acción | Archivo | Contenido |
|---|---|---|
| Crear | `types/listing.ts` | `Host`, `Amenity`, `Listing` (spec §3). |
| Crear | `types/category.ts` | `Category` (spec §3). |
| Crear | `types/sort.ts` | `SortOrder` (spec §3). |
| Crear | `data/categories.ts` | `Category[]`: "Todas" (`id: "all"`) + ≥ 5 categorías, con iconos de `lucide-react`. |
| Crear | `data/listings.ts` | `Listing[]`: ≥ 12 alojamientos que cumplan los mínimos de spec §3 (casos límite para RF-12, RF-17, RF-19 y RF-21). |

**Decisiones técnicas**:
- `import type { LucideIcon } from 'lucide-react'` en los tipos. En `/data` se importan los iconos concretos (`Waves`, `Castle`, …).
- Los `id` de alojamiento son strings cortos (`"1"`, `"2"`…) para poder probar a mano `/rooms/1` (CA-15.2).
- Los mocks se exportan como constantes tipadas (`export const listings: Listing[] = …`), así TypeScript valida cada objeto contra el contrato.

**Verificación**:
- VB (sobre todo `tsc`: cualquier mock que no cumpla el tipo falla aquí).
- Revisar a mano en `data/listings.ts` la checklist de mínimos de spec §3.

---

## Fase 2 — Componentes base (compartidos)

**Objetivo**: construir los componentes ♻️ que usan dos o más vistas, aislados de las pages.

**Depende de**: fase 1 (tipos).

**Orden** (de hoja a contenedor):

| # | Archivo | RF |
|---|---|---|
| 1 | `components/PhotoPlaceholder.tsx` | RF-08, RF-17 |
| 2 | `components/StarRating.tsx` | RF-08, RF-18 |
| 3 | `components/LoadingIndicator.tsx` | RF-02 |
| 4 | `components/Logo.tsx` | RF-01 |
| 5 | `components/SearchBar.tsx` | RF-01, RF-05, RF-10 |
| 6 | `components/UserMenu.tsx` | RF-01 |
| 7 | `components/Navbar.tsx` | RF-01 |
| 8 | `components/ListingCard.tsx` | RF-08 |

**Decisiones técnicas**:
- Las props siguen spec §4.1 al pie de la letra (`interface <Nombre>Props` en el mismo archivo).
- `Navbar` muestra `SearchBar` solo si recibe `onQueryChange` (spec §4.1). Mobile-first: logo con icono + `SearchBar` + avatar; a partir de `md:`, logo con texto y `UserMenu` completo (§7).
- `LoadingIndicator` es un skeleton de tarjeta (§7) con `role="status"` y un texto `sr-only`.
- `ListingCard` = `<Link href={`/rooms/${id}`}>` que envuelve todo. Sin `ListingBadge` ni `FavoriteButton` (fase 7).
- Sin estilos de ejemplo de la referencia: se aplica la tabla de tokens de §7 (colores `neutral-*`, `rose-600`).

**Verificación**:
- VB.
- **Banco de pruebas temporal**: montar los componentes en `app/page.tsx` (placeholder de la fase 0) con datos de `data/listings.ts` y revisar a 375px y 768px frente a §7 (tipografía, radios, espaciados). El banco se elimina al empezar la fase 3.
- Cada archivo ≤ ~80 líneas (RNF-05).

---

## Fase 3 — Home (`/`)

**Objetivo**: cumplir RF-05 a RF-09 y RF-02 en la Home.

**Depende de**: fase 2.

**Archivos**:

| Acción | Archivo | RF |
|---|---|---|
| Crear | `components/CategoryItem.tsx` | RF-06 |
| Crear | `components/CategoryBar.tsx` | RF-06 |
| Crear | `components/SectionHeader.tsx` | RF-09 |
| Crear | `components/ListingGrid.tsx` | RF-07 |
| Reemplazar | `app/page.tsx` | RF-02, RF-05, RF-06, RF-09 |

**Decisiones técnicas**:
- Estado de la page: `isLoading`, `listings`, `query`, `activeCategory` (spec §4.3). La carga simulada sigue T-4.
- `visibleListings` se deriva en el render (T-3): primero por categoría (salvo `"all"`) y después por `query` (en minúsculas, sobre `title` y `location`).
- Orden visual: `Navbar` → `CategoryBar` → `SectionHeader` (href `/catalog`) → `ListingGrid` o `LoadingIndicator`.
- `CategoryItem` es un `<button type="button">` con `aria-pressed` (CA-06.2) y estilo de §7 (D-3).
- `ListingGrid` muestra su propio mensaje de lista vacía (CA-07.2).

**Verificación**:
- VB.
- Recorrer los CA de RF-02 y de RF-05 a RF-09 en `spec.md` con `npm run dev`, a 375px, 768px y 1280px (CA-07.1).

---

## Fase 4 — Catálogo (`/catalog`)

**Objetivo**: cumplir RF-10 a RF-14 y RF-02 en el Catálogo.

**Depende de**: fase 2 (`Navbar`, `ListingCard`, `LoadingIndicator`) y fase 3 (el mismo patrón de page; se reutiliza el razonamiento, no el código).

**Archivos**:

| Acción | Archivo | RF |
|---|---|---|
| Crear | `components/SortSelect.tsx` | RF-12 |
| Crear | `components/ResultsHeader.tsx` | RF-11, RF-12 |
| Crear | `components/ListingList.tsx` | RF-13 |
| Crear | `components/MapPlaceholder.tsx` | RF-14 |
| Reemplazar | `app/catalog/page.tsx` | RF-02, RF-10 – RF-14 |

**Decisiones técnicas**:
- Estado: `isLoading`, `listings`, `query`, `sortOrder` (valor inicial `'asc'`).
- Derivado (T-3): filtrar por `query` y después ordenar una **copia** (`[...arr].sort(...)` o `toSorted`, CA-12.3).
- `SortSelect`: dos `<button type="button">` con estilo chip y `aria-pressed` (§7 "Aplicar al Catálogo"); se prefieren a un `<select>` para seguir el sistema visual. `onChange` recibe un `SortOrder` tipado (no un `string`).
- Layout: base `flex flex-col` (lista y después mapa); en `md:`, `grid md:grid-cols-[3fr_2fr]` con el mapa `sticky` (§7).
- Pluralización de "alojamiento(s)" dentro de `ResultsHeader` (CA-11.1).

**Verificación**:
- VB.
- Recorrer los CA de RF-02 y de RF-10 a RF-14 a 375px y 768px, incluido el scroll para el `sticky` (CA-14.2).

---

## Fase 5 — Detalle (`/rooms/[id]`)

**Objetivo**: cumplir RF-15 a RF-22 y RF-02 en el Detalle.

**Depende de**: fase 2 (`Navbar`, `PhotoPlaceholder`, `StarRating`, `LoadingIndicator`) y fase 0 (patrón `use(params)` ya validado).

**Orden** (hojas primero):

| # | Archivo | RF |
|---|---|---|
| 1 | `components/BackLink.tsx` | RF-16 |
| 2 | `components/NotFoundMessage.tsx` | RF-15 (D-2) |
| 3 | `components/GalleryControls.tsx` | RF-17 |
| 4 | `components/PhotoGallery.tsx` | RF-17 |
| 5 | `components/ListingHeader.tsx` | RF-18 |
| 6 | `components/HostInfo.tsx` | RF-19 |
| 7 | `components/AmenityItem.tsx` | RF-20 |
| 8 | `components/AmenitiesGrid.tsx` | RF-20 |
| 9 | `components/GuestCounter.tsx` | RF-21 |
| 10 | `components/BookingCard.tsx` | RF-21 |
| 11 | `app/rooms/[id]/page.tsx` (reemplazar) | RF-02, RF-15, RF-22 |

**Decisiones técnicas**:
- Page: `const { id } = use(params)` con `PageProps<'/rooms/[id]'>` (T-5). Estado: `isLoading`, `listing: Listing | null`. El efecto depende de `[id]` y busca el alojamiento en `data/listings.ts`.
- Tres estados de render: cargando → `LoadingIndicator`; no encontrado → `NotFoundMessage`; encontrado → contenido.
- `Navbar` sin `onQueryChange`, así que no muestra búsqueda (CA-01.3).
- `PhotoGallery` tiene `currentIndex`; `GalleryControls` recibe `canPrev = index > 0` y `canNext = index < photos.length - 1` (CA-17.3). Con 1 foto, ambos botones quedan deshabilitados.
- `BookingCard` tiene `guests` (inicial 1); `GuestCounter` está controlado y hace clamp de `[min, max]` además de deshabilitar los botones (CA-21.2).
- Para que `PhotoGallery` y `BookingCard` se reinicien al cambiar de alojamiento, se renderizan con `key={listing.id}`, en lugar de un `useEffect` que reinicie el estado.
- Layout: base en una columna; en `md:`, `grid md:grid-cols-[2fr_1fr]` con `BookingCard` en `sticky top-24` (§7, RF-22). La barra de reserva fija en móvil de §7 es una variante **no** obligatoria: no se implementa salvo que haya tiempo en la fase 7.

**Verificación**:
- VB.
- Recorrer los CA de RF-02 y de RF-15 a RF-22: `/rooms/1`, el alojamiento de 5 fotos, el de 1 foto, el de `maxGuests: 1` y `/rooms/no-existe`, a 375px y 768px.

---

## Fase 6 — Navegación y revisión final

**Objetivo**: cerrar RF-01, RF-03 y RF-04 de extremo a extremo y auditar los RNF.

**Depende de**: fases 3, 4 y 5.

**Archivos**: ninguno nuevo. Solo correcciones en los archivos existentes si la auditoría encuentra fallos.

**Recorridos** (`npm run dev` + DevTools > Network, filtro "Doc"):
1. `/` → categoría → búsqueda → tarjeta → `/rooms/[id]` → `BackLink` → `/catalog` → ordenar → tarjeta → Logo → `/`.
2. `/` → `SectionHeader` "→" → `/catalog`.
3. Sin peticiones de documento nuevas en todo el recorrido (CA-03.2).

**Auditoría de RNF** (búsquedas en el editor sobre `/app` y `/components`):

| Comprobación | Resultado esperado | RNF |
|---|---|---|
| Buscar `any` | 0 resultados como tipo | RNF-02 |
| Buscar `style=` | 0 resultados | RNF-03 |
| Buscar `<a ` | 0 resultados | RNF-04 |
| Buscar `function ` en `/components` | 0 resultados (todo `const`) | RNF-05 |
| Longitud de cada archivo de `/components` | ≤ ~80 líneas | RNF-05 |
| `git diff` de `next.config.ts`, `tsconfig.json`, `eslint.config.mjs` | Sin cambios | RNF-07 |
| Árbol de carpetas | `/app`, `/components`, `/types`, `/data` | RNF-06 |

**Revisión visual**: las tres rutas a 375px y 768px frente a §7, sin scroll horizontal (CA-04.1) y sin marca de la referencia (CA-04.3).

**Verificación**: VB + todos los CA de RF-01 a RF-22 en verde.

---

## Fase 7 — Opcionales

**Solo si las fases 0–6 están completas y verificadas.** Cada opcional es independiente y se puede abandonar sin afectar a lo anterior.

**Depende de**: fase 6.

| Orden | Archivo | RF | Notas |
|---|---|---|---|
| 1 | `components/ListingBadge.tsx` + uso en `ListingCard` | RF-23 | Aprovecha `listing.badge?` (spec §3). Añadir `badge` a algunos mocks. |
| 2 | `components/FavoriteButton.tsx` + uso en `ListingCard` | RF-24 | `preventDefault()` + `stopPropagation()` (§7). El estado `isFavorite` vive en `ListingCard`. Es la excepción a T-2, aceptable porque no se comparte. `ListingCard` necesitará `'use client'`. |
| 3 | `components/PromoCard.tsx` + uso en `app/page.tsx` | RF-25 | Entre `SectionHeader` y `ListingGrid`, o después de la cuadrícula. |
| 4 | `components/Footer.tsx` + uso en las pages | RF-26 | Enlaces como texto plano, sin rutas nuevas (CA-26.2). Se puede montar en `app/layout.tsx`, porque no depende del estado de las pages. |

**Verificación**: VB + los CA del RF correspondiente + volver a pasar la auditoría de la fase 6 (RNF-05: `ListingCard` sigue ≤ ~80 líneas con los añadidos).

---

## Resumen de dependencias

```
F0 Setup → F1 Tipos/mocks → F2 Base ─┬→ F3 Home ─→ F4 Catálogo ─┐
                                     └────────────→ F5 Detalle ─┴→ F6 Revisión → F7 Opcionales
```

F4 y F5 solo dependen técnicamente de F2. Aun así, se ejecutan en orden (F3 → F4 → F5) por la regla de fases secuenciales.
