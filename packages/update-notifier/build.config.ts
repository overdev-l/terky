import { defineBuildConfig } from 'unbuild'
export default defineBuildConfig({
    entries: ['./index.ts'],
    clean: true,
    rollup: {
        inlineDependencies: true,
        esbuild: {
            minify: true,
        },
    },
    outDir: 'dist'
})
