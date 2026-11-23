# OrderDesk test cases

Requirements are defined in the [fixture contract](../../07-Sample-Projects/orderdesk/README.md). Actual results are recorded per run in the [execution register](../Test-Execution/README.md).

## OD-01 · Verify authorized sign-in

- **Module** · Authentication
- **Requirement** · REQ-01
- **Test types** · Smoke, regression
- **Preconditions** · Sign-in page open
- **Test data** · qa-demo / demo-only
- **Test steps** · Enter the fixture credentials and activate Sign in.
- **Expected result** · Signed in appears, Notebook is visible, and Quantity receives focus.
- **Actual result** · See execution register
- **Status** · Designed
- **Priority** · P1

## OD-02 · Reject incorrect password

- **Module** · Authentication
- **Requirement** · REQ-01
- **Test types** · Negative, regression
- **Preconditions** · Sign-in page open
- **Test data** · qa-demo / invalid
- **Test steps** · Submit the username and incorrect password.
- **Expected result** · Invalid sign-in appears and the order form stays hidden.
- **Actual result** · See execution register
- **Status** · Designed
- **Priority** · P1

## OD-03 · Verify Notebook contract

- **Module** · Catalog
- **Requirement** · REQ-02
- **Test types** · Smoke, functional
- **Preconditions** · Local service available
- **Test data** · GET /api/catalog
- **Test steps** · Request the catalog and inspect its single item.
- **Expected result** · HTTP 200 with id notebook, name Notebook, and priceCents 650.
- **Actual result** · See execution register
- **Status** · Designed
- **Priority** · P1

## OD-04 · Create a valid order

- **Module** · Orders
- **Requirement** · REQ-03
- **Test types** · Smoke, regression
- **Preconditions** · Signed in
- **Test data** · Quantity 2
- **Test steps** · Enter 2, submit the order and inspect the status.
- **Expected result** · The status reads Order submitted. Total: $13.00.
- **Actual result** · See execution register
- **Status** · Designed
- **Priority** · P1

## OD-05 · Accept inclusive endpoints

- **Module** · Orders
- **Requirement** · REQ-03
- **Test types** · Sanity, boundary value
- **Preconditions** · API session cookie captured
- **Test data** · Quantities 1 and 10
- **Test steps** · POST each quantity separately to /api/orders with the session cookie.
- **Expected result** · Each returns 201 with a distinct ID. Totals are 650 and 6500 cents.
- **Actual result** · See execution register
- **Status** · Designed
- **Priority** · P1

## OD-06 · Reject quantities immediately outside the range

- **Module** · Orders
- **Requirement** · REQ-04
- **Test types** · Negative, boundary value
- **Preconditions** · API session cookie captured
- **Test data** · Quantities 0 and 11
- **Test steps** · POST each quantity separately to /api/orders with the session cookie.
- **Expected result** · Each returns 422 and a quantity validation error.
- **Actual result** · See execution register
- **Status** · Designed
- **Priority** · P1

## OD-07 · Reject invalid quantity partitions

- **Module** · Orders
- **Requirement** · REQ-04
- **Test types** · Negative, equivalence partitioning
- **Preconditions** · API session cookie captured
- **Test data** · 1.5, string "2", null, missing field
- **Test steps** · POST each payload independently with the session cookie.
- **Expected result** · Each returns 422. No order ID is returned.
- **Actual result** · See execution register
- **Status** · Designed
- **Priority** · P2

## OD-08 · Reject an anonymous order

- **Module** · Orders
- **Requirement** · REQ-04
- **Test types** · Smoke, negative
- **Preconditions** · New API client with no cookies
- **Test data** · Quantity 2
- **Test steps** · POST /api/orders with JSON quantity 2 and omit the Cookie header.
- **Expected result** · HTTP 401 with Sign in required.
- **Actual result** · See execution register
- **Status** · Designed
- **Priority** · P1

## OD-09 · Complete the order with keyboard only

- **Module** · Accessibility
- **Requirement** · REQ-05
- **Test types** · UI/UX, exploratory
- **Preconditions** · Browser viewport 320 CSS pixels
- **Test data** · Fixture credentials and quantity 1
- **Test steps** · Use Tab and Enter to sign in and order. Observe focus and check the status element in the accessibility tree.
- **Expected result** · Controls remain visible and usable, focus is apparent, and the dynamic confirmation is exposed as status.
- **Actual result** · See execution register
- **Status** · Designed
- **Priority** · P2

## OD-10 · Keep order access after reload

- **Module** · Authentication
- **Requirement** · REQ-06
- **Test types** · Regression, sanity
- **Preconditions** · Signed in and order form visible
- **Test data** · Same browser tab and origin
- **Test steps** · Reload the page and inspect the order form.
- **Expected result** · The authenticated user can continue ordering without re-entering credentials.
- **Actual result** · See execution register
- **Status** · Designed
- **Priority** · P2

## OD-11 · Reject malformed JSON

- **Module** · Orders
- **Requirement** · REQ-04
- **Test types** · Negative, regression
- **Preconditions** · API session cookie captured
- **Test data** · Truncated JSON {"quantity":
- **Test steps** · POST the raw truncated JSON to /api/orders with the session cookie.
- **Expected result** · HTTP 400 with Invalid JSON and no order ID.
- **Actual result** · See execution register
- **Status** · Designed
- **Priority** · P2
