# Verification report

Local runs on 23 November 2026 used Linux x86-64, Node.js 24.22.3 and Python 3.12.14. The passing browser runs used headless Chromium 153.0.8010.0. These results apply to the synthetic fixture and public demo API contracts.

| Check | Observed outcome | Evidence |
| --- | --- | --- |
| Node contract checks | Six subtests passed. | [Runnable checks](../scripts/contract-test.mjs) cover authorization, catalog, validation, order pricing and the known reload gap. |
| Playwright | 10 passed. TypeScript typecheck passed. | Two UI checks and eight API checks. The initial system Chromium launch failed on a restricted socket, and the browser CDN returned 403. An alternate Chromium executable completed the rerun. |
| Selenium | One test passed. | The matching WebDriver and alternate Chromium verified the upper quantity boundary through the UI. |
| Cypress | Blocked before test execution. | npm dependencies installed. The Electron binary download returned HTTP 403 on both tested versions. |
| Appium | Device run pending. | Python dependencies installed. No Android emulator or adb was available. |
| Newman | Eight requests completed. 26 of 34 assertions passed. | All eight response-time checks exceeded the 3-second budget. Status, schema, media-type, body and authorization assertions passed after moving the unauthenticated check before sign-in. |
| k6 smoke | All configured thresholds passed. | [Performance results](#performance-results) and [raw summary](../assets/reports/k6-smoke.json). |
| AI-output evaluator | Five fixtures produced the expected rubric decisions. | [Dataset and evaluator](../07-Sample-Projects/ai-evaluation/README.md). |
| GitHub Actions | Workflow YAML checked locally. Hosted execution pending. | [Workflow](../.github/workflows/qa.yml). |

## Performance results

k6 v1.6.1 against the loopback catalog, one virtual user for ten seconds. Local runner resources were shared. Interpret this as fixture smoke evidence.

| Metric | Observed |
| --- | --- |
| HTTP requests | 10 |
| Throughput | 0.997 requests/second |
| Median latency | 0.905 ms |
| p95 latency | 2.27 ms |
| p99 latency | 3.08 ms |
| HTTP failures | 0 of 10 |
| Checks passed | 20 of 20 |

The [load, stress, spike and soak profiles](../04-Performance-Testing/README.md) are executable configurations with no recorded results yet.

## Catalog release decision

The authenticated order path passed automated checks. The reload behavior is an open medium-severity issue, [OD-BUG-01](../01-Manual-Testing/Bug-Reports/README.md). The full manual accessibility and exploratory scope remains unexecuted. The fixture is suitable for QA demonstrations, and the release plan calls for a recorded disposition for the reload defect.

## Quality checklist

- [x] Independent Git history with original fixture code, synthetic test data and no configured publication remote.
- [x] Tracked JSON and workflow YAML parse successfully. Relative Markdown targets resolve.
- [x] JavaScript syntax, Python compilation, TypeScript typecheck and Git whitespace validation completed.
- [x] Tracked files and commit path history reviewed for personal documents, private references and sensitive artifacts. Public demo credentials are intentionally scoped to fixtures.
- [x] npm audit reports zero known findings for locked Playwright and Cypress dependencies at review time.
- [x] Observed results, pending execution and environment blocks recorded above.
- [ ] GitHub-hosted runs verified after publication.
