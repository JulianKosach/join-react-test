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

context('Create empty candidate', () => {
  before(() => {
    cy.visit('http://localhost:3000')
  })

  it('Go to application screen', () => {
    cy.get('[data-cy="header__applicant-link"]')
      .click();
  })

  it('Save empty candidate', () => {
    cy.get('[data-cy="application__apply-btn"]')
      .click();

    cy.location()
      .should((loc) => {
        expect(loc.pathname).to.eq('/candidates')
      })
  })

  it('Candidate score should be 0%', () => {
    cy.get('[data-cy="candidate"]')
      .find('[data-cy="candidate__score"]')
      .contains('0%')
  })
});

context('Create filled candidate, update state, delete candidate', () => {

  before(() => {
    cy.visit('http://localhost:3000')
  })

  const randomStr = Math.random().toString(36).substr(2, 9);
  const candidate = {
    fullName: 'Full Name ' + randomStr,
    email: randomStr + '@gmail.com',
    password: 'password ' + randomStr,
    phone: '+' + Math.random().toString().substr(2, 9),
  };

  it('Go to application screen', () => {
    cy.get('[data-cy="header__applicant-link"]')
      .click();
  })

  it('Upload Candidate avatar', () => {
    cy.fixture('avatar.jpeg').then(fileContent => {
      cy.get('[data-cy="application__avatar-field"]')
        .attachFile({
          fileContent: fileContent.toString(),
          fileName: 'avatar.jpeg',
          mimeType: 'image/jpeg'
        })
    });
    cy.wait(1000);
  });

  it(`Fill Candidate Email with "${candidate.email}"`, () => {
    cy.get('[data-cy="application__email-field"]')
      .type(candidate.email)
  })

  it(`Fill Candidate Password with "${candidate.password}"`, () => {
    cy.get('[data-cy="application__password-field"]')
      .type(candidate.password)
  })

  it(`Fill Candidate Full Name with "${candidate.fullName}"`, () => {
    cy.get('[data-cy="application__fullName-field"]')
      .type(candidate.fullName)
  })

  it(`Fill Candidate Phone with "${candidate.phone}"`, () => {
    cy.get('[data-cy="application__phone-field"]')
      .type(candidate.phone)
  })

  it('Save filled candidate', () => {
    cy.get('[data-cy="application__apply-btn"]')
      .click();

    cy.location()
      .should((loc) => {
        expect(loc.pathname).to.eq('/candidates')
      })
  })

  it(`Candidate Full Name should be ${candidate.fullName}`, () => {
    cy.get('[data-cy="candidate"]')
      .find('[data-cy="candidate__fullName"]')
      .contains(candidate.fullName)
  })

  it(`Candidate Email should be ${candidate.email}`, () => {
    cy.get('[data-cy="candidate"]')
      .find('[data-cy="candidate__email"]')
      .contains(candidate.email)
  })

  it('Candidate score should be 100%', () => {
    cy.get('[data-cy="candidate"]')
      .find('[data-cy="candidate__score"]')
      .contains('100%')
  })
});