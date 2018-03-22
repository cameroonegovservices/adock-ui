// https://docs.cypress.io/api/introduction/api.html

describe('A Dock', () => {
  it('Visits the Search page', () => {
    cy.visit('/')

    // Search on SIRET
    cy.get('input')
      .type('3002')
      .should('have.value', '3002')
    cy.contains('div.btn__content', 'Chercher')
      .click()

    // Click on result to reach detail view
    cy.get("a[href='/transporteur/30020550700027']")
      .click()

    // Submit empty form
    cy.get('.card__actions > .btn > .btn__content')
      .click()
    cy.get('[data-cy=inputTelephone]')
      .clear()
      .type('02 41 42 43 44')
      .should('have.value', '02 41 42 43 44')
    cy.get('[data-cy=inputEmail]')
      .clear()
      .should('have.value', '')
    cy.get('#detailForm > .btn > .btn__content')
      .click()
    // Check 70 %
    cy.get('.indicator.orange > span')
      .should('contain', '70')

    // Submit full details
    cy.get('.card__actions > .btn > .btn__content')
      .click()
    cy.get('[data-cy=inputEmail]')
      .clear()
      .type('foo@example.com')
      .should('have.value', 'foo@example.com')
    cy.get('#detailForm > .btn > .btn__content')
      .click()
    // Check 100 %
    cy.get('.indicator > .icon')
      .should('contain', 'done')
  })
})
