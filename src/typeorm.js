module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'cleango',
  password: 'cleango',
  database: 'cleango',
  synchronize: true,
  logging: false,
  entities: [
    __dirname + '/schema/*.schema.js',
  ],
};
