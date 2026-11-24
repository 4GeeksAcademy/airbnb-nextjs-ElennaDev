# spec.md — QUÉ se construye

Fuente de verdad: [`context.md`](../context.md). Este documento no repite sus tablas: las referencia (`§N` = sección N de `context.md`) y añade lo que falta para implementar y verificar: requisitos numerados, contratos y criterios de aceptación.

---

## 0. Alcance

- **Dentro**: las tres vistas de §3 (`/`, `/catalog`, `/rooms/[id]`), los componentes **obligatorios** de §4, los comportamientos de §5, las reglas de §6 y el sistema visual de §7.
- **Opcional**: los componentes marcados *(opcional)* o **(nuevo)** en §4 y §7. Solo se implementan cuando todo lo obligatorio está terminado y verificado (ver §5 de este documento).
- **Fuera**: backend, autenticación, reserva real, mapa real, fila de "servicios", páginas adicionales y dependencias nuevas (**única excepción: `lucide-react`**, ver D-4).

### Decisiones (✅ confirmadas)

| # | Decisión | Motivo |
|---|---|---|
| D-1 ✅ | Los datos mock viven en **`/data`** (`data/listings.ts`, `data/categories.ts`). | §4 lo propone como opcional, pero la carga simulada de §5 necesita mocks en algún sitio, y `/types` no es semánticamente correcto. Es la única carpeta fuera de `/app`, `/components` y `/types`. |
| D-2 ✅ | **`NotFoundMessage` pasa a obligatorio.** | §4 lo marca como opcional, pero §5 ("Carga simulada", fila Detalle) exige mostrarlo si el `id` no existe. Un comportamiento obligatorio necesita su componente. |
| D-3 ✅ | El estilo de `CategoryItem` sigue **§7** (chip con fondo `neutral-100` cuando está activo) y no el "subrayado" de §4. | §7 es más específica y posterior. |
| D-4 ✅ | **Iconos con `lucide-react`**: es la única dependencia nueva autorizada. Se usa para todos los iconos (categorías, amenities, lupa, menú, avatar, flechas, estrella, corazón, − / +). En los tipos, el campo `icon` es de tipo `LucideIcon`. | Autorizado expresamente por el usuario. No contradice §6.3, que prohíbe librerías de **componentes**, no de iconos. Es una excepción a la regla de "no añadir dependencias" y a §6.8: solo cambian `package.json` y `package-lock.json`; el resto de la configuración queda intacta. Los iconos SVG heredan el color con `currentColor`, así que se colorean con `text-*` de Tailwind. |
| D-5 ✅ | `Listing.photos` = `string[]` (etiquetas de los placeholders, p. ej. "Salón"). | §4 deja abierto "nº o lista". Una lista permite mostrar un texto distinto por foto en la galería. |
| D-6 ✅ | La categoría inicial es **`"all"` ("Todas")**, que no filtra. | §5 permite "la primera o Todas". Con "Todas", la Home muestra todo al cargar. |

---

## 1. Requisitos funcionales

Formato: **RF-xx — Título** (componentes implicados). Cada RF lleva sus **criterios de aceptación (CA)** en la forma *qué debe pasar → cómo se comprueba*.

Herramientas de verificación permitidas: `npm run lint`, `npx tsc --noEmit`, `npm run dev` y DevTools (vista responsive a **375px** y **768px**, inspector de elementos y pestaña Network).

### 1.1 Transversales (todas las vistas)

**RF-01 — Navbar común** (`Navbar`, `Logo`, `SearchBar`, `UserMenu`; ver §4, §7 "Componentes observados")
- CA-01.1 Las tres vistas muestran el `Navbar` arriba, `sticky`. → Hacer scroll en cada ruta con `npm run dev`; la barra queda fija arriba.
- CA-01.2 `Logo` es un `<Link>` a `/`. En móvil se ve solo el icono; a partir de 768px, icono + nombre del proyecto (nunca el de la referencia). → Pulsar el logo desde `/catalog` lleva a `/`. Comprobar a 375px y a 768px.
- CA-01.3 `SearchBar` aparece en Home y Catálogo y **no** en Detalle. → Inspección visual en las tres rutas.
- CA-01.4 `UserMenu` muestra el avatar (y, en `md:`, el icono de menú). Es solo visual: no navega. → Inspección visual a 375px y 768px.

**RF-02 — Carga simulada** (`LoadingIndicator`; ver §5 fila "Carga simulada")
- CA-02.1 Al montar cada page se muestra `LoadingIndicator` (~800 ms) en lugar del contenido y después aparecen los datos. → Recargar cada ruta y observar el skeleton.
- CA-02.2 `LoadingIndicator` tiene `role="status"` y un texto accesible. → Inspector de elementos.
- CA-02.3 Salir de la página antes de que termine la carga no produce warnings en la consola (el timeout se limpia en el cleanup). → Navegar rápido entre rutas con la consola abierta.

**RF-03 — Navegación client-side** (ver §5 fila "Navegación sin recarga", §6.4)
- CA-03.1 Toda navegación interna usa `<Link>` de `next/link`. → Buscar `<a ` en `/app` y `/components`: no hay ninguna coincidencia con `href` interno.
- CA-03.2 Al navegar entre `/`, `/catalog` y `/rooms/[id]` no se recarga el documento. → DevTools > Network con filtro "Doc": no aparecen peticiones nuevas de documento al navegar.

**RF-04 — Mobile-first y sistema visual** (ver §3 "Layout responsive", §6.1, §7)
- CA-04.1 A 375px no hay scroll horizontal de página (solo dentro de `CategoryBar`). → DevTools a 375px en las tres rutas.
- CA-04.2 Los colores, la tipografía, los espaciados y el estilo de tarjeta siguen §7, usando solo la paleta por defecto de Tailwind y el acento `rose-600`. → Revisión visual frente a §7.
- CA-04.3 No aparece ni el logo ni el nombre de la referencia. → Revisión visual.

### 1.2 Home (`/`)

**RF-05 — Búsqueda en tiempo real** (`SearchBar`; ver §5 fila "Filtrado en tiempo real")
- CA-05.1 Al escribir, la cuadrícula se filtra en cada pulsación por `title` o `location`, sin distinguir mayúsculas. → Escribir "mad" muestra solo los alojamientos con "Mad…" en el título o la ubicación.
- CA-05.2 Al borrar el texto vuelven todos (respetando la categoría activa). → Vaciar el input.
- CA-05.3 El filtrado se deriva en el render: no hay `useEffect` para filtrar. → Revisión de código de `app/page.tsx`.

**RF-06 — Filtro por categoría** (`CategoryBar`, `CategoryItem`; ver §5 fila "Categoría activa")
- CA-06.1 Se muestran todas las categorías de `data/categories.ts`, con "Todas" activa al inicio (D-6). → Visual.
- CA-06.2 Al pulsar una categoría, esta queda resaltada (estilo §7) con `aria-pressed="true"` y el resto con `false`. → Inspector.
- CA-06.3 La cuadrícula muestra solo esa categoría **combinada** con la búsqueda. → Elegir una categoría y escribir un texto: el resultado cumple ambos filtros.
- CA-06.4 A 375px la fila tiene scroll horizontal interno y no desborda la página. → DevTools.

**RF-07 — Cuadrícula responsive** (`ListingGrid`; ver §3, §7)
- CA-07.1 1 columna a 375px; 2 columnas a 768px; 3–4 columnas en `lg:`/`xl:`. → DevTools a 375 / 768 / 1280px.
- CA-07.2 Si no hay resultados se muestra un mensaje de lista vacía. → Buscar "zzzz".

**RF-08 — Tarjeta de alojamiento** (`ListingCard`, `PhotoPlaceholder`, `StarRating`; ver §4, §7 "Estilo de tarjeta")
- CA-08.1 Muestra el placeholder de foto (`rounded-2xl`, casi 1:1), el título (máx. 2 líneas), la ubicación, el precio "N € / noche" y la valoración con estrella y coma decimal ("4,97"). → Visual.
- CA-08.2 Toda la tarjeta es un `<Link>` a `/rooms/{id}`. → Pulsar una tarjeta abre su detalle.
- CA-08.3 Foco visible al navegar con teclado (Tab). → Navegar con Tab.

**RF-09 — Acceso al Catálogo** (`SectionHeader`; ver §4, §7)
- CA-09.1 Encima de la cuadrícula hay un `SectionHeader` con título y un botón circular "→" que es un `<Link>` a `/catalog`. → Pulsarlo lleva a `/catalog` sin recargar (RF-03).

### 1.3 Catálogo (`/catalog`)

**RF-10 — Búsqueda en el Catálogo** (`SearchBar`; ver §5 fila "Filtrado en tiempo real")
- CA-10.1 Igual que CA-05.1 y CA-05.2, aplicado a la lista del Catálogo. → Escribir en el `Navbar` de `/catalog`.

**RF-11 — Cabecera de resultados** (`ResultsHeader`; ver §4, §7 "Aplicar al Catálogo")
- CA-11.1 Muestra "N alojamientos", con N = número de resultados **tras filtrar**, y "1 alojamiento" en singular. → Buscar hasta dejar 1 resultado y luego 0.

**RF-12 — Ordenación por precio** (`SortSelect`; ver §5 fila "Ordenación por precio")
- CA-12.1 Hay dos opciones: precio ascendente y descendente. → Visual.
- CA-12.2 Al cambiar la opción, la lista se reordena por `pricePerNight`. → Comprobar el primer y el último precio en cada orden.
- CA-12.3 Ordenar no muta el array del estado (se ordena una copia). → Revisión de código: hay copia antes de `sort` (o se usa `toSorted`).
- CA-12.4 El orden se mantiene al buscar. → Ordenar descendente y escribir: el resultado sigue en orden descendente.

**RF-13 — Lista de tarjetas** (`ListingList`; ver §4)
- CA-13.1 Reutiliza `ListingCard` sin duplicarla: es el mismo componente que en la Home. → Revisión de imports.
- CA-13.2 1 columna en móvil y 2 columnas a partir de 768px dentro de su panel. → DevTools.
- CA-13.3 Mensaje de lista vacía si no hay resultados. → Buscar "zzzz".

**RF-14 — Placeholder de mapa** (`MapPlaceholder`; ver §3, §7)
- CA-14.1 A 375px, el mapa va **debajo** de la lista. → DevTools.
- CA-14.2 A 768px, el mapa va a la **derecha** de la lista y es `sticky` al hacer scroll. → DevTools + scroll.

### 1.4 Detalle (`/rooms/[id]`)

**RF-15 — Carga por `id` y no encontrado** (`LoadingIndicator`, `NotFoundMessage`; ver §3 nota Next.js 16, §5)
- CA-15.1 El `id` se lee con `use(params)` o `useParams()`; `params` es una Promise (Next 16). → `npx tsc --noEmit` sin errores.
- CA-15.2 Con un `id` válido, tras la carga se muestra ese alojamiento. → Abrir `/rooms/1`.
- CA-15.3 Con un `id` inexistente se muestra `NotFoundMessage` con un `<Link>` al Catálogo. → Abrir `/rooms/no-existe`.

**RF-16 — Volver al Catálogo** (`BackLink`; ver §4, §7)
- CA-16.1 Arriba del contenido hay un "← Volver al catálogo" que es un `<Link>` a `/catalog`. → Pulsarlo: sin recarga (RF-03).

**RF-17 — Galería** (`PhotoGallery`, `GalleryControls`; ver §5 fila "Navegación de la galería")
- CA-17.1 Muestra la foto actual (placeholder con su etiqueta) y el indicador "i / total". → Visual.
- CA-17.2 "Siguiente" avanza y "Anterior" retrocede. → Pulsar varias veces.
- CA-17.3 "Anterior" está deshabilitado en la primera foto y "Siguiente" en la última. → Atributo `disabled` en el inspector.
- CA-17.4 Ambos botones tienen `aria-label`. → Inspector.

**RF-18 — Cabecera del alojamiento** (`ListingHeader`, `StarRating`; ver §4, §7)
- CA-18.1 Muestra título, valoración, número de reseñas y ubicación. → Visual.

**RF-19 — Anfitrión** (`HostInfo`; ver §4, §7)
- CA-19.1 Muestra el placeholder de avatar, "Anfitrión: {name}" y "{yearsHosting} años como anfitrión" (singular si es 1). → Visual con un mock de 1 año.

**RF-20 — Amenities** (`AmenitiesGrid`, `AmenityItem`; ver §4, §7)
- CA-20.1 Cuadrícula de pares icono + etiqueta: 2 columnas a 375px y 3 a 768px. → DevTools.

**RF-21 — Tarjeta de reserva** (`BookingCard`, `GuestCounter`; ver §5 fila "Contador de huéspedes", §7)
- CA-21.1 Muestra "N € / noche", el contador de huéspedes y el CTA "Reservar" (acento `rose-600`). → Visual.
- CA-21.2 Empieza en 1 huésped. "−" está deshabilitado en 1 y "+" en `maxGuests`; el valor nunca sale de [1, `maxGuests`]. → Pulsar repetidamente ambos botones.
- CA-21.3 El CTA no navega (no hay reserva real). → Pulsarlo: no hay cambio de ruta.

**RF-22 — Layout del Detalle** (ver §3, §7 "Aplicar al Detalle")
- CA-22.1 A 375px todo va en una columna. → DevTools.
- CA-22.2 A 768px el contenido va a la izquierda y `BookingCard` a la derecha, `sticky` al hacer scroll. → DevTools + scroll.

### 1.5 Opcionales (solo tras completar RF-01…RF-22)

**RF-23 — Badge en tarjeta** (`ListingBadge`, nuevo §7)
- CA-23.1 Se muestra una píldora sobre la foto, arriba a la izquierda, solo si `listing.badge` existe. → Visual con y sin badge.

**RF-24 — Favorito** (`FavoriteButton`, nuevo §7)
- CA-24.1 Al pulsar el corazón se alterna su estado y se rellena con el acento. → Visual.
- CA-24.2 Pulsarlo **no** navega al detalle (`preventDefault` + `stopPropagation`, según §7). → Pulsar y comprobar que la ruta no cambia.

**RF-25 — Tarjeta promocional** (`PromoCard`, nuevo §7)
- CA-25.1 Hay una tarjeta con título, botón gris e icono, colocada entre bloques de la Home. → Visual.

**RF-26 — Footer** (`Footer`, nuevo §7)
- CA-26.1 Grupos de enlaces apilados a 375px y en 3 columnas a 768px, con fondo `neutral-50`. → DevTools.
- CA-26.2 No contiene enlaces a rutas inexistentes: sus elementos son texto, no `<Link>` a páginas no solicitadas. → Revisión.

---

## 2. Requisitos no funcionales

RNF = reglas de §6, verificadas así:

| RNF | Regla (§6) | Verificación |
|---|---|---|
| RNF-01 | Mobile-first (§6.1) | DevTools a 375px antes que a 768px; las clases base no llevan prefijo y las de escritorio usan `md:` o superior. |
| RNF-02 | TypeScript estricto, sin `any` (§6.2) | `npx tsc --noEmit` sin errores y búsqueda de `any` sin resultados. |
| RNF-03 | Solo Tailwind, sin `style={}` ni librerías de componentes (§6.3) | Búsqueda de `style=` sin resultados; en `package.json` la única dependencia nueva es `lucide-react` (D-4). |
| RNF-04 | `<Link>` para navegar (§6.4) | Igual que CA-03.1. |
| RNF-05 | Componentes `const`, uno por archivo, ≤ ~80 líneas (§6.5) | Revisar la longitud de cada archivo de `/components`. |
| RNF-06 | Estructura y rutas (§6.6, §6.7) + `/data` (D-1) | Árbol de carpetas. |
| RNF-07 | Configuración intacta (§6.8) | `next.config.ts`, `tsconfig.json` y `eslint.config.mjs` sin cambios. En `package.json` y `package-lock.json` solo cambia el añadido de `lucide-react` (D-4). |
| RNF-08 | Lint limpio | `npm run lint` sin errores. |

---

## 3. Contratos: tipos (`/types`)

Ampliación de la tabla "Tipos" de §4. Todos los campos son obligatorios salvo los marcados con `?`.

| Archivo | Tipo | Campos |
|---|---|---|
| `types/listing.ts` | `Host` | `name: string`, `yearsHosting: number` |
| | `Amenity` | `icon: LucideIcon` (D-4), `label: string` |
| | `Listing` | `id: string`, `title: string`, `location: string`, `pricePerNight: number` (€), `rating: number` (0–5), `reviewCount: number`, `category: string` (= `Category.id`), `photos: string[]` (D-5, ≥ 1), `maxGuests: number` (≥ 1), `host: Host`, `amenities: Amenity[]`, `badge?: string` (solo para RF-23) |
| `types/category.ts` | `Category` | `id: string`, `label: string`, `icon: LucideIcon` (D-4) |

`LucideIcon` se importa como tipo desde `lucide-react` (`import type`). En los componentes, el icono se renderiza como componente: `<Icon className="size-5" />`.
| `types/sort.ts` | `SortOrder` | `'asc' \| 'desc'` |

Datos mock (D-1), requisitos mínimos para poder verificar todos los CA:

- `data/categories.ts`: `Category[]` con "Todas" (`id: "all"`) y al menos 5 categorías más (p. ej. Playa, Mansiones, Tendencias, Cabañas, Piscinas).
- `data/listings.ts`: `Listing[]` con al menos 12 alojamientos, que cumplan:
  - Al menos 2 por categoría.
  - Precios distintos entre sí.
  - Al menos uno con 1 foto y uno con 5 fotos.
  - Al menos uno con `maxGuests: 1`.
  - Al menos un anfitrión con `yearsHosting: 1`.
  - Al menos 2 ubicaciones que compartan texto (p. ej. dos en "Madrid").

---

## 4. Contratos: props de componentes

Los componentes van en `/components/<Nombre>.tsx` y sus props se tipan con una `interface <Nombre>Props` en el mismo archivo. `onX` = callback que emite al padre (§5 "Principio").

### 4.1 Obligatorios

| Componente | Props | RF |
|---|---|---|
| `Navbar` | `query?: string`, `onQueryChange?: (q: string) => void`. Si no recibe `onQueryChange`, no se muestra `SearchBar`. | RF-01 |
| `Logo` | — | RF-01 |
| `SearchBar` | `value: string`, `onChange: (q: string) => void`, `placeholder?: string` | RF-01, RF-05, RF-10 |
| `UserMenu` | — | RF-01 |
| `CategoryBar` | `categories: Category[]`, `activeId: string`, `onSelect: (id: string) => void` | RF-06 |
| `CategoryItem` | `category: Category`, `isActive: boolean`, `onSelect: (id: string) => void` | RF-06 |
| `SectionHeader` | `title: string`, `subtitle?: string`, `href?: string` | RF-09 |
| `ListingGrid` | `listings: Listing[]` | RF-07 |
| `ListingCard` | `listing: Listing` | RF-08 |
| `PhotoPlaceholder` | `label?: string`, `className?: string` | RF-08, RF-17 |
| `StarRating` | `rating: number`, `reviewCount?: number` | RF-08, RF-18 |
| `LoadingIndicator` | `label?: string` | RF-02 |
| `ResultsHeader` | `count: number`, `sortOrder: SortOrder`, `onSortChange: (o: SortOrder) => void` | RF-11, RF-12 |
| `SortSelect` | `value: SortOrder`, `onChange: (o: SortOrder) => void` | RF-12 |
| `ListingList` | `listings: Listing[]` | RF-13 |
| `MapPlaceholder` | — | RF-14 |
| `BackLink` | `href?: string` (por defecto `/catalog`), `label?: string` | RF-16 |
| `PhotoGallery` | `photos: string[]`. Estado interno: `currentIndex` (§5). | RF-17 |
| `GalleryControls` | `onPrev: () => void`, `onNext: () => void`, `canPrev: boolean`, `canNext: boolean` | RF-17 |
| `ListingHeader` | `title: string`, `rating: number`, `reviewCount: number`, `location: string` | RF-18 |
| `HostInfo` | `host: Host` | RF-19 |
| `AmenitiesGrid` | `amenities: Amenity[]` | RF-20 |
| `AmenityItem` | `amenity: Amenity` | RF-20 |
| `BookingCard` | `pricePerNight: number`, `maxGuests: number`. Estado interno: `guests` (§5). | RF-21 |
| `GuestCounter` | `value: number`, `min: number`, `max: number`, `onChange: (n: number) => void` | RF-21 |
| `NotFoundMessage` | `message?: string` (obligatorio por D-2) | RF-15 |

### 4.2 Opcionales / nuevos

| Componente | Props | RF |
|---|---|---|
| `ListingBadge` | `label: string` | RF-23 |
| `FavoriteButton` | `isFavorite: boolean`, `onToggle: () => void` | RF-24 |
| `PromoCard` | `title: string`, `ctaLabel: string`, `icon?: ReactNode` | RF-25 |
| `Footer` | `groups: { title: string; links: string[] }[]` | RF-26 |

### 4.3 Pages (estado según §5)

| Page | Estado | Efecto |
|---|---|---|
| `app/page.tsx` | `isLoading`, `listings: Listing[]`, `query`, `activeCategory` | Carga simulada al montar |
| `app/catalog/page.tsx` | `isLoading`, `listings: Listing[]`, `query`, `sortOrder` | Carga simulada al montar |
| `app/rooms/[id]/page.tsx` | `isLoading`, `listing: Listing \| null` | Carga simulada, dependencia `[id]` |

Las tres pages son Client Components (`'use client'`), según §5.

---

## 5. Trazabilidad

| Bloque | RF |
|---|---|
| Transversal | RF-01 – RF-04 |
| Home | RF-05 – RF-09 |
| Catálogo | RF-10 – RF-14 |
| Detalle | RF-15 – RF-22 |
| Opcionales (después de todo lo anterior) | RF-23 – RF-26 |
