import { defineConfig, type UserConfig, type ConfigEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
// import viteImagemin from 'vite-plugin-imagemin';
import compression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';
import legacy from '@vitejs/plugin-legacy';
import { visualizer } from 'rollup-plugin-visualizer';
import eslint from 'vite-plugin-eslint';
import postcssPreset from 'postcss-preset-env';
import path from 'path';

import sassVar2JSON from './scripts/sass-to-json';

const theme = sassVar2JSON();


const OPEN_SENTRY: boolean = false; 
export default defineConfig(((env: ConfigEnv) => {
  const isDev = env.mode === 'development';

  return {
   server: {
      // Cấu hình proxy khi chạy dev
      proxy: {
        // Request /api sẽ được forward sang backend
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
        },
        // Request /images cũng forward sang backend
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
      // Dùng terser để minify
      minify: 'terser',

      rollupOptions: {
        output: {
          // Tách chunk thủ công
          manualChunks: {
            // Gom các thư viện lớn vào 1 chunk
            dll: [
              'react',
              'react-dom',
              'react-router-dom',
              'axios',
              'redux',
              'react-redux',
              '@reduxjs/toolkit',
              'js-cookie',
              'classnames',
            ],
            // Chỉ bundle sentry khi bật cờ
            sentry: OPEN_SENTRY ? ['@sentry/browser'] : [],
          },
        },
      },

      // Cảnh báo nếu chunk > 1000kb
      chunkSizeWarningLimit: 1000,

      terserOptions: {
        compress: {
          // Xóa console.log khi build
          drop_console: true,
          // Xóa debugger
          drop_debugger: true,
        },
      },
    },
    define: {
      __THEME__: JSON.stringify(theme), // antd theme
      __SENTRY__: OPEN_SENTRY, // process.env.NODE_ENV === 'production' // open sentry
      __SENTRY__DSN__: JSON.stringify('https://examplePublicKey@o0.ingest.sentry.io/0'),
      __IS_PRODUCTION__: env.mode === 'production',
    },
    plugins: [
      react(),
      legacy({
        targets: ['chrome 52', 'Android >= 39', 'iOS >= 10.3', 'IE >= 11'], // 需要兼容的目标列表，可以设置多个
        modernPolyfills: true,
        // additionalLegacyPolyfills: ['regenerator-runtime/runtime'], // 面向IE11时需要此插件
        // polyfills: ['es.promise', 'es.array.iterator']
      }),
      // viteImagemin({
      //   gifsicle: {
      //     optimizationLevel: 7,
      //     interlaced: false,
      //   },
      //   optipng: {
      //     optimizationLevel: 7,
      //   },
      //   mozjpeg: {
      //     quality: 20,
      //   },
      //   pngquant: {
      //     quality: [0.8, 0.9],
      //     speed: 4,
      //   },
      //   svgo: {
      //     plugins: [
      //       {
      //         name: 'removeViewBox',
      //       },
      //       {
      //         name: 'removeEmptyAttrs',
      //         active: false,
      //       },
      //     ],
      //   },
      // }),
      compression(),
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          clientsClaim: true,
          skipWaiting: true,
          globPatterns: ['**/*.{js,css,scss,html,ico,jpg,png,svg,gif,webmanifest}'],
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
