import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://automationintesting.online/');
});

//Test Case ID - C1
test.describe('Booking Room by customers', () => {
  test('Book any room type and view as unavailable on homepage', async ({ page }) => {


    // Create any room booking
    await page.getByRole('button', { name: 'Book this room' }).first().click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.locator('div:nth-child(4) > .rbc-row-bg > div:nth-child(2)').click();
    await page.getByText('10', { exact: true }).click();
    await page.locator('div:nth-child(4) > .rbc-row-bg > div:nth-child(2)').dblclick();
    await page.locator('div').filter({ hasText: /^1 night\(s\) - £100$/ }).nth(1).click();
    await page.locator('.rbc-row-content > div:nth-child(2)').click();
    await page.getByText('night(s) - £100').click();
    await page.locator('.rbc-row-content > div:nth-child(2)').click();
    await page.locator('div:nth-child(4) > .rbc-row-bg > div:nth-child(3)').click();
    await page.getByPlaceholder('Firstname').click();
    await page.getByPlaceholder('Firstname').fill('John');
    await page.getByPlaceholder('Firstname').press('Tab');
    await page.getByPlaceholder('Lastname').fill('Smith');
    await page.getByPlaceholder('Lastname').press('Tab');
    await page.locator('input[name="email"]').fill('test@test.co.uk');
    await page.locator('input[name="email"]').press('Tab');
    await page.locator('input[name="phone"]').fill('12389764533');
    await page.getByRole('button', { name: 'Book', exact: true }).click();
    await page.getByRole('button', { name: 'Close' }).click();

    // Make sure the room booking is showing as unavailable
    await page.getByRole('button', { name: 'Book this room' }).first().click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByText('Unavailable').first().click();
});
});

