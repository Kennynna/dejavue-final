import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'Dejavue Parfume',
        short_name: 'Dejavue',
        description: 'Оригинальные ароматы в Грозном',
        theme_color: '#4a2c2a',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/parfume/log.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/parfume/log.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/parfume/log.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

