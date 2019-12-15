const production = process.env.NODE_ENV === 'production';
module.exports = require('./dist/cli-node10' + (production ? '' : '-dev') + '.cjs');
