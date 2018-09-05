describe('Edit', () => {
  it('edits a carrier', () => {
    cy.visit('/transporteur/80005226884728')

    // Switch to edit view (2 buttons)
    cy.contains('Compléter les informations').first()
      .click()

    // Submit form w/o phone to raise an error
    cy.get('[data-cy=inputPhone]')
      .clear()
    // Don't change the current view on error
    cy.contains('Valider')
      .click()
    cy.get('.input-group__messages')
      .contains('Ce champ est obligatoire')

    // Empty fields excepted phone
    cy.get('[data-cy=inputPhone]')
      .clear()
      .type('02 41 42 43 44')
      .should('have.value', '02 41 42 43 44')
    cy.get('[data-cy=inputEmail]')
      .clear()
      .should('have.value', '')
    // Select undefined working area (1st item)
    cy.get('div[data-cy=inputWorkingArea]')
      .click()
    cy.get('.menuable__content__active > .card > .list > :nth-child(1) > .list__tile > .list__tile__content > .list__tile__title')
      .click()
    // Close all chips
    cy.get(
      '.chip__content > .chip__close > .icon',
      { timeout: 500 })
      .click({ multiple: true })
    // Go the detail view with success message
    cy.contains('Valider')
      .click()
    cy.get('.snack__content')
      .contains('Transporteur « A DOCK TRANSPORTEUR » enregistré.')

    // Check indicator percentage
    cy.get('.adock-indicator.orange > span')
      .should('contain', '55')

    // Go again to the edit view
    cy.contains('Compléter les informations').first()
      .click()

    // Submit full details
    cy.get('[data-cy=inputEmail]')
      .clear()
      .type('foo@example.com')
      .should('have.value', 'foo@example.com')
    cy.get('div[data-cy=inputWorkingArea]')
      .click()
    // 4th element is Département
    cy.get('.menuable__content__active > .card > .list > :nth-child(4) > .list__tile > .list__tile__content > .list__tile__title')
      .click()
    cy.get('div[data-cy=inputSpecialities]')
      .click()
    // First speciality
    cy.get('.menuable__content__active > .card > .list > :nth-child(1) > .list__tile > .list__tile__content > .list__tile__title')
      .click()
    // Button could be behind the menu
    cy.contains('Valider')
      .click({ force: true })
    // Check 100 %
    cy.get('.adock-indicator > .icon')
      .should('contain', 'done')
  })
})
