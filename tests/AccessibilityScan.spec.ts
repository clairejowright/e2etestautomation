import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright'; // 1

test('Accessibility Scan', async ({ page }, testInfo) => {
    await page.goto('https://automationintesting.online/');
  
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); // 4

    expect(accessibilityScanResults.violations).toEqual([]); // 5
  });

