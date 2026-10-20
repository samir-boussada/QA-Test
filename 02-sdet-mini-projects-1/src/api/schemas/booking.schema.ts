import { z } from 'zod';

export const BookingDatesSchema = z.object({
  checkin: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be YYYY-MM-DD format'),
  checkout: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be YYYY-MM-DD format'),
});

export const BookingItemSchema = z.object({
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  totalprice: z.number().nonnegative(),
  depositpaid: z.boolean(),
  bookingdates: BookingDatesSchema,
  additionalneeds: z.string().optional(),
});

export const CreateBookingResponseSchema = z.object({
  bookingid: z.number().int().positive(),
  booking: BookingItemSchema,
});

export const BookingIdItemSchema = z.object({
  bookingid: z.number().int().positive(),
});

export const BookingIdsListSchema = z.array(BookingIdItemSchema);

export const AuthTokenResponseSchema = z.object({
  token: z.string().min(10),
});

export type BookingItem = z.infer<typeof BookingItemSchema>;
export type CreateBookingResponse = z.infer<typeof CreateBookingResponseSchema>;
