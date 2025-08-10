import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // React 19 features enabled
      babel: {
        plugins: [
          // Enable React 19 experimental features
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]
        ]
      }
    }),
    // Tailwind CSS v4 with first-party Vite plugin
    tailwindcss()
  ],
  server: {
    port: 3000,
    host: true,
    // Vite 7 enhanced HMR
    hmr: {
      overlay: true
    }
  },
  build: {
    // Vite 7 optimizations
    target: 'es2022',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['axios']
        }
      }
    }
  },
  // Vite 7 automatic content detection
  css: {
    devSourcemap: true
  }
})
