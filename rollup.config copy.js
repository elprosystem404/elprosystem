import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import generatePackageJson from 'rollup-plugin-generate-package-json';



import { fileURLToPath } from "url";
import path from "path";
import { getFolders } from "./scripts/createRollupConfig.js";

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
  //  terser()
]



const subfolderPlugins = (folderName) => [
  ...plugins,
  generatePackageJson({
    baseContents: {
      name: `${packageJson.name}/${folderName}`,
      private: true,
      main: '../cjs/index.js',
      module: './index.mjs',
      types: './index.d.ts',
    },
  }),
];


const folderBuilds = getFolders('./src').map((folder) => {
  return {
    input: `src/${folder}/index.ts`,
    output: {
      file: `dist/${folder}/index.mjs`,
      sourcemap: true,
      globals: { react: 'React' },
      exports: 'named',
      format: 'esm',
    },
    plugins: subfolderPlugins(folder),
    external: ['react', 'react-dom'],
  };
});



const config = [
  {
    input,
    output: [
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
        globals: { react: 'React' },
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
        globals: { react: 'React' },
        exports: 'named',
      }
    ],
    plugins,
    external: ['react', 'react-dom'],
  }

];

console.log('xxxxxxxxxxxxxx', JSON.stringify(config, null, 2));

export default config