import { test, expect } from '../../src/fixtures/testFixtures';
import {
  BookingIdsListSchema,
  BookingItemSchema,
  CreateBookingResponseSchema,
} from '../../src/api/schemas/booking.schema';
import { TestData } from '../../src/data/testData';

test.describe('API Contract & Schema Validation Tests', () => {
  test('should validate the schema of the booking IDs list endpoint', async ({ bookingClient }) => {
    const response = await bookingClient.getBookingIds();
    expect(response.status()).toBe(200);

    const body = await response.json();
    const validationResult = BookingIdsListSchema.safeParse(body);

    if (!validationResult.success) {
      console.error('Schema errors:', validationResult.error.format());
    }
    expect(validationResult.success).toBe(true);
    expect(validationResult.data?.length).toBeGreaterThan(0);
  });

  test('should validate the contract of the create booking response', async ({ bookingClient }) => {
    const response = await bookingClient.createBooking(TestData.bookingPayload);
    expect(response.status()).toBe(200);

    const body = await response.json();
    const validationResult = CreateBookingResponseSchema.safeParse(body);

    if (!validationResult.success) {
      console.error('Schema errors:', validationResult.error.format());
    }
    expect(validationResult.success).toBe(true);
  });

  test('should validate the schema of a single booking item', async ({ bookingClient }) => {
    // Get first booking id
    const listResponse = await bookingClient.getBookingIds();
    const list = await listResponse.json();
    const sampleId = list[0].bookingid;

    const response = await bookingClient.getBooking(sampleId);
    expect(response.status()).toBe(200);

    const body = await response.json();
    const validationResult = BookingItemSchema.safeParse(body);

    if (!validationResult.success) {
      console.error('Schema errors:', validationResult.error.format());
    }
    expect(validationResult.success).toBe(true);
  });
});
