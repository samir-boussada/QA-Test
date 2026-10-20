import { test as baseTest, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { BookingClient } from '../api/BookingClient';
import { TestData } from '../data/testData';

type CustomFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  bookingClient: BookingClient;
  loggedInPage: {
    page: Page;
    inventoryPage: InventoryPage;
  };
};

export const test = baseTest.extend<CustomFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  bookingClient: async ({ request }, use) => {
    await use(new BookingClient(request));
  },

  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(TestData.users.standard.username, TestData.users.standard.password);
    await expect(inventoryPage.titleHeader).toHaveText('Products');

    await use({ page, inventoryPage });
  },
});

export { expect };
