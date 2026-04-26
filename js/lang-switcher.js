/**
 * lang-switcher.js — Agrega selector ES/EN si no existe en el HTML.
 * Respeta el diseño original: solo añade un botón pequeño en el nav si hay clase .nav.
 */
(function() {
    'use strict';

    function currentLang() {
        return window.TRAVERSO_LANG || 'es';
    }

    function switchLang(target) {
        try { localStorage.setItem('traverso_lang', target); } catch(e) {}
        var url = new URL(window.location.href);
        url.searchParams.set('lang', target);
        window.location.href = url.toString();
    }

    function renderSwitcher() {
        // Si el HTML ya tiene un data-lang-switcher, solo activamos handlers
        var existing = document.querySelector('[data-lang-switcher]');
        if (existing) {
            existing.querySelectorAll('[data-lang]').forEach(function(btn) {
                var lang = btn.getAttribute('data-lang');
                if (lang === currentLang()) btn.classList.add('active');
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    switchLang(lang);
                });
            });
            return;
        }

        // Auto-inyectar junto al CTA (derecha del header)
        var cta = document.querySelector('.header__cta');
        var headerInner = document.querySelector('.header__inner');
        if (!cta && !headerInner) return;

        var wrap = document.createElement('div');
        wrap.className = 'lang-switch';
        wrap.innerHTML = '<button type="button" data-lang="es" class="' + (currentLang() === 'es' ? 'active' : '') + '">ES</button>' +
                        '<button type="button" data-lang="en" class="' + (currentLang() === 'en' ? 'active' : '') + '">EN</button>';
        wrap.style.cssText = 'display:inline-flex;gap:2px;margin-left:auto;margin-right:8px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:6px;padding:2px';

        wrap.querySelectorAll('button').forEach(function(b) {
            b.style.cssText = 'border:none;background:transparent;padding:4px 9px;font-size:11px;font-weight:600;cursor:pointer;color:inherit;border-radius:4px;font-family:inherit';
            if (b.classList.contains('active')) {
                b.style.background = 'rgba(255,255,255,0.15)';
                b.style.color = '#fff';
            } else {
                b.style.color = 'rgba(255,255,255,0.4)';
            }
            b.addEventListener('click', function() {
                switchLang(b.getAttribute('data-lang'));
            });
        });

        // Insertar ANTES del CTA (idioma primero, luego conversemos)
        if (cta && cta.parentNode) {
            cta.parentNode.insertBefore(wrap, cta);
        } else if (headerInner) {
            headerInner.appendChild(wrap);
        }

        // Cambiar colores cuando header pasa a blanco (scrolled)
        var header = document.getElementById('header');
        if (header) {
            var observer = new MutationObserver(function() {
                var scrolled = header.classList.contains('scrolled');
                wrap.style.background = scrolled ? 'rgba(11,30,107,0.06)' : 'rgba(255,255,255,.06)';
                wrap.style.borderColor = scrolled ? 'rgba(11,30,107,0.12)' : 'rgba(255,255,255,.1)';
                wrap.querySelectorAll('button').forEach(function(b) {
                    if (b.classList.contains('active')) {
                        b.style.background = scrolled ? 'var(--color-primary, #0b1e6b)' : 'rgba(255,255,255,0.15)';
                        b.style.color = scrolled ? '#fff' : '#fff';
                    } else {
                        b.style.color = scrolled ? 'rgba(11,30,107,0.4)' : 'rgba(255,255,255,0.4)';
                        b.style.background = 'transparent';
                    }
                });
            });
            observer.observe(header, { attributes: true, attributeFilter: ['class'] });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderSwitcher);
    } else {
        renderSwitcher();
    }
})();
