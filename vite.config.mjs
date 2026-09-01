import { defineConfig } from "vite";
import { resolve } from "path";
import { cpSync } from "fs";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
      output: {
        // JavaScript entry files (no hash)
        entryFileNames: "assets/js/[name].js",
        // JavaScript chunk files (no hash)
        chunkFileNames: "assets/js/[name].js",
        // Assets (CSS, images, audio, PDFs, etc., no hash)
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || assetInfo.names?.[0] || "";

          if (/\.(css)$/.test(name)) {
            return "assets/css/[name][extname]";
          }

          if (/\.(png|jpe?g|gif|svg)$/.test(name)) {
            return "assets/images/[name][extname]";
          }

          // VIDEO FILES
          if (/\.(mp4|webm|ogg|mov)$/.test(name)) {
            return "assets/videos/[name][extname]";
          }

          if (/\.(mp3)$/.test(name)) {
            return "assets/audio/[name][extname]";
          }

          if (/\.(ttf|otf|woff2?|eot)$/.test(name)) {
            return "assets/fonts/[name][extname]";
          }

          return "assets/[name][extname]";
        },
      },
    },
    outDir: "dist",
    css: {
      codeSplit: false,
    },
  },
  base: "./",
  plugins: [
    {
      name: "copy-images",
      closeBundle() {
        cpSync(
          resolve(__dirname, "images"),
          resolve(__dirname, "dist/images"),
          { recursive: true },
        );
      },
    },
    {
      name: "move-scripts-to-body",
      transformIndexHtml(html) {
        const externalScriptRegex =
          /<script\b(?![^>]*type="module")[^>]*>([\s\S]*?)<\/script>/gi;
        const moduleScriptRegex =
          /<script\b[^>]*type="module"[^>]*>([\s\S]*?)<\/script>/gi;
        const externalScripts = html.match(externalScriptRegex) || [];
        const moduleScripts = html.match(moduleScriptRegex) || [];
        let modifiedHtml = html
          .replace(externalScriptRegex, "")
          .replace(moduleScriptRegex, "");
        const allScripts = externalScripts.concat(moduleScripts).join("\n");
        modifiedHtml = modifiedHtml.replace(
          "</body>",
          allScripts + "\n</body>",
        );
        return modifiedHtml;
      },
    },
  ],
});
