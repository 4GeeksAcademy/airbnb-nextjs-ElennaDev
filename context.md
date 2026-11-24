# context.md — Airbnb 2.0

Mini-brief para implementar tres vistas de Airbnb.com con React en Next.js.

---

## 1. Objetivo

Construir una réplica simplificada de tres vistas de Airbnb.com — **Home**, **Catálogo** y **Detalle de habitación** — para **validar la arquitectura de componentes** de una plataforma de alquiler vacacional.

El foco no es el pixel-perfect, sino comprobar que:

- Los componentes son pequeños, con una única responsabilidad, y se reutilizan entre vistas (p. ej. la tarjeta de alojamiento).
- El estado vive en el nivel adecuado y fluye por `props`.
- Las tres rutas funcionan con navegación client-side y datos mock con carga simulada.

No hay backend: los datos son mocks locales tipados.

---

## 2. Usuario

Viajero que busca alojamiento para una escapada o vacaciones, principalmente desde el móvil. Quiere explorar opciones por tipo (playa, mansiones, tendencias…), buscar por nombre o ciudad, comparar precios y valoraciones de un vistazo y, cuando algo le interesa, ver el detalle (fotos, anfitrión, servicios) y comprobar el precio para el número de huéspedes antes de reservar.

---

## 3. Páginas

| Ruta | Vista | Qué muestra | Para qué sirve |
|---|---|---|---|
| `/` | **Home** | Navbar con búsqueda, fila de categorías y cuadrícula de tarjetas de alojamiento. | Punto de entrada: explorar e inspirarse, filtrar por categoría y por texto. |
| `/catalog` | **Catálogo** | Navbar, cabecera con nº de resultados y ordenación por precio, lista de tarjetas y placeholder de mapa. | Comparar resultados y ordenarlos por precio. |
| `/rooms/[id]` | **Detalle** | Volver al catálogo, galería de fotos, cabecera (título, valoración, reseñas, ubicación), anfitrión, amenities y tarjeta de reserva. | Decidir si reservar un alojamiento concreto. |

**Layout responsive por vista (mobile-first, 375px → `md:` 768px):**

- **Home**: cuadrícula de 1 columna en móvil → `md:grid-cols-2` → `lg:grid-cols-3/4`. Categorías con scroll horizontal.
- **Catálogo**: lista y mapa apilados (mapa **debajo**) en móvil → dos columnas en `md:` con el mapa a la **derecha** (sticky).
- **Detalle**: todo en una columna en móvil → en `md:` contenido a la izquierda y tarjeta de reserva a la derecha (sticky).

> Nota Next.js 16: en `/rooms/[id]`, `params` es una **Promise**. En una page Client Component se lee con `use(params)` (React) o con el hook `useParams()`.

---

## 4. Componentes

Leyenda: ♻️ = reutilizado en varias vistas · *(opcional)* = propuesta extra, no obligatoria · ↳ = subcomponente creado al dividir otro para respetar el límite de ~80 líneas.

Ubicación: cada componente en `/components/<Nombre>.tsx`; interfaces en `/types`.

### Home (`/`)

| Componente | Vista(s) | Responsabilidad |
|---|---|---|
| `Navbar` ♻️ | Home, Catálogo, Detalle | Barra superior: compone `Logo`, `SearchBar` y `UserMenu`. Recibe `query` / `onQueryChange` opcionales (en Detalle no hay búsqueda). |
| ↳ `Logo` ♻️ | Todas | Logo de la marca; `<Link>` a `/`. |
| ↳ `SearchBar` ♻️ | Home, Catálogo | Input controlado de búsqueda; emite el texto al padre en cada pulsación. |
| ↳ `UserMenu` ♻️ | Todas | Iconos de menú hamburguesa + avatar de usuario (solo visual). |
| `CategoryBar` | Home | Fila horizontal con scroll de categorías; marca la activa y emite la selección. |
| ↳ `CategoryItem` | Home | Botón icono + etiqueta; estilo resaltado (subrayado / opacidad completa) si está activo. |
| `ListingGrid` | Home | Cuadrícula responsive de `ListingCard` (1 col móvil, varias en escritorio). Muestra mensaje si la lista está vacía. |
| `ListingCard` ♻️ | Home, Catálogo | Tarjeta: `PhotoPlaceholder`, título, precio por noche y `StarRating`. Toda la tarjeta es un `<Link>` a `/rooms/[id]`. |
| ↳ `PhotoPlaceholder` ♻️ | Home, Catálogo, Detalle | Bloque gris con proporción fija que sustituye a la foto. |
| ↳ `StarRating` ♻️ | Home, Catálogo, Detalle | Icono de estrella + valoración numérica (y nº de reseñas opcional). |
| `LoadingIndicator` ♻️ | Home, Catálogo, Detalle | Spinner / skeleton accesible (`role="status"`) mientras `isLoading` es `true`. |
| `SectionHeader` | Home | Título de sección + `<Link>` "Ver todo →" a `/catalog` (como "Alojamientos populares en…" de Airbnb). Da el acceso Home → Catálogo. |

### Catálogo (`/catalog`)

| Componente | Vista(s) | Responsabilidad |
|---|---|---|
| `Navbar` ♻️ | — | Ver Home. |
| `ResultsHeader` | Catálogo | Muestra "N alojamientos" y compone `SortSelect`. |
| ↳ `SortSelect` | Catálogo | Control (`<select>` o botones) de orden por precio: ascendente / descendente. Emite el cambio al padre. |
| `ListingList` | Catálogo | Lista de `ListingCard` ♻️ (columna en móvil, 2 col en escritorio dentro de su panel). |
| `MapPlaceholder` | Catálogo | Caja gris "Mapa"; debajo de la lista en móvil, a la derecha (sticky) en `md:`. |
| `LoadingIndicator` ♻️ | — | Ver Home. |

### Detalle (`/rooms/[id]`)

| Componente | Vista(s) | Responsabilidad |
|---|---|---|
| `BackLink` | Detalle | `<Link>` "← Volver al catálogo" a `/catalog` (o breadcrumb `Catálogo / Título`). |
| `PhotoGallery` | Detalle | Muestra la foto actual (`PhotoPlaceholder` ♻️) y el indicador "2 / 5"; gestiona el índice. |
| ↳ `GalleryControls` | Detalle | Botones Anterior / Siguiente con `aria-label`; deshabilitados en los extremos. |
| `ListingHeader` | Detalle | Título, `StarRating` ♻️, nº de reseñas y ubicación. |
| `HostInfo` | Detalle | Placeholder de avatar, "Anfitrión: Nombre" y años como anfitrión. |
| `AmenitiesGrid` | Detalle | Cuadrícula (2 col móvil → 3 en `md:`) de `AmenityItem`. |
| ↳ `AmenityItem` | Detalle | Par icono + etiqueta. |
| `BookingCard` | Detalle | Precio por noche, `GuestCounter`, total opcional y botón CTA "Reservar". Sticky en escritorio. |
| ↳ `GuestCounter` | Detalle | Botones − / + y número de huéspedes; respeta mínimo y máximo. |
| `LoadingIndicator` ♻️ | — | Ver Home. |
| `NotFoundMessage` *(opcional)* | Detalle | Mensaje "Alojamiento no encontrado" + `<Link>` al catálogo si el `id` no existe. |

### Tipos (`/types`)

| Tipo | Contenido |
|---|---|
| `Listing` | `id`, `title`, `location`, `pricePerNight`, `rating`, `reviewCount`, `category`, `photos` (nº o lista de placeholders), `maxGuests`, `host`, `amenities`. |
| `Host` | `name`, `yearsHosting`. |
| `Amenity` | `icon`, `label`. |
| `Category` | `id`, `label`, `icon`. |
| `SortOrder` | Unión literal `'asc' \| 'desc'`. |

> *(opcional)* Datos mock tipados en `/data/listings.ts` y `/data/categories.ts`. **Fuera de la estructura indicada** (`/app`, `/components`, `/types`); alternativa: colocarlos en `/types` no es correcto semánticamente, así que se propone esta carpeta extra.

---

## 5. Comportamiento

Principio: **el estado vive en la page** (`app/.../page.tsx`, marcada `'use client'`) y baja por `props`; los componentes hijos son presentacionales y emiten eventos (`onQueryChange`, `onSelect`, `onSortChange`…). Lo que se puede calcular a partir de otro estado **se deriva en el render**, sin `useEffect`.

Por eso `Navbar` se renderiza **en cada page**, no en `app/layout.tsx`: así la page puede pasarle el estado de búsqueda.

| Comportamiento | Estado (`useState`) | Efectos (`useEffect`) | Detalle |
|---|---|---|---|
| **Filtrado en tiempo real** al escribir en la búsqueda | `query: string` en la page (Home y Catálogo). | Ninguno. La lista filtrada se deriva: `listings` filtradas por `title`/`location` que contengan `query` (sin distinguir mayúsculas). | `SearchBar` es un input controlado; cada pulsación actualiza `query` y la cuadrícula se re-renderiza. Si no hay coincidencias se muestra mensaje vacío. |
| **Categoría activa** | `activeCategory: string` en Home (valor inicial: la primera o "Todas"). | Ninguno. Se combina con `query` en el mismo filtrado derivado. | Clic en `CategoryItem` → `onSelect(id)` → la page actualiza el estado. El item activo recibe estilos resaltados y `aria-pressed`. |
| **Ordenación por precio** | `sortOrder: SortOrder` en Catálogo. | Ninguno. Lista ordenada derivada a partir de una **copia** del array (nunca mutar el estado). | `SortSelect` emite el nuevo orden; `ResultsHeader` muestra el total de resultados (tras filtrar). |
| **Navegación de la galería** | `currentIndex: number` en `PhotoGallery`. | Ninguno. | Anterior → `index - 1`, Siguiente → `index + 1`. Botones deshabilitados en la primera / última foto. Se muestra "índice / total". |
| **Contador de huéspedes** | `guests: number` en `BookingCard` (inicial 1). `GuestCounter` es controlado. | Ninguno. | Mínimo 1, máximo `listing.maxGuests`. El botón − se deshabilita en el mínimo y el + en el máximo; nunca se sale del rango. |
| **Carga simulada al montar** | En cada page: `isLoading: boolean` (inicial `true`) y `listings: Listing[]` (o `listing: Listing \| null` en Detalle). | `useEffect` al montar: `setTimeout` (~800 ms) que carga los mocks y pone `isLoading` a `false`. **Cleanup** con `clearTimeout`. En Detalle la dependencia es `[id]`. | Mientras `isLoading` es `true` se muestra `LoadingIndicator` en lugar del contenido. En Detalle, si tras cargar no existe el `id`, se muestra `NotFoundMessage`. |
| **Navegación sin recarga** | Ninguno. | Ninguno. | Solo `<Link>` de `next/link`: Logo → `/`; `SectionHeader` → `/catalog`; `ListingCard` → `/rooms/[id]`; `BackLink` → `/catalog`. Navegación client-side, sin recargar el navegador. El `id` se lee con `use(params)` o `useParams()`. |

---

## 6. Criterios de calidad

1. **Mobile-first**: estilos base pensados para 375px; adaptaciones de escritorio solo con prefijos `md:` (≥768px) y superiores. Sin scroll horizontal de página (salvo la fila de categorías, que scrollea dentro de su contenedor).
2. **TypeScript estricto**: `strict: true`, **sin `any`**. Todas las `props` tipadas con interfaces (en `/types` las de dominio). Eventos tipados (`React.ChangeEvent<HTMLInputElement>`, etc.).
3. **Solo Tailwind CSS**: únicamente clases de utilidad. Sin estilos en línea (`style={...}`), sin CSS modules y **sin librerías de componentes** (nada de shadcn, MUI, Ant Design ni Chakra).
4. **Navegación con `<Link>`**: toda navegación interna con `<Link>` de Next.js; **nunca** `<a href>` para rutas internas.
5. **Componentes pequeños y de única responsabilidad**: componentes funcionales definidos con `const`, **uno por archivo** en `/components`, máximo ~80 líneas de JSX + lógica. Si crecen, se dividen (como `Navbar` → `Logo` / `SearchBar` / `UserMenu`).
6. **Estructura de carpetas**: `/app` (rutas), `/components` (UI reutilizable), `/types` (interfaces).
7. **Rutas**: `/`, `/catalog`, `/rooms/[id]`.
8. **Proyecto intacto**: no reinstalar ni modificar la configuración existente (Next.js 16, Tailwind v4, `tsconfig.json`).
9. **Next.js 16**: consultar `node_modules/next/dist/docs/` ante cualquier duda de API (p. ej. `params` como Promise), según indica `AGENTS.md`.

---

## 7. Diseño visual

Referencia: `airbnb-home.png`, la Home en móvil (375px, captura @2x). Se toma **solo el lenguaje visual**: no se copian logo, nombre ni textos de marca. El proyecto usa su propio logo y su propio color de acento.

Los valores en px son a 1x (la captura dividida entre 2). Se traducen a la escala por defecto de Tailwind para no modificar la configuración.

### Estructura de la Home observada (móvil, de arriba abajo)

1. **Search pill**: ocupa todo el ancho, centrada, con icono de lupa y el texto "Empieza a buscar". No se ven logo ni iconos de usuario en móvil.
2. **Fila de categorías**: chips en forma de píldora con icono + etiqueta y scroll horizontal. La activa tiene fondo gris y sombra.
3. **Secciones repetidas**: título de sección + botón circular "→" a la derecha (a veces con subtítulo gris) y, debajo, un **carrusel horizontal** de tarjetas (se ven unas 2,2 tarjetas; la tercera asoma por la derecha).
4. **Tarjeta promocional** entre secciones (texto + botón gris + ilustración).
5. **Fila de servicios**: tarjetas cuadradas gris claro con ilustración + etiqueta debajo.
6. **Footer** con fondo gris claro: grupos de enlaces separados por divisores, idioma/moneda, iconos sociales y copyright.

> ⚠️ **Diferencia con los requisitos**: la captura usa carruseles horizontales, pero el proyecto exige una **cuadrícula de 1 columna en móvil**. Se mantiene el requisito (`ListingGrid`). La captura se usa solo para el estilo de la tarjeta.
>
> ⚠️ En móvil la captura no muestra logo ni menú de usuario. Como `Navbar` debe tenerlos, en móvil se muestra una versión **compacta**: logo solo-icono a la izquierda, search pill en el centro y avatar a la derecha.

### Colores

Paleta neutra casi en blanco y negro: el color lo ponen las fotos. Hay un único acento, propio del proyecto.

| Token | Uso | Valor aprox. | Tailwind |
|---|---|---|---|
| Texto principal | Títulos, nombres de tarjeta, enlaces del footer | `#222222` | `text-neutral-800` |
| Texto secundario | Fechas, tipo de anfitrión, precio, subtítulos | `#6A6A6A` | `text-neutral-500` |
| Fondo de página | Body, tarjetas | `#FFFFFF` | `bg-white` |
| Fondo suave | Footer, tarjetas de servicio, botón "→", botones secundarios | `#F7F7F7` / `#F2F2F2` | `bg-neutral-50` / `bg-neutral-100` |
| Bordes y divisores | Divisores del footer, borde del search pill y de los chips | `#DDDDDD` | `border-neutral-200` |
| Overlay sobre foto | Badge de la tarjeta | blanco al 90 % | `bg-white/90` |
| Acento (propio) | CTA "Reservar", corazón activo, foco | — | `rose-600` (hover `rose-700`). Es un tono propio: no se usa el color de marca de la referencia. |

### Tipografía

- **Familia**: sans geométrica y redondeada. Se usa **Geist Sans**, que ya carga `app/layout.tsx` (`--font-geist-sans`), mediante `font-sans`. No se usa la fuente de marca de la referencia.
- **Escala**:

| Rol | Tamaño / peso | Tailwind |
|---|---|---|
| Título de sección | ~22px, semibold, `leading-tight`, hasta 2 líneas | `text-xl font-semibold` (`md:text-2xl`) |
| Título de tarjeta | ~15px, semibold, máx. 2 líneas | `text-[15px] font-medium line-clamp-2`, o `text-sm font-semibold` |
| Meta de tarjeta (fechas, precio, rating) | ~14px, regular, gris | `text-sm text-neutral-500` |
| Texto del search pill / chips | ~15–16px, medium | `text-base font-medium` |
| Badge sobre foto | ~13px, semibold | `text-xs font-semibold` |
| Encabezado de grupo en footer | ~14px, semibold | `text-sm font-semibold` |

- El separador " · " entre datos de la meta va en gris más claro (`text-neutral-400`).

### Espaciados y formas

| Elemento | Observado (1x) | Tailwind |
|---|---|---|
| Gutter lateral de la página | 24px | `px-6` (`md:px-10`, `lg:px-20`) |
| Separación entre secciones | ~40px | `space-y-10` / `mt-10` |
| Título de sección → tarjetas | ~16px | `mb-4` |
| Separación entre tarjetas | ~12px | `gap-3` (`md:gap-6` en cuadrícula) |
| Foto → texto de tarjeta | ~8–12px | `mt-2` / `mt-3` |
| Radio de foto de tarjeta | ~20px | `rounded-2xl` |
| Radio de tarjetas promo / servicios | ~20–24px | `rounded-3xl` |
| Search pill | alto ~54px, totalmente redondeado | `h-14 rounded-full` |
| Chips de categoría | alto ~36px | `h-9 px-4 rounded-full` |
| Botón circular "→" / corazón | ~28–32px | `size-8 rounded-full` |
| Sombras | Suaves y difusas en search pill, chips y fotos | `shadow-md` (search pill), `shadow-sm` (chips / foto) |

### Componentes observados

Se usan los nombres de la tabla de §4. Los marcados **(nuevo)** no estaban en la tabla y son **opcionales**: no forman parte del alcance obligatorio.

| Componente | Props | Layout: contiene / posición | A partir de 768px (`md:`) |
|---|---|---|---|
| `Navbar` | `query?: string`, `onQueryChange?: (q: string) => void` | Arriba del todo, `sticky top-0 bg-white` y borde inferior. Contiene `Logo`, `SearchBar` y `UserMenu` en una fila. | Barra completa: logo con texto a la izquierda, search pill centrado (`max-w-xl`) y `UserMenu` a la derecha. |
| `Logo` | — | Izquierda del `Navbar`. En móvil, solo el icono. | Icono + nombre del proyecto (no el de la referencia). |
| `SearchBar` | `value: string`, `onChange: (q: string) => void`, `placeholder?: string` | Píldora blanca `rounded-full` con borde, `shadow-md`, icono de lupa y texto centrado. En móvil ocupa casi todo el ancho. | Ancho limitado (`md:max-w-xl`) y texto alineado a la izquierda. |
| `UserMenu` | — | Derecha del `Navbar`: avatar circular (`size-8`) y, en escritorio, icono de menú dentro de una píldora con borde. | Se muestran icono de menú + avatar en una píldora `rounded-full border`. |
| `CategoryBar` | `categories: Category[]`, `activeId: string`, `onSelect: (id: string) => void` | Debajo del `Navbar`. Fila `flex gap-3 overflow-x-auto` con scroll horizontal y sin scrollbar visible. Contiene `CategoryItem`. | Más separación (`md:gap-6`). Si cabe, sin scroll. |
| `CategoryItem` | `category: Category`, `isActive: boolean`, `onSelect: (id: string) => void` | Chip `h-9 rounded-full border`: icono + etiqueta. Activo: `bg-neutral-100 shadow-sm` y texto `neutral-800`. Inactivo: `bg-white` y texto `neutral-500`. | Sin cambios. Se puede pasar a icono encima + etiqueta debajo con subrayado en el activo. |
| `SectionHeader` | `title: string`, `subtitle?: string`, `href?: string` | Encabeza cada bloque: título a la izquierda y botón circular "→" (`bg-neutral-100`, `<Link>`) a la derecha. Subtítulo gris opcional debajo. | Título `md:text-2xl`. |
| `ListingGrid` | `listings: Listing[]` | Debajo de `CategoryBar` / `SectionHeader`. `grid grid-cols-1 gap-6`. Contiene `ListingCard`. | `md:grid-cols-2`, `lg:grid-cols-3`, `xl:grid-cols-4`. |
| `ListingCard` | `listing: Listing` | `<Link>` vertical: foto (`PhotoPlaceholder`, con `ListingBadge` y `FavoriteButton` encima) y, debajo, título, meta y la línea "precio / noche · `StarRating`". Sin borde ni fondo: la "tarjeta" es la foto redondeada. | Igual; cambia el número de columnas del contenedor. |
| `PhotoPlaceholder` | `label?: string`, `className?: string` | Bloque `bg-neutral-200 rounded-2xl aspect-square` (casi 1:1 en la captura), `relative` para alojar overlays. | Sin cambios. En Detalle pasa a `md:aspect-video`. |
| `StarRating` | `rating: number`, `reviewCount?: number` | Inline: ★ + valor con coma decimal ("4,97"), en `text-sm`. Se coloca a la derecha del precio, separado por " · ". | Sin cambios. |
| `LoadingIndicator` | `label?: string` | Ocupa el lugar del contenido. Recomendado: **skeleton** con la forma de `ListingCard` (`bg-neutral-200 animate-pulse rounded-2xl`), con `role="status"`. | Repite el skeleton según el número de columnas. |
| `ListingBadge` **(nuevo)** | `label: string` | Píldora `bg-white/90 rounded-full text-xs font-semibold shadow-sm`, `absolute top-3 left-3` sobre la foto (p. ej. "Favorito de los viajeros"). | Sin cambios. |
| `FavoriteButton` **(nuevo)** | `isFavorite: boolean`, `onToggle: () => void` | Corazón con contorno blanco y relleno semitransparente, `absolute top-3 right-3` sobre la foto, con `aria-label`. Activo: relleno de acento. | Sin cambios. Necesita estado `isFavorite` (no está en §5; solo visual si no se implementa). Va dentro del `<Link>` de `ListingCard`: el `onClick` debe llamar a `e.preventDefault()` y `e.stopPropagation()` para no navegar al detalle al pulsarlo. |
| `PromoCard` **(nuevo)** | `title: string`, `ctaLabel: string`, `icon?: ReactNode` | Tarjeta blanca `rounded-3xl shadow-md p-6`: texto + botón gris `rounded-full bg-neutral-100` + ilustración a la derecha. Va entre secciones. | Ancho fijo dentro de una fila de 2–3 promos. |
| `Footer` **(nuevo)** | `groups: { title: string; links: string[] }[]` | Al final, `bg-neutral-50 px-6 py-8`. Grupos apilados (encabezado semibold + enlaces `text-sm` con `space-y-4`), separados por `border-t border-neutral-200`. Debajo: idioma/moneda, iconos sociales y copyright. | Grupos en columnas (`md:grid-cols-3`). Idioma, sociales y legal en una sola fila (`md:flex md:justify-between`). |

> No se incluye la fila de "servicios" (Fotografía, Chefs, Masaje): queda fuera del alcance del proyecto.

### Estilo de tarjeta (resumen reutilizable)

- La foto **es** la tarjeta: `rounded-2xl`, sombra suave opcional y overlays con `absolute`.
- Texto sin contenedor: título semibold `neutral-800`, meta `text-sm neutral-500` y separador " · " en `neutral-400`.
- Precio: **"95 € / noche"**, con el importe en `font-semibold neutral-800` y "/ noche" en gris. Por noche y no "en total", como exige §4.
- Hover (escritorio): `hover:opacity-90` o una ligera escala de la foto. Foco visible con `focus-visible:ring-2 ring-neutral-800`.

### Aplicar el sistema al Catálogo (`/catalog`)

No hay captura; se aplican los mismos tokens:

- **`Navbar`**: idéntico al de la Home (sticky, blanco, borde inferior `neutral-200`).
- **`ResultsHeader`**: `px-6 py-4`. A la izquierda, "N alojamientos" en `text-sm font-semibold neutral-800`. A la derecha, `SortSelect` con estilo de chip (`h-9 rounded-full border border-neutral-200 px-4 text-sm`). El orden activo va en `bg-neutral-100`, como `CategoryItem`.
- **`ListingList`**: mismas `ListingCard`, `gap-6`. En móvil, 1 columna. En `md:`, 2 columnas dentro de su panel.
- **`MapPlaceholder`**: `bg-neutral-100 rounded-2xl` con el texto "Mapa" en `neutral-500`. En móvil, debajo de la lista con alto fijo (`h-64`). En `md:`, `sticky top-20 h-[calc(100vh-6rem)]` en la columna derecha.
- **Layout `md:`**: `md:grid md:grid-cols-[3fr_2fr] md:gap-6`, con la lista a la izquierda y el mapa a la derecha.
- **Carga**: skeleton de tarjetas (igual que en la Home) y un bloque gris en lugar del mapa.

### Aplicar el sistema al Detalle (`/rooms/[id]`)

- **`BackLink`**: arriba, `text-sm font-medium neutral-800` con "←". También puede ser un botón circular `size-8 bg-neutral-100 rounded-full`, igual que el "→" de las secciones (misma forma, distinta dirección).
- **`PhotoGallery`**: `PhotoPlaceholder` a sangre en móvil (sin gutter, `aspect-square` o `aspect-[4/3]`); en `md:`, `rounded-2xl aspect-video`. **`GalleryControls`**: botones circulares blancos `size-8 shadow-md`, centrados verticalmente a izquierda y derecha. Contador "2 / 5" en píldora `bg-black/60 text-white text-xs`, abajo a la derecha.
- **`ListingHeader`**: título `text-2xl font-semibold` y, debajo, una línea `text-sm` con `StarRating` · "N reseñas" (subrayado) · ubicación.
- **Bloques de contenido** (`HostInfo`, `AmenitiesGrid`): separados con `py-6 border-t border-neutral-200`, como los grupos del footer.
- **`HostInfo`**: avatar `size-12 rounded-full bg-neutral-200` + "Anfitrión: Nombre" (semibold) + "N años como anfitrión" (`text-sm neutral-500`).
- **`AmenitiesGrid`**: `grid grid-cols-2 gap-4` (`md:grid-cols-3`). Cada `AmenityItem` es un icono `size-6` + etiqueta en `text-base neutral-800`.
- **`BookingCard`**: tarjeta `rounded-2xl border border-neutral-200 shadow-md p-6`. Precio `text-xl font-semibold` + "/ noche". **`GuestCounter`** con botones circulares con borde (`size-8 rounded-full border`); en el límite se deshabilitan (`disabled:opacity-30 disabled:cursor-not-allowed`). CTA de ancho completo `h-12 rounded-lg bg-rose-600 text-white font-semibold` (acento propio). En móvil puede ir como barra fija inferior (`fixed bottom-0 inset-x-0 border-t bg-white`) con precio + CTA.
- **Layout `md:`**: `md:grid md:grid-cols-[2fr_1fr] md:gap-12`, con el contenido a la izquierda y `BookingCard` en `sticky top-24` a la derecha.
- **Carga**: skeleton de galería + líneas grises (`h-4 bg-neutral-200 rounded animate-pulse`) para el título y el texto.
