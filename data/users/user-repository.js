export class UserRepository {
    constructor() {
        if (new.target === UserRepository) {
            throw new TypeError('Cannot construct UserRepository instance directly');
        }
    }

    /** @returns {UserEntity[]} */
    list() {
        throw new Error("Not implemented");
    }

    /**
     * @param {number} userId
     * @returns {UserEntity}
     */
    get(userId) {
        throw new Error("Not implemented");
    }

    /**
     * @param {UserEntity} user
     * @returns {UserEntity}
     */
    add(user) {
        throw new Error("Not implemented");
    }
}
