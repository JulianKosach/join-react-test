/// <reference types="cypress" />

context('App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('Check App title', () => {
    cy.title().should('include', 'Join React Test')
  })
});

context('Router', () => {
  before(() => {
    cy.visit('http://localhost:3000')
  })

  it('Check Redirect to Applicant Screen from Home Screen', () => {
    cy.get('[data-cy="home__applicant-link"]')
      .click();

    cy.location()
      .should((loc) => {
        expect(loc.pathname).to.eq('/applicant')
      })
  })

  it('Check Redirect back to Home Screen by Header link', () => {
    cy.get('[data-cy="header__home-link"]')
      .click();

    cy.location()
      .should((loc) => {
        expect(loc.pathname).to.eq('/')
      })
  })

  it('Check Redirect to Candidates screen from Home Screen', () => {
    cy.get('[data-cy="home__candidates-link"]')
      .click();

    cy.location()
      .should((loc) => {
        expect(loc.pathname).to.eq('/candidates')
      })
  })

  it('Check Redirect to Applicant Sreen by Header link', () => {
    cy.get('[data-cy="header__applicant-link"]')
      .click();

    cy.location()
      .should((loc) => {
        expect(loc.pathname).to.eq('/applicant')
      })
  })

  it('Check Redirect to Candidates screen by Header link', () => {
    cy.get('[data-cy="header__candidates-link"]')
      .click();

    cy.location()
      .should((loc) => {
        expect(loc.pathname).to.eq('/candidates')
      })
  })
});