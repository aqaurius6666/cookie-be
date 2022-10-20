const { DataSource } = require('typeorm');
const config = require('../typeorm');
require('reflect-metadata');
const dataSource = new DataSource({
  ...config,
});

const connectDB = async () => {
  return dataSource.initialize();
};

module.exports = {
  connectDB,
  dataSource,
};
