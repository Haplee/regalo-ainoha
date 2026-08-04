# 🎁 Para Ainoha — Regalo de cumpleaños

Web de regalo de cumpleaños para **Ainoha**, hecha a mano por **FranVi**.

Es una página estática con temática de *envío en camino*: juega con la idea de que un regalo está de camino hacia ella, con un pequeño acertijo escondido para descubrir de qué se trata.

## Cómo funciona

- **Título con degradado** sobre el nombre "Ainoha".
- **Sección "¿Qué es?"** con un botón que va dando pistas hasta revelar el regalo (un bolso 🤍).
- **Estado del envío**: tarjeta tipo *tracking* con los pasos del paquete.
- **Mensaje final** con una cita y la firma.
- **Reveal al hacer scroll**, orbes pastel de fondo y estilo *glassmorphism*.
- Accesible: respeta `prefers-reduced-motion`, `prefers-reduced-transparency` y funciona sin JavaScript (el texto nunca queda oculto).

## Estructura

```
regalo-ainoha/
├── index.html      → estructura y contenido de la página
├── styles.css      → estilos, colores, animaciones
├── script.js       → reveal al scroll y acertijo de pistas
└── qr/
    └── qr-ainoha.png → código QR para imprimir en un folio
```

## Probar en local

```bash
# desde la carpeta del proyecto
python -m http.server 5173 --bind 0.0.0.0
```

Abre `http://localhost:5173/` en el navegador. Con `--bind 0.0.0.0` también se ve desde el móvil en la misma red usando la IP local del equipo (ej. `http://192.168.1.132:5173/`).

## Personalizar

Todo el contenido editable está en `index.html` (textos, cita, firma) y en `script.js` (las pistas del acertijo, variable `clue`/`answer`). Los colores y el degradado se ajustan con las variables CSS del bloque `:root` de `styles.css`.

## QR para imprimir

El archivo `qr/qr-ainoha.png` apunta a `http://192.168.1.132:5173/` (red local). Para imprimirlo en un folio y que se escanee desde el móvil:

1. Imprime `qr/qr-ainoha.png` a tamaño completo.
2. El móvil debe estar en la **misma red Wi-Fi** que el equipo.
3. Asegúrate de que el servidor está corriendo con `--bind 0.0.0.0`.
4. Si el móvil no conecta, permite el puerto `5173` en el firewall de Windows (o ejecuta con permisos de administrador:
   `New-NetFirewallRule -DisplayName "regalo-ainoha 5173" -Direction Inbound -Protocol TCP -LocalPort 5173 -Action Allow`).

> 💡 Para que el QR funcione **desde cualquier lugar** (no solo la red local), despliega la web en un hosting estático (GitHub Pages, Netlify o Vercel) y regenera el QR apuntando a la URL pública.

## Regenerar el QR

```bash
# requiere node
npm i qrcode   # en una carpeta de trabajo
node gen.cjs <URL> qr/qr-ainoha.png
```
