# API Automation Test Framework

A comprehensive API automation testing framework built with **Playwright**, **TypeScript**, **Node.js**, and **Faker** for generating realistic test data.

## Features

- **Playwright Test**: Powerful testing framework with built-in support for parallel test execution
- **TypeScript**: Full type safety for API testing
- **Faker**: Generate realistic test data (names, emails, addresses, etc.)
- **API Client Utility**: Simplified HTTP client for common API operations (GET, POST, PUT, PATCH, DELETE)
- **Assertion Helpers**: Pre-built assertions for common API validations
- **Fixtures**: Reusable API client fixture for all tests
- **JSON Placeholder API**: Sample tests against a public API

## Project Structure

```
├── src/
│   ├── fixtures/
│   │   └── api.fixture.ts          # API client fixture for tests
│   ├── utils/
│   │   ├── api-client.ts           # ApiClient and ApiAssertions classes
│   │   └── test-data-generator.ts  # TestDataGenerator using Faker
│   └── types/
│       └── index.ts                 # TypeScript interfaces for API responses
├── tests/
│   └── api.spec.ts                  # Sample test suite
├── playwright.config.ts             # Playwright configuration
├── tsconfig.json                    # TypeScript configuration
├── package.json                     # Project dependencies
└── README.md                        # This file
```

## Installation

1. **Clone the repository** (or create from template):
   ```bash
   cd /Users/judgeonan/Documents/Workspace/api-automation-framework
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode (see browser output)
```bash
npm run test:headed
```

### Debug tests
```bash
npm run test:debug
```

### Run tests with UI
```bash
npm run test:ui
```

### Run specific test file
```bash
npx playwright test tests/api.spec.ts
```

### Run tests matching a pattern
```bash
npx playwright test -g "should retrieve"
```

## Usage Examples

### Using the API Client

```typescript
import { test, expect } from '../src/fixtures/api.fixture';
import { ApiAssertions } from '../src/utils/api-client';

test('example test', async ({ apiClient }) => {
  const response = await apiClient.get<Post>('/posts/1');
  
  ApiAssertions.expectStatusSuccess(response.status);
  expect(response.data.title).toBeTruthy();
});
```

### Generating Test Data

```typescript
import { TestDataGenerator } from '../src/utils/test-data-generator';

const post = TestDataGenerator.generatePost();
const user = TestDataGenerator.generateUser();
const email = TestDataGenerator.generateRandomEmail();
```

### API Assertions

```typescript
ApiAssertions.expectStatusSuccess(status);           // 200-299
ApiAssertions.expectStatusCode(status, 201);        // Exact match
ApiAssertions.expectStatusServerError(status);      // 500+
ApiAssertions.expectContentType(headers, 'json');   // Content-Type check
ApiAssertions.expectDataNotEmpty(data);             // Truthy check
```

## Configuration

### Changing the Base URL

Edit `playwright.config.ts`:
```typescript
use: {
  baseURL: 'https://your-api.com',
},
```

### Adjusting Parallel Workers

```typescript
workers: 4, // Run 4 tests in parallel
```

### Modifying Retry Logic

```typescript
retries: 3, // Retry failed tests 3 times
```

## Sample Test Suite

The framework includes comprehensive tests for the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/):

- **Posts Endpoint**: CRUD operations, filtering, error handling
- **Comments Endpoint**: Retrieval and creation
- **Users Endpoint**: User data retrieval and validation

## Adding New Tests

1. Create a new file in `tests/` directory:
   ```typescript
   import { test, expect } from '../src/fixtures/api.fixture';
   
   test('my test', async ({ apiClient }) => {
     const response = await apiClient.get('/endpoint');
     // Add assertions
   });
   ```

2. Run tests:
   ```bash
   npm test
   ```

## Reporting

This project uses Allure reporting by default for test output and historical result analysis.

## Allure Reporting

This project generates Allure results and a static Allure report.

### Generate the report
```bash
npm run report:allure:generate
```

### Open the report locally
```bash
npm run report:allure:open
```

### Serve the generated report via HTTP
If your browser only shows a loading spinner when opening `allure-report/index.html` directly, use the local server instead:
```bash
npm run report:allure:serve
```

### Notes
- Allure results are generated to `allure-results/`.
- The generated static report is written to `allure-report/`.
- Allure CLI requires a Java runtime (JRE or JDK) installed on your machine.
- If you see an error about missing Java, install it from https://www.java.com or via your OS package manager.

## Technologies

- **[Playwright Test](https://playwright.dev/)** - Modern test framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[@faker-js/faker](https://fakerjs.dev/)** - Test data generation
- **[Node.js](https://nodejs.org/)** - JavaScript runtime

## License

MIT
