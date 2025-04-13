import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui': ['framer-motion', 'lucide-react'],
        }
      }
    }
  },
  server: {
    // Enable HMR with clear error overlays
    hmr: true,
    open: true,
    // Show more detailed error messages
    cors: true,
  },
  // Improve error messages
  logLevel: 'info',
});
