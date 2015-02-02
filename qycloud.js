var fis = module.exports = require('fis');
fis.require.prefixes = ['qycloud', 'fis'];
fis.cli.name = "qycloud";
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');

var defaultConfig = require('./configs/default.js');
fis.config.merge(defaultConfig);