/**
 * Using createRequire to import a CommonJS module from ES Module
 * Read More 👉🏻 https://nodejs.org/api/module.html#module_module_createrequire_filename
 */

import { createRequire } from 'module';
import path from 'path';


const appEnv = process.env.APP_ENV;
const fileUrl = new URL(`file://${path.resolve('config', 'index.js')}`);

const require = createRequire(fileUrl);
const config = require(`./${appEnv}.cjs`);

export default config;
