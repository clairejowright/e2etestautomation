import { test, expect } from '@playwright/test';

//Before each test go to URL and log in as admin
test.beforeEach(async ({ page }) => {
  await page.goto('https://automationintesting.online/');
  await page.getByRole('link', { name: 'Admin panel', exact: true }).click();
  await page.getByTestId('username').click();
  await page.getByTestId('username').fill('admin');
  await page.getByTestId('password').click();
  await page.getByTestId('password').fill('password');
  await page.getByTestId('submit').click();
  });

//Test Case ID - A1
test.describe('Admin User', () => {
test('Add in new room type and check is present on homepage and can be viewed when not logged in as admin', async ({ page }) => {

  //Adding a suite room type
  await page.locator('#type').selectOption('Suite');
  await page.getByTestId('roomName').click();
  await page.getByTestId('roomName').fill('402a');
  await page.locator('#accessible').selectOption('true');
  await page.locator('#roomPrice').click();
  await page.locator('#roomPrice').fill('500');
  await page.getByLabel('Refreshments').check();
  await page.getByLabel('TV').check();
  await page.getByRole('button', { name: 'Create' }).click();

  //Log out as admin and check new room is created
  await page.getByRole('link', { name: 'Logout' }).click();
  await page.goto('https://automationintesting.online/');
  await page.getByRole('heading', { name: 'Suite' }).first().click();
  await page.getByRole('img', { name: 'Preview image of room402a' }).click();
  });

//Test Case ID - A2
test('Add in new room type, check is present on home page, make an edit and then check is updated', async ({ page }) => {

  //Add in room type
  await page.locator('#type').selectOption('Twin');
  await page.getByTestId('roomName').click();
  await page.getByTestId('roomName').fill('444');
  await page.locator('#roomPrice').click();
  await page.locator('#roomPrice').fill('250');
  await page.getByLabel('WiFi').check();
  await page.getByRole('button', { name: 'Create' }).click();
  await page.locator('div').filter({ hasText: /^444$/ }).click();

  //Edit room type and check updated
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.getByLabel('Type:').selectOption('Single');
  await page.getByRole('button', { name: 'Update' }).click();
  await page.getByText('Type: Single').click();
  await page.getByRole('link', { name: 'Front Page' }).click();
});

//Test Case ID - A3
test('Admin User can add in image for room type', async ({ page }) => {
  //Image to be used for testing https://cdn.pixabay.com/photo/2016/10/18/09/02/hotel-1749602_1280.jpg 
  //Add in room type
  await page.getByTestId('roomName').click();
  await page.getByTestId('roomName').fill('345');
  await page.getByLabel('WiFi').check();
  await page.locator('#roomPrice').click();
  await page.locator('#roomPrice').fill('45');
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByText('345').click();
  await page.getByRole('button', { name: 'Edit' }).click();
    
  //Update image
  await page.getByLabel('Image:').fill('https://cdn.pixabay.com/photo/2016/10/18/09/02/hotel-1749602_1280.jpg');
  await page.getByRole('button', { name: 'Update' }).click();
  await page.getByRole('img', { name: 'Room: 345 preview image' }).click();
  await page.getByRole('link', { name: 'Front Page' }).click();
  await page.getByRole('img', { name: 'Preview image of room345' }).click();
  const locator = page.locator('Image');

  // Assert attribute existence for new image
  await expect(locator).toHaveAttribute('https://cdn.pixabay.com/photo/2016/10/18/09/02/hotel-1749602_1280.jpg');
  });

//Test Case ID - A4
test('Admin User can delete room and will not be viewable on homepage', async ({ page }) => {
  
  //Add in room type
  await page.getByTestId('roomName').click();
  await page.getByTestId('roomName').fill('124');
  await page.locator('#type').selectOption('Twin');
  await page.locator('#roomPrice').click();
  await page.locator('#roomPrice').fill('34');
  await page.getByLabel('WiFi').check();
  await page.getByRole('button', { name: 'Create' }).click();
  await page.locator('[id="\\33 1"]').click();
  await page.getByRole('link', { name: 'Front Page' }).click();

  //Check room is not present on home page
  await expect(page.locator("alt=Preview image of room124")).toBeHidden();  
  });

  //Test Case ID - A5
test('Admin user can make update to branding page and then changes viewable on homepage', async ({ page }) => {
  
  //Update branding text
  await page.getByRole('link', { name: 'Branding' }).click();
  await page.getByText('Hotel B and B').click();
  await page.getByText('Hotel B and B').fill('Hotel B and B with lots of rooms');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Close' }).click();

  //Go to frontpage and check for updated text
  await page.getByRole('link', { name: 'Front Page' }).click();
  await page.getByText('Hotel B and B with lots of').click();
});


//Test Case ID - A6
test('Admin user can view a room booking via in tray menu option', async ({ page }) => {

//Book room
 await page.getByRole('button', { name: 'Book this room' }).first().click();
 await page.getByRole('button', { name: 'Next' }).click();
 await page.locator('div').filter({ hasText: /^18$/ }).dblclick();
 await page.getByPlaceholder('Firstname').click();
 await page.getByPlaceholder('Firstname').fill('Anne');
 await page.getByPlaceholder('Firstname').press('Tab');
 await page.getByPlaceholder('Lastname').fill('Reid');
 await page.getByPlaceholder('Lastname').press('Tab');
 await page.locator('input[name="email"]').fill('areid456@yahoo.com');
 await page.locator('input[name="email"]').press('Tab');
 await page.locator('input[name="phone"]').fill('07654378976453');
 await page.getByRole('button', { name: 'Book', exact: true }).click();

 //Confirm booking success message
 await expect(page.getByText('Congratulations! Your booking')).toBeVisible();
 await page.getByRole('button', { name: 'Close' }).click();

 //Log in as admin
 await page.getByRole('link', { name: 'Admin panel', exact: true }).click();
 await page.getByTestId('username').click();
 await page.getByTestId('username').fill('admin');
 await page.getByTestId('username').press('Tab');
 await page.getByTestId('password').fill('password');
 await page.getByTestId('submit').click();

 //go to in tray in menu and confirm booking
 await page.getByRole('link', { name: '' }).click();
 await page.getByText('Anne Reid').click();
 await expect(page.getByTestId('message')).toContainText('You have a new booking from Anne Reid. They have booked a room for the following dates: 2025-02-18 to 2025-02-19');
 await page.getByRole('button', { name: 'Close' }).click();
});

});

   



