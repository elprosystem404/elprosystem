import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import generatePackageJson from 'rollup-plugin-generate-package-json';



import { fileURLToPath } from "url";
import path from "path";
const fs = require('fs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJson = require("./package.json");
const input = ['src/index.ts'];
const plugins = [
  peerDepsExternal(),
  resolve(),
  commonjs(),
  typescript({
    useTsconfigDeclarationDir: true,
    tsconfig: path.resolve(__dirname, 'tsconfig.json'),
  }),
  postcss(),
  terser()
]



export const getFolders = (entry) => {
  const dirs = fs.readdirSync(entry)
  const dirsWithoutIndex = dirs.filter(name => name !== 'index.ts').filter(name => name !== 'utils')
  return dirsWithoutIndex
}



const subfolderPlugins = (folderName) => [
  ...plugins,
  generatePackageJson({
    baseContents: {
      name: `${packageJson.name}/${folderName}`,
      private: true,
      main: '../cjs/index.js',
      module: './index.js',
      types: './index.d.ts',
    },
  }),
];
const folderBuilds = getFolders('./src').map((folder) => {
  return {
    input: `src/${folder}/index.ts`,
    output: {
      file: `dist/${folder}/index.js`,
      sourcemap: true,
      exports: 'named',
      format: 'esm',
    },
    plugins: subfolderPlugins(folder),
    external: ['react', 'react-dom'],
  };
});




// export config

export default [
  {
    input,
    output: [
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
        exports: 'named',
      }
    ],
    plugins,
    external: ['react', 'react-dom']
  },
  ...folderBuilds,
  {
    input,
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
        exports: 'named',
      }
    ],
    plugins,
    external: ['react', 'react-dom'],
  }

];