import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
dotenv.config();

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          // lodash: ['lodash'],
          // Add other large libraries here
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: process.env.VITE_API_URL,
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ""),
  //     },
  //   },
  // },
})

