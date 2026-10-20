import { test, expect } from '../../src/fixtures/testFixtures';
import { AuthTokenResponseSchema } from '../../src/api/schemas/booking.schema';
import { TestData } from '../../src/data/testData';

test.describe('API Authentication Tests', () => {
  test('should generate auth token with valid admin credentials', async ({ bookingClient }) => {
    const response = await bookingClient.authenticate(
      TestData.apiCredentials.username,
      TestData.apiCredentials.password
    );

    expect(response.status()).toBe(200);
    const body = await response.json();

    // Runtime Schema Assertion
    const parsed = AuthTokenResponseSchema.safeParse(body);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.token).toBeDefined();
      expect(parsed.data.token.length).toBeGreaterThan(5);
    }
  });

  test('should reject authentication with bad credentials', async ({ bookingClient }) => {
    const response = await bookingClient.authenticate('bad_user', 'bad_pass');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('reason', 'Bad credentials');
  });
});
