import { test, expect } from '../../src/fixtures/testFixtures';
import { TestData } from '../../src/data/testData';
import { CreateBookingResponseSchema } from '../../src/api/schemas/booking.schema';

test.describe('API Booking Lifecycle (CRUD)', () => {
  // Execute sequentially so subsequent steps can mutate the created booking
  test.describe.configure({ mode: 'serial' });

  let authToken: string;
  let createdBookingId: number;

  test.beforeAll(async ({ bookingClient }) => {
    // Acquire auth token for mutation requests
    const authResponse = await bookingClient.authenticate(
      TestData.apiCredentials.username,
      TestData.apiCredentials.password
    );
    expect(authResponse.status()).toBe(200);
    const authData = await authResponse.json();
    authToken = authData.token;
  });

  test('should create a new booking', async ({ bookingClient }) => {
    const response = await bookingClient.createBooking(TestData.bookingPayload);
    expect(response.status()).toBe(200);

    const body = await response.json();
    const parsed = CreateBookingResponseSchema.safeParse(body);
    expect(parsed.success).toBe(true);

    if (parsed.success) {
      createdBookingId = parsed.data.bookingid;
      expect(parsed.data.booking.firstname).toBe(TestData.bookingPayload.firstname);
      expect(parsed.data.booking.lastname).toBe(TestData.bookingPayload.lastname);
      expect(parsed.data.booking.totalprice).toBe(TestData.bookingPayload.totalprice);
    }
  });

  test('should retrieve the created booking by ID', async ({ bookingClient }) => {
    expect(createdBookingId).toBeDefined();

    const response = await bookingClient.getBooking(createdBookingId);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.firstname).toBe(TestData.bookingPayload.firstname);
    expect(body.lastname).toBe(TestData.bookingPayload.lastname);
  });

  test('should update the booking using PUT with authentication token', async ({ bookingClient }) => {
    expect(createdBookingId).toBeDefined();

    const updatedPayload = {
      ...TestData.bookingPayload,
      totalprice: 299,
      additionalneeds: 'Late Checkout & Breakfast Included',
    };

    const response = await bookingClient.updateBooking(createdBookingId, updatedPayload, authToken);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.totalprice).toBe(299);
    expect(body.additionalneeds).toBe('Late Checkout & Breakfast Included');
  });

  test('should delete the booking and verify it no longer exists', async ({ bookingClient }) => {
    expect(createdBookingId).toBeDefined();

    // 1. Delete
    const deleteResponse = await bookingClient.deleteBooking(createdBookingId, authToken);
    expect(deleteResponse.status()).toBe(201);

    // 2. Query again to verify 404
    const getResponse = await bookingClient.getBooking(createdBookingId);
    expect(getResponse.status()).toBe(404);
  });
});
