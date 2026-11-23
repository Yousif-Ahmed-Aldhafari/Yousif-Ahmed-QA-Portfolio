# Cypress

Start [OrderDesk](../../07-Sample-Projects/orderdesk/README.md) in a separate terminal. From this directory on Node.js 24:

```sh
npm ci
npx cypress install
npm test
```

On Linux, install Cypress’s native system dependencies if the executable reports missing libraries. The Cypress install command downloads the executable and bundled Electron browser.

The suite covers a real catalog response, a real order observed via intercept, and a simulated network failure. The custom sign-in command uses an isolated fixture account. JUnit results land in `artifacts/`, and Cypress takes screenshots on test failures where a browser session exists.
