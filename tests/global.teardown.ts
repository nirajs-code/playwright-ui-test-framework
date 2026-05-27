import { test as teardown } from '@playwright/test';
import * as fs from 'fs'

teardown('clear auth state', async () => {
  
  const files = [
    'playwright/.auth/user.json'
  ]

  files.forEach(file => {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file)
    }
  })
})