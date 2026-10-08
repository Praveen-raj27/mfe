import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),

    federation({
      name: "orders",
      filename: "remoteEntry.js",

      exposes: {
        "./OrdersApp": "./src/OrdersApp.jsx",
      },

      shared: ["react", "react-dom"],
    }),
  ],

  server: {
    port: 5177,
  },

  preview: {
    port: 5177,
  },

  build: {
    target: "esnext",
  },
});