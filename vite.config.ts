import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react-swc'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  server: { https: true },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
