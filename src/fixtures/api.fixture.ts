import { test as base, APIRequestContext } from '@playwright/test';
import { ApiClient } from '../utils/api-client';

type ApiFixtures = {
  apiClient: ApiClient;
};

export const test = base.extend<ApiFixtures>({
  apiClient: async ({ request }, use) => {
    const apiClient = new ApiClient(request);
    await use(apiClient);
  },
});

export { expect } from '@playwright/test';
