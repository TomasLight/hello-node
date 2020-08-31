import { User, UserService } from '../domain/users';
import { UserEntity, UserRepository } from '../data/users';

export class DomainUserService extends UserService {
    static __constructorParams = [ UserRepository ];

    constructor(userRepository) {
        super();
        /** @type {UserRepository} */
        this.userRepository = userRepository;
    }

    /** @returns {User[]} */
    list() {
        const entities = this.userRepository.list();
        const users = entities.map(entity => new User(entity));
        return users;
    }

    /**
     * @param {number} userId
     * @returns {User}
     */
    getById(userId) {
        const entity = this.userRepository.get(userId);
        const user =  new User(entity);
        return user;
    }

    /**
     * @param {string} userName
     * @returns {User}
     */
    add(userName) {
        const entity = new UserEntity({ name: userName });
        this.userRepository.add(entity);
        const mappedUser = new User(entity);
        return mappedUser;
    }
}
