import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  optimizeDeps: {
    include: ["lucide-react"]
  }
  // server:{
  //   proxy:{
  //     '/api':{
  //       target: 'http://192.168.1.10:3000',
  //       changeOrigin: true,
  //       secure: false // <- bỏ verify SSL self-signed
  //     },
  //     '/connect':{
  //       target: 'http://192.168.1.10:3000',
  //       changeOrigin: true,
  //       secure: false // <- bỏ verify SSL self-signed
  //     }
  //   }
  // }
})
