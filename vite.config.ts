import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three", "three-stdlib"],
          gsap: ["gsap"],
          physics: ["@react-three/rapier", "@react-three/cannon"],
          r3f: ["@react-three/fiber", "@react-three/drei", "@react-three/postprocessing"],
          vendor: ["react", "react-dom"],
        },
      },
    },
  },
});