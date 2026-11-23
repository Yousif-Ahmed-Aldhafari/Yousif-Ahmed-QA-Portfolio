import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const port = Number(process.env.PORT ?? 4173);
const page = await readFile(new URL('./index.html', import.meta.url));
const sessions = new Set();

const catalog = [{ id: 'notebook', name: 'Notebook', priceCents: 650 }];
const json = (res, status, value, headers = {}) => {
  res.writeHead(status, { 'content-type': 'application/json', ...headers });
  res.end(JSON.stringify(value));
};

async function input(req) {
  const chunks = [];
  let length = 0;
  for await (const chunk of req) {
    length += chunk.length;
    if (length > 8192) {
      const error = new Error('Request exceeds 8192 bytes');
      error.status = 413;
      throw error;
    }
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString());
}

async function route(req, res) {
  const path = new URL(req.url, 'http://localhost').pathname;
  const method = req.method;
  if (method === 'GET' && path === '/') {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    return res.end(page);
  }
  if (method === 'GET' && path === '/health') return json(res, 200, { status: 'ok' });
  if (method === 'GET' && path === '/api/catalog') return json(res, 200, catalog);
  if (method === 'POST' && path === '/api/session') {
    const data = await input(req);
    if (data?.username !== 'qa-demo' || data?.password !== 'demo-only') {
      return json(res, 401, { error: 'Invalid sign-in' });
    }
    const token = randomUUID();
    sessions.add(token);
    return json(res, 200, { username: 'qa-demo' }, {
      'set-cookie': `session=${token}; HttpOnly; SameSite=Strict; Path=/`,
      'cache-control': 'no-store',
    });
  }
  if (method === 'POST' && path === '/api/orders') {
    const token = req.headers.cookie?.match(/(?:^|;\s*)session=([^;]+)/)?.[1];
    if (!sessions.has(token)) return json(res, 401, { error: 'Sign in required' });
    const data = await input(req);
    const quantity = data?.quantity;
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
      return json(res, 422, { error: 'Quantity must be a whole number between 1 and 10' });
    }
    const id = randomUUID();
    const order = { id, productId: catalog[0].id, quantity, totalCents: quantity * catalog[0].priceCents };
    return json(res, 201, order);
  }
  return json(res, 404, { error: 'Not found' });
}

createServer((req, res) => {
  route(req, res).catch(error => {
    if (res.headersSent) return res.end();
    if (error instanceof SyntaxError) return json(res, 400, { error: 'Invalid JSON' });
    if (error.status === 413) return json(res, 413, { error: error.message });
    console.error(error);
    return json(res, 500, { error: 'Internal error' });
  });
}).listen(port, '127.0.0.1', () => console.log(`OrderDesk listening on ${port}`));
