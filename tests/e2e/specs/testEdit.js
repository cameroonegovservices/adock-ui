describe("Edit", () => {
  it("edits a carrier", () => {
    cy.visit("/transporteur/80005226884728");

    // Switch to login view
    cy.contains("Ceci est mon entreprise")
      .first()
      .click();

    // Redirected to login
    cy.contains("Créer un compte").click();

    // Create an account
    cy.get("[data-cy=inputFirstName").type("Joé");
    cy.get("[data-cy=inputLastName").type("Martin");
    cy.get("[data-cy=inputEmail").type("joemartin@example.com");
    cy.get("[data-cy=inputPassword").type("12345678");
    cy.contains("Créer le compte").click();

    // Arguments aren't used
    cy.visit("/utilisateur/1/activer/12345/");

    cy.wait(2000);
    cy.contains("Conditions générales d'utilisation");

    // Accept CGU
    cy.get(".v-input--selection-controls__ripple")
      .first()
      .click();

    cy.contains("Cherchez et contactez simplement");

    cy.visit("/transporteur/80005226884728");

    // Only working area for now
    cy.contains("Compléter la fiche (55 %)")
      .first()
      .click();

    // Submit form w/o phone to raise an error
    cy.get("[data-cy=inputPhone]").clear();
    // Don't change the current view on error
    cy.contains("Suivant").click();
    cy.get(".v-messages__message").contains("Ce champ ne peut être vide");

    // Empty fields excepted phone
    cy.get("[data-cy=inputPhone]")
      .clear()
      .type("02 41 42 43 44")
      .should("have.value", "02 41 42 43 44");
    cy.get("[data-cy=inputEmail]")
      .clear()
      .type("contact@adock.fr")
      .should("have.value", "contact@adock.fr");
    // Select International working area (1st item)
    cy.get("input[data-cy=inputWorkingArea]")
      .parent()
      .click();
    // cy.get(
    //   ".menuable__content__active > .v-select-list > .v-list > :nth-child(1) > .v-list__tile > .v-list__tile__content > .v-list__tile__title"
    // ).click();
    // Go the detail view with success message
    cy.contains("Suivant").click();
    cy.get(".v-snack__content").contains("Un courriel a été envoyé");

    // Don't fill the certificate now
    cy.contains("Type d'attestation");
    cy.contains("Annuler").click();

    // Confirm the changes
    cy.visit("/transporteur/changement/1/confirmer/123-456/");
    cy.contains("Les modifications de la fiche sont confirmées.");

    cy.visit("/transporteur/80005226884728");

    // Completeness is now 85%
    cy.contains("Compléter la fiche (85 %)")
      // Go again to the edit view
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
    // 3th element is Régionale
    cy.get(
      ".menuable__content__active > .v-select-list > .v-list > :nth-child(3) > .v-list__tile > .v-list__tile__content > .v-list__tile__title"
    ).click();
    // First speciality
    cy.get(
      ":nth-child(8) > .flex > .v-input > .v-input__control > .v-input__slot > .v-select__slot > .v-input__append-inner > .v-input__icon > .v-icon"
    ).click();
    cy.get(
      ".menuable__content__active > .v-select-list > .v-list > :nth-child(1) > .v-list__tile > .v-list__tile__content > .v-list__tile__title"
    ).click();
    // Button could be behind the menu
    cy.contains("Suivant").click({ force: true });
    // Don't confirm latest changes

    // Create a certificate
    cy.get("[data-cy=inputFirstName]").should("have.value", "Joé");
    cy.get("[data-cy=inputLastName]").should("have.value", "Martin");
    cy.get("[data-cy=inputPosition]").type("Président");
    cy.get("[data-cy=inputLocation]").type("Saint André des Eaux");
    cy.contains("Générer").click();

    cy.get(".v-snack__content").contains("Un courriel a été envoyé");

    cy.visit("/transporteur/attestation/1/confirmer/123-456/");
    cy.contains("L'attestation est confirmée");

    cy.visit("/transporteur/changement/1/confirmer/123-456/");
    cy.contains("Les modifications de la fiche sont confirmées.");

    // Now check 100% and certificate
    cy.visit("/transporteur/80005226884728");
    cy.contains("Modifier la fiche");
    cy.contains("Attestation de non emploi de travailleurs étrangers");
  });
});
