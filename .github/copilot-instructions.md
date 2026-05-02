# GitHub Copilot Instructions for this Repository

## Project overview
- This repository is an API automation framework using **Playwright Test**, **TypeScript**, and **Allure reporting**.
- The main test files live in `tests/`.
- Custom fixtures are in `src/fixtures/`.
- API helpers are in `src/utils/`.

## Test authoring style
- Use `test.step()` inside tests to break verification into explicit steps.
- Attach request/response context to Allure using `test.info().attach(...)`.
- Prefer descriptive step titles like:
  - `Verify status is success (200-299)`
  - `Verify post ID is 1`
  - `Verify response data is an array`
- Step names should communicate what is being verified, so the Allure report shows clear pass/fail context.
- Validation should be explicit and focused on expected behavior.
- Prefer async arrow function syntax when generating new code and helpers, especially for callbacks and test utilities.

## File-level notes
- `src/fixtures/api.fixture.ts` provides the API client fixture.
- `src/utils/api-client.ts` should return typed `ApiResponse<T>` objects.
- `tests/*.spec.ts` should include test steps, attachments, and expected/actual reporting style.

## TypeScript configuration
- `tsconfig.json` is set with `rootDir` as `.` so tests and config files are included.
- Use Node types by including `types: ["node"]`.

## Dependency conventions
- Keep dependencies minimal and aligned with the existing Playwright + TypeScript stack.

## Test Reporting expectations
- Allure is the **default test reporting mechanism**.
- The repo includes scripts for:
  - `npm run report:allure:generate`
  - `npm run report:allure:open`
  - `npm run report:allure:serve`
- Generated report artifacts should be ignored in Git:
  - `allure-results/`
  - `allure-report/`

## Do not do
- Do not use overly generic or vague step names in tests.
- Do not omit API response attachments when they help clarify test context.

## Future Copilot guidance
- When user prompts suggest repository-specific guidance, offer the suggestion before editing this file.
- Ask the user whether they want the new guidance added to `.github/copilot-instructions.md`.
- Do not automatically update the file without explicit user approval.
