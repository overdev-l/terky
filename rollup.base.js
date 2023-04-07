import typescript2 from "rollup-plugin-typescript2"
import { nodeResolve, } from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import dts from "rollup-plugin-dts"
export const plugins = [
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
]

export const dtsConfig = {
  input: "src/index.ts",
  output: {
      file: "dist/index.d.ts",
      format: "es",
  },
  plugins: [dts(),],
}