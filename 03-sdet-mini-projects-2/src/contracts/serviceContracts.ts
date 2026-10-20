import { z } from 'zod';

export const AuthResponseSchema = z.object({
  token: z.string().min(10),
  userId: z.string().startsWith('user-'),
  role: z.enum(['QA_ENGINEER', 'ADMIN', 'CUSTOMER']),
});

export const ProductSchema = z.object({
  id: z.string().startsWith('prod-'),
  name: z.string().min(1),
  price: z.number().positive(),
  stock: z.number().nonnegative(),
});

export const ProductListSchema = z.array(ProductSchema);

export const OrderItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().positive(),
});

export const OrderResponseSchema = z.object({
  id: z.string().startsWith('order-'),
  customerId: z.string(),
  items: z.array(OrderItemSchema).min(1),
  totalAmount: z.number().positive(),
  status: z.enum(['PENDING_PAYMENT', 'PAID', 'PAYMENT_FAILED', 'CANCELLED']),
  createdAt: z.string().datetime(),
});

export const PaymentResponseSchema = z.object({
  transactionId: z.string().startsWith('txn-'),
  orderId: z.string().startsWith('order-'),
  amountCharged: z.number().positive(),
  status: z.literal('CONFIRMED'),
  timestamp: z.string().datetime(),
});

export const ServiceErrorSchema = z.object({
  error: z.string(),
  service: z.string().optional(),
  retryAfterSeconds: z.number().optional(),
});
