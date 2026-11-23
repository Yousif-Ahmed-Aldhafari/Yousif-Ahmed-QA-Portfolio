# Manual execution register

Executed on 23 November 2026 against the local OrderDesk fixture at commit `19555af`. The reviewer submitted the requests with curl and compared status codes and response bodies with the [test cases](../Test-Cases/README.md). The browser session could not reach the loopback fixture, so browser cases remain blocked in this manual run.

| Case | Coverage | Actual result | Status |
| --- | --- | --- | --- |
| OD-01 | UI sign-in and focus | Browser session could not reach the fixture. | Blocked |
| OD-02 | UI sign-in rejection | Browser session could not reach the fixture. | Blocked |
| OD-03 | Catalog functionality | HTTP 200 with one Notebook, ID `notebook`, priced at 650 cents. | Pass |
| OD-04 | UI order confirmation | Browser session could not reach the fixture. | Blocked |
| OD-05 | Boundary values | Quantities 1 and 10 each returned HTTP 201 with distinct IDs and totals of 650 and 6500 cents. | Pass |
| OD-06 | Invalid boundaries | Quantities 0 and 11 each returned HTTP 422 with the whole-number range message. | Pass |
| OD-07 | Invalid input partitions | Fractional, string, null and missing quantity each returned HTTP 422 with no order ID. | Pass |
| OD-08 | Anonymous order | HTTP 401 with `Sign in required`. | Pass |
| OD-09 | Keyboard, accessibility and narrow viewport | Browser session could not reach the fixture. | Blocked |
| OD-10 | UI session reload | Browser execution was blocked. An authenticated HTTP request returned the sign-in form and a hidden order form, supporting [OD-BUG-01](../Bug-Reports/README.md). | Blocked |
| OD-11 | Malformed JSON regression | Truncated JSON returned HTTP 400 with `Invalid JSON` and no order ID. | Pass |

**Total:** 6 passed, 0 failed, 5 blocked. Cross-browser compatibility remains unverified manually. See the [hosted browser automation results](../../06-Test-Reports/README.md#github-hosted-verification) for separate execution evidence.
