import { test as baseTest, expect } from '@playwright/test';
import {
  AuthServiceClient,
  InventoryServiceClient,
  OrderServiceClient,
  PaymentServiceClient,
} from '../clients/MicroserviceClients';

const PORT = 4001;
const BASE_URL = `http://127.0.0.1:${PORT}`;

export const test = baseTest.extend<{
  authService: AuthServiceClient;
  inventoryService: InventoryServiceClient;
  orderService: OrderServiceClient;
  paymentService: PaymentServiceClient;
  authToken: string;
}>({
  authService: async ({ request }, use) => {
    await use(new AuthServiceClient(request, BASE_URL));
  },

  inventoryService: async ({ request }, use) => {
    await use(new InventoryServiceClient(request, BASE_URL));
  },

  orderService: async ({ request }, use) => {
    await use(new OrderServiceClient(request, BASE_URL));
  },

  paymentService: async ({ request }, use) => {
    await use(new PaymentServiceClient(request, BASE_URL));
  },

  authToken: async ({ authService }, use) => {
    const res = await authService.login('sdet_tester', 'SecurePass123!');
    const data = await res.json();
    await use(data.token);
  },
});

export { expect };
