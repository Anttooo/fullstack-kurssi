describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    const user = {
      name: 'onni',
      username: 'onni',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3000/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('.loginForm')
  })
  describe('Login', function(){
    it('succeeds with correct credentials', function() {
      cy.get('#loginUsernameField').type('onni')
      cy.get('#loginPasswordField').type('salasana')
      cy.get('#loginButton').click()
  
      cy.contains('onni logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#loginUsernameField').type('onni')
      cy.get('#loginPasswordField').type('wrong')
      cy.get('#loginButton').click()
  
      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({username: 'onni', password: 'salasana'})
    })
    it('A blog can be created', function() {
      cy.contains('Add a new blog').click()
      cy.get('#titleField').type('test-title')
      cy.get('#authorField').type('test-author')
      cy.get('#urlField').type('test-url')

      cy.get('.submitButton').click()
      cy.contains('test-title')
    })

    describe('When a blog has been added', function() {
      beforeEach(function() {
        cy.contains('Add a new blog').click()
        cy.get('#titleField').type('test-title')
        cy.get('#authorField').type('test-author')
        cy.get('#urlField').type('test-url')
  
        cy.get('.submitButton').click()
      })

      it('A blog can be liked', function() {
        cy.get('.blog').contains('view').click()
        cy.get('#likeCount').contains('0')
        cy.get('.likeButton').click()
        cy.get('#likeCount').contains('1')
      })

      it('The user who crated a blog can remove it', function() {
        cy.get('.blog').contains('view').click()
        cy.get('.removeBlogButton').click()
        cy.contains('test-title').should('not.exist')
      })
    })
    describe('When multiple blogs have been added', function() {
      beforeEach(function () {
        cy.contains('Add a new blog').click()
        cy.get('#titleField').type('least likes')
        cy.get('#authorField').type('test-author')
        cy.get('#urlField').type('test-url')
  
        cy.get('.submitButton').click()
  
        cy.contains('Add a new blog').click()
        cy.get('#titleField').type('2nd most')
        cy.get('#authorField').type('test-author')
        cy.get('#urlField').type('test-url')
  
        cy.get('.submitButton').click()
  
        cy.contains('Add a new blog').click()
        cy.get('#titleField').type('most likes')
        cy.get('#authorField').type('test-author')
        cy.get('#urlField').type('test-url')
  
        cy.get('.submitButton').click()
      })

      it('Blogs are organised so that one with most likes is first', function() {
        cy.contains('most likes').contains('view').click()
        cy.contains('most likes')
          .parent()
          .within(() => {
            cy.contains('button', 'like')
            .click()
            .click()
            .click()
          })
        cy.contains('2nd most').contains('view').click()
        cy.contains('2nd most')
          .parent()
          .within(() => {
            cy.contains('button', 'like')
            .click()
          })
        cy.reload()
        cy.get('.blogList')
          .within(() => {
            cy.get(':nth-child(2)').contains('most likes');
            cy.get(':nth-child(3)').contains('2nd most');
          })
      })
    })
  })

})