import { mount } from 'svelte';

import './global.css';
import 'quill/dist/quill.snow.css';
import './carbon-theme.scss';

import App from './App.svelte';

const app = mount(App, {
	target: document.body,
	props: {}
});

export default app;