describe('RegisterForm', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/register'); 
  });

  it('Exibe mensagens de erro ao enviar o formulário vazio', () => {
    cy.get('button[type="submit"]').click();

    cy.contains('First name is required').should('be.visible');
    cy.contains('Last name is required').should('be.visible');
    cy.contains('Username is required').should('be.visible');
    cy.contains('Email is required').should('be.visible');
    cy.contains('Password is required').should('be.visible');
    cy.contains('Confirm password is required').should('be.visible');
  });

  it('Exibe uma mensagem de erro quando o email é inválido', () => {
    cy.get('input[name="email"]').type('email_invalido');
    cy.get('button[type="submit"]').click();

    cy.contains('Invalid email').should('be.visible');
  });

  it('Exibe uma mensagem de erro quando as senhas não coincidem', () => {
    cy.get('input[name="password"]').type('senha123');
    cy.get('input[name="confirmPassword"]').type('senha456');
    cy.get('button[type="submit"]').click();

    cy.contains('Passwords must match').should('be.visible');
  });

  it("Formulário enviado com sucesso", () => {
    cy.visit("http://localhost:8000/register/"); 

    cy.get('input[name="firstName"]').type("FirstName");
    cy.get('input[name="lastName"]').type("LastName");
    cy.get('input[name="email"]').type("exemplo@exemplo.pt");
    cy.get('input[name="username"]').type("user");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("password123");
    cy.get('input[name="isAdmin"]').check();

    cy.get("form").submit();

    cy.url().should("include", "/admin"); 
  });
});