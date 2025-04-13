/// <reference types="cypress" />

import './commands';

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to verify if the application server is running
     * @example cy.verifyServerRunning()
     */
    verifyServerRunning(): Chainable<void>

    // Add other custom commands here
    prepare(email: string, password: string): Chainable<void>
  }
}