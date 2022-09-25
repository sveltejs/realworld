export async function load({ locals }) {
	return locals.user ? { 
		user: locals.user && {
			username: locals.user.username,
			email: locals.user.email,
			image: locals.user.image,
			bio: locals.user.bio
		}
	} : { user: null };
}