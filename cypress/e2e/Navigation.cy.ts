describe('Navigation', () => {
  describe('Static pages', () => {

    it('it should check home page', () => {
      cy.visit('/');
      cy.get('button')
      .contains('Details') // Assuming the button text is "Details"
      .click();
      cy.wait(2000); // Wait for 2 seconds

    });

    it('should navigate back to the home screen', () => {
      cy.visit('/'); // Visit the home screen
    });

  });
});
