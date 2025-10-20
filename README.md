# 📰 News PWA

Aplicación **Progressive Web App (PWA)** desarrollada en **React + Vite** que muestra titulares de noticias en tiempo real y permite su funcionamiento **sin conexión a internet** gracias a un **App Shell** cacheado por un **Service Worker**.

---

## 🚀 Características principales

- ✅ Estructura de **App Shell** con:
  - Encabezado (Header)
  - Menú de navegación (Nav)
  - Pie de página (Footer)
  - Vistas dinámicas: `Titulares` y `Buscar`
- ⚙️ Backend Express (`news-api-proxy`) para consumir la API de [NewsAPI.org](https://newsapi.org)
- 💾 **Service Worker** con:
  - Cacheo del App Shell (`index.html`, íconos, manifest)
  - Fallback offline (`offline.html`)
  - Estrategia `stale-while-revalidate` para datos dinámicos (`/api/`)
- 📱 **Archivo `manifest.json`** con íconos, nombre y colores de tema
- 🌐 Soporte **offline completo** y modo “standalone” en móviles

---

## 🏗️ Arquitectura general

📦 Proyecto raíz
├── 📂 news-pwa/ # Frontend 
│ ├── public/
│ │ ├── sw.js # Service Worker
│ │ ├── manifest.json # Configuración PWA
│ │ ├── offline.html # Página de fallback sin conexión
│ │ └── icons/ # Íconos 192x192 y 512x512
│ ├── src/
│ │ ├── components/ # Header, Nav, Footer
│ │ ├── pages/ # News.jsx, Search.jsx
│ │ ├── App.jsx # Estructura principal (App Shell)
│ │ └── main.jsx # Registro de React y Service Worker
│ ├── vite.config.js
│ └── package.json
│
└── 📂 news-api-proxy/ # Backend (Express)
├── server.js 
├── .env # Clave API (NEWS_API_KEY)
└── package.json




2️⃣ Backend (API Proxy)
Ejecuta el servidor:

node server.js
El backend se ejecutará en:
http://localhost:5174

3️⃣ Frontend (PWA)

cd ../news-pwa
npm install
npm run dev
La aplicación se servirá en:
http://localhost:5173

🌍 Comunicación entre frontend y backend
El frontend usa un proxy de desarrollo configurado en Vite (vite.config.js):


server: {
  proxy: {
    '/api': 'http://localhost:5174'
  }
}

Esto permite que las peticiones desde el cliente React a /api/...
se redirijan automáticamente al servidor Express sin errores CORS.

💾 Funcionamiento offline
🔧 ¿Cómo funciona?
El archivo public/sw.js implementa 3 estrategias:

App Shell precacheado
(index.html, manifest.json, offline.html, íconos)

Stale-While-Revalidate
Para datos dinámicos (/api/...), usa caché y actualiza en segundo plano.

Fallback offline
Si no hay conexión, muestra /offline.html.

🧪 Cómo probar sin conexión
Paso 1️⃣ — Instalar el Service Worker
Abre la app en: http://localhost:5173

En DevTools → Application → Service Workers:

Verifica que diga “This page is controlled by a Service Worker”

Paso 2️⃣ — Simular modo sin conexión
Abre DevTools → Network

En el selector de condiciones, elige “Sin conexión”

Recarga la página (Ctrl + R)

Verás tu App Shell (Header, Nav, Footer) o la página offline.html.

