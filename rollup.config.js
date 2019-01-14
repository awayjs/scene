var includePaths = require('rollup-plugin-includepaths');

module.exports = {
	entry: './dist/index.js',
	sourceMap: true,
	format: 'umd',
	moduleName: 'AwayjsScene',
    external: [
        '@awayjs/core',
        '@awayjs/graphics',
        '@awayjs/stage',
        '@awayjs/view',
        '@awayjs/renderer',
        '@awayjs/materials'
    ],
    globals: {
        '@awayjs/core': 'AwayjsCore',
        '@awayjs/graphics': 'AwayjsGraphics',
        '@awayjs/stage': 'AwayjsStage',
        '@awayjs/view': 'AwayjsView',
        '@awayjs/renderer': 'AwayjsRenderer',
        '@awayjs/materials': 'AwayjsMaterials'
    },
	targets: [
		{ dest: './bundle/awayjs-scene.umd.js'}
	],
	plugins: [
		includePaths({
			include : {
				"tslib": "./node_modules/tslib/tslib.es6.js"
			}
		}) ]
};