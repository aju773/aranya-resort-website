import { defineConfig } from '@playwright/test';
export default defineConfig({ testDir: './tests', workers: 1, use: { baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:3000', browserName: 'chromium' }, webServer: { command: 'npm run dev', url: process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:3000', reuseExistingServer: true }, reporter: 'list' });
