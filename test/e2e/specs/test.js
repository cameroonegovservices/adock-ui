// https://docs.cypress.io/api/introduction/api.html

describe('A Dock', () => {
  it('Visits the Home page', () => {
    cy.visit(Cypress.env('VUE_DEV_SERVER_URL'))
    cy.contains('button', 'Inscrivez vous')
  })
})
