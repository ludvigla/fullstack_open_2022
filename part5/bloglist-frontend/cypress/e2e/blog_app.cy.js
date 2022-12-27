describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'John Doe',
        username: 'jdoe',
        password: 'password'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user) 
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
        cy.get('h2')
            .should('contain', 'Login')

        cy.get('#login-form')
            .should('be.visible')
    })

    describe('Login', function () {
      it('user can log in with corect credentials', function () {
        cy.contains('login').click()
        cy.get('#username').type('jdoe')
        cy.get('#password').type('password')
        cy.get('#login-button').click()

        cy.contains('John Doe logged in')
      })

      it('login fails with wrong credentials', function() {
        cy.contains('login').click()
        cy.get('#username').type('jdoe')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()

        cy.get('.error').contains('Wrong user name or password')
      })
    })
    
  })