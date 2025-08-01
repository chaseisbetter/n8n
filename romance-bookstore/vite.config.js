import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimize for production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Code splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react'],
        },
      },
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
  },
  // Optimize dev server
  server: {
    open: true,
    port: 3000,
  },
  // Enable CSS code splitting
  css: {
    devSourcemap: true,
  },
  // Performance optimizations
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
  },
})
