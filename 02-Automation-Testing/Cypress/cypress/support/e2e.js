Cypress.Commands.add('signIn', () => {
  return cy.fixture('account').then(({ username, password }) => {
    cy.visit('/');
    cy.get('[name=username]').type(username);
    cy.get('[name=password]').type(password, { log: false });
    cy.contains('button', 'Sign in').click();
    cy.get('#order').should('be.visible');
  });
});
