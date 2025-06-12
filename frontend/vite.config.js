import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cspPlugin from 'vite-plugin-csp';
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    cspPlugin({
      'default-src': ['self', '*'],
      'script-src': ['self', 'unsafe-inline', '*'],
      'style-src': ['self', 'unsafe-inline', '*'],
      'font-src': ['self', '*'],
      'img-src': ['self', '*'],
      'connect-src': ['self', '*'],
    }),
  ],
});
