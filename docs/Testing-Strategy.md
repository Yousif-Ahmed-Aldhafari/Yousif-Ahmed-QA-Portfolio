# Testing strategy

Use fast local contract checks for authorization, input validation and pricing. Reserve browser coverage for meaningful user journeys and feedback. Keep the Cypress network-failure scenario explicitly intercepted, and run the successful order against the real local API. Use Selenium for an independent WebDriver example and Appium for a native Android workflow.

Postman exercises public simulated APIs and does not require project credentials. Treat its failures as external-service evidence as well as potential contract drift. Run performance tests only against the loopback fixture and record runner resource limits alongside latency.

Use manual charters for session interruption, accessibility and responsiveness. Record actual outcomes with the commit and environment. Keep intended thresholds, known fixture gaps and observed performance separate in reports.
