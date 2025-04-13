/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('prepare', (email: string, password: string) => {
	cy.intercept('POST', 'signin', { fixture: 'signin' }).as('signin');
	cy.intercept('GET', 'users/me', { fixture: 'me' });
	cy.intercept('GET', 'cards', { fixture: 'cards' });
	cy.visit('http://localhost:5173/');
	cy.get('[data-testid=email_input]').type(`${email}{enter}`);
	cy.get('[data-testid=password_input]').type(`${password}{enter}`);
	cy.wait('@signin').its('request.body').should('deep.equal', {
		email,
		password,
	});
});
