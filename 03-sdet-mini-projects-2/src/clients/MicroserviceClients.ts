import { APIRequestContext, APIResponse } from '@playwright/test';

export class AuthServiceClient {
  constructor(private request: APIRequestContext, private baseUrl: string) {}

  async login(username: string, password: string): Promise<APIResponse> {
    return this.request.post(`${this.baseUrl}/api/v1/auth/login`, {
      data: { username, password },
    });
  }
}

export class InventoryServiceClient {
  constructor(private request: APIRequestContext, private baseUrl: string) {}

  async getProducts(): Promise<APIResponse> {
    return this.request.get(`${this.baseUrl}/api/v1/inventory/items`);
  }

  async getProductById(id: string): Promise<APIResponse> {
    return this.request.get(`${this.baseUrl}/api/v1/inventory/items/${id}`);
  }

  async reserveStock(productId: string, quantity: number): Promise<APIResponse> {
    return this.request.patch(`${this.baseUrl}/api/v1/inventory/reserve`, {
      data: { productId, quantity },
    });
  }
}

export class OrderServiceClient {
  constructor(private request: APIRequestContext, private baseUrl: string) {}

  async createOrder(
    token: string,
    payload: { customerId: string; items: { productId: string; quantity: number }[]; totalAmount: number }
  ): Promise<APIResponse> {
    return this.request.post(`${this.baseUrl}/api/v1/orders`, {
      headers: { Authorization: `Bearer ${token}` },
      data: payload,
    });
  }

  async getOrder(id: string): Promise<APIResponse> {
    return this.request.get(`${this.baseUrl}/api/v1/orders/${id}`);
  }
}

export class PaymentServiceClient {
  constructor(private request: APIRequestContext, private baseUrl: string) {}

  async charge(payload: { orderId: string; amount: number; paymentMethod: string }, simulateFailure: boolean = false): Promise<APIResponse> {
    const headers: Record<string, string> = {};
    if (simulateFailure) {
      headers['X-Simulate-Failure'] = 'true';
    }

    return this.request.post(`${this.baseUrl}/api/v1/payments/charge`, {
      headers,
      data: payload,
    });
  }
}
