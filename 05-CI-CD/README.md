# GitHub Actions

The [workflow](../.github/workflows/qa.yml) runs Playwright and Cypress on pushes to main and pull requests. To run the public API job, select **Run workflow** under **QA checks**. Dispatch validates the browser jobs as well.

| Job | Evidence |
| --- | --- |
| Local contracts | Node contract subtests and deterministic AI evaluator output in the job log |
| Playwright | HTML report, JUnit results and retained failure traces/screenshots when generated |
| Cypress | JUnit results, fixture stdout/stderr, failure screenshots when generated |
| Public API | Newman JUnit report and status in the job log |

Workflow permissions are read-only. Dependencies are installed from committed npm lockfiles for browser suites. No project or employer credentials are required. Start diagnosis with the first failed step, then inspect the uploaded evidence. GitHub-hosted execution is pending publication.
