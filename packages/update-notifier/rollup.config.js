import terser from "@rollup/plugin-terser"
import typescript2 from "rollup-plugin-typescript2"
import { nodeResolve, } from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import dts from "rollup-plugin-dts"
export default [
  {
    input: "index.ts",
    output: [
      {
        file: "dist/index.cjs.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/index.cjs.min.js",
        format: "cjs",
        plugins: [terser(),],
      },
      {
        file: "dist/index.umd.js",
        format: "umd",
        name: "updateNotifier",
      },
      {
        file: "dist/index.umd.min.js",
        format: "umd",
        name: "vcdp",
        plugins: [
          terser(),
        ],
      },
      {
        file: "dist/index.esm.js",
        format: "esm",
        sourcemap: true,
      },
      {
        file: "dist/index.esm.min.js",
        format: "esm",
        plugins: [terser(),],
      },
    ],
    plugins: [
      typescript2({
        tsconfig: "./tsconfig.json",
        useTsconfigDeclarationDir: true,
        tsconfigOverride: {
          compilerOptions: {
            target: "es5"
          },
        },
      }),
      nodeResolve(),
      commonjs({
        include: "node_modules/**",
      }),
    ],
  },
  {
    input: "index.ts",
    output: {
        file: "dist/index.d.ts",
        format: "es",
    },
    plugins: [dts(),],
  }
]