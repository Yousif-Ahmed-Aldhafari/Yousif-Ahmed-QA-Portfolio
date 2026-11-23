import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const port = 4193;
const base = `http://127.0.0.1:${port}`;

test('OrderDesk local contracts', async t => {
  const server = spawn(process.execPath, [
    fileURLToPath(new URL('../07-Sample-Projects/orderdesk/server.mjs', import.meta.url)),
  ], { env: { ...process.env, PORT: String(port) }, stdio: ['ignore', 'pipe', 'inherit'] });
  const exit = once(server, 'exit');
  t.after(async () => {
    server.kill();
    await exit;
  });
  await Promise.race([
    once(server.stdout, 'data', { signal: AbortSignal.timeout(5000) }),
    exit.then(([code]) => { throw new Error(`Fixture exited before readiness: ${code}`); }),
  ]);

  const post = (path, body, cookie) => fetch(base + path, {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...(cookie ? { cookie } : {}) },
    body,
  });
  let cookie;

  await t.test('health and catalog', async () => {
    assert.deepEqual(await (await fetch(base + '/health')).json(), { status: 'ok' });
    assert.deepEqual(await (await fetch(base + '/api/catalog')).json(),
      [{ id: 'notebook', name: 'Notebook', priceCents: 650 }]);
  });

  await t.test('invalid credentials and anonymous orders return 401', async () => {
    assert.equal((await post('/api/session', '{}')).status, 401);
    assert.equal((await post('/api/orders', '{"quantity":2}')).status, 401);
  });

  await t.test('valid login issues an HttpOnly cookie', async () => {
    const response = await post('/api/session', '{"username":"qa-demo","password":"demo-only"}');
    assert.equal(response.status, 200);
    const header = response.headers.get('set-cookie');
    assert.match(header, /; HttpOnly/);
    cookie = header.split(';')[0];
  });

  await t.test('malformed and invalid order inputs return validation errors', async () => {
    assert.equal((await post('/api/orders', '{"quantity":', cookie)).status, 400);
    for (const quantity of [0, 11, 1.5, '2', null, undefined]) {
      const result = await post('/api/orders', JSON.stringify({ quantity }), cookie);
      assert.equal(result.status, 422);
      assert.match((await result.json()).error, /Quantity/);
    }
  });

  await t.test('accepted orders have unique IDs and exact totals', async () => {
    const ids = new Set();
    for (const quantity of [1, 2, 10]) {
      const result = await post('/api/orders', JSON.stringify({ quantity }), cookie);
      assert.equal(result.status, 201);
      const order = await result.json();
      assert.equal(order.totalCents, quantity * 650);
      ids.add(order.id);
    }
    assert.equal(ids.size, 3);
  });

  await t.test('OD-BUG-01 evidence: fresh document hides form despite valid session', async () => {
    const page = await fetch(base, { headers: { cookie } });
    assert.match(await page.text(), /<form id="order" hidden>/);
    assert.equal((await post('/api/orders', '{"quantity":1}', cookie)).status, 201);
  });
});
