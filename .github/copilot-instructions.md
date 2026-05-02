# GitHub Copilot Instructions for this Repository

## Project overview
- This repository is an API automation framework using **Playwright Test**, **TypeScript**, and **Allure reporting**.
- The main test files live in `tests/`.
- Custom fixtures are in `src/fixtures/`.
- API helpers are in `src/utils/api-client.ts` and `src/utils/test-data-generator.ts`.

## Reporting expectations
- Allure is the **default test reporting mechanism**.
- The Playwright config should use:
  - `['line']`
  - `['allure-playwright']`
- The HTML reporter is not the primary report and should not be added as default.
- The repo includes scripts for:
  - `npm run report:allure:generate`
  - `npm run report:allure:open`
  - `npm run report:allure:serve`
- Generated report artifacts should be ignored in Git:
  - `allure-results/`
  - `allure-report/`

## Test authoring style
- Use `test.step()` inside tests to break verification into explicit steps.
- Attach request/response context to Allure using `test.info().attach(...)`.
- Prefer descriptive step titles like:
  - `Verify status is success (200-299)`
  - `Verify post ID is 1`
  - `Verify response data is an array`
- Step names should communicate what is being verified, so the Allure report shows clear pass/fail context.
- Validation should be explicit and focused on expected behavior.

## TypeScript configuration
- `tsconfig.json` is set with `rootDir` as `.` so tests and config files are included.
- Use Node types by including `types: ["node"]`.

## Dependency conventions
- Use `allure-playwright` for Playwright integration.
- Use `allure-commandline` for report generation.
- Keep dependencies minimal and aligned with the existing Playwright + TypeScript stack.

## File-level notes
- `src/fixtures/api.fixture.ts` provides the API client fixture.
- `src/utils/api-client.ts` should return typed `ApiResponse<T>` objects.
- `tests/api.spec.ts` should include test steps, attachments, and expected/actual reporting style.

## Do not do
- Do not add Playwright HTML report as the primary default reporter.
- Do not commit `allure-results/` or `allure-report/`.
- Do not use overly generic or vague step names in tests.
- Do not omit API response attachments when they help clarify test context.

## Future Copilot guidance
- When user prompts suggest repository-specific guidance, offer the suggestion before editing this file.
- Ask the user whether they want the new guidance added to `.github/copilot-instructions.md`.
- Do not automatically update the file without explicit user approval.
