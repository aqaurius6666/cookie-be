const { ConnectDatabase: connectDatabase, UserRepository } = require('./repository');
const server = require('./route/server');


const main = async () => {
  await connectDatabase();
  console.log('connect db success');
  const user = await UserRepository.findOne({
    where: {
      id: 1,
      name: 'test',
    },
  });
  console.log(user);
  server.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
};

module.exports = main;
