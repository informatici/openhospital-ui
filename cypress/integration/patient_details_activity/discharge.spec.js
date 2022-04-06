const HOSTNAME = Cypress.env("HOSTNAME");
const START_PATH = `${HOSTNAME}/patients/details/1`;

describe("Patient Details / Discharge", () => {
    before(() => {
        cy.authenticate(START_PATH);
    });

    it("should render the ui", () => {
        cy.get("[class=patientDetails]");
    });

    it("should have a menu item for discharge", () => {
        cy.get("[class='patientDetails__main_menu']")
            .contains("Discharges:")
            .click();
    });

    it("Should fill discharge form with mock data", () => {
        cy.get("[id=disDate]").focus().type("03052022").blur();
        cy.get("[id=disType]").focus().type("NORMALE").blur();
        cy.get("[id=cliDiaryCharge]").focus().type("Some Diary Charge").blur();
        cy.get("[id=imageryCharge]").focus().type("fail").blur();
        cy.get("[id=diseaseOut]").focus().type("Abortions").blur();
    })

    it("should display an error component if the discharge patient call fails", () => {
        cy.get("[class='submit_button']").click();

        cy.get("div.infoBox").should("have.class", "error");
    });

    it("should show success dialog if the discharge patient call successes", () => {
        cy.get("[id=imageryCharge]").focus().clear().type("success").blur();
        cy.get("[class='submit_button']").click();
        cy.get("[class='return_button']").click();
    });
});