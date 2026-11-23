# Exploratory charters and traceability

| Charter | Timebox | Approach | Capture |
| --- | --- | --- | --- |
| EX-01 Session interruptions | 20 min | Sign in, reload, use Back, open a second tab, then restart the fixture. Compare visible state with the API. | Origin, sequence, and UI/API differences |
| EX-02 Form usability | 20 min | Test keyboard only, resize to 320 CSS pixels, zoom to 200%, then interrupt the order response. | Focus order, clipped controls, announcements and recovery steps |
| EX-03 Input partitions | 15 min | Test valid endpoints and invalid numeric, fractional, wrong-type, and missing inputs. Compare UI and API validation paths. | Payload, response, and affected requirement |

| Requirement | Manual cases | Automation |
| --- | --- | --- |
| REQ-01 | OD-01, OD-02 | Playwright invalid sign-in and authenticated fixture |
| REQ-02 | OD-03 | Cypress catalog contract, Playwright signed-in UI |
| REQ-03 | OD-04, OD-05 | Playwright inclusive endpoints and happy path, Cypress order request, Selenium upper endpoint |
| REQ-04 | OD-06, OD-07, OD-08, OD-11 | Playwright rejected quantities and anonymous request. OD-11 also has a local contract check. |
| REQ-05 | OD-09 | Playwright focus and feedback, Cypress network recovery. Full keyboard and responsive assessment is manual. |
| REQ-06 | OD-10 | Known gap with a manual reproducer |
