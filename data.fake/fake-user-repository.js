import { User } from '../data/user';
import { UserRepository } from '../data/user-repository';

export class FakeUserRepository extends UserRepository {
    constructor() {
        super();

        /** @type {User[]} */
        this.users = [
            new User({
                id: 1,
                name: 'user-1'
            }),
            new User({
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
