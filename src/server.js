import express from 'express';
import compression from 'compression';
import serve from 'serve-static';
import bodyParser from 'body-parser';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import * as sapper from '../__sapper__/server.js';
import { Store } from 'svelte/store.js';

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
		serve('static'),
		sapper.middleware({
			store: req => {
				return new Store({
					user: req.session && req.session.user
				});
			}
		})
	)
	.listen(process.env.PORT);
