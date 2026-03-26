import { mount } from 'svelte';
import App from './App.svelte';
import './global.css';
import 'quill/dist/quill.snow.css';
import './carbon-theme.scss';

const app = mount(App, {
	target: document.body,
	props: {}
});

export default app;