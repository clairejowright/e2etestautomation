import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

//Test Case ID - W1
//Using axe builder import scan for common accessibility issues. Report can be output in terminal or in Playwright UI report.
test('Accessibility Scan', async ({ page }, testInfo) => {
    await page.goto('https://automationintesting.online/');
  
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

