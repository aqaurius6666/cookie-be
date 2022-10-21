require('dotenv').config({
  path: '.env',
});
require('./app')().then(() => {

}).catch((err) => {
  console.log(err);
});

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

process.on('uncaughtException', (err) => {
  console.log('uncaughtException', err);
  // application specific logging, throwing an error, or other logic here
});
