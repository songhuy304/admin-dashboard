import { defineConfig, type UserConfig, type ConfigEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
// import viteImagemin from 'vite-plugin-imagemin';
import compression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';
import { visualizer } from 'rollup-plugin-visualizer';
import eslint from 'vite-plugin-eslint';
import postcssPreset from 'postcss-preset-env';
import path from 'path';

export default defineConfig(((env: ConfigEnv) => {
  const isDev = env.mode === 'development';

  return {
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
        },
        '/images': {
          target: 'http://localhost:8080',
          changeOrigin: true,
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    css: {
      postcss: {
        plugins: isDev ? [] : [postcssPreset()],
      },
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          sourceMap: isDev,
        },
      },
    },
    build: {
      minify: 'terser',

      rollupOptions: {
        output: {
          manualChunks: {
            dll: [
              'react',
              'react-dom',
              'react-router-dom',
              'graphql',
              '@apollo/client',
              'redux',
              'react-redux',
              '@reduxjs/toolkit',
              'js-cookie',
              'classnames',
            ],
          },
        },
      },

      chunkSizeWarningLimit: 1000,

      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    define: {
      __IS_PRODUCTION__: env.mode === 'production',
    },
    plugins: [
      react(),
      compression(),
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          clientsClaim: true,
          skipWaiting: true,
          globPatterns: [
            '**/*.{js,css,scss,html,ico,jpg,png,svg,gif,webmanifest}',
          ],
        },
        includeAssets: ['**/*.{png,jpeg,ico,jpg,png,svg,gif,webmanifest}'],
        manifest: {
          name: 'React App',
          start_url: '/',
          short_name: 'React App',
          description: 'React Antd Typescript Starter',
          background_color: '#242424',
          theme_color: '#00b96b',
          icons: [
            {
              src: 'icons/192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'icons/512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
          screenshots: [
            {
              src: 'icons/screenshot_320x320.png',
              sizes: '320x320',
              type: 'image/png',
              form_factor: 'narrow',
            },
            {
              src: 'icons/screenshot_1024x593.png',
              sizes: '1024x593',
              type: 'image/png',
              form_factor: 'wide',
            },
          ],
        },
      }),
      process.env.ANALYZER
        ? visualizer({
            gzipSize: true,
          })
        : null,
      isDev ? eslint() : undefined,
    ].filter(Boolean),
  };
}) as UserConfig);
