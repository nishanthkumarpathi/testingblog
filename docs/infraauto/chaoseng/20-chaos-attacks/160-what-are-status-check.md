# What are Status Check

Automate your chaos experiments with [Status Checks](https://www.gremlin.com/docs/scenarios/status-checks/) through a Scenario knowing the attacks will be safely halted if your system doesn’t meet your expected conditions.

A Status Check is a step of a Scenario that evaluates the health of your environment. Status Checks hit an endpoint URL to evaluate the status code, the request response time including the JSON response body, and will pass or fail based on your defined criteria. The endpoint can be from a 3rd party tool such as [Datadog](https://docs.datadoghq.com/api/v1/monitors/#get-a-monitors-details), [New Relic](https://docs.newrelic.com/docs/alerts/rest-api-alerts/new-relic-alerts-rest-api/rest-api-calls-new-relic-alerts), [PagerDuty](https://developer.pagerduty.com/api-reference/reference/REST/openapiv3.json/paths/\~1incidents/get) or your preferred monitoring tool. It could also be a publicly accessible endpoint for your services's health with or without authentication. If the Status Check fails, the Scenario will automatically halt and will record results from the run.

A Status Check can be created within the Scenario workflow or in the Status Check library.

Once you’ve added a Status Check to a Scenario you can add [attacks](https://www.gremlin.com/docs/scenarios/overview/#attacks) and more Status Checks as needed. The best practice is to add a Status Check before each attack to validate your service is in a healthy state before introducing failure. In some cases you might want to add a Status Check at the end of the Scenario to validate your service returned to its steady state. Use the Continuous Status Check option for Status Checks that you want evaluated throughout the duration of the Scenario.&#x20;
