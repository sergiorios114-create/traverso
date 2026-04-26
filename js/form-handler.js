/**
 * form-handler.js — Intercepta los formularios del sitio y los envía
 * al backend propio (admin/save_lead.php) en lugar de Formspree.
 * Respeta el diseño: solo reemplaza el método de envío.
 */
(function() {
    'use strict';

    var FORM_IDS = ['form-home', 'form-productos', 'form-quienes-somos', 'form-contacto-principal'];
    var ENDPOINT = 'admin/save_lead.php';

    function showMessage(form, text, tipo) {
        var el = form.querySelector('.form-message');
        if (!el) {
            el = document.createElement('div');
            el.className = 'form-message';
            form.appendChild(el);
        }
        el.textContent = text;
        el.style.cssText = 'padding:12px 16px;margin-top:14px;border-radius:8px;font-size:14px;' +
            (tipo === 'ok' ? 'background:rgba(16,185,129,.1);border:1px solid rgba(16,185,129,.3);color:#065f46' :
                             'background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.3);color:#991b1b');
    }

    function handleSubmit(e) {
        e.preventDefault();
        var form = e.target;
        var btn = form.querySelector('button[type="submit"]');
        var originalText = btn ? btn.textContent : '';

        if (btn) {
            btn.disabled = true;
            btn.textContent = window.TRAVERSO_LANG === 'en' ? 'Sending...' : 'Enviando...';
        }

        var formData = new FormData(form);
        // Etiquetar origen
        formData.append('origen', form.id);

        fetch(ENDPOINT, {
            method: 'POST',
            body: formData
        })
        .then(function(r) { return r.json().catch(function(){ return { ok: false }; }); })
        .then(function(res) {
            if (res.ok) {
                showMessage(form, window.TRAVERSO_LANG === 'en'
                    ? 'Message sent. We will contact you soon.'
                    : '¡Mensaje enviado! Te contactaremos pronto.', 'ok');
                form.reset();
            } else {
                var err = res.error || 'error';
                var msg = window.TRAVERSO_LANG === 'en'
                    ? 'Could not send the message. Please try again.'
                    : 'No pudimos enviar el mensaje. Intenta nuevamente.';
                if (err === 'email_invalido') msg = window.TRAVERSO_LANG === 'en' ? 'Invalid email address.' : 'Email no válido.';
                if (err === 'too_many_requests') msg = window.TRAVERSO_LANG === 'en' ? 'Too many requests. Try again in a few minutes.' : 'Demasiados envíos. Intenta en unos minutos.';
                showMessage(form, msg, 'error');
            }
        })
        .catch(function() {
            showMessage(form, window.TRAVERSO_LANG === 'en'
                ? 'Connection error.'
                : 'Error de conexión.', 'error');
        })
        .finally(function() {
            if (btn) {
                btn.disabled = false;
                btn.textContent = originalText;
            }
        });
    }

    function init() {
        FORM_IDS.forEach(function(id) {
            var form = document.getElementById(id);
            if (!form) return;
            // Remover action/method que apuntaba a Formspree
            form.removeAttribute('action');
            form.addEventListener('submit', handleSubmit);

            // Honeypot anti-spam
            if (!form.querySelector('input[name="website"]')) {
                var hp = document.createElement('input');
                hp.type = 'text';
                hp.name = 'website';
                hp.tabIndex = -1;
                hp.autocomplete = 'off';
                hp.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;opacity:0';
                hp.setAttribute('aria-hidden', 'true');
                form.appendChild(hp);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
