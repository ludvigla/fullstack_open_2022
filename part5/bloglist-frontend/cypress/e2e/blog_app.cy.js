describe('Blog app', function() {

    describe('Start page ', function () {
      beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.visit('http://localhost:3000')
      })

      it('Login form is shown', function () {
        cy.get('h2').should('contain', 'Login')

        cy.get('#login-form').should('be.visible')
      })
    })

    describe('Login', function () {
      beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
          name: 'John Doe',
          username: 'jdoe',
          password: 'password',
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
      })
      it('user can log in with corect credentials', function () {
        cy.contains('login').click()
        cy.get('#username').type('jdoe')
        cy.get('#password').type('password')
        cy.get('#login-button').click()

        cy.contains('John Doe logged in')
      })

      it('login fails with wrong credentials', function () {
        cy.contains('login').click()
        cy.get('#username').type('jdoe')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()

        cy.get('.error').contains('Wrong user name or password')
      })
    })

    describe('When logged in', function() {
        beforeEach(function () {
            cy.request('POST', 'http://localhost:3003/api/testing/reset')
            const user = {
                name: 'John Doe',
                username: 'jdoe',
                password: 'password',
            }
            cy.request('POST', 'http://localhost:3003/api/users/', user)
            cy.visit('http://localhost:3000')
            cy.contains('login').click()
            cy.get('#username').type('jdoe')
            cy.get('#password').type('password')
            cy.get('#login-button').click()
        })
    
        it('A blog can be created', function () {
          cy.get('#create-blog').click()
          cy.get('#title-input').type('A new blog post')
          cy.get('#author-input').type('Jane Doe')
          cy.get('#url-input').type('http://www.janedoe.com/post1')
          cy.get('#submit-post').click()
          cy.contains('A new blog post')
        })

        it('A blog can be liked', function () {
            cy.get('#create-blog').click()
            cy.get('#title-input').type('A new blog post')
            cy.get('#author-input').type('Jane Doe')
            cy.get('#url-input').type('http://www.janedoe.com/post1')
            cy.get('#submit-post').click()
            cy.contains('A new blog post')
            cy.get('#view-button').click()
            cy.get('#like-button').click()
            cy.contains('likes 1')
          })
      })
    
  })