import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // Ensures proper asset loading on Vercel
  build: {
    outDir: "dist", // Ensures the output folder matches Vercel config
  }
});
