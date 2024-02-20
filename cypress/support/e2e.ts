import "./commands";

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string): Chainable<JQuery<HTMLElement>>;

      dataValue(value: string): Chainable<JQuery<HTMLElement>>;

      byId(value: string): Chainable<JQuery<HTMLElement>>;

      authenticate(value: string): void;
    }
  }
}
