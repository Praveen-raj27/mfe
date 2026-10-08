import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),

    federation({
      name: "cart",
      filename: "remoteEntry.js",

      exposes: {
        "./CartApp": "./src/CartApp.jsx",
      },

      shared: ["react", "react-dom"],
    }),
  ],

  server: {
    port: 5176,
  },

  preview: {
    port: 5176,
  },

  build: {
    target: "esnext",
  },
});