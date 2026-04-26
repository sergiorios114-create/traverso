/**
 * content-loader.js — Inyecta contenido editable en el DOM.
 * Busca elementos con data-content="pagina.campo" y reemplaza su contenido.
 * Soporta ES/EN via ?lang= o localStorage.
 * Respeta el diseño original: solo cambia texto, src de img y href de a.
 */
(function() {
    'use strict';

    // ============================================================
    // IDIOMA ACTUAL
    // ============================================================
    function getCurrentLang() {
        var params = new URLSearchParams(window.location.search);
        var fromUrl = params.get('lang');
        if (fromUrl && (fromUrl === 'es' || fromUrl === 'en')) {
            try { localStorage.setItem('traverso_lang', fromUrl); } catch(e) {}
            return fromUrl;
        }
        try {
            var stored = localStorage.getItem('traverso_lang');
            if (stored === 'es' || stored === 'en') return stored;
        } catch(e) {}
        return 'es';
    }

    window.TRAVERSO_LANG = getCurrentLang();
    document.documentElement.setAttribute('lang', window.TRAVERSO_LANG);

    // ============================================================
    // SANITIZACIÓN BÁSICA (whitelist)
    // ============================================================
    var ALLOWED_TAGS = /<\/?(?:strong|em|br|span|p|mark|b|i|u|small)\b[^>]*>/gi;

    function sanitize(html) {
        if (typeof html !== 'string') return '';
        // Remover <script> y handlers on*
        html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
        html = html.replace(/\son\w+\s*=\s*"[^"]*"/gi, '');
        html = html.replace(/\son\w+\s*=\s*'[^']*'/gi, '');
        html = html.replace(/javascript:/gi, '');
        // Escapar tags que no están en whitelist
        html = html.replace(/<(\/?)([\w-]+)([^>]*)>/gi, function(m, slash, tag) {
            var allowed = ['strong','em','br','span','p','mark','b','i','u','small'];
            if (allowed.indexOf(tag.toLowerCase()) !== -1) return m;
            return '';
        });
        return html;
    }

    // ============================================================
    // FETCH HELPER
    // ============================================================
    function fetchJson(url) {
        return fetch(url + '?v=' + Date.now(), { cache: 'no-store' })
            .then(function(r) {
                if (!r.ok) throw new Error('HTTP ' + r.status);
                return r.json();
            });
    }

    // ============================================================
    // INYECCIÓN DE CONTENIDO
    // ============================================================
    function getByPath(obj, path) {
        var parts = path.split('.');
        var cur = obj;
        for (var i = 0; i < parts.length; i++) {
            if (cur == null) return undefined;
            cur = cur[parts[i]];
        }
        return cur;
    }

    function applyContent(content) {
        var lang = window.TRAVERSO_LANG;
        var langData = content[lang] || content.es || {};

        // Elementos con data-content
        var nodes = document.querySelectorAll('[data-content]');
        nodes.forEach(function(el) {
            var path = el.getAttribute('data-content');
            var value = getByPath(langData, path);
            if (value == null || value === '') return;

            // IMG
            if (el.tagName === 'IMG') {
                el.setAttribute('src', value);
                return;
            }

            // Link href override
            if (el.hasAttribute('data-content-href')) {
                var hrefPath = el.getAttribute('data-content-href');
                var hrefVal = getByPath(langData, hrefPath);
                if (hrefVal) el.setAttribute('href', hrefVal);
            }

            // Background image (para heros con style)
            if (el.hasAttribute('data-content-bg')) {
                el.style.backgroundImage = "url('" + value + "')";
                return;
            }

            // Texto con HTML básico permitido
            el.innerHTML = sanitize(String(value));
        });

        // Attributos href/src que dependen de campo de contenido
        var hrefs = document.querySelectorAll('[data-content-attr-href]');
        hrefs.forEach(function(el) {
            var path = el.getAttribute('data-content-attr-href');
            var value = getByPath(langData, path);
            if (value) el.setAttribute('href', value);
        });

        var srcs = document.querySelectorAll('[data-content-attr-src]');
        srcs.forEach(function(el) {
            var path = el.getAttribute('data-content-attr-src');
            var value = getByPath(langData, path);
            if (value) el.setAttribute('src', value);
        });
    }

    // ============================================================
    // BRAND DATA (footer, contacto, etc.)
    // ============================================================
    function applyBrand(brand) {
        var nodes = document.querySelectorAll('[data-brand]');
        nodes.forEach(function(el) {
            var key = el.getAttribute('data-brand');
            var value = brand[key];
            if (value == null) return;
            if (el.tagName === 'IMG') {
                el.setAttribute('src', value);
            } else if (el.tagName === 'A') {
                // Links: aplicar según prefijo
                if (key === 'email') el.setAttribute('href', 'mailto:' + value);
                else if (key === 'telefono_link') el.setAttribute('href', 'tel:' + value);
                else if (key === 'whatsapp_link') el.setAttribute('href', 'https://wa.me/' + value);
                el.textContent = value;
            } else {
                el.textContent = value;
            }
        });
    }

    // ============================================================
    // INICIALIZACIÓN
    // ============================================================
    function init() {
        Promise.all([
            fetchJson('data/site_content.json').catch(function() { return {}; }),
            fetchJson('data/brand.json').catch(function() { return {}; })
        ]).then(function(results) {
            applyContent(results[0] || {});
            applyBrand(results[1] || {});
            document.documentElement.classList.add('content-loaded');
            // Disparar evento para que otros scripts sepan que el contenido está listo
            document.dispatchEvent(new CustomEvent('traverso:content-loaded'));
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
