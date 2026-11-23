# Public API testing

Import the [collection](Postman/public-apis.postman_collection.json) and [environment](Postman/public-apis.postman_environment.json), select the environment, and run the entire collection in order. Alternatively, run from the repository root:

```sh
mkdir -p artifacts
npx --yes newman@6.2.1 run 03-API-Testing/Postman/public-apis.postman_collection.json \
  -e 03-API-Testing/Postman/public-apis.postman_environment.json \
  --reporters cli,junit --reporter-junit-export artifacts/api-junit.xml
```

| Case | Coverage |
| --- | --- |
| API-01 | Read a known post and assert its schema and ID |
| API-02 | Simulated creation, 201, schema and echoed data |
| API-03 | Simulated PATCH, 200 and updated field |
| API-04 | Simulated DELETE and empty response object |
| API-05 | Unknown record and 404 |
| API-06 | Missing bearer token returns 401 before login issues cookies |
| API-07 | Public demo sign-in and temporary bearer token |
| API-08 | Authorized identity matches the demo account |

JSONPlaceholder simulates mutation responses without persisting changes. DummyJSON uses its own documented public demo credentials. The bearer value is held in collection-run state and cleared after the identity request. Collection-level scripts check JSON media type and a 3,000 ms response budget. See [observed results](../06-Test-Reports/README.md).
