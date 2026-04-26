# Traverso International Foods — Sitio web

Sitio brochure B2B de la división internacional de **Traverso International Foods**, exportador chileno de alimentos con 130+ años de historia. Estética **editorial / institucional / plataforma multilateral** (referente UN/Pentagram/Mellon).

**Producción:** [traversointernational.com](https://traversointernational.com)

---

## Stack

- **Frontend:** HTML / CSS / JS vanilla
- **Animación:** [GSAP 3.13](https://gsap.com) + ScrollTrigger + SplitText
- **Backend admin:** PHP (en `admin/` — requiere Apache + PHP 7.4+)
- **Datos editables:** JSON cargados dinámicamente por:
  - `js/content-loader.js` — campos individuales (`data-content="key"`)
  - `js/collections-loader.js` — colecciones (productos, redes, certificaciones)
- **Servidor dev local:** `python3 -m http.server 8080` (incluido como `serve.py`)

---

## Estructura

```
Traverso/
├── index.html                  ← Home
├── productos.html              ← Catálogo
├── quienes-somos.html          ← About
├── contacto.html               ← Form de contacto
│
├── assets/                     ← Imágenes, videos, logos optimizados (web)
│   ├── videos/                 ← Hero (1.3 MB) + cards (2.3 MB / 777 KB)
│   ├── imgsel/                 ← Fotos seleccionadas para exportación
│   └── *.webp / *.jpg          ← Productos, planta, equipo
│
├── data/                       ← JSON editables vía admin
│   ├── site_content.json       ← Copy del sitio (titulares, leads)
│   ├── productos.json          ← Catálogo
│   ├── certificaciones.json
│   ├── trust_items.json
│   ├── pilares.json
│   ├── brand.json
│   ├── seo.json
│   ├── canales_contacto.json
│   ├── redes_sociales.json
│   └── integraciones.json
│
├── js/
│   ├── content-loader.js       ← Lee data-content y reemplaza por JSON
│   ├── collections-loader.js   ← Lee data-collection y renderiza listas
│   └── *.js
│
├── img/                        ← Imágenes auxiliares (uploads admin)
│
├── admin/                      ← (no en repo público) Panel PHP de edición
│
├── _pruebas/                   ← Sandbox de prototipos
│   ├── pruvalor.html / pruvalor2.html / pruprod3.html / pruform.html / prufoot3.html
│   ├── inicio1-4.html          ← Variantes de hero
│   ├── *-backup-*.html         ← Backups self-contained pre-cambio
│   ├── research-*.html         ← Investigaciones HTML micro-site
│   └── README.md
│
├── CLAUDE.md                   ← Instrucciones para Claude Code (workflow del proyecto)
├── DESIGN.md                   ← Sistema de diseño completo (paleta, tipografía, layout)
├── design.tokens.json          ← Tokens del design system
├── .htaccess                   ← Apache: rewrites + cache + gzip
└── serve.py                    ← Wrapper helper para correr server local
```

---

## Cómo correr local

```bash
# Server estático puro (recomendado para frontend)
python3 -m http.server 8080
# → http://localhost:8080

# Si necesitás el admin PHP (gestion-contenido):
# Levantar con MAMP/XAMPP/PHP built-in server apuntando a esta carpeta
php -S localhost:8000
# → http://localhost:8000/gestion-contenido/
```

---

## Sistema de diseño

Ver [`DESIGN.md`](./DESIGN.md) para spec completa. Resumen:

- **Paleta:** navy `#0B1E6B` / primary-dark `#081450` / accent gold `#C5A55A` / accent-saturated `#C9A227` / neutral `#FBF9FA` / neutral-alt `#F2F4F8` / text `#19212F`
- **Tipografía:** Libre Baskerville (titulares) + Source Sans 3 (cuerpo) + Courier New (eyebrows/mono)
- **Polo:** editorial / institucional / plataforma multilateral (UN / Pentagram / Mellon Foundation tier)
- **Container:** `--container-institutional: min(1500px, 94vw)` para hero bottom-row, value-props, about, products, footer

---

## Workflow

Las propuestas / iteraciones de cada módulo viven en `_pruebas/` siguiendo la convención `pru<componente>.html`. Cuando el cliente elige una variante, se aplica al archivo de producción **1:1** y se sincroniza la propuesta del sandbox con la implementación real (ver regla "aplicar lo elegido" en `CLAUDE.md`).

---

## Notas para nuevos devs

- **No editar archivos de `_pruebas/` creyendo que es el sitio real.** Las páginas de producción son las 4 de la raíz.
- **Asset paths dentro de `_pruebas/`:** usar `../assets/`, `../js/`, `../data/` (subir un nivel).
- **Atributos del admin a preservar al editar HTML:**
  - `data-content="<key>"` — contenido editable
  - `data-collection="<nombre>"` — colecciones renderizadas
  - `data-content-attr-href="<key>"` — atributos editables
- **Animaciones GSAP:** los elementos arrancan visibles por CSS; GSAP los oculta solo si carga (`html.js-anim`). Si CDN falla, el contenido sigue accesible.

---

## Archivos sensibles (no comiteados, ver `.gitignore`)

- `data/users.json` — usuarios admin con password bcrypt
- `data/_login_attempts.json` — log de intentos de login
- `data/leads.json` — formularios recibidos
- `data/backups/` — snapshots automáticos
- `RECURSOS GENERALES/` — materiales originales del cliente (.docx, fotos raw)
- `.claude/` — config local de Claude Code

---

## Licencia

Proyecto privado · WBA Estudio Creativo — Traverso International Foods · 2026
