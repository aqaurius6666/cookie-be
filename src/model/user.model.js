const {EntitySchema } = require('typeorm')

export class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

export const UserSchema = new EntitySchema({
    name: 'User',
    target: User,
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        name: {
            type: 'varchar'
        }
    }
})

