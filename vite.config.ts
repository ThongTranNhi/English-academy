/// <reference types="vitest/config" />
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { seoPlugin } from "./build/seoPlugin";

export default defineConfig({
  plugins: [react(), tailwindcss(), seoPlugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    outDir: "dist",
    rolldownOptions: {
      // Giữ thông báo bản quyền ở đầu mọi file JS sau khi build.
      output: { postBanner: "/*! English Academy | Copyright (c) 2026 jathong (ThongTranNhi). All rights reserved. | Không sao chép, phân phối khi chưa được phép. */" },
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}", "build/**/*.test.ts"],
    restoreMocks: true,
  },
});
