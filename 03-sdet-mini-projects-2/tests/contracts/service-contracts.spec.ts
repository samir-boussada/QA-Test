import { test, expect } from '../../src/fixtures/microserviceFixtures';
import {
  AuthResponseSchema,
  ProductListSchema,
  ProductSchema,
} from '../../src/contracts/serviceContracts';

test.describe('Microservice Consumer Contract Validations', () => {
  test('should satisfy Auth Service contract on successful login', async ({ authService }) => {
    const res = await authService.login('sdet_tester', 'SecurePass123!');
    expect(res.status()).toBe(200);

    const body = await res.json();
    const result = AuthResponseSchema.safeParse(body);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.role).toBe('QA_ENGINEER');
    }
  });

  test('should satisfy Inventory Service product list contract', async ({ inventoryService }) => {
    const res = await inventoryService.getProducts();
    expect(res.status()).toBe(200);

    const body = await res.json();
    const result = ProductListSchema.safeParse(body);
    expect(result.success).toBe(true);
    expect(result.data?.length).toBeGreaterThan(0);
  });

  test('should satisfy single product details contract', async ({ inventoryService }) => {
    const res = await inventoryService.getProductById('prod-101');
    expect(res.status()).toBe(200);

    const body = await res.json();
    const result = ProductSchema.safeParse(body);
    expect(result.success).toBe(true);
  });
});
