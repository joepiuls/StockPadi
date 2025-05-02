// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from 'tailwindcss'


export default defineConfig({
  server: {
    host: '0.0.0.0',
    allowedHosts: [
      '5780-102-91-105-172.ngrok-free.app', // Your specific ngrok domain
      '.ngrok-free.app' // Allow all ngrok domains (recommended)
    ]
    },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt'],
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'service-worker.js',
      manifest: {
        name: 'StockPadi',
        short_name: 'StockPadi',
        description: 'Offline-first inventory tracking app',
        theme_color: '#0f172a',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
