import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 0,
  use: {
    baseURL: 'http://127.0.0.1:4173',
    browserName: 'chromium',
    launchOptions: { executablePath: process.env.CHROMIUM_PATH },
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  reporter: [['list'], ['html', { open: 'never' }], ['junit', { outputFile: 'test-results/junit.xml' }]],
  webServer: {
    command: 'node ../../07-Sample-Projects/orderdesk/server.mjs',
    url: 'http://127.0.0.1:4173/health',
    reuseExistingServer: false,
  },
});
