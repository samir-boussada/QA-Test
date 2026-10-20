import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables if .env file exists
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }]
  ],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000,
    navigationTimeout: 15000,
  },

  projects: [
    // API Testing Project
    {
      name: 'api',
      testDir: './tests/api',
      use: {
        baseURL: process.env.API_BASE_URL || 'https://restful-booker.herokuapp.com',
        extraHTTPHeaders: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      },
    },

    // UI E2E Projects
    {
      name: 'e2e-chromium',
      testDir: './tests/e2e',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.UI_BASE_URL || 'https://www.saucedemo.com',
      },
    },
    {
      name: 'e2e-firefox',
      testDir: './tests/e2e',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: process.env.UI_BASE_URL || 'https://www.saucedemo.com',
      },
    },
    {
      name: 'e2e-mobile-chrome',
      testDir: './tests/e2e',
      use: {
        ...devices['Pixel 5'],
        baseURL: process.env.UI_BASE_URL || 'https://www.saucedemo.com',
      },
    },
  ],
});
