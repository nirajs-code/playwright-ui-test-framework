import { test as setup, expect } from "@fixtures/base.fixture";
import fs from 'fs';
import path from "path";


const authFile = path.resolve(process.cwd(), 'playwright/.auth/user.json');

setup('authenticate', async ({page}) => {
  // Perform authentication setup here, e.g., log in and store tokens
  fs.mkdirSync(path.dirname(authFile), { recursive: true });
  await page.goto('/'); // Replace with your login URL
  await expect(page).toHaveTitle(/Playwright/);
  await page.context().storageState({ path: authFile });
  console.log('Authentication setup completed, storage state saved to', authFile);
  const authData = JSON.parse(fs.readFileSync(authFile, 'utf-8'));
  console.log('Authentication data:', authData);
});