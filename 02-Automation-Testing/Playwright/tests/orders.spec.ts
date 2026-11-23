import { expect, test } from '../fixtures/test';
import { invalidQuantities, unitPriceCents } from '../fixtures/data';

test('REQ-01 invalid credentials show feedback', async ({ desk }) => {
  await desk.signIn('invalid');
  await expect(desk.feedback).toHaveText('Invalid sign-in');
});

test('REQ-02/03/05 sign in and submit a notebook order', async ({ desk, page }) => {
  await desk.signIn();
  await expect(page.getByText('Notebook', { exact: true })).toBeVisible();
  await expect(page.getByLabel('Quantity')).toBeFocused();
  await desk.submitOrder(2);
  await expect(desk.feedback).toHaveText('Order submitted. Total: $13.00');
});

test('REQ-04 anonymous orders are rejected', async ({ request }) => {
  const response = await request.post('/api/orders', { data: { quantity: 2 } });
  expect(response.status()).toBe(401);
  expect(await response.json()).toEqual({ error: 'Sign in required' });
});

for (const quantity of [1, 10]) {
  test(`REQ-03 accepts boundary quantity ${quantity}`, async ({ request, sessionCookie }) => {
    const response = await request.post('/api/orders', {
      headers: { Cookie: sessionCookie }, data: { quantity },
    });
    expect(response.status()).toBe(201);
    expect(await response.json()).toMatchObject({
      id: expect.stringMatching(/^[0-9a-f-]{36}$/i),
      productId: 'notebook', quantity, totalCents: quantity * unitPriceCents,
    });
  });
}

for (const quantity of invalidQuantities) {
  test(`REQ-04 rejects quantity ${JSON.stringify(quantity)}`, async ({ request, sessionCookie }) => {
    const response = await request.post('/api/orders', {
      headers: { Cookie: sessionCookie }, data: { quantity },
    });
    expect(response.status()).toBe(422);
    expect(await response.json()).toEqual({ error: 'Quantity must be a whole number between 1 and 10' });
  });
}
