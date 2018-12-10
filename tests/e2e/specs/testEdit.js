describe("Edit", () => {
  it("edits a carrier", () => {
    cy.visit("/transporteur/80005226884728");

    // Switch to edit view (2 buttons)
    cy.contains("Compléter les informations")
      .first()
      .click();

    // Submit form w/o phone to raise an error
    cy.get("[data-cy=inputPhone]").clear();
    // Don't change the current view on error
    cy.contains("Valider").click();
    cy.get(".v-messages__message").contains("Ce champ est obligatoire");

    // Empty fields excepted phone
    cy.get("[data-cy=inputPhone]")
      .clear()
      .type("02 41 42 43 44")
      .should("have.value", "02 41 42 43 44");
    cy.get("[data-cy=inputEmail]")
      .clear()
      .should("have.value", "");
    // Select International working area (1st item)
    cy.get("input[data-cy=inputWorkingArea]")
      .parent()
      .click();
    cy.get(
      ".menuable__content__active > .v-select-list > .v-list > :nth-child(1) > .v-list__tile > .v-list__tile__content > .v-list__tile__title"
    ).click();
    // Go the detail view with success message
    cy.contains("Valider").click();
    cy.get(".v-snack__content").contains(
      "Transporteur « A DOCK TRANSPORTEUR » enregistré."
    );

    // Check indicator percentage (40 + 3 * 15)
    cy.get(".adock-indicator.orange > span").should("contain", "85");

    // Go again to the edit view
    cy.contains("Compléter les informations")
      .first()
      .click();

    // Submit full details
    cy.get("[data-cy=inputEmail]")
      .clear()
      .type("foo@example.com")
      .should("have.value", "foo@example.com");
    cy.get("input[data-cy=inputWorkingArea]")
      .parent()
      .click();
    // 3th element is Régional
    cy.get(
      ".menuable__content__active > .v-select-list > .v-list > :nth-child(3) > .v-list__tile > .v-list__tile__content > .v-list__tile__title"
    ).click();
    cy.get(
      ":nth-child(7) > .flex > .v-input > .v-input__control > .v-input__slot > .v-select__slot > .v-input__append-inner > .v-input__icon > .v-icon"
    ).click();
    // First speciality
    cy.get(
      ".menuable__content__active > .v-select-list > .v-list > :nth-child(1) > .v-list__tile > .v-list__tile__content > .v-list__tile__title"
    ).click();
    // Button could be behind the menu
    cy.contains("Valider").click({ force: true });
    // Check 100 %
    cy.get(".adock-indicator > .v-icon").should("contain", "done");
  });
});
