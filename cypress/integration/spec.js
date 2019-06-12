const crypto = require("crypto");
const pw = crypto.randomBytes(10).toString('hex');
const usr = crypto.randomBytes(10).toString('hex');
const email = `${usr}@${usr}.com`;

describe('Sapper template app', () => {
	beforeEach(() => {
		cy.visit('/')
	});

	it('has the correct <h1>', () => {
		cy.contains('h1', 'conduit')
	});

	it('is possible to change route', () => {
		cy.visit('/login');
		cy.contains('h1', 'Sign In')

		cy.visit('/register');
		cy.contains('h1', 'Sign up')

		cy.visit('/');
		cy.contains('h1', 'conduit')

		cy.visit('/register');
		cy.contains('h1', 'Sign up')
	});

	it('is possible to read a post', () => {
		cy.get(':nth-child(1) > .preview-link')
			.should('have.attr', 'href')
			.and('include', 'article')
			.then((href) => {
				cy.visit(href);
				cy.url().should('include', 'article')
			});
	})

	it('is possible to register and logout', () => {
		cy.visit('/register')
		cy.get(':nth-child(1) > .form-control').type(usr)
		cy.get(':nth-child(2) > .form-control').type(email)
		cy.get(':nth-child(3) > .form-control').type(pw)
		cy.get('form').submit()

		cy.contains(usr);
		cy.get(':nth-child(3) > .nav-link')
			.should('have.attr', 'href')
			.then((href) => {
				cy.visit(href);
				cy.contains('Your Settings')
				cy.wait(100)
				cy.get('.btn-outline-danger')
					.click();
				cy.get(':nth-child(3) > .nav-link')
					.should('not.contain', usr);
			});
	})

	it('is possible to login and write and edit a post', () => {
		cy.visit('/login')
		cy.get(':nth-child(1) > .form-control').type(email)
		cy.get(':nth-child(2) > .form-control').type(pw)
		cy.get('form').submit()
		cy.wait(1000)
		cy.visit('/');
		cy.get(':nth-child(4) > .nav-link')
			.should('contain', usr);

		cy.visit('/editor')
		cy.get(':nth-child(1) > .form-control').type('Title of Post')
		cy.get(':nth-child(2) > .form-control').type('Brief Description')
		cy.get(':nth-child(3) > .form-control').type('Long text')
		cy.get(':nth-child(4) > .form-control').type('tag1 {enter} tag2 {enter} tag3 {enter}')
		cy.get('.btn').click();

		cy.get('h1').should('contain', 'Title of Post');

		cy.get('.btn-outline-secondary')
			.should('have.attr', 'href')
			.then((href) => {
				cy.visit(href);
				cy.get(':nth-child(1) > .form-control').type(' - Edited');
				cy.get('.btn').click();
				cy.get('h1').should('contain', 'Title of Post - Edited');

			});
	})
});