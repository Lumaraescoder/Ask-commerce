describe('Navigation', () => {
  describe('Static pages', () => {
    it('should navigate to the about page', () => {
      // Start from the index page
      cy.visit('/');

      // The index page should contain an h1
      cy.findByRole('heading', {
        name: 'Boilerplate code for your Nextjs project with Tailwind CSS',
      });

      // Find a link containing "About" text and click it
      cy.findByRole('link', { name: 'About' }).click();

      // The new url should include "/about"
      cy.url().should('include', '/about');

      // The new page should contain two "lorem ipsum" paragraphs
      cy.findAllByText('Lorem ipsum dolor sit amet', { exact: false }).should(
        'have.length',
        2
      );
    });

    it('should register the first name in the create account form', () => {
      // Start from the index page
      cy.visit('/');
    
      // Find a link containing "Create Account" text and click it
      cy.findByRole('link', { name: 'Create Account' }).click();
    
      // The new url should include "/register"
      cy.url().should('include', '/register');
    
      // Fill in the first name input field
      const firstName = 'Hugo';
      cy.findByLabelText('First Name').type(firstName);
    
      // Submit the form
      cy.findByRole('button', { name: 'Submit' }).click();
    
      // Assert that the first name is registered
      cy.get('.success-message').should('contain', `Welcome, ${firstName}!`);
    });


    it('should take screenshot of the homepage', () => {
      cy.visit('/');

      // Wait until the page is displayed
      cy.findByRole('heading', {
        name: 'Boilerplate code for your Nextjs project with Tailwind CSS',
      });

      cy.percySnapshot('Homepage');
    });

    it('should take screenshot of the About page', () => {
      cy.visit('/about');

      // Wait until the page is displayed
      cy.findByRole('link', { name: 'About' });

      cy.percySnapshot('About');
    });
  });
});
