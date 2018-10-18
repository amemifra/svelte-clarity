import App from './App.html';
import { Store } from 'svelte/store.js';

/** Service Worker */
if (window.navigator.serviceWorker) {
  window.navigator.serviceWorker.register('sw.js')
}

/** State Management */

/*** set up */
const store = new Store({
  name: 'Web Application',
  page: 'homepage'
});

/*** handling */
store.on('state', ({changed, current}) => {
  /**** Routing event */
  if (changed.page) location.hash = `#${current.page}`;
})

/** Routing */

/*** on create */
location.hash.indexOf('#') < 0
? location.hash = '#homepage'
: store.set({
  page: location.hash === '' || location.hash.substr(1) === '' ? 'homepage' : location.hash.substr(1)
});

/*** location on state  */
window.onhashchange = () => {
  if (store.get().page !== location.hash.substr(1)) store.set({page: location.hash.substr(1)})
}

/** Rendering */
const app = new App({
	target: document.body.querySelector('#app'),
  store
});

/** Debugging */
window.store = store;


export default app;
