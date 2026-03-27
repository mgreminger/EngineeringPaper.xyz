import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { cloudflare } from '@cloudflare/vite-plugin';
import { sveltePreprocess } from 'svelte-preprocess';
import { optimizeImports } from 'carbon-preprocess-svelte';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { VitePWA } from 'vite-plugin-pwa';
import { open } from 'node:fs/promises';
import { join } from 'path';
import { spawn } from 'node:child_process';
import ssri from 'ssri';

// Vite outputs to 'dist' by default, not 'public'
const outDir = 'dist'; 

export default defineConfig({
  plugins: [
    // Carbon UI Optimization
    optimizeImports(),
    
    // Svelte Compilation
    svelte({
      preprocess: sveltePreprocess(),
    }),

    cloudflare(),

    // Asset Copying (MathLive / MathJax)
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/mathlive/dist/fonts/*',
          dest: 'mathlive/fonts',
          rename: { stripBase: true }
        },
        {
          src: 'node_modules/mathlive/dist/sounds/*',
          dest: 'mathlive/sounds',
          rename: { stripBase: true }
        },
        {
          src: 'node_modules/mathjax/es5/tex-svg.js',
          dest: 'mathjax',
          rename: { stripBase: true }
        },
      ],
    }),

    // Workbox / Service Worker Integration
    VitePWA({
      strategies: 'generateSW',
      filename: 'serviceworker.js',
      injectRegister: false, // Assuming you register it manually in main.js
      workbox: {
        globDirectory: join(outDir, 'client'),
        globIgnores: [
          "_worker.js",
          "_routes.json",
          "**/*.{ts,map}",
          "iframe_test.html",
        ],
        globPatterns: [
          "**/*.{js,css,html,py,json}",
          "**/*icon*.{svg,png,ico}",
          "images/desktop_screenshot.png",
          "pyodide/*",
          "mathlive/fonts/*",
          "mathlive/sounds/",
          "logo_dark.svg",
          "print_logo.png",
          "assets/IBMPlexSans-Light-Latin1*.woff2",
          "assets/IBMPlexSans-Regular-Latin1*.woff2",
          "assets/IBMPlexSans-Regular-Greek*.woff2",
          "assets/IBMPlexSans-SemiBold-Latin1*.woff2",
          "assets/IBMPlexSans-SemiBoldItalic-Latin1*.woff2",
          "assets/IBMPlexSans-Italic-Latin1*.woff2",
          "assets/IBMPlexSans-Italic*.woff2",
          "assets/IBMPlexSans-Bold-Latin1*.woff2",
          "assets/IBMPlexSans-Regular-Pi*.woff2",
          "assets/IBMPlexSans-SemiBoldItalic*.woff2",
          "assets/IBMPlexSans-Regular*.woff2",
          "assets/IBMPlexMono-Light-Latin1*.woff2",
          "assets/IBMPlexMono-Regular-Latin1*.woff2",
          "assets/IBMPlexSans-Italic-Greek*.woff2",
          "images/updates/*",
        ],
        navigateFallback: "index.html",
        navigateFallbackAllowlist: [
          /^\/[a-zA-Z0-9]{22}$/,
          /^\/temp-checkpoint-.*$/,
          /^\/open_file$/,
        ],
        ignoreURLParametersMatching: [/^activation$/, /^modal$/],
        maximumFileSizeToCacheInBytes: 40 * 1000 ** 2,
        inlineWorkboxRuntime: true,
        sourcemap: process.env.NODE_ENV !== 'production',
        mode: process.env.NODE_ENV === 'production' ? "production" : "dev",
        manifestTransforms: [integrityManifestTransform],
      }
    }),
    watchBrowserWorkersPlugin()
  ],
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin'],
      },
    },
  },
  worker: {
    format: 'es'
  },
  build: {
    outDir,
    sourcemap: true,
    emptyOutDir: true, // Replaces rollup-plugin-delete
  },
  server: {
    port: 8788,
    strictPort: true,
  },
  preview: {
    port: 8788,
    strictPort: true,
  }
});

function watchBrowserWorkersPlugin() {
  return {
    name: 'watch-browser-workers',
    configureServer(server) {
      console.log('\n🚀 Starting esbuild for browser workers in watch mode...');

      // 1. Spawn the unified esbuild script with the --watch flag appended
      const workerProcess = spawn('npm', ['run', 'build:workers', '--', '--watch'], {
        stdio: 'inherit',
        shell: true
      });

      // 2. Clean up the background process gracefully when you shut down Vite
      server.httpServer?.once('close', () => {
        workerProcess.kill();
      });

      // 3. Watch the entire public folder for changes to the compiled files
      server.watcher.add('public');

      // 4. Listen for changes and force a reload if a worker bundle is updated
      server.watcher.on('change', (file) => {
        // Normalize the path check so it catches public/pyodideWorker.js 
        // as well as nested ones like public/parser/parserWorker.js
        if (file.includes('public') && file.endsWith('Worker.js')) {
          console.log(`\n🔄 Compiled worker updated: ${file}`);
          console.log('Forcing browser reload...');
          server.ws.send({ type: 'full-reload' });
        }
      });
    }
  }
}


async function integrityManifestTransform(originalManifest, compilation) {
  const warnings = [];
  const manifest = await Promise.all(
    originalManifest.map(async (entry) => {
      if (entry.url === "index.html") {
        // index.html may get transformed by the server so it will not match the integrity check
        return entry;
      }
      const fd = await open(join(outDir, 'client', entry.url));
      entry.integrity = (
        await ssri.fromStream(fd.createReadStream())
      ).toString();
      return entry;
    })
  );

  return { warnings, manifest };
}