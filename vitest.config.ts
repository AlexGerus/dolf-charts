// import { defineConfig } from 'vitest/config';
// import { getViteConfig } from '@angular/build/vite';
//
// export default defineConfig(async ({ mode }) => {
//   const angularConfig = await getViteConfig();
//
//   return {
//     ...angularConfig,
//     test: {
//       globals: true,
//       environment: 'jsdom',
//       setupFiles: ['src/test-setup.ts'],
//       include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
//       coverage: {
//         provider: 'v8',
//         reporter: ['text', 'json', 'html'],
//         exclude: [
//           'node_modules/',
//           'src/test-setup.ts',
//         ],
//       },
//     },
//   };
// });
