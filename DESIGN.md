---
version: alpha
name: Traverso International Foods
description: >
  Sistema visual para la division internacional de Traverso, exportadora
  chilena de alimentos con 130 anos de trayectoria. Estetica industrial
  elegante, corporativa, B2B. Serif editorial + sans corporativa + mono
  tecnica. Paleta azul Traverso profundo + dorado sutil + neutros calidos.
colors:
  primary:          "#0B1E6B"
  primary-dark:     "#081450"
  accent:           "#C5A55A"
  accent-saturated: "#C9A227"
  neutral:          "#FBF9FA"
  neutral-alt:      "#F2F4F8"
  text:             "#19212F"
  text-muted:       "#4A5362"
  text-subtle:      "#6B7280"
  text-on-dark:     "#FFFFFF"
  border:           "#DDE2EC"
  border-light:     "#EEF0F5"
typography:
  display:
    fontFamily: Libre Baskerville
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Libre Baskerville
    fontSize: 44px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Libre Baskerville
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.2
  body-lg:
    fontFamily: Source Sans 3
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.7
  body-md:
    fontFamily: Source Sans 3
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: Source Sans 3
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
  label-caps:
    fontFamily: Courier New
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0.2em
  label-md:
    fontFamily: Source Sans 3
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0.06em
  label-sm:
    fontFamily: Source Sans 3
    fontSize: 10px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0.05em
spacing:
  xs:       4px
  sm:       8px
  md:       16px
  lg:       24px
  xl:       40px
  2xl:      64px
  3xl:      112px
  gutter:   24px
  # Tres tiers de ancho de modulo (consolidado 2026-04-26)
  container-default:    1200px   # sitios estandar (productos individuales, contacto, footer)
  container-wide:       1400px   # modulos institucionales (value-props, productos, hero bottom row)
  container-extra:      1500px   # modulo About (especial, mas ancho que el resto)
  container-cap:        94vw     # cap maximo en pantallas ultrawide para los wide/extra
  container: 1200px              # alias legacy para .container default
rounded:
  none:     0px
  sm:       4px
  md:       8px
  pill:     20px
  full:     9999px
components:
  button-primary-gold:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.primary-dark}"
    rounded: "{rounded.sm}"
    typography: "{typography.label-md}"
    height: 36px
    padding: 0 20px
  button-primary-gold-hover:
    backgroundColor: "#D4B96E"
  button-primary-dark:
    backgroundColor: "{colors.primary-dark}"
    textColor: "{colors.text-on-dark}"
    rounded: "{rounded.sm}"
    typography: "{typography.label-md}"
    height: 36px
    padding: 0 20px
  button-primary-dark-hover:
    backgroundColor: "#1A3A6B"
  button-outline:
    backgroundColor: transparent
    textColor: "{colors.text-on-dark}"
    rounded: "{rounded.sm}"
    typography: "{typography.label-md}"
    height: 36px
    padding: 0 20px
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.text-muted}"
    rounded: "{rounded.sm}"
    typography: "{typography.label-md}"
    height: 36px
    padding: 0 20px
  button-secondary-gold:
    backgroundColor: transparent
    textColor: "{colors.accent}"
    typography: "{typography.label-md}"
    padding: 6px 0
  button-secondary-light:
    backgroundColor: transparent
    textColor: "#FFFFFFBF"
    typography: "{typography.label-md}"
    padding: 6px 0
  button-secondary-dark:
    backgroundColor: transparent
    textColor: "{colors.primary-dark}"
    typography: "{typography.label-md}"
    padding: 6px 0
  section-label:
    textColor: "{colors.accent-saturated}"
    typography: "{typography.label-caps}"
  trust-pill:
    backgroundColor: "#FFFFFF10"
    textColor: "#FFFFFF80"
    rounded: "{rounded.pill}"
    typography: "{typography.label-sm}"
    padding: 5px 12px
  card:
    backgroundColor: "{colors.neutral}"
    rounded: "{rounded.md}"
    padding: 24px
  input:
    backgroundColor: "{colors.neutral-alt}"
    textColor: "{colors.text}"
    rounded: "{rounded.sm}"
    typography: "{typography.body-md}"
    height: 44px
    padding: 0 14px
---

# Traverso International Foods — Design System

## Overview

Traverso International Foods es la division exportadora de Traverso SA, fabrica chilena de vinagre con mas de 130 anos de trayectoria. El sitio web es un brochure B2B dirigido a industrias, distribuidores, importadores, retail y canal horeca en mercados internacionales.

La estetica busca transmitir **industrial elegante, corporativo, limpio y confiable**. No es una marca local, ni retail, ni foodie. Es una empresa exportadora con escala, trazabilidad y estandares internacionales (BRC GS "AA", autorizacion Marca Chile ProChile).

El sistema visual combina tres registros tipograficos — una **serif editorial** (Libre Baskerville) para titulares con peso heritage, una **sans contemporanea** (Source Sans 3) para cuerpo y UI, y una **mono tecnica** (Courier New) para eyebrows y datos de certificacion. Esta combinacion levanta el tono sobre el commodity tipico del sector (ver Acetomilano como referencia de exito).

La paleta es sobria: un **azul Traverso profundo** como identidad principal, con **dorado calido** como unico acento. Blancos y neutros calidos para aire. Evita rojos institucionales y verdes que envejecen el sitio.

**Pauta fotografica:** luz natural o industrial controlada, sensacion de escala y orden, personas reales en accion (nunca posadas tipo banco de imagenes), tonos frios dominantes. Evitar estetica foodie, artesanal, Instagram o retail local.

## Colors

La paleta oficial fue consolidada el 2026-04-23 por Sergio (Director de Arte / Desarrollo) con validacion del cliente. Los 7 colores base son la unica fuente para todo el sitio, papeleria y comunicaciones internacionales.

- **Primary (#0B1E6B):** Azul Traverso profundo. Identidad principal, fondos hero, headers, tipografia de titulares sobre neutros.
- **Primary-dark (#081450):** Azul marino intenso. Footer, hover states, fondos de enfasis maximo, CTAs primarios sobre neutros claros.
- **Accent (#C5A55A):** Dorado calido. Unico color de llamado. Se usa exclusivamente en CTAs primarios sobre fondos oscuros. Evoca la historia y el caracter premium sin caer en brillo saturado.
- **Accent-saturated (#C9A227):** Dorado mostaza mas saturado. Reservado para eyebrows, section-labels y detalles tipograficos tecnicos en mono. No para botones ni fondos.
- **Neutral (#FBF9FA):** Off-white calido. Fondo de pagina principal. Alternativa moderna al blanco puro, mas calido y menos clinico.
- **Neutral-alt (#F2F4F8):** Gris frio muy claro. Fondos alternos entre secciones para marcar ritmo sin agregar color.
- **Text (#19212F):** Gris oscuro azulado. Color de texto principal sobre fondos claros. Oficialmente reemplaza al `#1A1A2E` anterior para complementar mejor con el dorado.

Tokens derivados para textos secundarios (`text-muted`, `text-subtle`) son propuestas iniciales pendientes de validacion WCAG AA definitiva con Sergio. Objetivo: conseguir el "gris perfecto" con maximo contraste sobre cada fondo.

**Colores eliminados del sistema** (NO usar): `#DE8B73` (coral), `#7EB4AE` (verde agua), `#1A2D8A` (azul medio), `#1A1A2E` (text antiguo). Si aparecen en codigo existente, reemplazar.

## Typography

El stack tipografico combina tres familias con roles distintos:

- **Libre Baskerville** (serif, Google Fonts): Todos los titulares. Aporta peso heritage, lectura editorial y tono gourmet/exportacion premium. Usada en 700 regular/bold, con ligeros ajustes negativos de letterSpacing para titulares grandes.
- **Source Sans 3** (sans, Google Fonts): Cuerpo, UI, formularios, navegacion. Sans contemporanea con excelente legibilidad en largas lecturas B2B y formularios extensos.
- **Courier New** (mono, system font): Eyebrows, section labels, stats numericos y datos de certificacion (BRC AA, HACCP, anos). Textura tecnica que refuerza la identidad industrial sin ser disruptiva.

Escala compacta: 9 niveles tipograficos cubren todo el sitio. Los tamanos estan expresados en px base para desktop; en implementacion CSS se aplica `clamp()` para fluidez responsiva.

- **display (56px):** Solo H1 del hero. Un unico H1 por pagina.
- **headline-lg (44px):** H2 de secciones principales en home.
- **headline-md (24px):** H3 de subsecciones, titulos de cards, titulos de productos.
- **body-lg (18px):** Lead text del hero, parrafos destacados de Quienes Somos.
- **body-md (16px):** Cuerpo general, parrafos largos.
- **body-sm (14px):** Texto de apoyo, descripciones cortas, footnotes.
- **label-caps (11px + 0.2em):** Eyebrows sobre titulares, todo en mayusculas con tracking amplio. Siempre en Courier New dorado.
- **label-md (12px):** Texto de botones, tags, chips.
- **label-sm (10px):** Etiquetas de stats, categorias mini, pill pequeno.

La familia `Playfair Display` mencionada en notas antiguas **no forma parte del sistema**. No usar.

## Layout

Mobile-first con breakpoint principal en 640px y ajustes menores en 768px y 1024px. Padding lateral fluido de `clamp(24px, 5vw, 48px)`. Escala de espacios basada en multiplos de 4px para micro-ajustes y 8px para ritmo general. Secciones principales respetan un spacing vertical de ~112px en desktop (colapsable a ~64px en mobile).

Ritmo por alternancia de fondo: cada seccion principal alterna entre `neutral` (`#FBF9FA`) y `neutral-alt` (`#F2F4F8`) para marcar separacion sin bordes ni lineas.

### Tres tiers de ancho de modulo (consolidado 2026-04-26)

El sitio combina tres anchos de container, no uno solo. Esto refleja el cambio de filosofia visual hacia un registro de **plataforma institucional** (tipo ONU, fundaciones, gobierno, consultoria top) — donde los modulos clave amplian su ancho para reforzar la sensacion de documento de referencia, no de landing SaaS.

| Tier | Max-width | Donde se usa | Sensacion |
|---|---|---|---|
| **default** | `1200px` | Productos individuales, contacto, footer, secciones estandar | Compacto · sitio web tradicional |
| **wide** | `min(1400px, 94vw)` | Hero bottom-row, modulo "Productos", modulo **"Seis pilares"** (value-props), modulos institucionales con sticky sidebar | Plataforma multilateral · whitepaper digital · reporte institucional |
| **extra** | `min(1500px, 94vw)` | Modulo "Quienes Somos" (about) — unico modulo que cruza el cap normal del sitio | Heritage · seccion narrativa especial |

**Regla de aplicacion:**
- Si el modulo tiene **sticky sidebar + indice de navegacion + bloques verticales largos** (research-cards-blancas-pilares), usa **wide** (`1400px`).
- Si el modulo tiene **fotografia full-bleed o video reveal cruzado entre cards**, usa **wide** o **extra**.
- Si es contenido tabular o listado simple, usa **default** (`1200px`).
- En pantallas ultrawide (>1500px), todos los tiers wide/extra se limitan a `94vw` para mantener aire lateral.

Esta jerarquia corresponde con la investigacion documentada en [[2026-04-26 Research Cards Blancas Pilares]] (vault Obsidian) — referentes UN-style, fundaciones tier-1, government design systems.

### Polo institucional · "plataforma multilateral"

A partir de 2026-04-26, los modulos clave del index.html adoptan deliberadamente el lenguaje de plataforma institucional internacional (referentes: GOV.UK, ONU, UNESCO, OECD, Wellcome Trust, Open Society Foundations, Ford Foundation, McKinsey, BCG, Mellon/Pentagram). Caracteristicas:

- **Ancho amplio (1400px)** que rompe con el formato landing SaaS estandar
- **Sticky sidebar con indice navegable** clickable (scroll suave + active state via IntersectionObserver)
- **Bloques verticales largos separados por hairline 1px** color `rgba(11,30,107,.10-.18)` — nunca cards con border + radius + shadow
- **Numeracion como cláusula** (`§ Pilar 01`, `01 · Norma`, `Capítulo 03 · Producto`) — lenguaje de articulo/documento
- **Triangulo tipografico**: serif heritage (Libre Baskerville) en titulares regulares (peso 400 ó 700, NO bold por defecto) + sans contemporanea (Source Sans 3) en cuerpo + mono tecnica (Courier New) en eyebrows
- **Sin contenedores cuadrados** — el ancho amplio + whitespace + hairline reemplazan la "card-box" tradicional

Este polo es el correcto para Traverso (130+ años, exportador chileno, competidor directo de Cargill/ADM/Bunge en cuadrante institucional).

Anti-patrones a evitar en estos modulos:
- Border + corner-radius + box-shadow tipo SaaS
- Iconos coloridos / ilustraciones decorativas
- Animaciones de entrada por card individual (las instituciones no animan sus principios)
- Color de background en cards (gold tinte 5%, navy tinte 5%, etc.)
- Mas de 4 columnas de cards en desktop
- Headlines en mayusculas todo (solo eyebrows en caps)

## Elevation & Depth

**Sistema plano, sin sombras pesadas.** La profundidad se logra mediante:

- Alternancia de fondos (neutral vs neutral-alt)
- Tipografia de mayor peso visual (serif editorial en titulares)
- Contraste de fondo oscuro (primary, primary-dark) vs fondos claros
- Sombras minimales solo en cards con hover state, nunca de base

Sombras permitidas (sutiles, para hover de cards o dropdowns):
- `shadow-sm`: `0 1px 3px rgba(11, 30, 107, 0.08)` — hover cards, inputs focus
- `shadow-md`: `0 4px 16px rgba(11, 30, 107, 0.12)` — dropdowns, menus desplegados
- `shadow-lg`: `0 12px 40px rgba(11, 30, 107, 0.16)` — modales, overlays

Las sombras siempre usan el azul primary como base rgba, nunca negro puro. Esto mantiene coherencia cromatica con el sistema.

## Shapes

Lenguaje de formas **limpio y minimal**, con esquinas ligeramente redondeadas para modernidad sin perder seriedad B2B.

- **rounded-sm (4px):** Botones, inputs, cards pequenas, tags. Estandar de la mayoria de elementos interactivos.
- **rounded-md (8px):** Cards grandes, contenedores de producto, modales.
- **rounded-pill (20px):** Trust pills (BRC AA, HACCP), chips de filtro.
- **rounded-full (9999px):** Botones circulares (autoguardado, avatares si aplica), iconografia circular.

No usar esquinas completamente rectas (0px) excepto en el frame cinematografico del hero, que por diseno usa aspect ratio 3.5:1 sin border-radius para acentuar su cualidad editorial-cinematografica.

## Components

### Botones (4 tiers)

El sistema de botones se implemento el 2026-04-15 y esta aprobado. Se organiza en 4 tiers:

**Tier 1 · Primary CTA (36px altura):** Botones solidos para accion principal. 5 variantes segun contexto:
- `button-primary-gold`: dorado sobre fondos oscuros (hero, footer)
- `button-primary-dark`: azul profundo sobre fondos claros (forms, CTAs en secciones claras)
- `button-outline`: transparente con borde blanco sobre oscuros (secundario elegante sobre hero)
- `button-ghost`: transparente gris para acciones cancelar/dismiss
- `button-slate`: gris oscuro para forms neutros (opcional, uso limitado)

**Tier 2 · Secondary underline:** Botones texto con underline que aparece en hover, flecha opcional al final. 3 variantes por fondo: `gold` (sobre oscuro), `light` (sobre oscuro, mas sutil), `dark` (sobre claro). Transicion de underline de 300ms ease.

**Tier 3 · Download / accent-line:** CTAs especiales con icono de descarga o flecha de envio. Para "Solicitar muestra" y descargas de brochures.

**Tier 4 · Chips filtros:** Botones pequenos redondeados tipo pill para filtrar categorias de productos.

### Section Label (Eyebrow)

Texto pequeno en mono dorado (`accent-saturated`), todo mayusculas con tracking de 0.2em, opcionalmente flanqueado por lineas decorativas `—` en los costados. Se usa sobre titulares H1/H2 para dar jerarquia y textura tecnica.

### Trust Pill

Pills pequenos semitransparentes usados para mostrar certificaciones sobre fondos oscuros (hero principalmente). Fondo `rgba(255,255,255,0.06)`, borde sutil, texto mayusculas. Reemplazables por logos oficiales cuando esten disponibles.

### Card

Contenedor generico de contenido. Fondo `neutral` puro con borde sutil `border-light`. Padding de 24px interior. Radius 8px. Hover opcional con `shadow-sm` y transicion de 200ms.

### Input

Campos de formulario altura 44px, fondo `neutral-alt`, borde que se oscurece en focus, tipografia `body-md`. Placeholder en `text-subtle`.

## Do's and Don'ts

**Do:**
- Usa un unico H1 por pagina, siempre en `display` serif
- Aplica `accent` (dorado calido) solo como color de llamado — un uso por sección, nunca mas de un CTA en dorado por pantalla visible
- Usa `accent-saturated` (dorado mostaza) exclusivamente para eyebrows, section-labels, y tipografia mono
- Mantén contraste WCAG AA minimo 4.5:1 para texto normal, 3:1 para texto grande
- Alterna fondos `neutral` y `neutral-alt` entre secciones para ritmo
- Respeta la pauta fotografica: personas reales en accion, tonos frios, industrial elegante
- Usa Libre Baskerville solo para titulares; nunca para cuerpo
- Aplica `clamp()` en tipografia para responsive fluido

**Don't:**
- No uses coral (`#DE8B73`) ni verde agua (`#7EB4AE`) — estan fuera del sistema
- No uses sombras negras; siempre base rgba del primary
- No mezcles rounded-sm con rounded-pill en la misma vista (excepto pills de certificacion)
- No apliques efectos glow, neon o gradients saturados — contradicen el tono industrial elegante
- No uses fotos foodie, artesanales, lifestyle emocional o posados banco de imagenes
- No pongas dorado sobre dorado ni azul sobre azul — respeta contraste
- No agregues nuevos pesos de fuente sin validar; solo usa los ya definidos (400, 500, 600, 700)
- No uses mas de dos familias tipograficas por pantalla visible (serif + sans, o sans + mono)
- No inventes tokens de color nuevos — si falta uno, se agrega aca primero, despues al CSS
