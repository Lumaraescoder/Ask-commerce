describe('HomePage', () => {
  describe('HomePage', () => {

    it('should click on all categories', () => {
      cy.intercept('GET', 'https://fakestoreapi.com/products/categories', {
        fixture: 'categories.json',
      });
  
      cy.visit('/'); // Assuming the Submenu component is rendered on the home screen
  
      cy.get('nav.bg-gray-200').should('be.visible');
  
      cy.get('nav.bg-gray-200 button').each(($button) => {
        cy.wrap($button).click().then(() => {
          // Assert that the click action is performed successfully
          // You can add additional assertions based on the expected behavior after the click
          // For example, check if the product data is updated in the context or if a new page is loaded
          // You may need to modify the component code to accommodate the desired behavior
  
          // Wait for the product data to be updated in the context (if applicable)
          cy.wait(500);
  
          // Continue with additional assertions or actions if needed
        });
      });
    });

  });
});
