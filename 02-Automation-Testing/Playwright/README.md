# Playwright with TypeScript

From this directory, using Node.js 24 and npm:

```sh
npm ci
npx playwright install chromium --with-deps
npm run typecheck
npm test
npx playwright show-report
```

On supported non-Linux platforms, use `npx playwright install chromium`. The test command manages the local service on port 4173. Stop a separately started instance before running the suite. `CHROMIUM_PATH` may point to a compatible system Chromium for constrained runners.

The page object handles sign-in and ordering, while fixtures provide the page and cookie for authenticated requests. Browser and API checks use isolated workers. HTML and JUnit reports are generated locally, and failed browser runs can retain screenshots and traces under `test-results/` when a browser session exists.
