import { defineConfig } from 'vite'
import fs from 'node:fs'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

const FIGMA_PLACEHOLDER = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiNEOUQ5RDkiLz48L3N2Zz4='

function figmaAssetPlugin() {
  return {
    name: 'vite-plugin-figma-asset',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) return '\0' + id
      return null
    },
    load(id: string) {
      if (id.startsWith('\0figma:asset/')) {
        return `export default ${JSON.stringify(FIGMA_PLACEHOLDER)}`
      }
      return null
    },
  }
}

function demoDirectoryIndexPlugin() {
  return {
    name: 'vite-plugin-demo-directory-index',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url && /^\/demo(\/[^.]*)?$/.test(req.url.split('?')[0])) {
          const clean = req.url.split('?')[0].replace(/\/$/, '')
          req.url = clean + '/index.html'
        }
        next()
      })
    },
  }
}

const MOBILE_DEMO_VERSION_TOKEN = '__ALVA_MVP_ASSET_VERSION__'

/* Cloudflare can enforce a four-hour browser TTL for static assets even when
 * Vercel asks clients to revalidate. Replace one shared token across the copied
 * Mobile MVP module graph so every deployment gets commit-addressed URLs. */
function mobileDemoAssetVersionPlugin() {
  const files = [
    'index.html',
    'js/app.js',
    'js/actions.js',
    'js/screens.js',
    'js/cards.js',
    'js/company.js',
  ]

  return {
    name: 'vite-plugin-mobile-demo-asset-version',
    closeBundle() {
      const version = (process.env.VERCEL_GIT_COMMIT_SHA || `local-${Date.now().toString(36)}`).slice(0, 12)
      const demoDir = path.resolve(__dirname, 'dist/demo/alva-mobile-mvp')

      files.forEach((file) => {
        const output = path.join(demoDir, file)
        if (!fs.existsSync(output)) return
        const source = fs.readFileSync(output, 'utf8')
        if (source.includes(MOBILE_DEMO_VERSION_TOKEN)) {
          fs.writeFileSync(output, source.replaceAll(MOBILE_DEMO_VERSION_TOKEN, version))
        }
      })
    },
  }
}

export default defineConfig({
  base: '/',
  plugins: [
    demoDirectoryIndexPlugin(),
    mobileDemoAssetVersionPlugin(),
    figmaAssetPlugin(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react({
      babel: {
        compact: false, // Disable compacting to prevent Babel deoptimization warnings for large files
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit for large imported files
  },
})
