# OrderDesk

Original fictional order-entry fixture for local QA practice. Start from the repository root with Node.js 24.

```sh
node 07-Sample-Projects/orderdesk/server.mjs
```

Open http://127.0.0.1:4173 and sign in with the intentionally public fixture values `qa-demo` and `demo-only`. The service binds to IPv4 loopback. Restarting it discards in-memory sessions.

| Requirement | Contract |
| --- | --- |
| REQ-01 | Valid sign-in returns 200 and an HttpOnly cookie. Invalid sign-in returns 401. |
| REQ-02 | The catalog exposes a Notebook priced at 650 cents. |
| REQ-03 | Authenticated orders accept integer quantities from 1 through 10 inclusive. The server calculates the total and returns 201 with an order ID. |
| REQ-04 | Anonymous orders return 401, malformed JSON returns 400, and invalid quantities return 422. |
| REQ-05 | Users can reach form controls by keyboard and receive status feedback after submitting. |
| REQ-06 | An authenticated user who reloads the page can continue ordering in the current session. |

REQ-06 is an acceptance requirement with a known fixture gap. The UI returns to sign-in after a reload. The fixture is designed for local testing and has no deployment or real account support.
