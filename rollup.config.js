import { spawn } from 'child_process';
import svelte from 'rollup-plugin-svelte';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import terser from '@rollup/plugin-terser';
import css from 'rollup-plugin-css-only';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import bundleFonts from 'rollup-plugin-bundle-fonts';
import preprocess from 'svelte-preprocess';
import commonjs from '@rollup/plugin-commonjs';

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = spawn('npm', ['run', 'start', '--', 'npm run dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default [
	{
		input: 'src/database/_worker.ts',
		output: {
			format: 'es',
			file: 'public/_worker.js'
		},
		plugins: [
			del({ targets: 'public/_worker.js', runOnce: true}),
			typescript({tsconfig: 'src/database/tsconfig.json'}),
		],
		watch: {
			clearScreen: false
		}
	},
	{
	input: 'src/main.js',
	output: {
		sourcemap: !production,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		del({ targets: 'public/build/*', runOnce: true}),
		copy({
			targets: [
				{src: 'node_modules/jquery/dist/jquery.min.js', dest: 'public/build/jquery'},
			]
		}),
		replace({
			'process.env.NODE_ENV': JSON.stringify(production ? "production" : "dev")
		}),
		svelte({
			preprocess: preprocess(),
		}),

		bundleFonts({targetDir: "public/fonts", cssRelativePath: "../fonts"}),

		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		typescript(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
}];
