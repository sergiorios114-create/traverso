/**
 * integraciones-loader.js — Inyecta scripts de tracking y código custom.
 */
(function() {
    'use strict';

    function injectScript(src, async) {
        var s = document.createElement('script');
        s.src = src;
        if (async !== false) s.async = true;
        document.head.appendChild(s);
        return s;
    }

    function injectInline(code, position) {
        if (!code) return;
        var container = document.createElement('div');
        container.innerHTML = code;
        var target = position === 'head' ? document.head : document.body;
        var ref = position === 'body_start' ? target.firstChild : null;
        while (container.firstChild) {
            var node = container.firstChild;
            // Scripts requieren recreación para ejecutarse
            if (node.tagName === 'SCRIPT') {
                var newScript = document.createElement('script');
                if (node.src) newScript.src = node.src;
                else newScript.textContent = node.textContent;
                if (ref) target.insertBefore(newScript, ref);
                else target.appendChild(newScript);
                container.removeChild(node);
            } else {
                if (ref) target.insertBefore(node, ref);
                else target.appendChild(node);
            }
        }
    }

    function apply(cfg) {
        if (!cfg) return;

        // Google Tag Manager
        if (cfg.gtm && cfg.gtm.enabled && cfg.gtm.container_id) {
            var id = cfg.gtm.container_id;
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',id);
            var ns = document.createElement('noscript');
            ns.innerHTML = '<iframe src="https://www.googletagmanager.com/ns.html?id=' + id + '" height="0" width="0" style="display:none;visibility:hidden"></iframe>';
            if (document.body) document.body.insertBefore(ns, document.body.firstChild);
        }

        // Google Analytics 4
        if (cfg.ga4 && cfg.ga4.enabled && cfg.ga4.measurement_id) {
            injectScript('https://www.googletagmanager.com/gtag/js?id=' + cfg.ga4.measurement_id);
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', cfg.ga4.measurement_id);
        }

        // Meta Pixel
        if (cfg.meta_pixel && cfg.meta_pixel.enabled && cfg.meta_pixel.pixel_id) {
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
            window.fbq('init', cfg.meta_pixel.pixel_id);
            window.fbq('track', 'PageView');
        }

        // Google Ads
        if (cfg.google_ads && cfg.google_ads.enabled && cfg.google_ads.conversion_id) {
            injectScript('https://www.googletagmanager.com/gtag/js?id=' + cfg.google_ads.conversion_id);
            window.dataLayer = window.dataLayer || [];
            function gtagAds(){dataLayer.push(arguments);}
            gtagAds('js', new Date());
            gtagAds('config', cfg.google_ads.conversion_id);
        }

        // Hotjar
        if (cfg.hotjar && cfg.hotjar.enabled && cfg.hotjar.site_id) {
            (function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:cfg.hotjar.site_id,hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-',".js?sv=");
        }

        // Microsoft Clarity
        if (cfg.clarity && cfg.clarity.enabled && cfg.clarity.project_id) {
            (function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script",cfg.clarity.project_id);
        }

        // WhatsApp Widget
        if (cfg.whatsapp_widget && cfg.whatsapp_widget.enabled && cfg.whatsapp_widget.phone) {
            var pos = cfg.whatsapp_widget.position || 'bottom-right';
            var msg = encodeURIComponent(cfg.whatsapp_widget.message || '');
            var wa = document.createElement('a');
            wa.href = 'https://wa.me/' + cfg.whatsapp_widget.phone + '?text=' + msg;
            wa.target = '_blank';
            wa.rel = 'noopener';
            wa.className = 'traverso-wa-widget traverso-wa-widget--' + pos;
            wa.setAttribute('aria-label', 'WhatsApp');
            wa.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="white"><path d="M20.52 3.48A11.85 11.85 0 0012.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.6 5.95L0 24l6.31-1.66a11.88 11.88 0 005.74 1.46h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.17-1.23-6.15-3.43-8.43zM12.06 21.8h-.01a9.87 9.87 0 01-5.03-1.38l-.36-.21-3.74.98.99-3.64-.23-.37a9.87 9.87 0 01-1.51-5.28c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.13 1.03 7 2.9a9.85 9.85 0 012.9 7c0 5.45-4.44 9.89-9.9 9.89zm5.43-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48a9.06 9.06 0 01-1.67-2.07c-.17-.3-.02-.46.13-.6.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.19 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z"/></svg>';
            document.body.appendChild(wa);

            // Estilos del widget
            var style = document.createElement('style');
            style.textContent = '.traverso-wa-widget{position:fixed;width:56px;height:56px;background:#25d366;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(0,0,0,.2);z-index:9999;transition:transform .2s}.traverso-wa-widget:hover{transform:scale(1.08)}.traverso-wa-widget--bottom-right{bottom:24px;right:24px}.traverso-wa-widget--bottom-left{bottom:24px;left:24px}';
            document.head.appendChild(style);
        }

        // Código custom
        if (cfg.custom_code) {
            if (cfg.custom_code.head) injectInline(cfg.custom_code.head, 'head');
            if (cfg.custom_code.body_start) {
                if (document.body) injectInline(cfg.custom_code.body_start, 'body_start');
                else document.addEventListener('DOMContentLoaded', function(){ injectInline(cfg.custom_code.body_start, 'body_start'); });
            }
            if (cfg.custom_code.body_end) {
                if (document.body) injectInline(cfg.custom_code.body_end, 'body_end');
                else document.addEventListener('DOMContentLoaded', function(){ injectInline(cfg.custom_code.body_end, 'body_end'); });
            }
        }
    }

    fetch('data/integraciones.json?v=' + Date.now(), { cache: 'no-store' })
        .then(function(r) { return r.json(); })
        .then(apply)
        .catch(function(e) { /* silent */ });
})();
