// https://docs.cypress.io/api/introduction/api.html

describe("Search", () => {
  it("searches on SIRET", () => {
    cy.visit("/");

    // Search on SIRET
    cy.get("[data-cy=searchFormQ]").type("80005226884728");
    cy.contains("div.v-btn__content", "Chercher").click();

    // Click on result to reach detail view
    cy.get("a[href='/transporteur/80005226884728']");
    cy.contains("1 transporteurs pour la recherche « 80005226884728 »");
  });

  it("searches on county code", () => {
    cy.visit("/");
    cy.get("[data-cy=searchFormQ]").type("80005226884728");
    cy.get("[data-cy=searchFormDepartementFrom]").type("34");
    cy.contains("div.v-btn__content", "Chercher").click();

    cy.get("a[href='/transporteur/80005226884728']");
    cy.contains(
      "1 transporteurs pour la recherche « 80005226884728 », enlèvement « 34 »"
    );
  });

  it("doesn't find with SIRET and county code", () => {
    cy.visit("/");
    cy.get("[data-cy=searchFormQ]").type("80005226884728");
    cy.get("[data-cy=searchFormDepartementFrom]").type("42");
    cy.contains("div.v-btn__content", "Chercher").click();

    cy.contains(
      "La recherche avec « 80005226884728 », enlèvement « 42 » n'a retourné aucun résultat."
    );
  });
});
