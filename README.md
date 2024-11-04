# momence-fetch-fx

Simple REST API which can be used to fetch FX rates published by CNB.
Application is persisting the rates into database (mongodb)

Applications provides following endpoints to 'fetch & store', 'get' the rates:

- `/update/latest`
- `/update/:date`
- `/rates`
- `/rates/:date`
