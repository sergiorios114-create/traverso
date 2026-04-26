#!/usr/bin/env python3
"""
serve.py — Servidor de desarrollo local para Traverso CMS.

Modo preferido: si PHP está instalado, delega al servidor embebido de PHP
(necesario para que el panel admin funcione 100%).

Modo fallback: servidor estático Python (solo el sitio público funciona;
el admin requiere PHP).

Uso:
    python serve.py [puerto]

Por defecto escucha en http://localhost:8000
"""

import sys
import os
import shutil
import subprocess
import http.server
import socketserver
from urllib.parse import urlparse

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
ROOT = os.path.dirname(os.path.abspath(__file__))
os.chdir(ROOT)

BANNER = r"""
 _____                                   ____ __  __ ____
|_   _|_ __ __ ___   _____ _ __ ___  ___|  _ \|  \/  / ___|
  | | | '__/ _` \ \ / / _ \ '__/ __|/ _ \ |_) | |\/| \___ \
  | | | | | (_| |\ V /  __/ |  \__ \  __/  __/| |  | |___) |
  |_| |_|  \__,_| \_/ \___|_|  |___/\___|_|   |_|  |_|____/
"""


def php_available():
    return shutil.which("php") is not None


def run_php_server():
    """Lanza el servidor embebido de PHP (php -S)."""
    print(BANNER)
    print(f"Modo:     PHP builtin server")
    print(f"Puerto:   {PORT}")
    print(f"Root:     {ROOT}")
    print()
    print(f"  Sitio público:     http://localhost:{PORT}/")
    print(f"  Panel admin:       http://localhost:{PORT}/gestion-contenido")
    print(f"  Dashboard directo: http://localhost:{PORT}/admin/dashboard.php")
    print()
    print("  Ctrl+C para detener")
    print("=" * 64)
    print()

    # Configurar un router PHP para mapear /gestion-contenido -> admin/index.php
    router = os.path.join(ROOT, "_router.php")
    with open(router, "w", encoding="utf-8") as f:
        f.write(
            "<?php\n"
            "// Router para php -S\n"
            "$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);\n"
            "$uri = rtrim($uri, '/');\n"
            "if ($uri === '/gestion-contenido' || $uri === '/gestion-contenido/') {\n"
            "    require __DIR__ . '/admin/index.php';\n"
            "    return true;\n"
            "}\n"
            "// Archivos estáticos existentes → servir tal cual\n"
            "$path = __DIR__ . $uri;\n"
            "if ($uri !== '' && file_exists($path) && !is_dir($path)) return false;\n"
            "// Sin extensión → intentar .html\n"
            "if ($uri !== '' && !pathinfo($uri, PATHINFO_EXTENSION)) {\n"
            "    $maybe = __DIR__ . $uri . '.html';\n"
            "    if (file_exists($maybe)) { readfile($maybe); return true; }\n"
            "}\n"
            "return false;\n"
        )

    try:
        cmd = ["php", "-S", f"localhost:{PORT}", "-t", ROOT, router]
        subprocess.run(cmd)
    except KeyboardInterrupt:
        print("\nServidor detenido.")
    finally:
        if os.path.exists(router):
            try:
                os.remove(router)
            except OSError:
                pass


class StaticHandler(http.server.SimpleHTTPRequestHandler):
    """Handler estático con mapeo /gestion-contenido → admin/index.php (solo lectura)."""

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path in ("/gestion-contenido", "/gestion-contenido/"):
            self.send_response(503)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.end_headers()
            self.wfile.write(
                "<!DOCTYPE html><html><head><meta charset='utf-8'>"
                "<title>Admin requiere PHP</title></head><body style='font-family:sans-serif;padding:40px'>"
                "<h1>Panel admin no disponible</h1>"
                "<p>El panel <code>/gestion-contenido</code> requiere PHP.</p>"
                "<p>Instala PHP y vuelve a ejecutar <code>python serve.py</code>.</p>"
                "<p>El sitio público sí está funcionando — vuelve a <a href='/'>la home</a>.</p>"
                "</body></html>".encode("utf-8")
            )
            return

        # Normalizar: / -> /index.html
        if parsed.path == "/":
            self.path = "/index.html"
        return super().do_GET()

    def end_headers(self):
        # Evitar cache agresivo en desarrollo
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


def run_python_server():
    print(BANNER)
    print(f"Modo:     Python static (PHP NO detectado)")
    print(f"Puerto:   {PORT}")
    print()
    print(f"  Sitio público: http://localhost:{PORT}/")
    print(f"  [Admin deshabilitado — instala PHP para usar el CMS]")
    print()
    print("=" * 64)
    print()

    try:
        with socketserver.TCPServer(("localhost", PORT), StaticHandler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor detenido.")


def main():
    if php_available():
        run_php_server()
    else:
        print("[ADVERTENCIA] PHP no está instalado. El admin no funcionará.")
        print("Descarga PHP desde https://windows.php.net/download/ y asegúrate de")
        print("agregarlo al PATH. Luego ejecuta `python serve.py` nuevamente.\n")
        run_python_server()


if __name__ == "__main__":
    main()
