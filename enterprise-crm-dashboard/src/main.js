import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@poluru-labs/enterprise-design-system-wc/tokens.css';
import '@poluru-labs/enterprise-design-system-wc';
import './styles/tokens.css';
import './styles/layout.css';
import './styles/header.css';
import './components/content-card.js';
import './components/app-shell.js';
import { subscribe } from './lib/router.js';

const app = document.querySelector('#app');
app.innerHTML = '<lyra-shell></lyra-shell>';

const shell = app.querySelector('lyra-shell');

subscribe((route) => {
  shell.route = route;
});
