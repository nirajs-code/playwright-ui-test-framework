import { test as setup, expect } from "@fixtures/base.fixture";
import fs from 'fs';
import path from "path";


export const USER_AUTH_FILE = path.resolve(process.cwd(), 'playwright/.auth/user.json');

setup.beforeAll(async () => {
  const authDir = path.dirname(USER_AUTH_FILE);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
    console.log('Created authentication directory:', authDir);
  }
});

setup('authenticate', async ({page}) => {
  await page.goto('/'); // Replace with your login URL
  await expect(page).toHaveTitle(/Playwright/);
  await page.context().storageState({ path: USER_AUTH_FILE });
  console.log('Authentication setup completed, storage state saved to', USER_AUTH_FILE);
  const authData = JSON.parse(fs.readFileSync(USER_AUTH_FILE, 'utf-8'));
  console.log('Authentication data:', authData);
});