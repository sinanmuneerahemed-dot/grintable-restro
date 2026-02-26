import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, "index.html"),
        menu: resolve(__dirname, "menu/index.html"),
        gallery: resolve(__dirname, "gallery/index.html"),
        reservations: resolve(__dirname, "reservations/index.html"),
        contact: resolve(__dirname, "contact/index.html")
      }
    }
  }
});