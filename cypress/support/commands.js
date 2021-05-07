// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import "cypress-file-upload";
import permissionList from "../../src/mockServer/fixtures/permissionList";

Cypress.Commands.add("authenticate", (START_PATH) => {
  cy.visit(START_PATH, {
    onBeforeLoad(w) {
      w.sessionStorage.clear();
      w.sessionStorage.setItem(
        "auth",
        `{"displayName":"John Doe","token":"1qrj12fcxu3a21d21pjvba6g1"}`
      );
      w.sessionStorage.setItem("permission", {
        permission: permissionList,
        userName: "admin",
      });
    },
  });
});
