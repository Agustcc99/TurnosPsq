// frontend/vite.config.mts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // T0do lo que empiece con /api en desarrollo
      // se envía al backend que corre en http://localhost:4000
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true
      }
    }
  }
});
