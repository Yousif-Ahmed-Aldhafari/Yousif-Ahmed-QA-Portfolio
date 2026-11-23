# k6 performance test plan

Install k6 v1.x and start [OrderDesk](../07-Sample-Projects/orderdesk/README.md) before running a profile from the repository root.

```sh
mkdir -p artifacts
PROFILE=smoke k6 run --summary-export artifacts/k6-smoke.json 04-Performance-Testing/k6/catalog.js
```

| Profile | Traffic | Review question |
| --- | --- | --- |
| smoke | 1 VU for 10 seconds | Are the check and thresholds wired correctly? |
| load | Ramp to 10 VUs, hold 45 seconds, ramp down | Do errors or tail latency grow under expected sample load? |
| stress | Ramp through 20, 50 and 80 VUs, then ramp down | Where do errors or latency first exceed the sample budget? |
| spike | Step from 2 to 60 VUs in one second, then return to 2 | How quickly does latency recover after the spike? |
| soak | 10 VUs for 30 minutes | Do latency or resource use drift under sustained traffic? |

Each VU makes one read and pauses for one second. The check validates status and catalog data. The sample budgets are p95 < 200 ms, p99 < 500 ms, HTTP failure rate < 1% and check pass rate > 99%. They are configuration targets for the fixture.

## Performance report format

Record the commit, profile, runner specs, target, start time, duration, VUs and any competing processes. Include requests per second, response-time p50/p95/p99, HTTP error rate, check pass rate and threshold outcomes. For stress and spike tests, inspect segment-level measurements for saturation and recovery. For the soak test, compare successive intervals and record process memory measurements separately. Mark fields unavailable when the run did not collect them.
