# Contributing

1. Branch from main and keep the change scoped to one requirement, test workflow or documentation improvement.
2. Use synthetic data and a local or explicitly documented public demo target. Keep session state, traces, generated logs, screenshots containing personal data and the source CV outside commits.
3. Link new cases to requirements. Give a failing test one clear expected behavior and capture the fixture version, command, environment and actual result.
4. Run affected suites and use `git diff --check` before opening a pull request. Describe any environment blocks or known gaps and link relevant run artifacts.

For defects, include the case ID, preconditions, exact steps, expected and actual behavior, severity, priority and reproducible evidence.
