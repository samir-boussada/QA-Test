import { test, expect } from '../../src/fixtures/testFixtures';

test.describe('Inventory & Cart Management Tests', () => {
  test('should add and remove items dynamically updating the cart badge', async ({ loggedInPage }) => {
    const { inventoryPage } = loggedInPage;

    // Cart starts empty (badge not visible or 0)
    expect(await inventoryPage.getCartBadgeCount()).toBe(0);

    // Add first item
    await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    expect(await inventoryPage.getCartBadgeCount()).toBe(1);

    // Add second item
    await inventoryPage.addItemToCartByName('Sauce Labs Bike Light');
    expect(await inventoryPage.getCartBadgeCount()).toBe(2);

    // Remove first item
    await inventoryPage.removeItemFromCartByName('Sauce Labs Backpack');
    expect(await inventoryPage.getCartBadgeCount()).toBe(1);
  });

  test('should sort products by price from low to high correctly', async ({ loggedInPage }) => {
    const { inventoryPage } = loggedInPage;

    // Apply sort Low to High
    await inventoryPage.sortBy('lohi');

    // Retrieve and verify prices are sorted ascending
    const prices = await inventoryPage.getAllItemPrices();
    expect(prices.length).toBeGreaterThan(0);

    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
  });
});
