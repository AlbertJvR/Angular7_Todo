const {config} = require('../config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodbUri);

module.exports = {mongoose};
