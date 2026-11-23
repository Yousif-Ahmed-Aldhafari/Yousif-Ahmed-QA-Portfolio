# OrderDesk release test plan

**Objective** · Confirm that a signed-in user can place an accurately priced order and that invalid requests leave the service usable.

**Scope** · Sign-in and session behavior, catalog, quantity validation, order confirmation, keyboard operation and responsive layout. Checkout payments, production deployment, concurrent inventory and account recovery are outside this fixture’s scope.

| Risk | Impact | Coverage |
| --- | --- | --- |
| Anonymous access to order creation | Unauthorized writes | Reject unauthenticated API calls and verify the browser hides the order form |
| Boundary or pricing error | Wrong quantities or charges | Exercise 0, 1, 10 and 11, fractional and wrong-type values, and exact integer-cent totals |
| Ambiguous submission feedback | Possible duplicate orders | Simulate network errors, verify feedback and check whether retry is possible |
| Lost session on refresh | Interrupted user workflow | Test UI and cookie-backed API behavior independently after reload |
| Keyboard or responsive regression | Ordering becomes hard to complete | Tab through controls, inspect focus and status announcements, and test at 320 CSS pixels |

**Entry criteria** · Start the documented fixture, record its commit, verify /health, and confirm the environment and fixture data.

**Execution** · Run smoke cases first. Use sanity cases for targeted fixes, the full catalog for regression, and exploratory charters for adjacent risks. Record failed or blocked cases with evidence and retest fixed defects against the same case ID.

**Exit criteria** · All smoke cases executed and passed. No unresolved critical or high defects affecting authentication, order creation, or totals. Document any accepted medium-risk deviation and its decision owner. Retest evidence must identify the commit and environment.
