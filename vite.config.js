import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      devOptions: {
        enabled: true
      },
      includeAssets: [
        "/index.html", 
        "/favicon.svg", 
        "/robots.txt", 
        "/sounds/pomodoro_tick.mp3", 
        "/sounds/pomodoro_end.mp3"
      ], 
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      manifest: {
        name: "Pomodoro Clock",
        short_name: "Pomodoro Clock",
        description: "Pomodoro Clock",
        lang: "en-US",
        start_url: "/index.html",
        display: "fullscreen",
        background_color: "black",
        theme_color: "black",
        icons: [
          {
            "src": "/images/icon-144.png",
            "sizes": "144x144",  
            "type": "image/png",
            "purpose": "any maskable"
          }
        ],
        version: "0.1.1"
      }
    })
  ],
  server: {
    host: "0.0.0.0",
    port: 3000
  }
})
