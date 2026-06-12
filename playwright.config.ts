import { defineConfig, devices } from '@playwright/test';

/**
 * E2E free + durable. Levanta un server estático local y testea la página.
 * Para testear un ambiente deployado: BASE_URL=https://... npm run e2e
 */
export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  webServer: process.env.BASE_URL ? undefined : {
    command: 'npx --yes serve -l 3000 .',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
