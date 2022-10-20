const { DataSource } = require('typeorm');
const config = require('../typeorm');
const dataSource = new DataSource(config);

const connectDB = async () => {
  return dataSource.initialize();
};

module.exports = {
  connectDB,
  dataSource,
};
