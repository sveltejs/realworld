import fs from 'fs';
import polka from 'polka';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import bodyParser from 'body-parser';
import compression from 'compression';
import sapper from 'sapper';
import serve from 'serve-static';
import fetch from 'node-fetch';
import { routes } from './manifest/server.js';

const { PORT } = process.env;

// this allows us to do e.g. `fetch('/api/blog-posts')` on the server
global.fetch = (url, opts) => {
	if (url[0] === '/') url = `http://localhost:${PORT}${url}`;
	return fetch(url, opts);
};

const FileStore = sessionFileStore(session);

// you can also use Express
polka()
	.use(session({
		secret: 'conduit',
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 31536000
		},
		store: new FileStore({
			path: process.env.NOW ? `/tmp/sessions` : `.sessions`
		})
	}))
	.use(bodyParser.json())
	.use(compression({ threshold: 0 }))
	.use(serve('assets'))
	.use(sapper({ routes }))
	.listen(PORT);
