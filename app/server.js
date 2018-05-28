import express from 'express';
import compression from 'compression';
import sapper from 'sapper';
import serve from 'serve-static';
import bodyParser from 'body-parser';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import { Store } from 'svelte/store.js';
import { routes } from './manifest/server.js';
import App from './App.html';

const FileStore = sessionFileStore(session);

express()
	.use(bodyParser.json())
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
	.use(
		compression({ threshold: 0 }),
		serve('assets'),
		sapper({
			routes,
			App,
			store: req => {
				return new Store({
					user: req.session && req.session.user
				});
			}
		})
	)
	.listen(process.env.PORT);
