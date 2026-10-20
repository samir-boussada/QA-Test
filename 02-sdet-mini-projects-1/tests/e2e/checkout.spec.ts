import { test, expect } from '../../src/fixtures/testFixtures';
import { TestData } from '../../src/data/testData';

test.describe('E2E Checkout Workflow Tests', () => {
  test('should complete the entire purchase journey successfully', async ({
    loggedInPage,
    cartPage,
    checkoutPage,
  }) => {
    const { inventoryPage } = loggedInPage;
    const productName = 'Sauce Labs Backpack';

    // 1. Add item to cart
    await inventoryPage.addItemToCartByName(productName);
    expect(await inventoryPage.getCartBadgeCount()).toBe(1);

    // 2. Open cart and verify item
    await inventoryPage.openCart();
    expect(await cartPage.isLoaded()).toBe(true);
    const cartItems = await cartPage.getItemNames();
    expect(cartItems).toContain(productName);

    // 3. Proceed to checkout
    await cartPage.proceedToCheckout();

    // 4. Fill customer details and continue
    await checkoutPage.fillInformation(
      TestData.checkoutInfo.firstName,
      TestData.checkoutInfo.lastName,
      TestData.checkoutInfo.postalCode
    );

    // 5. Verify total is calculated and complete checkout
    const totalText = await checkoutPage.getTotalAmountText();
    expect(totalText).toContain('Total: $');

    await checkoutPage.finishCheckout();

    // 6. Verify order confirmation
    const confirmation = await checkoutPage.getConfirmationMessage();
    expect(confirmation).toBe('Thank you for your order!');
  });

  test('should show validation error when postal code is missing', async ({
    loggedInPage,
    cartPage,
    checkoutPage,
  }) => {
    const { inventoryPage } = loggedInPage;
    await inventoryPage.addItemToCartByName('Sauce Labs Onesie');
    await inventoryPage.openCart();
    await cartPage.proceedToCheckout();

    // Fill only first and last name, omitting postal code
    await checkoutPage.fillInformation(TestData.checkoutInfo.firstName, TestData.checkoutInfo.lastName, '');

    const errorMessage = await checkoutPage.getErrorMessage();
    expect(errorMessage).toContain('Error: Postal Code is required');
  });
});
