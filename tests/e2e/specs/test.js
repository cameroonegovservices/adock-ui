// https://docs.cypress.io/api/introduction/api.html

describe('A Dock', () => {
  it('Visits the Search page', () => {
    cy.visit('/')

    // Search on SIRET
    cy.get('[data-cy=searchFormQ')
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
    // Check indicator percentage
    cy.get('.indicator.orange > span')
      .should('contain', '55')

    // Submit full details
    cy.get('.card__actions > .btn > .btn__content')
      .click()
    cy.get('[data-cy=inputEmail]')
      .clear()
      .type('foo@example.com')
      .should('have.value', 'foo@example.com')
    cy.get('div[data-cy=inputWorkingArea]')
      .click()
    // 2nd element is France
    cy.get('.menuable__content__active > .card > .list > :nth-child(2) > .list__tile > .list__tile__content > .list__tile__title')
      .click()
    cy.get('div[data-cy=inputSpecialities]')
      .click()
    // First speciality
    cy.get('.menuable__content__active > .card > .list > :nth-child(1) > .list__tile > .list__tile__content > .list__tile__title')
      .click()
    cy.get('#detailForm > .btn > .btn__content')
      .click({force: true})
    // Check 100 %
    cy.get('.indicator > .icon')
      .should('contain', 'done')
  })
})
