/// <reference types="cypress" />

context('App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('Get the App title', () => {
    cy.title().should('include', 'Join React Test')
  })
});