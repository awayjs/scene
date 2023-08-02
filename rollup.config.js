import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default {
	input: './dist/index.js',
	output: {
		name: 'AwayjsScene',
		globals: {
			'@awayjs/core': 'AwayjsCore',
			'@awayjs/stage': 'AwayjsStage',
			'@awayjs/view': 'AwayjsView',
			'@awayjs/renderer': 'AwayjsRenderer',
			'@awayjs/graphics': 'AwayjsGraphics',
			'@awayjs/materials': 'AwayjsMaterials'
		},
		sourcemap: true,
		format: 'umd',
		file: './bundle/awayjs-scene.umd.js'
	},
	external: [
		'@awayjs/core',
		'@awayjs/stage',
		'@awayjs/view',
		'@awayjs/renderer',
		'@awayjs/graphics',
		'@awayjs/materials'
	],
	plugins: [
		nodeResolve(),
		commonjs(),
		terser(),
	]
};