/// <reference types="cypress" />

import 'cypress-file-upload';
import { permissionList } from '../../src/mocks/fixtures/permissionList';
import { interceptors } from '../interceptors';
import {
	getPendingRequestCount,
	getTotalRequestsStarted,
	setupInterceptors,
} from '../utils';

// Pages can refetch their data (e.g. on a cross-test remount) at points other
// than the initial visit — not just once, in `authenticate`. A Cypress
// intercept round-trips through the real network layer, long enough that a
// test can end — and Cypress abort the still-in-flight request — before the
// page gets its data, leaving it stuck in an error state for the rest of the
// spec. Waiting here too, right after each test's own fetches would start,
// covers those later refetches as well.
//
// Checking "pending === 0" alone has a chicken-and-egg problem: right after a
// mount, the fetch may simply not have started yet, so the check trivially
// (and wrongly) reads as idle before it ever begins. So this requires at
// least one request to have started since the wait began, with a bounded
// grace period for pages that genuinely fetch nothing.
function waitUntilRequestStartsOrTimeout(
	startedBefore: number,
	deadline: number,
) {
	cy.then(() => {
		if (getTotalRequestsStarted() > startedBefore || Date.now() > deadline) {
			return;
		}
		cy.wait(25).then(() =>
			waitUntilRequestStartsOrTimeout(startedBefore, deadline),
		);
	});
}

function waitForNetworkIdle() {
	// Phase 1 (best-effort, never fails the test): give a request a couple of
	// seconds to start, for pages whose fetch hasn't begun yet. A page that
	// fetches nothing on mount just falls through once the deadline passes.
	waitUntilRequestStartsOrTimeout(getTotalRequestsStarted(), Date.now() + 2000);
	// Phase 2: now actually wait for it to finish — this one SHOULD fail the
	// test if something never resolves, since that's a real bug to surface.
	cy.wrap(null, { timeout: 10000 }).should(() => {
		expect(getPendingRequestCount()).to.eq(0);
	});
	cy.wait(300);
}

beforeEach(() => {
	setupInterceptors(interceptors);
	waitForNetworkIdle();
});

// Without this, Cypress can abort a still-in-flight intercepted request the
// moment a test ends, leaving the app stuck in a loading/error state that
// bleeds into the next test's `beforeEach`.
afterEach(() => {
	waitForNetworkIdle();
});

Cypress.Commands.add('dataCy', (value) => {
	return cy.get(`[data-cy=${value}]`);
});

Cypress.Commands.add('dataValue', (value) => {
	return cy.get(`[data-value=${value}]`);
});

Cypress.Commands.add('byId', (value) => {
	return cy.get(`[id=${value}]`);
});

Cypress.Commands.add('authenticate', (url: string) => {
	// Some specs call this from a suite-level `before()` (to visit once and
	// share page state across sequential tests). Mocha runs all `before()`
	// hooks — including this one, nested inside the suite — before the root
	// `beforeEach` above that normally registers these same interceptors, so
	// without this, `cy.visit` below would load the page with no mocks yet
	// registered, and its on-mount fetches would hit a real, unmocked backend.
	setupInterceptors(interceptors);
	cy.visit(url, {
		onBeforeLoad(w) {
			w.sessionStorage.setItem(
				'auth',
				`{"username":"John Doe","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJhZG1pbiIsImV4cCI6MTczOTE5MzU1MTAwMH0.D50o5x2gcVcASSwl7EOqmRUDGqIGfhisbXlkujQolrY"}`,
			);
			w.sessionStorage.setItem(
				'permission',
				JSON.stringify({
					permissions: permissionList,
					userName: 'admin',
				}),
			);
		},
	});
	waitForNetworkIdle();
});
