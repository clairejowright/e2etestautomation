import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://automationintesting.online');
});

//Test Case ID - C1
test.describe('Booking Room by customers', () => {
test('Book any room type and see confirmation message', async ({ page }) => {

  //Book a room
  await page.getByRole('button', { name: 'Book this room' }).first().click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.locator('div:nth-child(5) > .rbc-row-bg > div:nth-child(3)').dblclick();
  await page.getByPlaceholder('Firstname').click();
  await page.getByPlaceholder('Firstname').fill('John-Billy');
  await page.getByPlaceholder('Firstname').press('Tab');
  await page.getByPlaceholder('Lastname').fill('Ray');
  await page.getByPlaceholder('Lastname').press('Tab');
  await page.locator('input[name="email"]').fill('jbr@hotmail.com');
  await page.locator('input[name="email"]').press('Tab');
  await page.locator('input[name="phone"]').fill('34567890928374');
  await page.getByRole('button', { name: 'Book', exact: true }).click();
  await expect(page.getByLabel('onRequestClose Example')).toContainText('Booking Successful!Congratulations! Your booking has been confirmed for:2025-03-18 - 2025-03-19');
  await page.getByRole('button', { name: 'Close' }).click();
});

//Test Case ID - C2
test('Customer can view an error message when leaving out booking details', async ({ page }) => {

  //Booking room
  await page.getByRole('button', { name: 'Book this room' }).first().click();
  await page.getByRole('button', { name: 'Next' }).click();

  //Filling in details but leaving out email
  await page.getByPlaceholder('Firstname').click();
  await page.getByPlaceholder('Firstname').fill('Anne');
  await page.getByPlaceholder('Firstname').press('Tab');
  await page.getByPlaceholder('Lastname').fill('Reid');
  await page.locator('input[name="phone"]').click();
  await page.locator('input[name="phone"]').fill('1234567898765');
  await page.getByRole('button', { name: 'Book', exact: true }).click();

  //Error message being shown
  await expect(page.getByText('must not be empty')).toBeVisible();

});

//Test Case ID - C3
test('Customer can use contact form and admin can view', async ({ page }) => {

  //Fill in contact form
  await page.getByTestId('ContactName').click();
  await page.getByTestId('ContactName').fill('Anne-Jane Smyth');
  await page.getByTestId('ContactName').press('Tab');
  await page.getByTestId('ContactEmail').fill('ajsmyth@yahoo.de');
  await page.getByTestId('ContactPhone').click();
  await page.getByTestId('ContactPhone').fill('00353797364572');
  await page.getByTestId('ContactSubject').click();
  await page.getByTestId('ContactSubject').fill('Query');
  await page.getByTestId('ContactDescription').click();
  await page.getByTestId('ContactDescription').fill('I would like to host an event in your hotel in may.');
  await page.getByRole('button', { name: 'Submit' }).click();
  //Check for confirmation message
  await expect(page.locator('#root')).toContainText('Thanks for getting in touch Anne-Jane Smyth!');

  //Log in as admin and check message is available
  await page.goto('https://automationintesting.online/');
  await page.getByRole('link', { name: 'Admin panel', exact: true }).click();
  await page.getByTestId('username').click();
  await page.getByTestId('username').fill('admin');
  await page.getByTestId('username').press('Tab');
  await page.getByTestId('password').fill('password');
  await page.getByTestId('submit').click();
  await page.getByRole('link', { name: '' }).click();
  await page.getByText('Anne-Jane Smyth').click();
  await page.getByText('I would like to host an event').click();
  await page.getByRole('button', { name: 'Close' }).click();
});

});

