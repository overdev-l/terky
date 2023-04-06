import esbuild from 'esbuild'
import minimist from 'minimist'
const argv = minimist(process.argv.slice(2))
const format = argv.format || 'esm'
esbuild.build({
    entryPoints: ['./index.ts'],
    external: [],
    outfile: `dist/index.${format}.js`,
    format: format,
    bundle: true,
    nodePaths: ['node_modules'],
}).catch((e) => console.error(e.message))