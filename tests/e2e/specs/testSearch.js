// https://docs.cypress.io/api/introduction/api.html

describe('Search', () => {
  it('searches on SIRET', () => {
    cy.visit('/')

    // Search on SIRET
    cy.get('[data-cy=searchFormQ')
      .type('80005226884728')
    cy.contains('div.btn__content', 'Chercher')
      .click()

    // Click on result to reach detail view
    cy.get("a[href='/transporteur/80005226884728']")
      .click()

    cy.contains('.headline', 'A DOCK TRANSPORT')
  })
})
