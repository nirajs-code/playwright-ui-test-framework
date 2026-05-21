import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({ path: path.resolve(__dirname, '.env') });
const env = process.env.ENV || 'dev';
const configPath = path.resolve(__dirname, `${env}/config.json`);

if(fs.existsSync(configPath)) {
    console.log(`Loading configuration for environment: ${env} from ${configPath}`);    
}
else {
    throw new Error(`Failed to load configuration for environment: ${env} — file not found: ${configPath}`);
}

const configData = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

export const envConfig = {
    ...configData,
    env,
    // Override with env vars only if they are explicitly set (not empty strings)
    ...(process.env.override_base_url && { baseUrl: process.env.override_base_url }),
    ...(process.env.browser && { browser: process.env.browser }),
    ...(process.env.headless !== undefined && { headless: process.env.headless === 'true' }),
}