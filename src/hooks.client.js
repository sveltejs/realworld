import { initStores } from '$lib/stores';

// On the server, we can only initialize the stores inside the layout
// because the context isn't available before that
// On the client, we'd like to do it earlier so we can access it in load
initStores();
