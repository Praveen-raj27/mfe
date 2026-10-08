import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),

    federation({
      name: "host",

      remotes: {
        products: "http://localhost:5174/assets/remoteEntry.js",
        reviews: "http://localhost:5175/assets/remoteEntry.js",
         cart: "http://localhost:5176/assets/remoteEntry.js",
        orders: "http://localhost:5177/assets/remoteEntry.js",
      },

     shared: {
  react: {
    singleton: true,
  },

  "react-dom": {
    singleton: true,
  },

  "react-router-dom": {
    singleton: true,
  },
}
    }),
  ],

  server: {
    port: 5173,
  },

  build: {
    target: "esnext",
  },
});