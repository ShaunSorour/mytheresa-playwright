import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  globalSetup: require.resolve('./setup/global-setup'),
  globalTimeout: 60 * 60 * 1000,
  testDir: './tests/',
  outputDir: './results/artifacts/',
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
