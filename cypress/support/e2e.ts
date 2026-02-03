/// <reference types="cypress" />

import "cypress-file-upload";
import permissionList from "../../src/mockServer/fixtures/permissionList";

Cypress.Commands.add("dataCy", (value) => {
  return cy.get(`[data-cy=${value}]`);
});

Cypress.Commands.add("dataValue", (value) => {
  return cy.get(`[data-value=${value}]`);
});

Cypress.Commands.add("byId", (value) => {
  return cy.get(`[id=${value}]`);
});

Cypress.Commands.add("authenticate", (url: string) => {
  cy.visit(url, {
    onBeforeLoad(w) {
      w.sessionStorage.clear();
      w.sessionStorage.setItem(
        "auth",
        `{"username":"John Doe","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJhZG1pbiIsImV4cCI6MTczOTE5MzU1MTAwMH0.D50o5x2gcVcASSwl7EOqmRUDGqIGfhisbXlkujQolrY"}`
      );
      w.sessionStorage.setItem(
        "permission",
        JSON.stringify({
          permission: permissionList,
          userName: "admin",
        })
      );
    },
  });
});
