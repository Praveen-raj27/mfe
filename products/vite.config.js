import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),

    federation({
      name: "products",
      filename: "remoteEntry.js",

      exposes: {
        "./ProductApp": "./src/ProductApp.jsx",
      },

      shared: ["react", "react-dom"],
    }),
  ],

  server: {
    port: 5174,
  },

  build: {
    target: "esnext",
  },
});