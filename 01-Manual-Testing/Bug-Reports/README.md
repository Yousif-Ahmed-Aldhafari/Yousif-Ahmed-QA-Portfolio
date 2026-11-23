# Defect register

## OD-BUG-01 · Reload hides the order form during a valid session

| Field | Detail |
| --- | --- |
| Environment | Local OrderDesk fixture, loopback HTTP, current browser tab |
| Preconditions | Signed in with the public fixture account. The order form and Notebook are visible. |
| Reproduction | 1. Reload the current page. 2. Observe the sign-in view. 3. With the same session cookie, submit an authenticated API order to confirm the session remains valid. |
| Expected | The app restores the order form for the authenticated user. |
| Actual | The returned page initializes the order form as hidden. The server still recognizes the session cookie. |
| Severity | Medium · Workflow interruption with sign-in workaround |
| Priority | P2 |
| Evidence | [Local contract check](../../scripts/contract-test.mjs) observes the fresh document and confirms the original cookie can still create an order. The run register records whether that check passed. |
| Traceability | REQ-06 / OD-10 |
