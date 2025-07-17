import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/',       
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'SafeTrip',
        short_name: 'SafeTrip',
        start_url: '/',
        display: 'standalone',
        theme_color: '#0284C7',
        background_color: '#ffffff',
        screenshots: [
                    {
                        src: "/icons/icons-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        form_factor: "wide",
                        label: "A",
                    },
                ],
        icons: [
          { src: '/icons/icons-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icons-512x512.png', sizes: '512x512', type: 'image/png' }
        ]
      },
      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: ['**/*.{js,css,html,png,svg,json}']
      }
    })
  ]
})
