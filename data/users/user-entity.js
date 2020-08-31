export class UserEntity {
    /** @param {UserEntity} [user] */
    constructor(user = null) {
        if (user) {
            this.id = user.id;
            this.name = user.name;
        }
        else {
            this.id = null;
            this.name = '';
        }
    }
}
