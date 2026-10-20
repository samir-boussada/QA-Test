import { test, expect } from '../../src/fixtures/microserviceFixtures';
import {
  OrderResponseSchema,
  PaymentResponseSchema,
} from '../../src/contracts/serviceContracts';

test.describe('Distributed Order Fulfillment Workflow (Multi-Service E2E)', () => {
  test('should orchestrate order placement, stock reservation, and payment across 4 services', async ({
    inventoryService,
    orderService,
    paymentService,
    authToken,
  }) => {
    const targetProductId = 'prod-101';
    const quantityToBuy = 2;

    // Step 1: Query Inventory Service
    const productRes = await inventoryService.getProductById(targetProductId);
    expect(productRes.status()).toBe(200);
    const product = await productRes.json();
    const initialStock = product.stock;
    expect(initialStock).toBeGreaterThanOrEqual(quantityToBuy);

    // Step 2: Reserve Stock in Inventory Service
    const reserveRes = await inventoryService.reserveStock(targetProductId, quantityToBuy);
    expect(reserveRes.status()).toBe(200);
    const reserveData = await reserveRes.json();
    expect(reserveData.remainingStock).toBe(initialStock - quantityToBuy);

    // Step 3: Create Order in Order Service
    const orderPayload = {
      customerId: 'user-8841',
      items: [{ productId: targetProductId, quantity: quantityToBuy }],
      totalAmount: product.price * quantityToBuy,
    };

    const orderRes = await orderService.createOrder(authToken, orderPayload);
    expect(orderRes.status()).toBe(201);
    const order = await orderRes.json();

    const orderValidation = OrderResponseSchema.safeParse(order);
    expect(orderValidation.success).toBe(true);
    expect(order.status).toBe('PENDING_PAYMENT');

    // Step 4: Process Payment in Payment Service
    const paymentPayload = {
      orderId: order.id,
      amount: order.totalAmount,
      paymentMethod: 'CREDIT_CARD_VISA',
    };

    const paymentRes = await paymentService.charge(paymentPayload);
    expect(paymentRes.status()).toBe(200);
    const paymentData = await paymentRes.json();

    const paymentValidation = PaymentResponseSchema.safeParse(paymentData);
    expect(paymentValidation.success).toBe(true);
    expect(paymentData.status).toBe('CONFIRMED');

    // Step 5: Verify Order status transitioned to PAID
    const verifiedOrderRes = await orderService.getOrder(order.id);
    expect(verifiedOrderRes.status()).toBe(200);
    const verifiedOrder = await verifiedOrderRes.json();
    expect(verifiedOrder.status).toBe('PAID');
  });
});
