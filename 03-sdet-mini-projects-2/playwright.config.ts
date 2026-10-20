import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  webServer: {
    command: 'node dist/mock-server/start.js',
    url: 'http://127.0.0.1:4001/api/v1/inventory/items',
    reuseExistingServer: !process.env.CI,
    timeout: 10000,
  },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
  use: {
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  },
});
