export class UserRepository {
    constructor() {
        if (new.target === UserRepository) {
            throw new TypeError('Cannot construct UserRepository instance directly');
        }
    }

    /** @returns {User[]} */
    list() {
    }

    /**
     * @param {number} userId
     * @returns {User}
     */
    get(userId) {
    }

    /**
     * @param {User} user
     * @returns {User}
     */
    add(user) {
    }
}
