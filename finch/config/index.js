/**
 * Using createRequire to import a CommonJS module from ES Module
 * Read More 👉🏻 https://nodejs.org/api/module.html#module_module_createrequire_filename
 */

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const appEnv = process.env.APP_ENV;

const config = require(`./${appEnv}.cjs`);

export default config;
