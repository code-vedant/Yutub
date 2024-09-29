import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cspPlugin from 'vite-plugin-csp';

export default defineConfig({
  plugins: [
    react(),
    cspPlugin({
      'default-src': ['self'],
      'style-src': ['self', "'unsafe-inline'", 'https://fonts.googleapis.com'],
      'font-src': ['self', 'https://fonts.gstatic.com'], // Add this line
    }),
  ],
});
