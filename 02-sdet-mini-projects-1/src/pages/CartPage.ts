import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly titleHeader: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.titleHeader = page.locator('[data-test="title"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async isLoaded(): Promise<boolean> {
    await this.titleHeader.waitFor({ state: 'visible' });
    return (await this.titleHeader.textContent()) === 'Your Cart';
  }

  async getItemNames(): Promise<string[]> {
    const nameLocators = await this.page.locator('[data-test="inventory-item-name"]').all();
    const names: string[] = [];
    for (const locator of nameLocators) {
      const text = await locator.textContent();
      if (text) names.push(text.trim());
    }
    return names;
  }

  async removeItemByName(productName: string): Promise<void> {
    const item = this.cartItems.filter({ hasText: productName });
    await item.locator('button[data-test^="remove"]').click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
