import http from 'k6/http';
import { check, sleep } from 'k6';

// Performance Test Configuration
export const options = {
  stages: [
    { duration: '30s', target: 20 }, // Ramp-up to 20 virtual users
    { duration: '1m', target: 20 },  // Stay at 20 virtual users (steady state)
    { duration: '20s', target: 0 },  // Ramp-down to 0 users
  ],
  thresholds: {
    // 95% of requests must complete below 600ms
    http_req_duration: ['p(95)<600'],
    // HTTP errors must be less than 1%
    http_req_failed: ['rate<0.01'],
  },
};

const BASE_URL = __ENV.API_BASE_URL || 'https://restful-booker.herokuapp.com';

export default function () {
  const res = http.get(`${BASE_URL}/booking`);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response body is not empty': (r) => r.body.length > 0,
    'transaction time OK': (r) => r.timings.duration < 1000,
  });

  sleep(1);
}
