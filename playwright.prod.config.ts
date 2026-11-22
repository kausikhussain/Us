import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: 'e2e-production.spec.ts',
  timeout: 60000,
  expect: {
    timeout: 15000,
  },
  use: {
    baseURL: 'https://k-and-n-gold.vercel.app',
    trace: 'off',
    viewport: { width: 1440, height: 900 },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
