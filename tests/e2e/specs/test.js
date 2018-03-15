// https://docs.cypress.io/api/introduction/api.html

describe('A Dock', () => {
  it('Visits the Home page', () => {
    cy.visit('/')
    cy.contains('div.btn__content', 'Inscrivez vous')
  })
})
