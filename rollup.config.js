import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
    // If using any exports from a symlinked project, uncomment the following:
    // preserveSymlinks: true,
    input: ['src/main.js'],
    output: {
        file: 'build/main.js',
        format: 'es',
        sourcemap: true,
    },
    plugins: [
        babel({
            exclude: 'node_modules/**',
            babelHelpers: false,
        }),
        nodeResolve({
            // use "jsnext:main" if possible
            // see https://github.com/rollup/rollup/wiki/jsnext:main
            jsnext: true,
        }),
        terser()
    ]
};
