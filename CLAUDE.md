# Traverso International Foods — notas del proyecto

## Stack

- HTML / CSS / JS vanilla + GSAP + ScrollTrigger
- Backend admin: PHP (ver `admin/`)
- Datos editables en JSON (`data/`) cargados dinámicamente vía `js/collections-loader.js` y `js/content-loader.js`
- Dev server local: `python3 -m http.server 8080` (config en `.claude/launch.json`)

## Sistema de diseño

Ver `DESIGN.md` para el sistema completo. Resumen:

- Paleta oficial (consolidada 2026-04-23): navy `#0B1E6B` / primary-dark `#081450` / accent gold `#C5A55A` / accent-saturated `#C9A227` / neutral `#FBF9FA` / neutral-alt `#F2F4F8` / text `#19212F`
- Tipografía: Libre Baskerville (titulares) + Source Sans 3 (cuerpo) + Courier New (eyebrows/mono/labels)
- Polo editorial / legado (Pentagram, Work&Co), nunca craft experimental
- No usar coral `#DE8B73`, verde `#7EB4AE`, azul medio `#1A2D8A`, `#1A1A2E` — eliminados

## Estructura del proyecto

```
Traverso/
├── index.html, productos.html, quienes-somos.html, contacto.html  ← SITIO real
├── admin/, assets/, data/, js/, img/                              ← Producción
├── RECURSOS GENERALES/                                            ← Materiales del cliente
├── CLAUDE.md, DESIGN.md, design.tokens.json                       ← Documentación
└── _pruebas/                                                      ← Sandbox (ver README dentro)
    ├── inicio1-4.html                ← Variantes hero para review cliente
    ├── pru<componente>.html          ← Prototipos 10-20 variantes
    ├── *-backup-*.html               ← Backups self-contained pre-cambio
    ├── research-*.html               ← Investigaciones HTML micro-site
    └── test*.html                    ← Sandbox general
```

Reorganización 2026-04-26: todo lo que no es producción se movió a `_pruebas/` con su README.

## Flujo de trabajo

- Iteración por variantes en archivos sandbox dentro de `_pruebas/` (`test.html`, `prufoot.html`, etc.)
- Crear 10–20 variantes, cliente elige, se aplica al archivo final de la raíz
- No GSAP ScrollTrigger en archivos sandbox — rompe en preview tool
- Mantener textos exactos del sitio al iterar variantes
- Asset paths dentro de `_pruebas/`: usar `../assets/`, `../js/`, `../data/` (subir un nivel)

## Regla "aplicar lo elegido"

> Cuando el cliente elige una propuesta de un archivo de pruebas (`pruquienes.html`, `prumenu.html`, `pruprod*.html`, etc.) para aplicar al sitio real:
>
> 1. **Replicar la propuesta IDÉNTICA visualmente** — sin "mejorar", "simplificar" o "adaptar" sobre la marcha. Si la propuesta tiene videos, lleva videos. Si tiene una zona dorada, lleva la zona dorada. Si tiene 5 panels con assets distintos, lleva 5 panels con assets distintos.
> 2. **Después de aplicar al sitio real, sincronizar la propuesta del archivo de pruebas con la implementación real** — para que ambas siempre coincidan visualmente. La propuesta funciona como referencia visual del estado del módulo.
> 3. **Sin "demos simplificados"** — si la propuesta tenía solo §02 visible como ejemplo, al aplicarla incluir los 5 (o N) estados completos. Si la propuesta tenía un placeholder ▶, al aplicarla cargar el video real.
> 4. **Copy idéntico** — los textos del módulo elegido deben ser exactamente los del sitio actual (titles, descriptions, leads, CTAs). No inventar marketing copy ni abreviar.

No es tan difícil — propuesta elegida = implementación 1:1. Cualquier desviación rompe la confianza en el flujo de pruebas.

## Archivos template / respaldo

Cuando se reemplaza un componente grande (footer, hero, etc.), guardar respaldo self-contained como `<componente>-backup-<nombre-estilo>.html` en la raíz. Ejemplo vigente:

- `footer-backup-tabasco-b2b.html` — footer Tabasco B2B Style (vigente hasta 2026-04-23, reemplazado por v09 Hybrid editorial)

## Atributos dinámicos del admin

Al editar/reemplazar componentes, preservar:

- `data-content="<key>"` — contenido editable desde admin (loader en `js/content-loader.js`)
- `data-collection="<nombre>"` — colecciones renderizadas dinámicas (loader en `js/collections-loader.js`)

## Notas en vault

Los cambios grandes se documentan también en Obsidian:
`01 - Clientes/Traverso International Foods/Proyectos/Web y Marca Traverso International/YYYY-MM-DD <cambio>.md`

Para que Axel (y Rodrigo / Gonzalo) tengan contexto si entran a trabajar en el repo.
