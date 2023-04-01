import { build, BuildOptions } from 'esbuild'

const buildConfig: BuildOptions = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  outdir: 'dist',
  format: 'esm',
  minify: true,
  outfile: 'index.mjs',
  platform: 'node',
}

build(buildConfig).catch(() => process.exit(1))