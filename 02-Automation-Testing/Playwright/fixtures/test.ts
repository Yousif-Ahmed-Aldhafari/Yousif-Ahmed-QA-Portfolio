import { expect, test as base } from '@playwright/test';
import { OrderDesk } from '../pages/order-desk';
import { account } from './data';

export const test = base.extend<{ desk: OrderDesk; sessionCookie: string }>({
  desk: async ({ page }, use) => {
    await use(new OrderDesk(page));
  },
  sessionCookie: async ({ request }, use) => {
    const response = await request.post('/api/session', { data: account });
    expect(response.status()).toBe(200);
    const cookie = response.headers()['set-cookie'];
    expect(cookie).toContain('HttpOnly');
    await use(cookie.split(';')[0]);
  },
});
export { expect };
