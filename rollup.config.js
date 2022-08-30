import external from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import dts from "rollup-plugin-dts"

import generatePackageJson from 'rollup-plugin-generate-package-json';


// import { fileURLToPath } from "url";
// import path from "path";
// import { getFolders } from "./scripts/createRollupConfig.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const packageJson = require("./package.json");
// const input = ['src/index.ts'];
// const plugins = [
//   peerDepsExternal(),
//   resolve(),
//   commonjs(),
//   typescript({
//     useTsconfigDeclarationDir: true,
//     tsconfig: path.resolve(__dirname, 'tsconfig.json'),
//   }),
//   postcss(),
//   //  terser()
// ]



// const subfolderPlugins = (folderName) => [
//   ...plugins,
//   generatePackageJson({
//     baseContents: {
//       name: `${packageJson.name}/${folderName}`,
//       private: true,
//       main: '../cjs/index.js',
//       module: './index.mjs',
//       types: './index.d.ts',
//     },
//   }),
// ];


// const folderBuilds = getFolders('./src').map((folder) => {
//   return {
//     input: `src/${folder}/index.ts`,
//     output: {
//       file: `dist/${folder}/index.mjs`,
//       sourcemap: true,
//       globals: { react: 'React' },
//       exports: 'named',
//       format: 'esm',
//     },
//     plugins: subfolderPlugins(folder),
//     external: ['react', 'react-dom'],
//   };
// });

const packageJson = require("./package.json");

const config = [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
        name: "react-eForm-control",
        globals: { react: 'React' },
        exports: 'named'
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
        name: "react-eForm-control",
        globals: { react: 'React' },
        exports: 'named'
      },
    ],
    plugins: [
      external(),
      resolve({ extensions: ['.ts', '.tsx'] }),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss(),
      //  terser(),
    ],
    external: ['react', 'react-dom']
  },
  // sub folder
  {
    input: `src/button/index.ts`,
    output: {
      file: `dist/Button/index.mjs`,
      sourcemap: true,
      globals: { react: 'React' },
      exports: 'named',
      format: 'esm',
    },
    plugins: [
      external(),
      resolve({ extensions: ['.ts', '.tsx'] }),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss(),
      //  terser(),
      generatePackageJson({
        baseContents: {
          ...packageJson,
          "exports": {
            "./package.json": "./package.json",
            ".": {
              "types": "./dist/index.d.ts",
              "import": "./dist/index.esm.mjs",
              "require": "./dist/index.cjs.js"
            },
            "./Button": {
              "types": "./dist/index.d.ts",
              "import": "./dist/Button"
            }
          }
        },
        outputFolder: '.'
      })
    ],
    external: ['react', 'react-dom'],
  },
  {
    input: "src/types/index.ts",
    output: [
      {
        file: "dist/index.d.ts",
        format: "esm",
        sourcemap: true
      }
    ],
    plugins: [dts()],
    external: [/\.css$/, 'react', 'react-dom']
  },
  // {
  //   input,
  //   output: [
  //     {
  //       file: packageJson.module,
  //       format: "esm",
  //       sourcemap: true,
  //       globals: { react: 'React' },
  //       exports: 'named',
  //     }
  //   ],
  //   plugins,
  //   external: ['react', 'react-dom']
  // },
  // ...folderBuilds,
  // {
  //   input,
  //   output: [
  //     {
  //       file: packageJson.main,
  //       format: "cjs",
  //       sourcemap: true,
  //       globals: { react: 'React' },
  //       exports: 'named',
  //     }
  //   ],
  //   plugins,
  //   external: ['react', 'react-dom'],
  // }

];

console.log('ROLLUP CONFIG', JSON.stringify(packageJson, null, 2));

export default config