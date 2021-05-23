const NODE_ENV = process.env.NODE_ENV;

const envFileMap = {
  development: 'dev',
  production: 'prod',
  staging: 'stage',
};

const config = require('./'+envFileMap[NODE_ENV]+'.js');

module.exports = config;
