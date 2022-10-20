const { EntitySchema } = require("typeorm");
const { User } = require("../model");

const UserSchema = new EntitySchema({
    name: 'User',
    target: User,
    tableName: 'users',
    columns: {
      id: {
        primary: true,
        type: 'int',
        generated: true,
      },
      name: {
        type: 'varchar',
      },
      age: {
        type: 'int',
      },
    },
  });
  
  module.exports = UserSchema;