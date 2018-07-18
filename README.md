[![*nix build status][nix-build-image]][nix-build-url]
![Transpilation status][transpilation-image]
[![npm version][npm-image]][npm-url]

# aws-step-functions-inspector

## Dumps all events of specified state machine instance in human readable format

### Usage

Existence of `AWS_PROFILE` and `AWS_REGION` enviromnment variables should be ensured

```sh
aws-step-functions-inspector {arn} [options]
```

Supported options:

-   **--reverse** - Output events in reverse order
-   **--help -h** - Show usage info
-   **--version -v** - Display version

[nix-build-image]: https://semaphoreci.com/api/v1/medikoo-org/aws-step-functions-inspector/branches/master/shields_badge.svg
[nix-build-url]: https://semaphoreci.com/medikoo-org/aws-step-functions-inspector
[transpilation-image]: https://img.shields.io/badge/transpilation-free-brightgreen.svg
[npm-image]: https://img.shields.io/npm/v/aws-step-functions-inspector.svg
[npm-url]: https://www.npmjs.com/package/aws-step-functions-inspector
