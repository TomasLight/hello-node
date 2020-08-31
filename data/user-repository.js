export class UserRepository {
    constructor() {
        if (new.target === UserRepository) {
            throw new TypeError('Cannot construct UserRepository instance directly');
        }
    }

    /** @returns {User[]} */
    list() {
        throw new Error("Not implemented");
    }

    /**
     * @param {number} userId
     * @returns {User}
     */
    get(userId) {
        throw new Error("Not implemented");
    }

    /**
     * @param {User} user
     * @returns {User}
     */
    add(user) {
        throw new Error("Not implemented");
    }
}
