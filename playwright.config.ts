import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  globalSetup: require.resolve('./global-setup'),
  testDir: './tests/',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter:
    [
      ['junit', { outputFile: 'results/results.xml' }],
      ['html', { outputFolder: 'results/html', open: 'never' }]
    ],
  use: {
    // baseURL: 'http://127.0.0.1:3000',
    // extraHTTPHeaders: {
    //   'Accept': 'application/json',
    //   'Authorization': `token ${process.env.API_TOKEN}`,
    // },

    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],
});
