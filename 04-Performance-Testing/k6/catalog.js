import http from 'k6/http';
import { check, sleep } from 'k6';

const profiles = {
  smoke: { executor: 'constant-vus', vus: 1, duration: '10s' },
  load: { executor: 'ramping-vus', startVUs: 0, stages: [
    { duration: '15s', target: 10 }, { duration: '45s', target: 10 }, { duration: '10s', target: 0 },
  ] },
  stress: { executor: 'ramping-vus', startVUs: 0, stages: [
    { duration: '20s', target: 20 }, { duration: '20s', target: 50 }, { duration: '30s', target: 80 },
    { duration: '15s', target: 0 },
  ] },
  spike: { executor: 'ramping-vus', startVUs: 2, stages: [
    { duration: '10s', target: 2 }, { duration: '1s', target: 60 },
    { duration: '15s', target: 60 }, { duration: '1s', target: 2 }, { duration: '15s', target: 2 },
  ] },
  soak: { executor: 'constant-vus', vus: 10, duration: '30m' },
};

const profile = __ENV.PROFILE || 'smoke';
if (!Object.hasOwn(profiles, profile)) throw new Error(`Unknown profile: ${profile}`);
const base = __ENV.BASE_URL || 'http://127.0.0.1:4173';
if (!/^http:\/\/127\.0\.0\.1:\d+$/.test(base)) throw new Error('Use a local OrderDesk target');

export const options = {
  scenarios: { [profile]: profiles[profile] },
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<200', 'p(99)<500'],
    checks: ['rate>0.99'],
  },
  summaryTrendStats: ['avg', 'med', 'p(90)', 'p(95)', 'p(99)', 'max'],
};

export default function () {
  const response = http.get(`${base}/api/catalog`, { redirects: 0 });
  check(response, {
    'status is 200': res => res.status === 200,
    'expected catalog item': res => {
      if (res.status !== 200) return false;
      try {
        const [product] = res.json();
        return product?.id === 'notebook' && product?.priceCents === 650;
      } catch {
        return false;
      }
    },
  });
  sleep(1);
}
