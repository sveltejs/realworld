function post(endpoint, data) {
  return fetch(endpoint, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(r => r.json());
}


let store;

export const userSession = {
  set(sessionStore) {
    store = sessionStore;
  },

  login(credentials) {
    return post(`auth/login`, credentials).then(response => {
      if (response.user) store.update(state => ({ ...state, user: response.user }));
      return response;
    });
  },

  logout() {
    return post(`auth/logout`).then(response => {
      store.update(state => ({ ...state, user: null }));
      return response;
    });
  },

  register(user) {
    return post(`auth/register`, user).then(response => {
      if (response.user) store.update(state => ({ ...state, user: response.user }));
      return response;
    });
  },

  save(user) {
    return post(`auth/save`, user).then(response => {
      if (response.user) store.update(state => ({ ...state, user: response.user }));
      return response;
    });
  }
}