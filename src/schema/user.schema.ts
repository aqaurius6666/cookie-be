import { EntitySchema } from 'typeorm'
import { User } from '../model'

const UserSchema = new EntitySchema<User>({
  name: 'User',
  target: User,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true
    },
    name: {
      type: String
    },
    age: {
      type: Number
    }
  },
  relations: {
    followers: {
      type: 'many-to-many',
      target: 'User',
      joinTable: {
        name: 'follow',
        joinColumn: {
          name: 'user_id',
          referencedColumnName: 'id'
        }
      }
    },
    followings: {
      type: 'many-to-many',
      target: 'User',
      joinTable: {
        name: 'follow',
        inverseJoinColumn: {
          name: 'user_id',
          referencedColumnName: 'id'
        }
      }
    }
  }
})

export default UserSchema
