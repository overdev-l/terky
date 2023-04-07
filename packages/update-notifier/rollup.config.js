import { plugins, dtsConfig } from "../../rollup.base.js"
import terser from "@rollup/plugin-terser"

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
    plugins,
  },
  dtsConfig
]