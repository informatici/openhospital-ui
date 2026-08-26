# Cypress Interceptors

This directory contains typesafe and reusable Cypress interceptors for API mocking during end-to-end tests.

## Overview

These interceptors are designed to mirror the MSW (Mock Service Worker) handlers used in development, but adapted for Cypress's `cy.intercept()` API. They provide:

- **Type Safety**: Built using the OpenAPI-generated types from the project's API specification
- **Reusability**: Modular interceptors that can be imported and used across test files
- **Consistency**: Same response patterns as the MSW mocks for consistent behavior

## Usage

### Basic Setup

In your test file, import the interceptors and set them up:

```typescript
import { setupInterceptors, ageTypes, auth } from '../../interceptors';

describe('My Test Suite', () => {
	beforeEach(() => {
		setupInterceptors([...ageTypes, ...auth]);
	});

	it('should do something with mocked API', () => {
		// Your test code here
		cy.visit('/');
		// API calls to /agetypes and /auth/* will be intercepted
	});
});
```

### Individual Interceptor Usage

You can also use interceptors individually:

```typescript
import { ageTypes } from '../../interceptors';

it('should mock age types', () => {
	setupInterceptors(ageTypes);
	cy.visit('/some-page');
	// API calls to /agetypes will be mocked
});
```

### Creating Custom Interceptors

Use the `http` helper to create new interceptors:

```typescript
import { http, jsonResponse } from '../utils';

export const customEndpoint = [
	http.get('/custom-endpoint', () => jsonResponse({ data: 'mocked' })),
	http.post('/custom-endpoint', (req) => {
		// Access request body: req.body
		return jsonResponse({ created: true });
	}),
];
```

### Available Helpers

- `jsonResponse(data, statusCode?)`: Returns a JSON response
- `badRequest(data)`: Returns a 400 Bad Request response
- `notFound(data)`: Returns a 404 Not Found response
- `unauthorized(data)`: Returns a 401 Unauthorized response
- `noContent()`: Returns a 204 No Content response

## File Structure

- `utils.ts`: Core utilities and helper functions (located in cypress/utils.ts)
- `ageTypes.ts`: Interceptors for age types endpoints
- `auth.ts`: Interceptors for authentication endpoints
- `diseases.ts`: Interceptors for disease endpoints
- `diseaseTypes.ts`: Interceptors for disease type endpoints
- `hospitals.ts`: Interceptors for hospital endpoints
- `index.ts`: Main export file

## Adding New Interceptors

1. Create a new file in this directory (e.g., `patients.ts`)
2. Export an array of interceptors using the `http` helper
3. Add the export to `index.ts`
4. Import and use in your tests

Example:

```typescript
// patients.ts
import { http, jsonResponse } from '../utils';

export const patients = [
	http.get('/patients', () => jsonResponse(mockPatientsData)),
	http.post('/patients', (req) => jsonResponse({ id: 123, ...req.body })),
];
```

```typescript
// index.ts
export * from './patients';
```