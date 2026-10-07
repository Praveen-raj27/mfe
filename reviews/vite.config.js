import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),

    federation({
      name: "reviews",
      filename: "remoteEntry.js",

      exposes: {
        "./ReviewApp": "./src/ReviewApp.jsx",
      },

      shared: ["react", "react-dom"],
    }),
  ],

  server: {
    port: 5175,
  },

  build: {
    target: "esnext",
  },
});