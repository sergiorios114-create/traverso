/**
 * collections-loader.js — Renderiza colecciones dinámicas.
 * Busca contenedores con data-collection="nombre" y puebla items usando un template.
 */
(function() {
    'use strict';

    function getLang() {
        return window.TRAVERSO_LANG || 'es';
    }

    function fetchJson(url) {
        return fetch(url + '?v=' + Date.now(), { cache: 'no-store' })
            .then(function(r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); });
    }

    var COLLECTIONS = {
        productos:       'data/productos.json',
        certificaciones: 'data/certificaciones.json',
        trust_items:     'data/trust_items.json',
        pilares:         'data/pilares.json',
        canales_contacto:'data/canales_contacto.json',
        redes_sociales:  'data/redes_sociales.json'
    };

    function esc(s) {
        if (s == null) return '';
        return String(s).replace(/[&<>"']/g, function(m) {
            return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];
        });
    }

    /* Convierte nombre de ícono (Feather/Lucide) o emoji a representación visual */
    var ICON_EMOJI = {
        'certificate': '★', 'shield': '🛡', 'calendar': '📅', 'clock': '🕐',
        'package': '📦', 'tag': '🏷', 'star': '★', 'check': '✔', 'globe': '🌐',
        'truck': '🚚', 'mail': '✉', 'phone': '📞', 'map-pin': '📍', 'whatsapp': '💬',
        'instagram': '📷', 'facebook': 'f', 'linkedin': 'in', 'youtube': '▶',
        'award': '🏆', 'users': '👥', 'settings': '⚙', 'zap': '⚡', 'heart': '♥'
    };
    function iconGlyph(name) {
        if (!name) return '•';
        if (name.length <= 4 && /\p{Emoji}/u.test(name)) return name; // ya es emoji
        return ICON_EMOJI[name.toLowerCase()] || '•';
    }

    /**
     * Renderizadores por colección — devuelven HTML de un item.
     * Cada contenedor del HTML puede definir su propio template vía data-template="nombre"
     * o usar el default de aquí abajo.
     */
    var RENDERERS = {
        productos: function(item, lang) {
            var titulo = item['titulo_' + lang] || item.titulo_es || '';
            var desc   = item['descripcion_' + lang] || item.descripcion_es || '';
            var tag    = item['tag_' + lang] || item.tag_es || '';
            var variantes = item['variantes_' + lang] || item.variantes_es || [];
            var formatos  = item['formatos_' + lang] || item.formatos_es || [];
            var variantesHtml = variantes.map(function(v) { return '<span class="product-card__variant">' + esc(v) + '</span>'; }).join('');
            var formatosHtml  = formatos.map(function(f) { return '<span class="product-card__format">' + esc(f) + '</span>'; }).join('');
            return '<article class="product-card">' +
                (item.imagen ? '<img class="product-card__img" src="' + esc(item.imagen) + '" alt="' + esc(titulo) + '" loading="lazy">' : '') +
                '<div class="product-card__body">' +
                    (tag ? '<span class="product-card__tag">' + esc(tag) + '</span>' : '') +
                    '<h3 class="product-card__title">' + esc(titulo) + '</h3>' +
                    (desc ? '<p class="product-card__desc">' + esc(desc) + '</p>' : '') +
                    (variantesHtml ? '<div class="product-card__variants">' + variantesHtml + '</div>' : '') +
                    (formatosHtml ? '<div class="product-card__formats">' + formatosHtml + '</div>' : '') +
                '</div>' +
            '</article>';
        },
        /* Variante Carousel — genera cards para slider */
        productos_carousel: function(item, lang) {
            var titulo = item['titulo_' + lang] || item.titulo_es || '';
            var variantes = item['variantes_' + lang] || item.variantes_es || [];
            var formatos  = item['formatos_' + lang] || item.formatos_es || [];
            var pillsHtml = variantes.map(function(v) {
                return '<span class="products__pill products__pill--gold">' + esc(v) + '</span>';
            }).join('');
            pillsHtml += formatos.map(function(f) {
                return '<span class="products__pill products__pill--outline">' + esc(f) + '</span>';
            }).join('');
            return '<div class="products__thumb" data-product-id="' + esc(item.id) + '">' +
                (item.imagen ? '<img class="products__thumb-img" src="' + esc(item.imagen) + '" alt="' + esc(titulo) + '" loading="lazy">' : '') +
                '<div class="products__thumb-body">' +
                    '<div class="products__thumb-title">' + esc(titulo) + '</div>' +
                    (pillsHtml ? '<div class="products__thumb-pills">' + pillsHtml + '</div>' : '') +
                '</div>' +
            '</div>';
        },
        /* Variante D para index.html — Featured hero + small cards con pills */
        productos_home: function(item, lang) {
            var titulo = item['titulo_' + lang] || item.titulo_es || '';
            var desc   = item['resumen_' + lang] || item['descripcion_' + lang] || item.descripcion_es || '';
            var tag    = item['tag_' + lang] || item.tag_es || '';
            var variantes = item['variantes_' + lang] || item.variantes_es || [];
            var formatos  = item['formatos_' + lang] || item.formatos_es || [];
            var pillsHtml = variantes.map(function(v) {
                return '<span class="product-card__pill product-card__pill--gold">' + esc(v) + '</span>';
            }).join('');
            pillsHtml += formatos.map(function(f) {
                return '<span class="product-card__pill product-card__pill--outline">' + esc(f) + '</span>';
            }).join('');
            return '<article class="product-card">' +
                (item.imagen ? '<img class="product-card__img" src="' + esc(item.imagen) + '" alt="' + esc(titulo) + '" loading="lazy">' : '') +
                '<div class="product-card__body">' +
                    (tag ? '<span class="product-card__tag">' + esc(tag) + '</span>' : '') +
                    '<h3 class="product-card__title">' + esc(titulo) + '</h3>' +
                    (desc ? '<p class="product-card__desc">' + esc(desc) + '</p>' : '') +
                    (pillsHtml ? '<div class="product-card__pills">' + pillsHtml + '</div>' : '') +
                '</div>' +
            '</article>';
        },
        certificaciones: function(item, lang) {
            var titulo = item['titulo_' + lang] || item.titulo_es || '';
            var desc   = item['descripcion_' + lang] || item.descripcion_es || '';
            return '<article class="value-card value-card--' + esc(item.icono || 'shield') + '">' +
                '<div class="value-card__icon" data-icon="' + esc(item.icono || 'shield') + '"></div>' +
                '<h3 class="value-card__title">' + esc(titulo) + '</h3>' +
                '<p class="value-card__desc">' + esc(desc) + '</p>' +
            '</article>';
        },
        trust_items: function(item, lang) {
            var texto    = item['texto_' + lang] || item.texto_es || '';
            var numero   = item.numero || '';
            return '<div class="trust__item">' +
                (numero ? '<div class="trust__item-num">' + esc(numero) + '</div>' : '') +
                '<span class="trust__item-text">' + esc(texto) + '</span>' +
            '</div>';
        },
        pilares: function(item, lang) {
            var titulo = item['titulo_' + lang] || item.titulo_es || '';
            var desc   = item['descripcion_' + lang] || item.descripcion_es || '';
            return '<div class="diff-item">' +
                '<div class="diff-item__dot"></div>' +
                '<h4>' + esc(titulo) + '</h4>' +
                '<p>' + esc(desc) + '</p>' +
            '</div>';
        },
        /* Variante para index.html — Variant E: num-tag + title + desc corto */
        pilares_home: function(item, lang) {
            var titulo = item['titulo_' + lang] || item.titulo_es || '';
            var desc   = item['resumen_' + lang] || item.resumen_es || item['descripcion_' + lang] || item.descripcion_es || '';
            var num    = item.numero || '';
            return '<div class="value-item">' +
                (num ? '<div class="value-item__num">' + esc(num) + '</div>' : '') +
                '<h3 class="value-item__title">' + esc(titulo) + '</h3>' +
                '<p class="value-item__text">' + esc(desc) + '</p>' +
            '</div>';
        },
        /* Variante para about diffs en index.html */
        pilares_about: function(item, lang) {
            var titulo = item['titulo_' + lang] || item.titulo_es || '';
            var desc   = item['descripcion_' + lang] || item.descripcion_es || '';
            return '<div class="about__diff-item">' +
                '<div class="about__diff-dot"></div>' +
                '<h4>' + esc(titulo) + '</h4>' +
                '<p>' + esc(desc) + '</p>' +
            '</div>';
        },
        canales_contacto: function(item, lang) {
            var label    = item['label_' + lang] || item.label_es || '';
            var subtitulo= item['subtitulo_' + lang] || item.subtitulo_es || '';
            var valor    = item.valor || '';
            var link     = item.link || '';
            var valorHtml = link ? '<a href="' + esc(link) + '">' + esc(valor) + '</a>' : esc(valor);
            return '<article class="contact-card contact-card--' + esc(item.tipo || '') + '">' +
                '<div class="contact-card__icon" data-icon="' + esc(item.icono || '') + '"></div>' +
                '<div class="contact-card__body">' +
                    '<span class="contact-card__label">' + esc(label) + '</span>' +
                    '<span class="contact-card__value">' + valorHtml + '</span>' +
                    '<span class="contact-card__sub">' + esc(subtitulo) + '</span>' +
                '</div>' +
            '</article>';
        },
        /* Variante para la grilla de datos en contacto.html (clases .contact-data__card) */
        canales_contacto_grid: function(item, lang) {
            var label    = item['label_' + lang] || item.label_es || '';
            var subtitulo= item['subtitulo_' + lang] || item.subtitulo_es || '';
            var valor    = item.valor || '';
            var link     = item.link || '';
            var icono    = (item.icono || item.tipo || '').toLowerCase();
            var svgIconMap = {
                'map-pin':      '<svg viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',
                'mail':         '<svg viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
                'phone':        '<svg viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>',
                'message-circle':'<svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>',
                'whatsapp':     '<svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>',
                'clock':        '<svg viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
            };
            var svgIcon = svgIconMap[icono] || '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>';
            var valorHtml = link
                ? '<a href="' + esc(link) + '" class="contact-data__value" style="color:var(--color-primary);">' + esc(valor) + '</a>'
                : '<span class="contact-data__value">' + esc(valor) + '</span>';
            return '<div class="contact-data__card">' +
                '<div class="contact-data__icon">' + svgIcon + '</div>' +
                '<span class="contact-data__label">' + esc(label) + '</span>' +
                valorHtml +
                (subtitulo ? '<span class="contact-data__sub">' + esc(subtitulo) + '</span>' : '') +
            '</div>';
        },
        redes_sociales: function(item, lang) {
            var plat = (item.plataforma || item.icono || '').toLowerCase();
            var svgMap = {
                'facebook':  '<svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>',
                'instagram': '<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
                'whatsapp':  '<svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>',
                'linkedin':  '<svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>',
                'youtube':   '<svg viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.41 19.08C5.12 19.54 12 19.54 12 19.54s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 11.75a29 29 0 00-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>'
            };
            var svg = svgMap[plat] || '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>';
            return '<a href="' + esc(item.url) + '" class="footer__social-link" ' +
                'target="_blank" rel="noopener" aria-label="' + esc(item.label || '') + '">' +
                svg +
            '</a>';
        }
    };

    function renderCollection(container, items, lang) {
        var name = container.getAttribute('data-collection');
        var variant = container.getAttribute('data-collection-variant') || name;
        var limit = parseInt(container.getAttribute('data-collection-limit') || '0', 10);
        var filter = container.getAttribute('data-collection-filter') || '';

        var renderer = RENDERERS[variant] || RENDERERS[name];
        if (!renderer) {
            console.warn('[collections-loader] No renderer for', variant || name);
            return;
        }

        // Filtrado (ej: destacado_home=true)
        var data = items.slice();
        if (filter === 'destacado_home') {
            data = data.filter(function(i) { return i.destacado_home === true; });
        }

        // Ordenar por 'orden'
        data.sort(function(a, b) { return (a.orden || 999) - (b.orden || 999); });

        // Limitar
        if (limit > 0) data = data.slice(0, limit);

        container.innerHTML = data.map(function(item) {
            return renderer(item, lang);
        }).join('');
    }

    function init() {
        var lang = getLang();
        var containers = document.querySelectorAll('[data-collection]');
        if (containers.length === 0) return;

        // Agrupar fetches únicos
        var needed = {};
        containers.forEach(function(c) {
            var name = c.getAttribute('data-collection');
            if (COLLECTIONS[name]) needed[name] = COLLECTIONS[name];
        });

        var promises = Object.keys(needed).map(function(name) {
            return fetchJson(needed[name])
                .then(function(data) { return { name: name, data: data }; })
                .catch(function() { return { name: name, data: [] }; });
        });

        Promise.all(promises).then(function(results) {
            var byName = {};
            results.forEach(function(r) { byName[r.name] = r.data; });

            containers.forEach(function(c) {
                var name = c.getAttribute('data-collection');
                renderCollection(c, byName[name] || [], lang);
            });

            document.dispatchEvent(new CustomEvent('traverso:collections-loaded'));
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
