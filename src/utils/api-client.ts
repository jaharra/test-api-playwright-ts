import { APIRequestContext, expect } from '@playwright/test';
import { ApiResponse } from '../types';

export class ApiClient {
  constructor(private request: APIRequestContext, private baseUrl?: string) {}

  async get<T = any>(url: string): Promise<ApiResponse<T>> {
    const response = await this.request.get(url);
    return this.buildResponse<T>(response);
  }

  async post<T = any>(url: string, data?: object): Promise<ApiResponse<T>> {
    const response = await this.request.post(url, { data });
    return this.buildResponse<T>(response);
  }

  async put<T = any>(url: string, data?: object): Promise<ApiResponse<T>> {
    const response = await this.request.put(url, { data });
    return this.buildResponse<T>(response);
  }

  async patch<T = any>(url: string, data?: object): Promise<ApiResponse<T>> {
    const response = await this.request.patch(url, { data });
    return this.buildResponse<T>(response);
  }

  async delete<T = any>(url: string): Promise<ApiResponse<T>> {
    const response = await this.request.delete(url);
    return this.buildResponse<T>(response);
  }

  private async buildResponse<T>(response: any): Promise<ApiResponse<T>> {
    return {
      status: response.status(),
      data: await response.json(),
      headers: response.headers(),
    };
  }
}

export class ApiAssertions {
  static expectStatusSuccess(status: number): void {
    expect(status).toBeLessThanOrEqual(299);
    expect(status).toBeGreaterThanOrEqual(200);
  }

  static expectStatusCode(status: number, expected: number): void {
    expect(status).toBe(expected);
  }

  static expectStatusServerError(status: number): void {
    expect(status).toBeGreaterThanOrEqual(500);
  }

  static expectContentType(headers: Record<string, string>, type: string): void {
    expect(headers['content-type']).toContain(type);
  }

  static expectDataNotEmpty<T>(data: T): void {
    expect(data).toBeTruthy();
  }
}
