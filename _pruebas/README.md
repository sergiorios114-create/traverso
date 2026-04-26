# `_pruebas/` — sandbox del proyecto Traverso

Carpeta para todo lo que **no es parte del sitio en producción**: pruebas, prototipos de variantes, backups de componentes anteriores, e investigaciones.

Las páginas reales del sitio están en la raíz: `index.html`, `productos.html`, `quienes-somos.html`, `contacto.html`.

---

## Inventario

### Backups de componentes (snapshots self-contained antes de reemplazos)

| Archivo | Qué respalda | Reemplazado por |
|---|---|---|
| `about-backup-pre-v12.html` | Módulo "Quiénes Somos" con grid 2x2 + reveal cruzado por adyacencia geométrica | V12 Sidebar + Viewer (2026-04-26) |
| `header-backup-pre-v19.html` | Header sin heritage badge "Est. 1893" | V19 con badge inline |
| `footer-backup-tabasco-b2b.html` | Footer Tabasco B2B Style | v09 Hybrid editorial (2026-04-23) |
| `footer-backup-hybrid-editorial.html` | Snapshot footer Hybrid editorial | — vigente |
| `trust-backup-stats-centered.html` | Trust bar con stats centrados | versión actual con underline accent |

### Variantes de homepage para revisión cliente (hero alternativos)

- `inicio1.html` — Hero #15 Full Photo
- `inicio2.html` — Hero V31 Modern B2B (era el index hasta el swap del 15/04)
- `inicio3.html` — Hero #17 Centered Elegant
- `inicio4.html` — Hero variante 4

> El `index.html` real usa Hero #40 Cinema Full Width. Las 4 variantes están linkeadas desde el dropdown "Inicio" del header para que el cliente las compare.

### Prototipos de iteración (10-20 variantes por componente)

Convención: `pru<componente>.html` con N variantes para que el cliente elija una y se aplique al sitio real.

- `prucert.html` — variantes de certificaciones
- `prufoot.html`, `prufoot2.html` — variantes footer
- `prumenu.html` — 20 propuestas de menú B2B
- `pruprod.html`, `pruprod2.html` — variantes módulo productos (40+ variantes total)
- `pruquienes.html` — 20 propuestas Quiénes Somos · 5 familias del research

### Investigaciones (HTML micro-sites)

- `research-traverso.html` — research inicial sobre la marca Traverso
- `research-layouts-cards-b2b.html` — catálogo de 20 layouts B2B con N tarjetas (también guardado canónicamente en el vault `03 - Conocimiento/Diseño/Investigaciones/`)

### Tests

- `test.html`, `test2.html` — sandbox general
- `test-boton.html` — sistema de botones B2B (4 tiers definidos 15/04)
- `propuestas-diseno-secciones.html` — early proposals

### Datos

- `traverso-research-sergio.json` — datos de investigación inicial (referencia)

---

## Convenciones

- **No editar archivos de _pruebas/ creyendo que estás editando el sitio.** Las páginas reales son las 4 en la raíz.
- **Cuando el cliente elige una variante**, aplicarla al archivo de producción + sincronizar la propuesta en _pruebas/ con la implementación real (regla "aplicar lo elegido" de `CLAUDE.md`).
- **Backups nuevos**: nombrar `<componente>-backup-pre-<cambio>.html` antes de reemplazar.
- **Asset paths**: dentro de _pruebas/ usar `../assets/`, `../js/`, etc. (subir un nivel).

---

Última reorganización: 2026-04-26
