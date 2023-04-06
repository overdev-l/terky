import { defineBuildConfig } from 'unbuild'
import terser from "@rollup/plugin-terser"
export default defineBuildConfig({
  entries: ['./index.ts'],
  clean: true,
  failOnWarn: false,
  rollup: {
    inlineDependencies: true,
    esbuild: {
      minify: true,
    },
  },
  declaration: true,
})
