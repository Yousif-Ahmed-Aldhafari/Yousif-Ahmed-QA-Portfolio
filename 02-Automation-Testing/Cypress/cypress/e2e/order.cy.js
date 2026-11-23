function assertNotebook(product) {
  expect(product).to.deep.equal({ id: 'notebook', name: 'Notebook', priceCents: 650 });
}

describe('OrderDesk contracts', () => {
  it('REQ-02 returns the catalog contract', () => {
    cy.request('/api/catalog').then(({ status, body }) => {
      expect(status).to.equal(200);
      expect(body).to.have.length(1);
      assertNotebook(body[0]);
    });
  });

  it('REQ-03 calculates the order total on the real server', () => {
    cy.intercept('POST', '/api/orders').as('order');
    cy.signIn();
    cy.get('[name=quantity]').type('3');
    cy.contains('button', 'Submit order').click();
    cy.wait('@order').then(({ request, response }) => {
      expect(request.body).to.deep.equal({ quantity: 3 });
      expect(response.statusCode).to.equal(201);
      expect(response.body.totalCents).to.equal(1950);
    });
    cy.get('[role=status]').should('have.text', 'Order submitted. Total: $19.50');
  });

  it('REQ-05 communicates an unavailable order service', () => {
    cy.intercept('POST', '/api/orders', { forceNetworkError: true }).as('unavailable');
    cy.signIn();
    cy.get('[name=quantity]').type('2');
    cy.contains('button', 'Submit order').click();
    cy.wait('@unavailable');
    cy.get('[role=status]').should('have.text', 'Unable to confirm the order.');
    cy.contains('button', 'Submit order').should('be.enabled');
  });
});
