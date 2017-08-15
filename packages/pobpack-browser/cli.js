var production = process.env.NODE_ENV === 'production';
var nodeVersion = process.versions.node.split('.');
var nodeVersionMajor = Number(nodeVersion[0]);
var nodeVersionMinor = Number(nodeVersion[1]);
/* istanbul ignore next */
if (nodeVersionMajor > 8 || (nodeVersionMajor === 8 && nodeVersionMinor >= 3))
  return module.exports = require('./lib-node8' + (production ? '' : '-dev') + '/cli');
/* istanbul ignore next */
if (nodeVersionMajor > 6 || (nodeVersionMajor === 6 && nodeVersionMinor >= 5))
  return module.exports = require('./lib-node6' + (production ? '' : '-dev') + '/cli');
/* istanbul ignore next */
throw new Error('Node version not supported: ' + nodeVersion + ' (' + process.versions.node + ').');
