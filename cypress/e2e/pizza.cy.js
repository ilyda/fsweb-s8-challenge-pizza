describe("Pizza Order Form", () => {

  beforeEach(() => {
    cy.visit("http://localhost:5173/order");
  });
  it("inputa bir metin girilebilmeli", () => {
    cy.get('[data-cy="order-note"]')
      .type("Lütfen acı olsun")
      .should("have.value", "Lütfen acı olsun");
  });
  it("birden fazla ek malzeme seçilebilmeli", () => {
    cy.get('[data-cy="extra-item"]')
      .eq(0)
      .check()
      .should("be.checked");

    cy.get('[data-cy="extra-item"]')
      .eq(1)
      .check()
      .should("be.checked");
  });
  it("form başarılı şekilde gönderilebilmeli", () => {
    cy.contains("Küçük").click();
    cy.get('select[name="order"]').select("İnce");
    cy.get('[data-cy="extra-item"]').first().check();

    cy.get('[data-cy="order-note"]').type("Test siparişi");
    cy.get('[data-cy="submit-order"]').click();
    cy.url().should("include", "/success");
  });

});
