/**
 * seo-injector.js — Inyecta meta tags y JSON-LD según la página actual.
 */
(function() {
    'use strict';

    function getLang() {
        return window.TRAVERSO_LANG || 'es';
    }

    function getPageKey() {
        var path = window.location.pathname.toLowerCase();
        if (path.endsWith('/') || path.endsWith('/index.html') || path === '') return 'index';
        if (path.indexOf('productos') !== -1) return 'productos';
        if (path.indexOf('quienes') !== -1 || path.indexOf('about') !== -1) return 'quienes_somos';
        if (path.indexOf('contacto') !== -1 || path.indexOf('contact') !== -1) return 'contacto';
        return 'index';
    }

    function setMeta(name, content, useProperty) {
        if (!content) return;
        var attr = useProperty ? 'property' : 'name';
        var el = document.querySelector('meta[' + attr + '="' + name + '"]');
        if (!el) {
            el = document.createElement('meta');
            el.setAttribute(attr, name);
            document.head.appendChild(el);
        }
        el.setAttribute('content', content);
    }

    function setLink(rel, href) {
        if (!href) return;
        var el = document.querySelector('link[rel="' + rel + '"]');
        if (!el) {
            el = document.createElement('link');
            el.setAttribute('rel', rel);
            document.head.appendChild(el);
        }
        el.setAttribute('href', href);
    }

    function injectJsonLd(data, id) {
        var el = document.getElementById(id);
        if (el) el.remove();
        var script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = id;
        script.textContent = JSON.stringify(data, null, 2);
        document.head.appendChild(script);
    }

    function inject(seo) {
        var lang = getLang();
        var page = getPageKey();
        var globalData = seo.global || {};
        var pageData = (seo[lang] && seo[lang][page]) || (seo.es && seo.es[page]) || {};

        if (pageData.title) document.title = pageData.title;
        setMeta('description', pageData.description);
        setMeta('keywords', pageData.keywords);
        setMeta('robots', pageData.robots || 'index, follow');

        if (pageData.canonical) setLink('canonical', pageData.canonical);

        // Open Graph
        setMeta('og:title', pageData.og_title || pageData.title, true);
        setMeta('og:description', pageData.og_description || pageData.description, true);
        setMeta('og:image', pageData.og_image || globalData.default_image, true);
        setMeta('og:url', pageData.canonical, true);
        setMeta('og:type', 'website', true);
        setMeta('og:site_name', globalData.site_name, true);
        setMeta('og:locale', lang === 'en' ? 'en_US' : 'es_CL', true);

        // Twitter Cards
        setMeta('twitter:card', 'summary_large_image');
        setMeta('twitter:title', pageData.og_title || pageData.title);
        setMeta('twitter:description', pageData.og_description || pageData.description);
        setMeta('twitter:image', pageData.og_image || globalData.default_image);
        if (globalData.twitter_handle) setMeta('twitter:site', globalData.twitter_handle);

        // JSON-LD Organization (siempre)
        var org = globalData.organization || {};
        var orgLd = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": org.legal_name || globalData.site_name,
            "url": globalData.site_url,
            "logo": (globalData.site_url || '') + '/' + (org.logo || 'assets/logo-traverso.png'),
            "email": org.email,
            "telephone": org.phone,
            "foundingDate": org.founding_date,
            "address": {
                "@type": "PostalAddress",
                "streetAddress": org.address_street,
                "addressLocality": org.address_locality,
                "addressRegion": org.address_region,
                "addressCountry": org.address_country
            },
            "sameAs": org.same_as || []
        };
        injectJsonLd(orgLd, 'jsonld-organization');

        // JSON-LD WebSite (en home)
        if (page === 'index') {
            injectJsonLd({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": globalData.site_name,
                "url": globalData.site_url,
                "inLanguage": lang === 'en' ? 'en' : 'es'
            }, 'jsonld-website');
        }

        // JSON-LD Breadcrumb (en páginas internas)
        if (page !== 'index') {
            var pageLabels = {
                'productos': lang === 'en' ? 'Products' : 'Productos',
                'quienes_somos': lang === 'en' ? 'About Us' : 'Quiénes Somos',
                'contacto': lang === 'en' ? 'Contact' : 'Contacto'
            };
            injectJsonLd({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": globalData.site_url },
                    { "@type": "ListItem", "position": 2, "name": pageLabels[page], "item": pageData.canonical }
                ]
            }, 'jsonld-breadcrumb');
        }

        // Schema específico de página
        if (pageData.schema_type && pageData.schema_type !== 'WebSite') {
            injectJsonLd({
                "@context": "https://schema.org",
                "@type": pageData.schema_type,
                "name": pageData.title,
                "description": pageData.description,
                "url": pageData.canonical
            }, 'jsonld-page');
        }
    }

    fetch('data/seo.json?v=' + Date.now(), { cache: 'no-store' })
        .then(function(r) { return r.json(); })
        .then(inject)
        .catch(function(e) { console.warn('[seo-injector]', e); });
})();
