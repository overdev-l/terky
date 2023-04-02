import { build } from 'esbuild'

const buildConfig = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  format: 'esm',
  minify: false,
  outfile: 'dist/index.mjs',
  platform: 'node',
}

build(buildConfig)