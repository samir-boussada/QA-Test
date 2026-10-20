export const TestData = {
  users: {
    standard: {
      username: 'standard_user',
      password: 'secret_sauce',
    },
    lockedOut: {
      username: 'locked_out_user',
      password: 'secret_sauce',
    },
    invalid: {
      username: 'invalid_user',
      password: 'wrong_password',
    },
  },
  checkoutInfo: {
    firstName: 'Alex',
    lastName: 'Morgan',
    postalCode: '90210',
  },
  apiCredentials: {
    username: process.env.API_USERNAME || 'admin',
    password: process.env.API_PASSWORD || 'password123',
  },
  bookingPayload: {
    firstname: 'John',
    lastname: 'Doe',
    totalprice: 150,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-11-01',
      checkout: '2026-11-05',
    },
    additionalneeds: 'Late Checkout',
  },
};
