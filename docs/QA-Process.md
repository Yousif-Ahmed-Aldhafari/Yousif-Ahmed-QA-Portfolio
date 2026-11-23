# QA process

1. Review acceptance criteria with the owner and identify unclear boundaries.
2. Rank risks by impact and likelihood. Assign requirement and case IDs.
3. Establish fixtures and environment health. Run smoke checks before broad regression.
4. Triage failed checks using actual evidence. Separate application defects, test defects and environment failures.
5. Retest fixes, run risk-based regression, and record the release recommendation with unresolved risks and the decision owner.

A defect can move from open to in progress, ready for retest and verified. Reopen when the original acceptance criterion still fails in the retest build.
