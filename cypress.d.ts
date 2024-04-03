import { mount } from 'cypress/react'

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      /**
       * select DOM element by data-cy attribute
       */
      dataCy(value: string): Chainable<JQuery<HTMLElement>>;

      /**
       * select DOM element by data-value attribute
       */
      dataValue(value: string): Chainable<JQuery<HTMLElement>>;

      /**
       * select DOM element by id
       */
      byId(value: string): Chainable<JQuery<HTMLElement>>;

      /**
       * authenticate by setting a session storage
       */
      authenticate(value: string): void;
    }
  }
}