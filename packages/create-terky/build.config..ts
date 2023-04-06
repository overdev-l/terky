import { defineBuildConfig } from 'unbuild'
export default defineBuildConfig({
    entries: ['src/index.ts', "src/gapi.ts"],
    clean: true,
    rollup: {
        inlineDependencies: true,
        esbuild: {
            minify: true,
        },
    },
    declaration: true,
})
