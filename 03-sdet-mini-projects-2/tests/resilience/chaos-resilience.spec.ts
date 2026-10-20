import { test, expect } from '../../src/fixtures/microserviceFixtures';
import { ServiceErrorSchema } from '../../src/contracts/serviceContracts';

test.describe('Chaos Engineering & Microservice Resilience Tests', () => {
  test('should handle Payment Service 503 temporary unavailability', async ({ paymentService }) => {
    // Inject failure simulation
    const res = await paymentService.charge(
      {
        orderId: 'order-999',
        amount: 99.99,
        paymentMethod: 'MASTERCARD',
      },
      true // simulateFailure = true
    );

    expect(res.status()).toBe(503);
    const body = await res.json();

    const parsed = ServiceErrorSchema.safeParse(body);
    expect(parsed.success).toBe(true);
    expect(body.error).toContain('Payment Gateway Temporarily Unavailable');
    expect(body.retryAfterSeconds).toBe(2);
  });

  test('should execute automated retry and succeed when service recovers', async ({ paymentService }) => {
    const payload = {
      orderId: 'order-retry-test',
      amount: 49.99,
      paymentMethod: 'PAYPAL',
    };

    let attempts = 0;
    let finalStatus = 0;

    // Retry pattern with backoff
    for (let i = 1; i <= 3; i++) {
      attempts++;
      // Simulate failure on first attempt, recovery on second attempt
      const simulateDown = i === 1;
      const res = await paymentService.charge(payload, simulateDown);
      finalStatus = res.status();

      if (finalStatus === 200) {
        break;
      }
      // Wait 100ms before retry
      await new Promise((r) => setTimeout(r, 100));
    }

    expect(attempts).toBe(2);
    expect(finalStatus).toBe(200);
  });

  test('should return 409 Conflict when reserving out-of-stock product', async ({ inventoryService }) => {
    // prod-103 has 0 stock in mock database
    const res = await inventoryService.reserveStock('prod-103', 1);
    expect(res.status()).toBe(409);

    const body = await res.json();
    expect(body.error).toBe('Insufficient stock available');
  });

  test('should reject order creation with 401 when Bearer token is missing', async ({ orderService }) => {
    const res = await orderService.createOrder('INVALID_EMPTY_TOKEN', {
      customerId: 'user-unauth',
      items: [{ productId: 'prod-101', quantity: 1 }],
      totalAmount: 49.99,
    });

    // Our mock server requires Bearer token format
    expect(res.status()).toBe(401);
    const body = await res.json();
    expect(body.error).toContain('Missing or invalid Bearer token');
  });
});
