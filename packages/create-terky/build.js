import { build } from 'esbuild'

const buildConfig = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  format: 'esm',
  minify: false,
  outfile: 'dist/index.js',
  platform: 'node',
}

build(buildConfig).catch(() => process.exit(1))
