const fs = require('fs');
const app = require('express')();
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const FileStore = require('session-file-store')(session);
const sapper = require('sapper');
const static = require('serve-static');

const { PORT = 3000 } = process.env;

// this allows us to do e.g. `fetch('/api/blog')` on the server
const fetch = require('node-fetch');
global.fetch = (url, opts) => {
	if (url[0] === '/') url = `http://localhost:${PORT}${url}`;
	return fetch(url, opts);
};

app.use(session({
	secret: 'conduit',
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 31536000
	},
	store: new FileStore({
		path: process.env.NOW ? `/tmp/sessions` : `.sessions`
	})
}));

app.use(bodyParser.json());

app.use(compression({ threshold: 0 }));

app.use(static('assets'));

app.use(sapper());

app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});