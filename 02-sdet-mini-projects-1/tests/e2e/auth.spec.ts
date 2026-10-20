import { test, expect } from '../../src/fixtures/testFixtures';
import { TestData } from '../../src/data/testData';

test.describe('Authentication Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('should successfully log in with standard credentials', async ({ loginPage, inventoryPage }) => {
    await loginPage.login(TestData.users.standard.username, TestData.users.standard.password);

    await expect(inventoryPage.titleHeader).toBeVisible();
    await expect(inventoryPage.titleHeader).toHaveText('Products');
  });

  test('should display locked out error for locked user', async ({ loginPage }) => {
    await loginPage.login(TestData.users.lockedOut.username, TestData.users.lockedOut.password);

    const errorMessage = await loginPage.getErrorMessageText();
    expect(errorMessage).toContain('Sorry, this user has been locked out.');
  });

  test('should display error message on invalid credentials', async ({ loginPage }) => {
    await loginPage.login(TestData.users.invalid.username, TestData.users.invalid.password);

    const errorMessage = await loginPage.getErrorMessageText();
    expect(errorMessage).toContain('Username and password do not match any user in this service');
  });
});
