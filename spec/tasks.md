# tasks.md — CHECKLIST EJECUTABLE

> **Regla: no se empieza una tarea hasta que la anterior esté terminada y verificada.**

Fuentes: [`context.md`](../context.md) (`§N`), [`spec.md`](./spec.md) (`RF-xx`, `CA-xx.x`, `D-x`, `RNF-xx`) y [`plan.md`](./plan.md) (fases y decisiones `T-x`).

**Formato de cada tarea**: `Nº` descripción — **Archivo** · **RF** · **Verifica**.

**VB** = verificación base (plan.md): `npm run lint` + `npx tsc --noEmit` sin errores, y `npm run dev` arranca sin errores en la consola del navegador. Antes del primer `tsc` de cada fase con pages, generar los tipos con `npm run dev` o `npx next typegen` (T-5).

---

## Fase 0 — Setup

- [x] **0.1** Instalar `lucide-react` (D-4).
  **Archivo**: `package.json`, `package-lock.json` · **RF**: RF-01 (iconos), RNF-03 · **Verifica**: `git diff package.json` muestra solo `lucide-react` en `dependencies`.
- [x] **0.2** Ajustar el layout raíz: `lang="es"`, `metadata` propia (sin marca de la referencia), Geist en el `body` con `font-sans bg-white text-neutral-800`.
  **Archivo**: `app/layout.tsx` · **RF**: RF-04 · **Verifica**: `tsc`; título de la pestaña del navegador; inspector > Computed > `font-family` = Geist.
- [x] **0.3** Quitar de `globals.css` el `font-family: Arial` del `body` y el bloque `prefers-color-scheme: dark`.
  **Archivo**: `app/globals.css` · **RF**: RF-04 · **Verifica**: con el SO en modo oscuro, la página sigue con fondo blanco y fuente Geist.
- [x] **0.4** Sustituir el boilerplate por un placeholder mínimo "Home" (`const Page` + `export default`, T-1).
  **Archivo**: `app/page.tsx` · **RF**: RF-03 · **Verifica**: `/` muestra "Home".
- [x] **0.5** Crear el placeholder "Catálogo".
  **Archivo**: `app/catalog/page.tsx` · **RF**: RF-03 · **Verifica**: `/catalog` muestra "Catálogo".
- [x] **0.6** Crear el placeholder del Detalle con `'use client'`, que lea `params` con `use(params)` y tipe las props con `PageProps<'/rooms/[id]'>`.
  **Archivo**: `app/rooms/[id]/page.tsx` · **RF**: RF-15 (CA-15.1) · **Verifica**: `npx next typegen` + `tsc` sin errores; `/rooms/123` muestra "123".
- [x] **0.7** Cierre de la fase 0.
  **Archivo**: — · **RF**: RNF-07 · **Verifica**: VB; `git diff` sin cambios en `next.config.ts`, `tsconfig.json` ni `eslint.config.mjs`; commit "fase 0".

---

## Fase 1 — Tipos y mocks

- [x] **1.1** Definir `Host`, `Amenity` (`icon: LucideIcon`) y `Listing` según spec §3.
  **Archivo**: `types/listing.ts` · **RF**: RF-08, RF-15 – RF-21 · **Verifica**: `tsc`; los campos coinciden uno a uno con spec §3.
- [x] **1.2** Definir `Category` (`icon: LucideIcon`).
  **Archivo**: `types/category.ts` · **RF**: RF-06 · **Verifica**: `tsc`.
- [x] **1.3** Definir `SortOrder = 'asc' | 'desc'`.
  **Archivo**: `types/sort.ts` · **RF**: RF-12 · **Verifica**: `tsc`.
- [x] **1.4** Crear el mock de categorías: "Todas" (`id: "all"`) + ≥ 5, con iconos de `lucide-react`.
  **Archivo**: `data/categories.ts` · **RF**: RF-06 · **Verifica**: `tsc`; contar ≥ 6 entradas.
- [x] **1.5** Crear el mock de alojamientos: ≥ 12 que cumplan los mínimos de spec §3 (≥ 2 por categoría, precios distintos, uno con 1 foto, uno con 5, uno con `maxGuests: 1`, un anfitrión con 1 año, 2 ubicaciones que compartan texto).
  **Archivo**: `data/listings.ts` · **RF**: RF-05 – RF-21 · **Verifica**: `tsc` (cada objeto validado contra `Listing`); repasar a mano la lista de mínimos.
- [x] **1.6** Cierre de la fase 1.
  **Archivo**: — · **RF**: — · **Verifica**: VB; commit "fase 1".

---

## Fase 2 — Componentes base

- [x] **2.1** `PhotoPlaceholder`: bloque `bg-neutral-200 rounded-2xl aspect-square relative` con una `label` opcional.
  **Archivo**: `components/PhotoPlaceholder.tsx` · **RF**: RF-08, RF-17 · **Verifica**: `tsc`; visual en el banco de pruebas (2.9).
- [x] **2.2** `StarRating`: icono `Star` + valor con coma decimal (T-7) y `reviewCount` opcional.
  **Archivo**: `components/StarRating.tsx` · **RF**: RF-08, RF-18 · **Verifica**: el banco de pruebas muestra "4,97", no "4.97".
- [x] **2.3** `LoadingIndicator`: skeleton de tarjeta con `animate-pulse`, `role="status"` y texto `sr-only`.
  **Archivo**: `components/LoadingIndicator.tsx` · **RF**: RF-02 (CA-02.2) · **Verifica**: el inspector muestra `role="status"` y el texto oculto.
- [x] **2.4** `Logo`: `<Link href="/">` con icono; nombre del proyecto visible solo en `md:`.
  **Archivo**: `components/Logo.tsx` · **RF**: RF-01 (CA-01.2), RF-03 · **Verifica**: a 375px solo el icono; a 768px icono + texto.
- [x] **2.5** `SearchBar`: input controlado (`value` / `onChange: (q: string) => void`) en forma de píldora con icono `Search`.
  **Archivo**: `components/SearchBar.tsx` · **RF**: RF-01, RF-05, RF-10 · **Verifica**: en el banco, lo que se escribe se refleja en un texto de eco.
- [x] **2.6** `UserMenu`: avatar circular; en `md:`, píldora con icono `Menu` + avatar.
  **Archivo**: `components/UserMenu.tsx` · **RF**: RF-01 (CA-01.4) · **Verifica**: visual a 375px y 768px.
- [x] **2.7** `Navbar`: `sticky top-0` con `Logo` + `SearchBar` (solo si recibe `onQueryChange`) + `UserMenu`.
  **Archivo**: `components/Navbar.tsx` · **RF**: RF-01 (CA-01.1, CA-01.3) · **Verifica**: en el banco, montado con y sin `onQueryChange`: la búsqueda aparece o no.
- [x] **2.8** `ListingCard`: `<Link href={/rooms/${id}}>` con `PhotoPlaceholder`, título (`line-clamp-2`), ubicación, "N € / noche", `StarRating` y foco visible.
  **Archivo**: `components/ListingCard.tsx` · **RF**: RF-08 · **Verifica**: al pulsar se navega a `/rooms/{id}` (placeholder de la fase 0); con Tab el foco es visible.
- [x] **2.9** Banco de pruebas temporal: montar 2.1–2.8 con datos de `data/listings.ts`.
  **Archivo**: `app/page.tsx` · **RF**: RF-04 · **Verifica**: revisión a 375px y 768px frente a §7 (colores, tipografía, radios, espaciados).
- [x] **2.10** Cierre de la fase 2.
  **Archivo**: `components/*` · **RF**: RNF-05 · **Verifica**: VB; cada archivo ≤ ~80 líneas y definido con `const`; commit "fase 2".

---

## Fase 3 — Home (`/`)

- [x] **3.1** `CategoryItem`: `<button type="button">` con icono + etiqueta, `aria-pressed` y estilo activo de §7 (D-3).
  **Archivo**: `components/CategoryItem.tsx` · **RF**: RF-06 (CA-06.2) · **Verifica**: `tsc`; el inspector muestra `aria-pressed` (tras 3.7).
- [x] **3.2** `CategoryBar`: fila `flex overflow-x-auto` con el scrollbar oculto (T-6), que mapea `CategoryItem`.
  **Archivo**: `components/CategoryBar.tsx` · **RF**: RF-06 (CA-06.4) · **Verifica**: a 375px hay scroll horizontal dentro de la fila y no en la página.
- [x] **3.3** `SectionHeader`: título, subtítulo opcional y botón circular `<Link>` con `ArrowRight`.
  **Archivo**: `components/SectionHeader.tsx` · **RF**: RF-09 · **Verifica**: `tsc`; visual (tras 3.8).
- [x] **3.4** `ListingGrid`: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` de `ListingCard`, con mensaje de lista vacía.
  **Archivo**: `components/ListingGrid.tsx` · **RF**: RF-07 · **Verifica**: `tsc`; visual (tras 3.8).
- [x] **3.5** Page: eliminar el banco de pruebas y añadir el estado (`isLoading`, `listings`, `query`, `activeCategory = "all"`) y la carga simulada (T-4).
  **Archivo**: `app/page.tsx` · **RF**: RF-02 (CA-02.1, CA-02.3) · **Verifica**: al recargar `/` se ve el skeleton ~800 ms; navegar fuera antes de que termine no deja warnings.
- [x] **3.6** Page: filtro por `query` derivado en el render (T-3).
  **Archivo**: `app/page.tsx` · **RF**: RF-05 · **Verifica**: CA-05.1 a CA-05.3 ("mad", borrar el texto, no hay `useEffect` de filtrado).
- [x] **3.7** Page: filtro por `activeCategory` combinado con `query`.
  **Archivo**: `app/page.tsx` · **RF**: RF-06 · **Verifica**: CA-06.1 a CA-06.3.
- [x] **3.8** Page: composición `Navbar` → `CategoryBar` → `SectionHeader` (href `/catalog`) → `ListingGrid` / `LoadingIndicator`.
  **Archivo**: `app/page.tsx` · **RF**: RF-07, RF-09 · **Verifica**: CA-07.1 a 375, 768 y 1280px; CA-07.2 ("zzzz"); CA-09.1.
- [x] **3.9** Cierre de la fase 3.
  **Archivo**: — · **RF**: RF-02, RF-05 – RF-09 · **Verifica**: VB; volver a pasar todos los CA de esos RF; commit "fase 3".

---

## Fase 4 — Catálogo (`/catalog`)

- [ ] **4.1** `SortSelect`: dos botones chip ("Precio ↑" / "Precio ↓") con `aria-pressed` y `onChange` tipado como `SortOrder`.
  **Archivo**: `components/SortSelect.tsx` · **RF**: RF-12 (CA-12.1) · **Verifica**: `tsc`; visual (tras 4.8).
- [ ] **4.2** `ResultsHeader`: "N alojamiento(s)", con singular y plural, más `SortSelect`.
  **Archivo**: `components/ResultsHeader.tsx` · **RF**: RF-11 · **Verifica**: CA-11.1 (dejar 1 y 0 resultados) tras 4.6.
- [ ] **4.3** `ListingList`: lista de `ListingCard` (1 col → `md:grid-cols-2`) con mensaje de lista vacía.
  **Archivo**: `components/ListingList.tsx` · **RF**: RF-13 · **Verifica**: CA-13.1 (importa el mismo `ListingCard`), CA-13.3.
- [ ] **4.4** `MapPlaceholder`: caja `bg-neutral-100 rounded-2xl` con el texto "Mapa", `h-64` en móvil y `sticky` + alto de viewport en `md:`.
  **Archivo**: `components/MapPlaceholder.tsx` · **RF**: RF-14 · **Verifica**: `tsc`; visual (tras 4.8).
- [ ] **4.5** Page: estado (`isLoading`, `listings`, `query`, `sortOrder = 'asc'`) y carga simulada (T-4).
  **Archivo**: `app/catalog/page.tsx` · **RF**: RF-02 · **Verifica**: CA-02.1 y CA-02.3 en `/catalog`.
- [ ] **4.6** Page: filtro por `query` derivado + `Navbar` con búsqueda.
  **Archivo**: `app/catalog/page.tsx` · **RF**: RF-10 · **Verifica**: CA-10.1.
- [ ] **4.7** Page: orden por `pricePerNight` sobre una **copia** del array.
  **Archivo**: `app/catalog/page.tsx` · **RF**: RF-12 · **Verifica**: CA-12.2 a CA-12.4 (primer y último precio, revisión de código, orden que se mantiene al buscar).
- [ ] **4.8** Page: layout con la lista arriba y el mapa debajo en móvil, y `md:grid-cols-[3fr_2fr]` con el mapa `sticky` en escritorio.
  **Archivo**: `app/catalog/page.tsx` · **RF**: RF-13, RF-14 · **Verifica**: CA-13.2, CA-14.1 y CA-14.2 a 375px y 768px, haciendo scroll.
- [ ] **4.9** Cierre de la fase 4.
  **Archivo**: — · **RF**: RF-02, RF-10 – RF-14 · **Verifica**: VB; volver a pasar todos los CA de esos RF; commit "fase 4".

---

## Fase 5 — Detalle (`/rooms/[id]`)

- [ ] **5.1** `BackLink`: `<Link>` con `ArrowLeft` y "Volver al catálogo" (`href` por defecto `/catalog`).
  **Archivo**: `components/BackLink.tsx` · **RF**: RF-16 · **Verifica**: `tsc`; CA-16.1 (tras 5.12).
- [ ] **5.2** `NotFoundMessage`: mensaje + `<Link>` al Catálogo (D-2).
  **Archivo**: `components/NotFoundMessage.tsx` · **RF**: RF-15 · **Verifica**: `tsc`; CA-15.3 (tras 5.11).
- [ ] **5.3** `GalleryControls`: botones circulares `ChevronLeft` / `ChevronRight` con `aria-label` y `disabled` según `canPrev` / `canNext`.
  **Archivo**: `components/GalleryControls.tsx` · **RF**: RF-17 (CA-17.3, CA-17.4) · **Verifica**: el inspector muestra `aria-label` y `disabled`.
- [ ] **5.4** `PhotoGallery`: estado `currentIndex`, `PhotoPlaceholder` con la etiqueta de la foto actual e indicador "i / total".
  **Archivo**: `components/PhotoGallery.tsx` · **RF**: RF-17 (CA-17.1, CA-17.2) · **Verifica**: con el alojamiento de 5 fotos, avanzar y retroceder; con el de 1 foto, ambos botones deshabilitados.
- [ ] **5.5** `ListingHeader`: título, `StarRating`, "N reseñas" y ubicación.
  **Archivo**: `components/ListingHeader.tsx` · **RF**: RF-18 · **Verifica**: CA-18.1.
- [ ] **5.6** `HostInfo`: avatar placeholder, "Anfitrión: {name}" y años como anfitrión (con singular).
  **Archivo**: `components/HostInfo.tsx` · **RF**: RF-19 · **Verifica**: CA-19.1 con el anfitrión de 1 año.
- [ ] **5.7** `AmenityItem`: icono `LucideIcon` + etiqueta.
  **Archivo**: `components/AmenityItem.tsx` · **RF**: RF-20 · **Verifica**: `tsc`.
- [ ] **5.8** `AmenitiesGrid`: `grid-cols-2 md:grid-cols-3` de `AmenityItem`.
  **Archivo**: `components/AmenitiesGrid.tsx` · **RF**: RF-20 · **Verifica**: CA-20.1 a 375px y 768px.
- [ ] **5.9** `GuestCounter`: controlado, botones `Minus` / `Plus` con `disabled` en los límites y clamp a `[min, max]`.
  **Archivo**: `components/GuestCounter.tsx` · **RF**: RF-21 (CA-21.2) · **Verifica**: pulsar repetidamente: nunca baja de 1 ni pasa de `max`.
- [ ] **5.10** `BookingCard`: estado `guests = 1`, "N € / noche", `GuestCounter` y CTA "Reservar" `bg-rose-600` sin navegación.
  **Archivo**: `components/BookingCard.tsx` · **RF**: RF-21 (CA-21.1, CA-21.3) · **Verifica**: visual; al pulsar el CTA la ruta no cambia; con `maxGuests: 1` ambos botones deshabilitados.
- [ ] **5.11** Page: estado (`isLoading`, `listing: Listing | null`), efecto con dependencia `[id]` y tres estados de render (cargando / no encontrado / contenido).
  **Archivo**: `app/rooms/[id]/page.tsx` · **RF**: RF-02, RF-15 · **Verifica**: CA-02.1, CA-15.2 (`/rooms/1`) y CA-15.3 (`/rooms/no-existe`).
- [ ] **5.12** Page: composición `Navbar` (sin búsqueda) → `BackLink` → `PhotoGallery` → `ListingHeader` → `HostInfo` → `AmenitiesGrid` → `BookingCard`, con `key={listing.id}` en los componentes con estado.
  **Archivo**: `app/rooms/[id]/page.tsx` · **RF**: RF-01 (CA-01.3), RF-16 – RF-21 · **Verifica**: no aparece la búsqueda; todos los bloques visibles; al pasar de un alojamiento a otro, la galería y el contador vuelven al inicio.
- [ ] **5.13** Page: layout en una columna en móvil y `md:grid-cols-[2fr_1fr]` con `BookingCard` `sticky top-24` en escritorio.
  **Archivo**: `app/rooms/[id]/page.tsx` · **RF**: RF-22 · **Verifica**: CA-22.1 y CA-22.2 a 375px y 768px, haciendo scroll.
- [ ] **5.14** Cierre de la fase 5.
  **Archivo**: — · **RF**: RF-02, RF-15 – RF-22 · **Verifica**: VB; volver a pasar todos los CA de esos RF; commit "fase 5".

---

## Fase 6 — Navegación y revisión final

- [ ] **6.1** Recorrido completo: `/` → categoría → búsqueda → tarjeta → Detalle → `BackLink` → `/catalog` → ordenar → tarjeta → Logo → `/`.
  **Archivo**: — · **RF**: RF-01, RF-03 · **Verifica**: cada paso llega a la vista esperada; el `Navbar` está presente en las tres (CA-01.1, CA-01.2).
- [ ] **6.2** Recorrido corto: `/` → "→" del `SectionHeader` → `/catalog`.
  **Archivo**: — · **RF**: RF-09, RF-03 · **Verifica**: CA-09.1.
- [ ] **6.3** Repetir 6.1 con DevTools > Network, filtro "Doc".
  **Archivo**: — · **RF**: RF-03 (CA-03.2) · **Verifica**: no hay peticiones de documento nuevas tras la carga inicial.
- [ ] **6.4** Auditoría: buscar `any` en `/app`, `/components`, `/types` y `/data`.
  **Archivo**: todos · **RF**: RNF-02 · **Verifica**: 0 resultados como tipo.
- [ ] **6.5** Auditoría: buscar `style=`.
  **Archivo**: todos · **RF**: RNF-03 · **Verifica**: 0 resultados.
- [ ] **6.6** Auditoría: buscar `<a `.
  **Archivo**: todos · **RF**: RF-03 (CA-03.1), RNF-04 · **Verifica**: 0 resultados.
- [ ] **6.7** Auditoría: `function ` en `/components` y longitud de cada archivo.
  **Archivo**: `components/*` · **RF**: RNF-05 · **Verifica**: 0 resultados de `function`; todos ≤ ~80 líneas. Dividir el que se pase.
- [ ] **6.8** Auditoría: configuración y árbol de carpetas.
  **Archivo**: config raíz · **RF**: RNF-06, RNF-07 · **Verifica**: `git diff` sin cambios en la configuración (salvo `lucide-react`); carpetas `/app`, `/components`, `/types` y `/data`.
- [ ] **6.9** Revisión visual de las tres rutas a 375px y 768px frente a §7.
  **Archivo**: — · **RF**: RF-04 · **Verifica**: CA-04.1 (sin scroll horizontal), CA-04.2 y CA-04.3 (sin marca de la referencia).
- [ ] **6.10** `UserMenu` y `Logo` en las tres vistas y en los dos anchos.
  **Archivo**: — · **RF**: RF-01 · **Verifica**: CA-01.2 y CA-01.4.
- [ ] **6.11** Cierre de la fase 6.
  **Archivo**: — · **RF**: RF-01 – RF-22 · **Verifica**: VB; todos los CA de RF-01 a RF-22 en verde; commit "fase 6".

---

## Fase 7 — Opcionales (solo con la fase 6 cerrada)

- [ ] **7.1** Añadir `badge` a 3–4 mocks.
  **Archivo**: `data/listings.ts` · **RF**: RF-23 · **Verifica**: `tsc`.
- [ ] **7.2** `ListingBadge` + uso en `ListingCard` (`absolute top-3 left-3`, solo si existe `badge`).
  **Archivo**: `components/ListingBadge.tsx`, `components/ListingCard.tsx` · **RF**: RF-23 · **Verifica**: CA-23.1 (tarjetas con y sin badge).
- [ ] **7.3** `FavoriteButton`: icono `Heart`, `aria-label`, `preventDefault()` + `stopPropagation()`.
  **Archivo**: `components/FavoriteButton.tsx` · **RF**: RF-24 · **Verifica**: `tsc`.
- [ ] **7.4** Integrar `FavoriteButton` en `ListingCard`, con estado `isFavorite` y `'use client'`.
  **Archivo**: `components/ListingCard.tsx` · **RF**: RF-24 · **Verifica**: CA-24.1 y CA-24.2 (alterna el estado y no navega); el archivo sigue ≤ ~80 líneas.
- [ ] **7.5** `PromoCard` + uso en la Home.
  **Archivo**: `components/PromoCard.tsx`, `app/page.tsx` · **RF**: RF-25 · **Verifica**: CA-25.1 a 375px y 768px.
- [ ] **7.6** `Footer`: grupos de enlaces como texto plano, idioma/moneda y copyright propio.
  **Archivo**: `components/Footer.tsx` · **RF**: RF-26 · **Verifica**: CA-26.2 (sin `<Link>` a rutas inexistentes).
- [ ] **7.7** Montar `Footer` en el layout raíz.
  **Archivo**: `app/layout.tsx` · **RF**: RF-26 · **Verifica**: CA-26.1 en las tres rutas a 375px y 768px.
- [ ] **7.8** Cierre de la fase 7.
  **Archivo**: — · **RF**: RF-23 – RF-26, RNF-05 · **Verifica**: VB; repetir las auditorías 6.4 a 6.7; commit "fase 7".
