import { UserEntity, UserRepository } from '../data/users';

export class FakeUserRepository extends UserRepository {
    constructor() {
        super();

        /** @type {UserEntity[]} */
        this.users = [
            new UserEntity({
                id: 1,
                name: 'user-1'
            }),
            new UserEntity({
                id: 2,
                name: 'user-2'
            }),
        ];
    }

    list() {
        return this.users;
    }

    get(userId) {
        return this.users.find(user => user.id === userId);
    }

    add(user) {
        /** @type {number[]} */
        const userIds = this.users.map(user => user.id);
        user.id = Math.max.apply(null, userIds) + 1;
        this.users.push(user);
        return user;
    }
}
