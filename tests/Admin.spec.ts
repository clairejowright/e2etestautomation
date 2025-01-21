import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
await page.goto('https://automationintesting.online/');
await page.getByRole('link', { name: 'Admin panel', exact: true }).click();
await page.getByTestId('username').click();
await page.getByTestId('username').fill('admin');
await page.getByTestId('username').press('Tab');
await page.getByTestId('password').fill('password');
await page.getByTestId('submit').click();
});

test.describe('Admin user funcationality', () => {
test('Add in new room type and check is present on homepage and can be viewed when not logged in as admin', async ({ page }) => {
await page.locator('#type').selectOption('Suite');
await page.getByTestId('roomName').click();
await page.getByTestId('roomName').fill('34a');
await page.locator('#accessible').selectOption('true');
await page.locator('#roomPrice').click();
await page.locator('#roomPrice').fill('500');
await page.getByLabel('Refreshments').check();
await page.getByLabel('TV').check();
await page.getByRole('button', { name: 'Create' }).click();
await page.getByRole('link', { name: 'Logout' }).click();
await page.goto('https://automationintesting.online/');
await page.getByRole('heading', { name: 'Suite' }).first().click();
await page.getByRole('img', { name: 'Preview image of room402a' }).click();

});


test('Add in new room type, check is present on home page, make an edit and then check is updated', async ({ page }) => {
await page.locator('#type').selectOption('Twin');
await page.getByTestId('roomName').click();
await page.getByTestId('roomName').fill('444');
await page.locator('#roomPrice').click();
await page.locator('#roomPrice').fill('250');
await page.getByLabel('WiFi').check();
await page.getByRole('button', { name: 'Create' }).click();
await page.locator('div').filter({ hasText: /^444$/ }).click();
await page.getByRole('button', { name: 'Edit' }).click();
await page.getByLabel('Type:').selectOption('Single');
await page.getByRole('button', { name: 'Update' }).click();
await page.getByText('Type: Single').click();
await page.getByRole('link', { name: 'Front Page' }).click();

  });

});
