import http from 'node:http';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

interface Order {
  id: string;
  customerId: string;
  items: { productId: string; quantity: number }[];
  totalAmount: number;
  status: 'PENDING_PAYMENT' | 'PAID' | 'PAYMENT_FAILED' | 'CANCELLED';
  createdAt: string;
}

// In-Memory Database
const products: Map<string, Product> = new Map([
  ['prod-101', { id: 'prod-101', name: 'Cloud Microservice Course', price: 49.99, stock: 15 }],
  ['prod-102', { id: 'prod-102', name: 'SDET Automation Handbook', price: 29.99, stock: 8 }],
  ['prod-103', { id: 'prod-103', name: 'Docker & Kubernetes Guide', price: 39.99, stock: 0 }],
]);

const orders: Map<string, Order> = new Map();

function sendJson(res: http.ServerResponse, status: number, data: any) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Simulate-Failure',
  });
  res.end(JSON.stringify(data));
}

function parseBody(req: http.IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

export function createMicroserviceApp(port: number = 4001): http.Server {
  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url || '/', `http://127.0.0.1:${port}`);
    const method = req.method || 'GET';

    if (method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*',
      });
      return res.end();
    }

    try {
      // 1. AUTH SERVICE
      if (url.pathname === '/api/v1/auth/login' && method === 'POST') {
        const body = await parseBody(req);
        if (body.username === 'sdet_tester' && body.password === 'SecurePass123!') {
          return sendJson(res, 200, {
            token: 'jwt.mock.token.sdet_tester_session',
            userId: 'user-8841',
            role: 'QA_ENGINEER',
          });
        }
        return sendJson(res, 401, { error: 'Invalid username or password' });
      }

      // 2. INVENTORY / CATALOG SERVICE
      if (url.pathname === '/api/v1/inventory/items' && method === 'GET') {
        return sendJson(res, 200, Array.from(products.values()));
      }

      if (url.pathname.startsWith('/api/v1/inventory/items/') && method === 'GET') {
        const id = url.pathname.replace('/api/v1/inventory/items/', '');
        const item = products.get(id);
        if (!item) return sendJson(res, 404, { error: 'Product not found' });
        return sendJson(res, 200, item);
      }

      if (url.pathname === '/api/v1/inventory/reserve' && method === 'PATCH') {
        const { productId, quantity } = await parseBody(req);
        const item = products.get(productId);
        if (!item) return sendJson(res, 404, { error: 'Product not found' });
        if (item.stock < quantity) {
          return sendJson(res, 409, { error: 'Insufficient stock available' });
        }
        item.stock -= quantity;
        return sendJson(res, 200, { success: true, remainingStock: item.stock });
      }

      // 3. ORDER SERVICE
      if (url.pathname === '/api/v1/orders' && method === 'POST') {
        const auth = req.headers['authorization'];
        if (!auth || !auth.startsWith('Bearer jwt.mock.token')) {
          return sendJson(res, 401, { error: 'Missing or invalid Bearer token' });
        }

        const { customerId, items, totalAmount } = await parseBody(req);
        const orderId = `order-${Date.now()}`;
        const newOrder: Order = {
          id: orderId,
          customerId,
          items,
          totalAmount,
          status: 'PENDING_PAYMENT',
          createdAt: new Date().toISOString(),
        };
        orders.set(orderId, newOrder);
        return sendJson(res, 201, newOrder);
      }

      if (url.pathname.startsWith('/api/v1/orders/') && method === 'GET') {
        const id = url.pathname.replace('/api/v1/orders/', '');
        const order = orders.get(id);
        if (!order) return sendJson(res, 404, { error: 'Order not found' });
        return sendJson(res, 200, order);
      }

      // 4. PAYMENT SERVICE (with Chaos Injection capability)
      if (url.pathname === '/api/v1/payments/charge' && method === 'POST') {
        // Chaos / Resilience trigger
        if (req.headers['x-simulate-failure'] === 'true') {
          return sendJson(res, 503, {
            error: 'Payment Gateway Temporarily Unavailable',
            service: 'PaymentService',
            retryAfterSeconds: 2,
          });
        }

        const { orderId, amount } = await parseBody(req);
        const order = orders.get(orderId);
        if (order) {
          order.status = 'PAID';
        }

        return sendJson(res, 200, {
          transactionId: `txn-${Date.now()}`,
          orderId,
          amountCharged: amount,
          status: 'CONFIRMED',
          timestamp: new Date().toISOString(),
        });
      }

      // 404 Fallback
      return sendJson(res, 404, { error: 'Endpoint not found' });
    } catch (e: any) {
      return sendJson(res, 500, { error: 'Internal Server Error', details: e.message });
    }
  });

  return server;
}
