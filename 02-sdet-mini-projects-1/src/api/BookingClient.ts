import { APIRequestContext, APIResponse } from '@playwright/test';
import { BookingItem } from './schemas/booking.schema';

export class BookingClient {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async authenticate(username: string, password: string): Promise<APIResponse> {
    return this.request.post('/auth', {
      data: {
        username,
        password,
      },
    });
  }

  async createBooking(payload: BookingItem): Promise<APIResponse> {
    return this.request.post('/booking', {
      data: payload,
    });
  }

  async getBooking(id: number): Promise<APIResponse> {
    return this.request.get(`/booking/${id}`);
  }

  async getBookingIds(params?: Record<string, string>): Promise<APIResponse> {
    return this.request.get('/booking', {
      params,
    });
  }

  async updateBooking(id: number, payload: BookingItem, token: string): Promise<APIResponse> {
    return this.request.put(`/booking/${id}`, {
      headers: {
        Cookie: `token=${token}`,
      },
      data: payload,
    });
  }

  async deleteBooking(id: number, token: string): Promise<APIResponse> {
    return this.request.delete(`/booking/${id}`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });
  }
}
