import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly titleHeader: Locator;
  readonly inventoryItems: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly sortSelect: Locator;

  constructor(page: Page) {
    super(page);
    this.titleHeader = page.locator('[data-test="title"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.sortSelect = page.locator('[data-test="product-sort-container"]');
  }

  async isLoaded(): Promise<boolean> {
    await this.titleHeader.waitFor({ state: 'visible' });
    return (await this.titleHeader.textContent()) === 'Products';
  }

  async addItemToCartByName(productName: string): Promise<void> {
    const item = this.inventoryItems.filter({ hasText: productName });
    await item.locator('button[data-test^="add-to-cart"]').click();
  }

  async removeItemFromCartByName(productName: string): Promise<void> {
    const item = this.inventoryItems.filter({ hasText: productName });
    await item.locator('button[data-test^="remove"]').click();
  }

  async getCartBadgeCount(): Promise<number> {
    if (await this.cartBadge.isVisible()) {
      const text = await this.cartBadge.textContent();
      return text ? parseInt(text, 10) : 0;
    }
    return 0;
  }

  async getAllItemPrices(): Promise<number[]> {
    const priceElements = await this.page.locator('[data-test="inventory-item-price"]').all();
    const prices: number[] = [];
    for (const el of priceElements) {
      const text = await el.textContent();
      if (text) {
        prices.push(parseFloat(text.replace('$', '')));
      }
    }
    return prices;
  }

  async sortBy(optionValue: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.sortSelect.selectOption(optionValue);
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
