describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
        cy.get('h2')
            .should('contain', 'Login')

        cy.get('#login-form')
            .should('be.visible')
    })
  })