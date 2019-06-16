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

	// TODO more tests!
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
		cy.get('.preview-link')
			.first()
			.should('have.attr', 'href')
			.and('include', 'article')
			.then((href) => {
				cy.visit(href);
				cy.url().should('include', 'article')
			});
	})

	it('is possible to filter by tags', () => {
		cy.get('.sidebar .tag-pill')
			.first()
			.click().then(() => {
				cy.get('.nav-pills .active')
					.should('contain', 'butt')
			});
	})

	it('is possible to view an author profile', () => {
		cy.get('.article-preview .author')
			.first()
			.should('have.attr', 'href')
			.and('include', 'profile')
			.then((href) => {
				cy.visit(href);
				cy.url().should('include', 'profile')
				cy.get('.row button').should('contain', 'Follow')
			});
	})

	it('registration forms require an username, email, and password', () => {
		cy.visit('/register')
		cy.get('form button').wait(150).click()

		cy.get('.error-messages li:nth-of-type(1)').should('contain', `email can't be blank`);
		cy.get('.error-messages li:nth-of-type(2)').should('contain', `password can't be blank`);
		cy.get('.error-messages li:nth-of-type(3)').should('contain', `username can't be blank,is too short (minimum is 1 character)`);


	})


	// these test don't seem to work in headless mode
	// they're probably super flakey because I don't know what I'm doing
	//
	// it('is possible to register and logout', () => {
	// 	cy.visit('/register')
	// 	cy.get(':nth-child(1) > .form-control').type(usr)
	// 	cy.get(':nth-child(2) > .form-control').type(email)
	// 	cy.get(':nth-child(3) > .form-control').type(pw)
	// 	cy.get('form').wait(300).submit()
	// 	cy.wait(1000)
	// 	cy.contains(usr);
	// 	cy.get(':nth-child(3) > .nav-link')
	// 		.should('have.attr', 'href')
	// 		.then((href) => {
	// 			cy.visit(href);
	// 			cy.contains('Your Settings')
	// 			cy.get('.btn-outline-danger')
	// 				.click();
	// 			cy.get(':nth-child(3) > .nav-link')
	// 				.should('not.contain', usr);
	// 		});
	// })

	// it('is possible to login and write and edit a post', () => {
	// 	cy.visit('/login')
	// 	cy.get(':nth-child(1) > .form-control').type(email)
	// 	cy.get(':nth-child(2) > .form-control').type(pw)
	// 	cy.get('form').wait(300).submit()
	// 	cy.wait(1000);
	// 	cy.get(':nth-child(4) > .nav-link')
	// 		.should('contain', usr);

	// 	cy.visit('/editor')
	// 	cy.get(':nth-child(1) > .form-control').type('Title of Post')
	// 	cy.get(':nth-child(2) > .form-control').type('Brief Description')
	// 	cy.get(':nth-child(3) > .form-control').type('Long text')
	// 	cy.get(':nth-child(4) > .form-control').type('tag1 {enter} tag2 {enter} tag3 {enter}')
	// 	cy.get('.btn').wait(300).click();

	// 	cy.get('h1').should('contain', 'Title of Post');

	// 	cy.get('.btn-outline-secondary')
	// 		.should('have.attr', 'href')
	// 		.then((href) => {
	// 			cy.visit(href);
	// 			cy.get(':nth-child(1) > .form-control').type(' - Edited');
	// 			cy.get('.btn').wait(300).click();
	// 			cy.get('h1').should('contain', 'Title of Post - Edited');
	// 		});
	// })
});