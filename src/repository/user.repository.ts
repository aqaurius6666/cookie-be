import { User } from '../model'
import UserSchema from '../schema/user.schema'
import { dataSource } from './repository'

export class UserRepository {
  private static readonly repo = dataSource.getRepository(UserSchema)

  static async findById (id: number) {
    return await this.repo.findOne({
      where: {
        id
      },
      relations: ['followers', 'following']
    })
  }

  static async insertOne (user: User) {
    return await this.repo.save(user)
  }
}
